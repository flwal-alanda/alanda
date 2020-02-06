import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
template: `
<p-panel>
  <p-header>
  {{to.label}}
  </p-header>
  <ng-container #fieldComponent></ng-container>
</p-panel>
`,
})
export class PanelWrapperComponent extends FieldWrapper {
}
