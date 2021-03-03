import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return new Observable(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.router.navigate(['/login']);// renvoyer vers login
            }
            observer.next(true);
          }
        );
      }
    );
  }
}

