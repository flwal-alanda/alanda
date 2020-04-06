import { Routes } from '@angular/router';
import { DummyContainerComponent } from './dummy-container/dummy-container.component';

export const routes: Routes = [
  {path: 'test/:taskId', component: DummyContainerComponent}
];
