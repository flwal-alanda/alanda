import { Injectable, Type } from "@angular/core";
import { Component } from "@angular/compiler/src/core";

@Injectable()
export class FormsServiceNg {

  private propertyComponents: Map<string, Type<any>>

  constructor() {
  }

  getFormByKey(key : string): Type<Component> {
    return this.propertyComponents.get(key);
  }
}