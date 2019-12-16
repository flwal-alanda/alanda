import { Injectable, Inject } from "@angular/core";
import { AppSettings, APP_CONFIG } from "../../models/AppSettings";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { PmcUser } from "../../models/PmcUser";
import { ListResult } from "../../models/ListResult";
import { PmcGroup } from "../../models/PmcGroup";
import { PmcPermission } from "../../models/PmcPermission";
import { PmcRole } from "../../models/PmcRole";
import { tap, catchError } from 'rxjs/operators';
import { ExceptionHandlingService } from "../exceptionHandling.service";


@Injectable({
  providedIn: 'root'
})
export class PmcUserServiceNg extends ExceptionHandlingService{

  private endpointUrl : string;
  public user$: BehaviorSubject<PmcUser> = new BehaviorSubject(null);


  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) config: AppSettings) {
    super();
    this.endpointUrl = config.API_ENDPOINT + "/user";
  }

  getUsers(serverOptions: any): Observable<ListResult<PmcUser>> {
    return this.http.post<ListResult<PmcUser>>(`${this.endpointUrl}/repo`, serverOptions).pipe(catchError(this.handleError<ListResult<PmcUser>>('getUsers')));
  }

  getUser(guid: number): Observable<PmcUser> {
    return this.http.get<PmcUser>(`${this.endpointUrl}/repo/${guid}`).pipe(catchError(this.handleError<PmcUser>('getUser')));
  }

  getUserByLogin(login: string): Observable<PmcUser> {
    return this.http.get<PmcUser>(`${this.endpointUrl}/single/${login}`).pipe(catchError(this.handleError<PmcUser>('getUserByLogin')));
  }

  updateUser(user: PmcUser): Observable<any> {
    return this.http.put<any>(`${this.endpointUrl}/repo/update`, user).pipe(catchError(this.handleError<any>('updateUser')));
  }

  save(user: PmcUser): Observable<any> {
    return this.http.post<PmcUser>(`${this.endpointUrl}/repo/create`, user).pipe(catchError(this.handleError<any>('save')));
  }

  getEffectiveRolesForUser(userGuid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpointUrl}/roles/effective/${userGuid}`).pipe(catchError(this.handleError<any[]>('getEffectiveRolesForUser')));
  }

  updateRolesForUser(userGuid: number, roles: PmcRole[]): Observable<any> {
    return this.http.put<any>(`${this.endpointUrl}/roles/update/${userGuid}`, roles).pipe(catchError(this.handleError<PmcRole[]>('updateRolesForUser')));
  }

  getGroupsForUser(login: string): Observable<PmcGroup[]> {
    return this.http.get<PmcGroup[]>(`${this.endpointUrl}/groups/${login}`).pipe(catchError(this.handleError<PmcGroup[]>('getGroupsForUser')));
  }

  getEffectivePermissionsForUser(userGuid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpointUrl}/permissions/effective/${userGuid}`).pipe(catchError(this.handleError<any[]>('getEffectivePermissionsForUser')));
  }

  updatePermissionsForUser(userGuid: number, permissions: PmcPermission[]): Observable<any> {
    return this.http.put<any>(`${this.endpointUrl}/permissions/update/${userGuid}`, permissions).pipe(catchError(this.handleError<PmcPermission[]>('updatePermissionsForUser')));
  }

  getCurrentUser(): Observable<PmcUser> {
    return this.http.get<PmcUser>(`${this.endpointUrl}/current`).pipe(
      catchError(this.handleError<PmcUser>('getCurrentUser')),
      tap((user) => {
        this.user$.next(user);
      })
    );
  }

  runAsUser(userName: string): Observable<PmcUser> {
    return this.http.post<PmcUser>(`${this.endpointUrl}/runas/${userName}`,{}).pipe(
        catchError(this.handleError<PmcUser>('runAsUser')),
        tap((user) => {
          this.user$.next(user);
        })
    );
  }

  releaseRunAs(): Observable<PmcUser> {
    return this.http.post<PmcUser>(`${this.endpointUrl}/release`,{}).pipe(
        catchError(this.handleError<PmcUser>('releaseRunAs')),
        tap((user) => {
          this.user$.next(user);
        })
    );
  }

  getUsersByGroupId(groupId: number): Observable<PmcUser[]> {
    return this.http.get<PmcUser[]>(`${this.endpointUrl}/repo/getUsersByGroupId/${groupId}`).pipe(catchError(this.handleError<PmcUser[]>('runAsUser')));
  }

  getUsersForRole(roleId: number): Observable<PmcUser[]> {
    return this.http.get<PmcUser[]>(`${this.endpointUrl}/role/${roleId}`).pipe(catchError(this.handleError<PmcUser[]>('getUsersForRole')));
  }

}
