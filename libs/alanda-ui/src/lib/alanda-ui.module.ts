import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { AppSettings } from './models/appSettings';

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
      ngModule: AlandaUiModule
    }
  }
}
