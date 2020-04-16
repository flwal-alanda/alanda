import {Injectable, OnDestroy} from '@angular/core';
import {RxGlobalState, RxState} from 'ngx-rx-state';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {
  AlandaTaskApiService,
  AlandaProjectApiService,
  AlandaProject,
  AlandaTask,
  BaseState
} from '@alanda-io/alanda-ui';
import {of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface FormManagerState {
  task?: AlandaTask;
  project?: AlandaProject;
//  rootFormData: { [controlName: string]: any }
}

@Injectable({
  providedIn: 'root'
})
export class FormManagerService extends RxState<FormManagerState> implements OnDestroy{

  state$ = this.select();

  rootForm = this.fb.group({});

  routerParams$ = this.route.params;
  /*
  routerParams$ = this.router.events
    .pipe(filter((event: RouterEvent): boolean => (event instanceof NavigationEnd)),
      map(() => this.router.routerState.snapshot.root),
      // @TODO if we get away from global task managing dete this line and move coed
      map(snapshot => this.collectParams(snapshot))
    );*/
  urlTaskId$ = this.routerParams$.pipe(map(p => p.taskId));

  fetchTaskById$ = this.urlTaskId$.pipe(
    switchMap(tid => {
      return of({pmcProjectGuid: null} as AlandaTask);
      // return this.taskService.getTask(tid)
    })
  );

  fetchProjectByGuid$ = this.select(
    map(s => s.task),
    filter(task => !!task.pmcProjectGuid),
    switchMap(task => this.projectService.getProjectByGuid(task.pmcProjectGuid))
  )

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: AlandaTaskApiService,
    private projectService: AlandaProjectApiService) {
    super();
    this.connect('task', this.fetchTaskById$);
    this.connect('project', this.fetchProjectByGuid$);
  }

  /*
    private collectParams(root: ActivatedRouteSnapshot): any {

      const params: any = {};

      (function mergeParamsFromSnapshot(snapshot: ActivatedRouteSnapshot) {

        Object.assign(params, snapshot.params);

        snapshot.children.forEach(mergeParamsFromSnapshot);

      })(root);

      return (params);

    }
  */
  addValidators(validators) {
    this.rootForm.setValidators(validators);
  }

  submit(): void {
    if (this.rootForm.valid) {
      this.taskService.complete(this.getState().task.task_id)
    }
  }

}
