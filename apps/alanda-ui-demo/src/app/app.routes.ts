import { Routes } from '@angular/router';
import { PrepareEventRequestComponent } from './prepare-event-request/prepare-event-request.component';
import {CheckCoverageComponent} from "./check-coverage/check-coverage.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: PrepareEventRequestComponent},
  {path: 'prepare/:taskId', component: PrepareEventRequestComponent},
  {path: 'coverage/:taskId', component: CheckCoverageComponent}
];
