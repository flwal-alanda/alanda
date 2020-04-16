import {Component, Input, ɵmarkDirty} from '@angular/core';
/* import { SelectItem } from 'primeng/api';
 */
import {AlandaTask, AlandaProject, BaseState} from '@alanda-io/alanda-ui';
import {RxState} from 'ngx-rx-state';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

// ComponentState is domain knowledge of the specific component
interface Pane2DummyState extends BaseState {
  title: string,
  id: number,
  name: string
}

const initComponentState: Partial<Pane2DummyState> = {
  title: 'Title Dummy 2'
}

@Component({
  selector: 'pane2-dummy',
  templateUrl: './pane2-dummy.component.html',
  providers: [RxState]
})
export class Pane2DummyComponent {

  @Input()
  set rootFormGroup(rootFormGroup: FormGroup) {
    if (rootFormGroup) {
      // The name of the form group is IDENTICAL with the components selector `@Component({selector: 'pane2-dummy'})`
      rootFormGroup.addControl('pane2-dummy', this.fg);
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
  fg;
  // Model shape  is domain knowledge of the specific component
  fgInitialModel: Partial<Pane2DummyState> = {
    id: 999,
    name: 'Tom'
  }

  constructor(private state: RxState<Pane2DummyState>,
              private fb: FormBuilder) {
    this.state.setState(initComponentState)
    this.initFg(this.fgInitialModel);
  }

  initFg(model: Partial<Pane2DummyState>) {
    this.fg = this.fb.group({
      // Validation is domain knowledge of the specific component
      id: [null, [Validators.required]],
      name: []
    }, {
      validator: [(fg) => fg.get('id').value === fg.get('name').value ? {
        panelLevelValidator2: true
      } : null]
    })
    this.fg.patchValue(model)
  }
}
