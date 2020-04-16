import {Component, Input} from '@angular/core';
/* import { SelectItem } from 'primeng/api';
 */
import {AlandaTask, AlandaProject, BaseState} from '@alanda-io/alanda-ui';
import {RxState} from 'ngx-rx-state';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// ComponentState is domain knowledge of the specific component
interface Pane1DummyState extends BaseState {
  title: string,
  id: number,
  street: string
}

const initComponentState: Partial<Pane1DummyState> = {
  title: 'Title Dummy 1'
}

@Component({
  selector: 'pane1-dummy',
  templateUrl: './pane1-dummy.component.html',
  providers: [RxState]
})
export class Pane1DummyComponent {

  @Input()
  set rootFormGroup(rootFormGroup: FormGroup) {
    if (rootFormGroup) {
      // The name of the form group is IDENTICAL with the components selector `@Component({selector: 'pane2-dummy'})`
      rootFormGroup.addControl('pane1-dummy', this.fg)
    }
  }


  @Input()
  set project(project: AlandaProject) {
    this.state.setState({project});
  }

  @Input()
  set task(task: AlandaTask) {
    this.state.setState({task});
  }

  state$ = this.state.select();
  // Form controls are domain knowledge of the specific component
  fg = this.fb.group({
    // Validation is domain knowledge of the specific component
    id: [null, [Validators.required]],
    street: []
  }, {
    validator: [(fg) => fg.get('id').value === fg.get('street').value ? {
      panelLevelValidator1: true
    } : null]
  });
  // Model shape  is domain knowledge of the specific component
  fgInitialModel: Partial<Pane1DummyState> = {
    id: 999,
    street: 'Main street'
  }

  /*  items: SelectItem[]; */

  constructor(private state: RxState<Pane1DummyState>,
              private fb: FormBuilder) {
    this.state.setState(initComponentState)
    this.initFg(this.fgInitialModel);
  }

  initFg(model: Partial<Pane1DummyState>) {
    this.fg.patchValue(model)
  }
}
