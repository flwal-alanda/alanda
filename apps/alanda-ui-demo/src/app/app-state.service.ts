import { Injectable } from '@angular/core';
import { RxGlobalState } from 'ngx-rx-state';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlandaTaskApiService, AlandaProjectApiService, AlandaProject, AlandaTask } from '@alanda-io/alanda-ui';

interface AppState {
  task?: AlandaTask;
  project?: AlandaProject;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends RxGlobalState<AppState> {

  urlTaskId$ = this.route.params.pipe(map(p => p.taskId));
  urlProjectId$ = this.route.params.pipe(map(p => p.projectId));

  fetchTaskById$ = this.urlTaskId$.pipe(
    switchMap(tid => this.taskService.getTask(tid))
  );

  fetchProjectById$ = this.urlProjectId$.pipe(
    switchMap(pid => this.projectService.getProjectByProjectId(pid))
  );

  fetchProjectByGuid$ = this.select(
    map(s => s.task),
    switchMap(task => this.projectService.getProjectByGuid(task.pmcProjectGuid))
  )

  constructor(private route: ActivatedRoute, private taskService: AlandaTaskApiService, private projectService: AlandaProjectApiService) {
    super();
    this.connect('task', this.urlTaskId$);
    this.connect('project', this.urlProjectId$);
    this.connect('project', this.fetchProjectByGuid$);
  }


}
