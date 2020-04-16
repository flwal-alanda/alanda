import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppSettings } from '../models/appSettings';
import { Observable } from 'rxjs';
import { AlandaTask } from './models/task';
import { catchError } from 'rxjs/operators';
import { AlandaUser } from './models/user';
import { AlandaExceptionHandlingService } from '../services/exceptionHandling.service';
import { ServerOptions } from '../models/serverOptions';
import {ApiSettings} from "../..";

@Injectable({
  providedIn: 'root'
})
export class AlandaTaskApiService {

  private endpointUrl = this.config.API_ENDPOINT + '/pmc-task';

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: ApiSettings ) {

  }

  getTask(taskId: string): Observable<AlandaTask> {
    return this.http.get<AlandaTask>(this.endpointUrl + `/${taskId}`);
  }

  loadTasks(serverOptions: ServerOptions): Observable<AlandaTask[]> {
    return this.http.post<AlandaTask[]>(this.endpointUrl + '/list', serverOptions);
  }

  getCandidates(taskId: string): Observable<AlandaUser[]> {
    return this.http.get<AlandaUser[]>(this.endpointUrl + `/${taskId}` + '/candidates');
  }

  unclaim(taskId: string): Observable<void> {
    return this.http.post<void>(this.endpointUrl + `/${taskId}` + '/unclaim', {});
  }

  assign(taskId: string, userId): Observable<void> {
    return this.http.post<void>(this.endpointUrl + `/${taskId}` + '/assignee', {guid: userId});
  }

  updateTaskDueDate(taskId: string, date: string): Observable<void> {
    return this.http.put<void>(this.endpointUrl + `/${taskId}/dueDate`,date);
  }

  complete(taskId: string): Observable<any> {
    return this.http.post<any>(this.endpointUrl + `/${taskId}/complete`,{});
  }

  updateDueDateOfTask(taskId: string, dueDate: string): Observable<void> {
    return this.http.put<void>(this.endpointUrl  + `/${taskId}/dueDate`, dueDate);
  }

  setVariable(taskId: string, varName: string, data: any): Observable<void> {
    return this.http.put<void>(this.endpointUrl + `/${taskId}/variables/${varName}`, data);
  }

  search(processInstanceId?: string, taskDefinitionKey?: string): Observable<AlandaTask[]> {
    let qParams = '';
    if (processInstanceId) {
      qParams = qParams + `?processInstanceId=${processInstanceId}`;
    }
    if (taskDefinitionKey) {
      qParams = qParams + `?taskDefinitionKey=${taskDefinitionKey}`;
    }
    return this.http.get<AlandaTask[]>(this.endpointUrl + '/search' + qParams);
  }
}
