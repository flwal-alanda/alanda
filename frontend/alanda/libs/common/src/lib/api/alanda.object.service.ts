import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {APP_CONFIG, AppSettings} from "../../lib/models/appSettings";
import {AlandaObject} from "./models/alanda.object";
import {AlandaExceptionHandlingService} from "../services/exceptionHandling.service";

@Injectable({
  providedIn: "root"
})
export class AlandaObjectServiceNg extends AlandaExceptionHandlingService {
  apiEndpointUrl: string;

  constructor(
    @Inject(APP_CONFIG) config: AppSettings,
    private httpClient: HttpClient,
  ) {
    super();
    this.apiEndpointUrl = config.API_ENDPOINT + '/object';
  }

  getAll(): Observable<AlandaObject[]> {
    const reqUrl = `${this.apiEndpointUrl}/all`;
    return this.httpClient
      .get<AlandaObject[]>(reqUrl)
      .pipe(catchError(this.handleError<AlandaObject[]>('getAll')));
  }

  getAllByTypeName(typeName: string): Observable<AlandaObject[]> {
    const reqUrl = `${this.apiEndpointUrl}/all/${typeName}`;
    return this.httpClient
      .get<AlandaObject[]>(reqUrl)
      .pipe(catchError(this.handleError<AlandaObject[]>('getAllByTypeName')));
  }

  createAlandaObject(alandaObject: AlandaObject): Observable<AlandaObject> {
    const reqUrl = `${this.apiEndpointUrl}/create/`;
    return this.httpClient
      .post(reqUrl, alandaObject,)
      .pipe(catchError(this.handleError('createAlandaObject')));
  }

  updateAlandaObject(alandaObject: AlandaObject): Observable<AlandaObject> {
    const reqUrl = `${this.apiEndpointUrl}/update`;
    return this.httpClient
      .put(reqUrl, alandaObject,)
      .pipe(catchError(this.handleError('createAlandaObject')));
  }
}
