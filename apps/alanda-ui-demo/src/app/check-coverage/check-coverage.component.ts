import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppStateService} from '../app-state.service';
import {filter, map, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {RxState} from "ngx-rx-state";
import {BaseState} from "@alanda-io/alanda-ui";
import {
  FormManagerService,
  FormManagerState
} from "../../../../../libs/alanda-ui/src/lib/form-base/form-manager.service";
import {rootLevelValidator1} from "./validators/root-level-one.validator";
import {Observable} from "rxjs";
import {BaseFormComponent} from "../../../../../libs/alanda-ui/src/lib/form-base/base-form.component.interface";

interface CheckCoverageStateState extends FormManagerState {
  title: string;
}

@Component({
  selector: 'alanda-io-form-container',
  templateUrl: './check-coverage.component.html',
  providers: [FormManagerService]
})
export class CheckCoverageComponent implements BaseFormComponent, AfterViewInit {

  title = 'Coverage Form';
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
