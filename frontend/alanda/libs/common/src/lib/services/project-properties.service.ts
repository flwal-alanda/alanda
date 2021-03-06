import { Injectable, Type } from '@angular/core';
import { Component } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class AlandaProjectPropertiesService {
  private readonly propertyComponents: Map<string, Type<any>>;

  constructor() {
    this.propertyComponents = new Map<string, Type<any>>();
  }

  getPropsForType(key: string): Type<Component> {
    return this.propertyComponents.get(key);
  }

  addPropsForType(key: string, propertyComponent: Type<any>): void {
    this.propertyComponents.set(key, propertyComponent);
  }
}
