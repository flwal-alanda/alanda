import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template : `
  <p-autoComplete
    [formControl]="formControl"
    [suggestions]="to.options"
    [dropdown]="true"
    (completeMethod)="to.change($event)">
  </p-autoComplete>`
})
export class PrimeNgAutoCompleteComponent extends FieldType {

}
