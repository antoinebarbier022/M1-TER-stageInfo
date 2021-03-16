import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string | undefined;
  userId: string | undefined;

  constructor(private router: Router,
              private http: HttpClient) {}

  createNewUser(nom: string, prenom: string, email: string, password: string, rolee: string, numeroEtudiant: string, Promotion: string, idParcours: string, Fax: string, telephone: string, fonction: string, identreprise: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signup',
        { nom: nom,prenom: prenom,email: email, password: password, rolee: rolee,numeroEtudiant: numeroEtudiant,idParcours: idParcours,Fax: Fax,telephone:telephone,fonction:fonction,identreprise:identreprise })
        .subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData:any) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isAuth$.next(true);
            if (typeof this.token === "string") {
              sessionStorage.setItem('JWT_TOKEN', this.token);
            }
            if (typeof this.userId === "string") {
              sessionStorage.setItem('userid', this.userId);
            }
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getJwtToken() {
    return sessionStorage.getItem('JWT_TOKEN');
  }
  getUserid(){
    return sessionStorage.getItem('userid');

  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }
  logout() {
    this.isAuth$.next(false);
    sessionStorage.removeItem('JWT_TOKEN');
    sessionStorage.removeItem('userid')
    this.userId = '';
    this.token = '';
  }
}
