import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Inject } from '@angular/core';

import { AppComponent } from './app.component';

/**
 * Add here your alanda-common components to test them independently from
 * the client project
 */

import { CalendarModule} from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ALANDA_CONFIG } from './app.settings';
import { AppRoutingModule } from './app-routing.module';
import { AppSettings, APP_CONFIG, ProjectPropertiesServiceNg, ProjectDetailsServiceNg, FormsServiceNg, AlandaCommonModule } from 'projects/alanda-common/src/public_api';
import { HomeComponent } from './components/home/home.component';
import { VacationModule } from './vacation/vacation.module';
import { VacationProjectPropertiesService } from './vacation/services/vacation-projectproperties.service';
import { VacationProjectDetailsService } from './vacation/services/vacation-projectdetails.service';
import { VacationFormsService } from './vacation/services/vacation-forms.service';
import { ReactiveFormsModule, FormControl, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyComponent } from './formly/formly.component';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PrimeNgAutoCompleteComponent } from './formly/customControls/primeng-autocomplete.type';
const CURRENT_CONFIG: AppSettings = ALANDA_CONFIG;

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `Please provide a value bigger than ${err.min - 1}`;
}

export function ipValidationMessage(err, field: FormlyFieldConfig) {
  return `${field.formControl.value} is not a valid IP address}`;
}

export function IpValidator(control: FormControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : {ip: true};
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormlyComponent,
    PrimeNgAutoCompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlandaCommonModule.forRoot(CURRENT_CONFIG),
    MenubarModule,
    CalendarModule,
    ToastModule,
    VacationModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'ip',
          validation: IpValidator
        }
      ],
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required'
        },
        {
          name: 'min',
          message: minValidationMessage
        },
        {
          name: 'ip',
          message: ipValidationMessage
        }
      ],
      types: [
        {
          name: 'primeng-autocomplete',
          component: PrimeNgAutoCompleteComponent,
          wrappers: ['form-field'],
        }
      ]
    }),
    FormlyPrimeNGModule,
    TabViewModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: CURRENT_CONFIG},
    {provide: ProjectPropertiesServiceNg, useClass: VacationProjectPropertiesService},
    {provide: ProjectDetailsServiceNg, useClass: VacationProjectDetailsService},
    {provide: FormsServiceNg, useClass: VacationFormsService},
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(APP_CONFIG) config: AppSettings) {
    console.log("Settings", config);
  }

  ngDoBootstrap() {

  }
}
