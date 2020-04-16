import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {EMPTY, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export class GeneralInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorResp: HttpErrorResponse) => {
        if(errorResp.status === 500) {
          console.error(errorResp);
          return EMPTY;
        }
        return throwError(errorResp)
      })
    );
  }

}
