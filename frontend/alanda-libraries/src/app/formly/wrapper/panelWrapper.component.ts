import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'formly-wrapper-panel',
template: `
<p-panel>
  <p-header>
  {{to.label}}
  </p-header>
</p-panel>
   <h3 class="card-header">{{ to.label }}</h3>
   <div class="card-body">
     <ng-container #fieldComponent></ng-container>
   </div>
 </div>
`,
})
export class PanelWrapperComponent extends FieldWrapper {
}
