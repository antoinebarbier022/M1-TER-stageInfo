import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  role: string;
  userId: string;

  constructor(private router: Router,
              private http: HttpClient) {}


  login(email: string, password: string) {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email, password})
        .pipe(map(user => {
            this.token = user.;
            this.userId = user.userId;
            this.isAuth$.next(true);
            return user;
        }));
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
