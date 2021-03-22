import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode, { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { IToken } from '../../shared/interfaces/itoken';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  private auth: AuthService;

  constructor(authService: AuthService){
    this.auth = authService;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      const decodedToken = jwtDecode<IToken>(this.auth.getJwtToken() || '');
      console.log('HERE : ' + decodedToken.role);
  
     
      
      /*
      !this.authService.isLoggedIn()? this.router.navigate(['/login']) : this.authService.isAuth$.next(true);
  
      console.log('here : ' + this.userRole);
  
      return this.userRole !== 'admin'? this.router.parseUrl('not-found') : true;
      */

    return true;
  }
  
}
