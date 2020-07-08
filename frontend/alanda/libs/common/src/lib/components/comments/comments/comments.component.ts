import { Component } from '@angular/core';
import { AlandaCommentsAdapter } from './comments.adapter';
import { AlandaCommentsPresenter } from './comments.presenter';

/**
 * Wrapper component for comments that provides access to filters and creating new comments.
 */
@Component({
  selector: 'alanda-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [AlandaCommentsAdapter, AlandaCommentsPresenter],
})
export class AlandaCommentsComponent {
  constructor(
    private readonly ca: AlandaCommentsAdapter,
    readonly cp: AlandaCommentsPresenter,
  ) {
    this.cp.connect('comments', ca.select('comments'));
    this.ca.connectSaveReply(this.cp.submitReply$);
    this.ca.connectSaveTrigger(this.cp.commentText$);
  }
}