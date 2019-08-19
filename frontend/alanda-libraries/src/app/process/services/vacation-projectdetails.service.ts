import { Injectable, Type, Component } from "@angular/core";
import { VacationProjectDetailsComponent } from "../vacation-project-details.component";

@Injectable()
export class VacationProjectDetailsService {

  private propertyComponents: Map<string, Type<any>>

  constructor() {
    this.propertyComponents = new Map<string, Type<any>>();
    this.propertyComponents.set('VACATION', VacationProjectDetailsComponent);
  }

  getPropsForType(key : string): Type<Component> {
    return this.propertyComponents.get(key);
  }
}