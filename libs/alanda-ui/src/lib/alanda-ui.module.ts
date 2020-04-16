import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import {APP_CONFIG, AppSettings} from './models/appSettings';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {GeneralInterceptor} from "./api/geleral.insercepter";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class AlandaUiModule {
  public static forRoot(config: AppSettings): ModuleWithProviders {
    return {
      ngModule: AlandaUiModule,
      providers: [
        {provide: APP_CONFIG, useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true}
      ]
    }
  }
}
