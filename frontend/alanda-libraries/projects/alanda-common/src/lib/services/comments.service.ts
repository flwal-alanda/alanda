import { AlandaComment } from '../api/models/comment';
import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map, share, switchMap } from 'rxjs/operators';
import { AlandaTask } from '../api/models/task';
import { AlandaCommentResponse } from '../api/models/commentResponse';
import { AlandaCommentTag } from '../api/models/commentTag';
import { combineLatest } from 'rxjs';
import { AlandaCommentApiService } from '../api/commentApi.service';
import { DatePipe } from '@angular/common';
import { AlandaTaskFormService } from '../form/alanda-task-form.service';

export interface AlandaCommentState {
  comments: AlandaComment[];
  tagObjectMap: {[tagName: string]: TagObject};
  activeTagFilters: {[tagName: string]: boolean};
  searchText: string;
}

export interface TagObject {
  name: string;
  type: string;
  status: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlandaCommentsService extends RxState<AlandaCommentState> {
  commentResponse$ = this.taskFormService.select('task').pipe(
    switchMap((task: AlandaTask) => this.commentService.getCommentsforPid(task.process_instance_id)),
    share()
  );

  comments$ = this.commentResponse$.pipe(
    map((commentResponse: AlandaCommentResponse) => {
      return commentResponse.comments.map((comment: AlandaComment) => {
        return this.processComment(comment);
      });
    })
  );

  tagObjectMap$ = this.commentResponse$.pipe(
    map((commentResponse: AlandaCommentResponse) => {
      const tagMap = {};
      commentResponse.comments.forEach((comment: AlandaComment) => {
        comment.tagList.forEach((tag: AlandaCommentTag) => {
          tagMap[tag.name] = { name: tag.name, type: tag.type, status: true };
        });
      });
      return tagMap;
    })
  );

  activeTagFilters$ = this.select('tagObjectMap').pipe(
    map(tags => {
      const activeFilters = {};
      Object.keys(tags).forEach((key: string) => {
        activeFilters[key] = false;
      });
      return activeFilters;
    })
  );

  filteredComments$ = combineLatest([this.select('comments'), this.select('searchText'), this.select('activeTagFilters')]).pipe(
    map(([comments, searchText, activeTagFilters]: [AlandaComment[], string, {string: boolean}]) => {
      const filteredComments = this.filterCommentsBySearchText(comments, searchText);
      return this.filterCommentsByTags(filteredComments, activeTagFilters);
    }),
  );

  constructor(private readonly commentService: AlandaCommentApiService,
    private readonly datePipe: DatePipe,
    private readonly taskFormService: AlandaTaskFormService) {
    super();
    this.set({ comments: [], activeTagFilters: {}, searchText: '' });
    this.connect('activeTagFilters', this.activeTagFilters$);
    this.connect('comments', this.comments$);
    this.connect('tagObjectMap', this.tagObjectMap$);
  }

  processComment(comment: AlandaComment): AlandaComment {
    comment.createDate = new Date(comment.createDate);
    comment.textDate = this.datePipe.transform(comment.createDate, 'dd.LL.yy HH:mm');
    let commentFulltext = `${comment.text.toLowerCase()} ${comment.authorName.toLowerCase()} ${comment.textDate}`;

    comment.tagList = [];
    if (comment.taskName !== '') {
      comment.tagList.push({ name: comment.taskName, type: 'task' });
    }
    if (comment.subject.includes('#')) {
      comment.subject.match(/#\w+/g).forEach((value) => {
        comment.tagList.push({ name: value, type: 'user' });
      });
      comment.subject = comment.subject.replace(/#\w+/g, '');
    }

    comment.tagList.forEach(tag => {
      commentFulltext += ` ${tag.name}`;
    });

    comment.replies = comment.replies.map((reply: AlandaComment) => {
      reply.createDate = new Date(reply.createDate);
      reply.textDate = this.datePipe.transform(reply.createDate, 'dd.LL.yy HH:mm');
      commentFulltext += ` ${reply.text.toLowerCase()} ${reply.authorName.toLowerCase()} ${reply.textDate}`;
      return reply;
    });

    comment.fulltext = commentFulltext;

    return comment;
  }

  filterCommentsBySearchText(comments: AlandaComment[], searchText: string): Array<AlandaComment> {
    if (searchText.length > 0) {
      return comments.filter((comment: AlandaComment) => {
        return comment.fulltext.trim().toLowerCase().includes(searchText);
      });
    }
    return comments;
  }

  filterCommentsByTags(comments: AlandaComment[], activeTagFilters: {string: boolean }): Array<AlandaComment> {
    const filteredComments = comments.filter((comment) => {
      return comment.tagList.findIndex((tag) => {
        return activeTagFilters[tag.name];
      }) > -1;
    });
    return filteredComments.length > 0 ? filteredComments : comments;
  }

  tagClass(tag: AlandaCommentTag): string {
    if (this.get().activeTagFilters[tag.name]) {
      return 'ui-button-success';
    }
    return 'ui-button-info';
  }

  toggleTagFilter(tag: AlandaCommentTag): void {
    this.set({
      activeTagFilters: {
        [tag.name]: !this.get().activeTagFilters[tag.name]
      }
    });
  }

  clearAllTagFilters(): void {
    this.set({ activeTagFilters: {} });
  }
}