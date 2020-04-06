import { Component, Input } from '@angular/core';
/* import { SelectItem } from 'primeng/api';
 */import { AlandaTask, AlandaProject, BaseState } from '@alanda-io/alanda-ui';
import { RxState } from 'ngx-rx-state';

interface PrepareVacationRequestState extends BaseState {}

@Component({
    selector: 'prepare-vacation-request',
    templateUrl: './prepare-vacation-request.component.html',
    providers: [RxState]
  })
  export class PrepareVacationRequestComponent  {

    @Input()
    set project(project: AlandaProject) {
      this.state.setState({project});
    }

    @Input()
    set task(task: AlandaTask) {
      this.state.setState({task});
    }

   /*  items: SelectItem[]; */

    constructor(private state: RxState<PrepareVacationRequestState>) {
     /*  this.items = [
        {label: 'Yes', value: true},
        {label: 'No', value: false}
      ]; */
    }
  }
