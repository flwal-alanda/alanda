import { Component } from '@angular/core';
import { AlandaTaskComponent, AlandaFormsRegisterService,
         AlandaProjectApiService,
         AlandaTaskApiService} from 'projects/alanda-common/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'default-task',
    templateUrl: './default-task-template.component.html',
    styleUrls: [],
  })
export class DefaultTaskComponent extends AlandaTaskComponent {

  constructor(formsRegisterService: AlandaFormsRegisterService, route: ActivatedRoute, taskService: AlandaTaskApiService,
              projectService: AlandaProjectApiService) {
    super(formsRegisterService, route, taskService, projectService);
  }

}