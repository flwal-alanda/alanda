import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppStateService} from '../app-state.service';
import {filter, map, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {RxState} from "ngx-rx-state";
import {BaseState} from "@alanda-io/alanda-ui";
import {FormManagerService} from "../../../../../libs/alanda-ui/src/lib/form-base/form-manager.service";
import {rootLevelValidator1} from "../check-coverage/validators/root-level-one.validator";


interface FormContainerState extends BaseState {
  afterViewInit: boolean;
  rootForm: { [controlName: string]: any }
}

const initFormContainerState = {
  afterViewInit: false,
  rootForm: {}
}

@Component({
  selector: 'alanda-io-form-container',
  templateUrl: './prepare-event-request.component.html',
  providers: [RxState]
})
export class PrepareEventRequestComponent implements AfterViewInit {

  title = 'Prepare Event Form';
  state$ = this.formManagerService.state$;
  rootForm = this.formManagerService.rootForm;

  constructor(private formManagerService: FormManagerService) {

  }

  ngAfterViewInit(): void {
    this.formManagerService.addValidators([rootLevelValidator1]);
  }

  submit(): void {
    // Component specific logic here
    this.formManagerService.submit();
  }
}
