import { Component } from '@angular/core';
import { FormsRegisterService, AlandaTaskTemplateComponent } from "projects/alanda-common/src/public_api";

@Component({
  selector: 'lib-accept',
  templateUrl: './accept.component.html',
  styleUrls: [],
  providers: [FormsRegisterService]
})

export class AcceptComponent extends AlandaTaskTemplateComponent {
  constructor(formsRegisterService: FormsRegisterService){
  super(formsRegisterService);
  }


}
