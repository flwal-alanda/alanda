import { Injectable, Type, Component } from "@angular/core";
import { PrepareVacationRequestComponent } from "../forms/prepare-vacation-request.component";
import { CheckVacationRequestComponent } from "../forms/check-vacation-request.component";
import { ModifyVacationRequestComponent } from "../forms/modify-vacation-request.component";
import { PerformHandoverActivitiesComponent } from "../forms/perform-handover-activities.component";
import { InformSubstituteComponent } from "../forms/inform-substitute.component";

@Injectable()
export class VacationFormsService{

  private propertyComponents: Map<string, Type<any>>

  constructor() {
    this.propertyComponents = new Map<string, Type<any>>();
    this.propertyComponents.set('vacation.prepare-vacation-request', PrepareVacationRequestComponent);
    this.propertyComponents.set('vacation.check-vacation-request', CheckVacationRequestComponent);
    this.propertyComponents.set('vacation.modify-vacation-request', ModifyVacationRequestComponent);
    this.propertyComponents.set('vacation.perform-handover-activities', PerformHandoverActivitiesComponent);
    this.propertyComponents.set('vacation.inform-substitute', InformSubstituteComponent);
  }

  getFormByKey(key : string): Type<Component> {
    return this.propertyComponents.get(key);
  }

}