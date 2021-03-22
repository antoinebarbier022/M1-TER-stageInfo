import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import decode, { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';

interface IToken {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  private auth: AuthService;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.auth = authService;
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }else{
      this.authService.isAuth$.next(true);
    } 

    const token = this.auth.getJwtToken();
    const decodedToken = jwtDecode<IToken>(token || '');

    console.log('THIS : ');
    console.log(decodedToken.role);

    return this.authService.isLoggedIn();
    
    /*
    !this.authService.isLoggedIn()? this.router.navigate(['/login']) : this.authService.isAuth$.next(true);

    console.log('here : ' + this.userRole);

    return this.userRole !== 'admin'? this.router.parseUrl('not-found') : true;
    */
    
    
  }
}
