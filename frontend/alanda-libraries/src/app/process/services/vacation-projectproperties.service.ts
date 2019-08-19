import { Injectable, Type, Component } from "@angular/core";
import { ProjectPropertiesVacationComponent } from "../components/project-properties-vacation/project.properties.vacation.component";

@Injectable()
export class VacationProjectPropertiesService {

  private propertyComponents: Map<string, Type<any>>

  constructor() {
    this.propertyComponents = new Map<string, Type<any>>();
    this.propertyComponents.set('VACATION', ProjectPropertiesVacationComponent);
  }

  getPropsForType(key : string): Type<Component> {
    return this.propertyComponents.get(key);
  }
}