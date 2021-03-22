import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  private userRole: string = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.userService.getRoleById(this.authService.getUserid()).subscribe(role => {
      this.userRole = role;
    });
  }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }else{
      this.authService.isAuth$.next(true);
    } 

    console.log(this.userRole);

    return this.authService.isLoggedIn();
    
    /*
    !this.authService.isLoggedIn()? this.router.navigate(['/login']) : this.authService.isAuth$.next(true);

    console.log('here : ' + this.userRole);

    return this.userRole !== 'admin'? this.router.parseUrl('not-found') : true;
    */
    
    
  }
}
