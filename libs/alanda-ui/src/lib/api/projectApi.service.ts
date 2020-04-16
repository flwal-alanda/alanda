import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG, AppSettings } from '../models/appSettings';
import { AlandaProject } from './models/project';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerOptions } from '../models/serverOptions';
import { AlandaListResult } from './models/listResult';
import { AlandaProcess } from './models/process';
import { AlandaProjectType } from './models/projectType';

@Injectable({
  providedIn: 'root'
})
export class AlandaProjectApiService {

    private endpoint = this.config.API_ENDPOINT + '/project';

    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppSettings) {

    }

    public getProjectByGuid(guid: number, tree: boolean  = false): Observable<AlandaProject> {
      const params = new HttpParams().set('tree', '' + tree);
      return this.http.get<AlandaProject>(`${this.endpoint}/guid/${guid}`, {params: params});
    }

    public getProjectByProjectId(id: string): Observable<AlandaProject> {
        return this.http.get<AlandaProject>(`${this.endpoint}/${id}`);
    }

    public loadProjects(serverOptions: ServerOptions): Observable<AlandaListResult<AlandaProject>> {
        return this.http.post<AlandaListResult<AlandaProject>>(`${this.endpoint}/projectsel`, serverOptions);
    }

    public updateProject(project): Observable<AlandaProject> {
        return this.http.put<AlandaProject>(`${this.endpoint}/${project.projectId}`, project);
    }

    public getProjectMainProcess(projectGuid: number): Observable<AlandaProcess> {
        return this.http.get<AlandaProcess>(`${this.endpoint}/project/${projectGuid}/mainprocess`);
    }

    public searchCreateAbleProjectType(searchTerm?: string): Observable<AlandaProjectType[]> {
        let params = new HttpParams();
        if (searchTerm) {
          params = params.set('search', searchTerm);
        } else {
            params = params.set('search', '');
        }
        return this.http.get<AlandaProjectType[]>(`${this.endpoint}/createabletype`, {params: params});
    }

    public getProjectTypeByName(name): Observable<AlandaProjectType> {
        return this.http.get<AlandaProjectType>(`${this.endpoint}/project-type-by-name/${name}`);
    }

    public createProject(project: AlandaProject): Observable<AlandaProject> {
        return this.http.post<AlandaProject>(`${this.endpoint}/create`, project);
    }

    public getProjectTreeByGuid(guid: number): Observable<AlandaProject> {
        return this.http.get<AlandaProject>(`${this.endpoint}/guid/${guid}?tree=true`);
    }

    public getProcessesAndTasksForProject(guid: number): Observable<Map<string, any>> {
        return this.http.get<Map<string, any>>(`${this.endpoint}/project/${guid}/processes-and-tasks`);
    }
}


