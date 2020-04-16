import { Injectable } from '@angular/core';
import { RxGlobalState } from 'ngx-rx-state';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import { AlandaTaskApiService, AlandaProjectApiService, AlandaProject, AlandaTask } from '@alanda-io/alanda-ui';
import {of} from "rxjs";

interface AppState {
  task?: AlandaTask;
  project?: AlandaProject;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends RxGlobalState<AppState> {

  routerParams$ = this.router.events
    .pipe(filter(( event: RouterEvent ) : boolean => ( event instanceof NavigationEnd )),
      map(() => this.router.routerState.snapshot.root),
      // @TODO if we get away from global task managing dete this line and move coed
      map(snapshot => this.collectParams( snapshot ))
    );
  urlTaskId$ =  this.routerParams$.pipe(map(p => p.taskId));
  urlProjectId$ = this.routerParams$.pipe(map(p => p.projectId));

  fetchTaskById$ = this.urlTaskId$.pipe(
    switchMap(tid => {
      return of({pmcProjectGuid: null } as AlandaTask);
     // return this.taskService.getTask(tid)
    })
  );

  fetchProjectById$ = this.urlProjectId$.pipe(
    filter(pId => !!pId),
    switchMap(pid => this.projectService.getProjectByProjectId(pid))
  );

  fetchProjectByGuid$ = this.select(
    map(s => s.task),
    filter(task => !!task.pmcProjectGuid),
    switchMap(task => this.projectService.getProjectByGuid(task.pmcProjectGuid))
  )

  constructor(private router: Router, private taskService: AlandaTaskApiService, private projectService: AlandaProjectApiService) {
    super();
    this.connect('task', this.fetchTaskById$);
    this.connect('project', this.fetchProjectById$);
    this.connect('project', this.fetchProjectByGuid$);
  }


  private collectParams( root: ActivatedRouteSnapshot ) : any {

    const params: any = {};

    (function mergeParamsFromSnapshot( snapshot: ActivatedRouteSnapshot ) {

      Object.assign( params, snapshot.params );

      snapshot.children.forEach( mergeParamsFromSnapshot );

    })( root );

    return( params );

  }



}
