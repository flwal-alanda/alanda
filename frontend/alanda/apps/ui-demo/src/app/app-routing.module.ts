import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import {
  AlandaCreateProjectComponent,
  AlandaGroupManagementComponent,
  AlandaRoleManagementComponent,
  AlandaPermissionManagementComponent,
  AlandaProjectsControllerComponent,
} from '@alanda/common';
import { AlandaFormsControllerComponent } from '@alanda/common';
import { PermissionsDemoComponent } from './components/permissions-demo/permissions-demo.component';
import { UserManagementContainerComponent } from './features/usermgmt/user-management-container/user-management-container.component';
import { AlandaProjectMonitorComponent } from './views/project-monitor/project-monitor.component';
import { AlandaTaskListComponent } from './views/task-list/task-list.component';
import { UserEnrichedProjectsControllerComponent } from './components/projects-controller/user-enriched-projects-controller.component';
import { ProjectsAndProcessesDemoComponent } from './components/projects-and-processes-demo/projects-and-processes-demo.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'admin/users',
    component: UserManagementContainerComponent,
    data: { title: 'Admin User' },
  },
  {
    path: 'admin/groups',
    component: AlandaGroupManagementComponent,
    data: { title: 'Admin Groups' },
  },
  {
    path: 'admin/roles',
    component: AlandaRoleManagementComponent,
    data: { title: 'Admin Roles' },
  },
  {
    path: 'admin/permissions',
    component: AlandaPermissionManagementComponent,
    data: { title: 'Admin Permissions' },
  },
  {
    path: 'admin/permissions-demo',
    component: PermissionsDemoComponent,
    data: { title: 'Admin Permissions Demo' },
  },
  {
    path: 'create/project',
    component: AlandaCreateProjectComponent,
    data: { title: 'Create Project' },
  },
  {
    path: 'create/project/:projectGuid',
    component: AlandaCreateProjectComponent,
  },
  {
    path: 'monitor/projects',
    component: AlandaProjectMonitorComponent,
    data: { title: 'Projects' },
  },
  {
    path: 'tasks/list',
    component: AlandaTaskListComponent,
    data: { title: 'Tasks' },
  },
  {
    path: 'forms',
    children: [
      {
        path: 'vacation',
        component: AlandaFormsControllerComponent,
        loadChildren: () =>
          import('./features/vacation/vacation.module').then(
            (m) => m.VacationModule,
          ),
      },
    ],
  },
  {
    path: 'projectdetails/:projectId',
    component: UserEnrichedProjectsControllerComponent,
    children: [
      {
        path: 'vacation',
        loadChildren: () =>
          import('./features/vacation/vacation.module').then(
            (m) => m.VacationModule,
          ),
      },
    ],
  },
  {
    path: 'projectdetails/:projectId',
    component: ProjectsAndProcessesDemoComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
