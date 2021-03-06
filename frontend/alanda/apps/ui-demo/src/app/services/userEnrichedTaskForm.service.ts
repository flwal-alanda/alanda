import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlandaTaskFormService } from '@alanda/common';
import { UserStoreImpl } from '../store/user';
import { RxState } from '@rx-angular/state';

@Injectable()
export class UserEnrichedTaskFormService {
  rootForm = this.taskFormService.rootForm;

  state$ = combineLatest([
    this.taskFormService.state$,
    this.userStore.currentUser$,
  ]).pipe(map(([{ task, project }, user]) => ({ task, project, user })));

  constructor(
    public taskFormService: AlandaTaskFormService,
    private userStore: UserStoreImpl,
  ) {}

  submit(alternate?: Observable<any>): Observable<any> {
    return this.taskFormService.submit(alternate);
  }

  snooze(days: number): Observable<any> {
    return this.taskFormService.snooze(days);
  }
}
