import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {catchError} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: string | undefined | null;


  constructor(private auth: AuthService) {}
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      this.auth.logout();
      return of(err.message);
    }
    return throwError(err);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.getJwtToken()){
      this.authToken = this.auth.getJwtToken();
    }else{this.authToken = this.auth.token}
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authToken)
    });
    return next.handle(newRequest).pipe(catchError(x=> this.handleAuthError(x)));;

  }

}
