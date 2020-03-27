import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserManagementComponent, CreateProjectComponent, ProjectMonitorComponent, TasklistComponent, AttachmentsComponent, GroupManagementComponent, 
  RoleManagementComponent, PermissionManagementComponent, CommentsComponent, FormsControllerComponent, ProjectsControllerComponent } from 'projects/alanda-common/src/public-api';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'create/project', component: CreateProjectComponent },
  { path: 'monitor/projects', component: ProjectMonitorComponent },
  { path: 'tasks/list', component: TasklistComponent },
  { path: 'attachment', component: AttachmentsComponent },
  { path: 'admin/groups', component: GroupManagementComponent },
  { path: 'admin/roles', component: RoleManagementComponent },
  { path: 'admin/permissions', component: PermissionManagementComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'forms/:formKey/:taskId', component: FormsControllerComponent },
  { path: 'projectdetails/:projectId', component: ProjectsControllerComponent },
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
