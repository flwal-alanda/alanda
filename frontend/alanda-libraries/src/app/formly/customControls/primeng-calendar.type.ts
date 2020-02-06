import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template : `
  <p-calendar [placeholder]="to.placeholder"
      [class.ng-dirty]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field">
    </p-calendar>`
})
export class PrimeNgCalendarComponent extends FieldType {

}
