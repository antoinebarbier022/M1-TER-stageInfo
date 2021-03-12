import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: string | undefined | null;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.getJwtToken()){
      this.authToken = this.auth.getJwtToken();
      this.auth.isAuth$.next(true)
    }else{this.authToken = this.auth.token}
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authToken)
    });
    return next.handle(newRequest);
  }
}
