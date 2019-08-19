import { NgModule } from "@angular/core";
import { ProjectPropertiesVacationComponent } from "./process/components/project-properties-vacation/project.properties.vacation.component";
import { VacationProjectDetailsComponent } from "./process/vacation-project-details.component";
import { CheckVacationRequestComponent } from "./process/forms/check-vacation-request.component";
import { InformSubstituteComponent } from "./process/forms/inform-substitute.component";
import { ModifyVacationRequestComponent } from "./process/forms/modify-vacation-request.component";
import { PrepareVacationRequestComponent } from "./process/forms/prepare-vacation-request.component";
import { PerformHandoverActivitiesComponent } from "./process/forms/perform-handover-activities.component";
import { VacationFormsService } from "./process/services/vacation-forms.service";
import { VacationProjectPropertiesService } from "./process/services/vacation-projectproperties.service";
import { ProjectDetailsServiceNg, ProjectPropertiesServiceNg, FormsServiceNg } from "projects/alanda-common/src/public_api";

@NgModule({
    declarations: [
      ProjectPropertiesVacationComponent,
      VacationProjectDetailsComponent,
      CheckVacationRequestComponent,
      InformSubstituteComponent,
      ModifyVacationRequestComponent,
      PerformHandoverActivitiesComponent,
      PrepareVacationRequestComponent
    ],
    providers: [
      { provide: ProjectDetailsServiceNg, useClass: VacationProjectDetailsComponent},
      { provide: FormsServiceNg, useClass: VacationFormsService},
      { provide: ProjectPropertiesServiceNg, useClass: VacationProjectPropertiesService},
    ],
  })
  export class VacationModule {

  } 