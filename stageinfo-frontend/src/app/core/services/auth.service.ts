import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import jwtDecode from 'jwt-decode';
import { IToken } from '../../shared/interfaces/itoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string | undefined;
  userId: string | undefined;

  private role:any; // le vrai role de l'utilisateur
  private viewRole:any; // Pour le changement de role dans le header
  private viewAllRoute: boolean; // pour savoir si la sidebar affiche toutes les routes que voit un admin

  constructor(private router: Router,
              private http: HttpClient) {
    
    //const decodedToken = jwtDecode<IToken>(this.getJwtToken() || '');
    //this.role = decodedToken.role;
    this.viewRole = this.role;
    this.viewAllRoute = false;
  }

  getViewAllRoute():boolean{
    return this.viewAllRoute;
  }

  changeViewAllRoute(){
    this.viewAllRoute = !this.viewAllRoute;
  }

  getRole(): string {
    return this.role;
  }

  getViewRole(): string {
    return this.viewRole;
  }

  setViewRole(newRole: string ){
    if(['admin', 'invite', 'etudiant','secretaire','respParcours','repEntreprise','tuteur'].includes(newRole)){
      this.viewRole = newRole;
    }
  }

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
            this.isAuth$.next(true);
            this.userId = authData.userId;
            if (typeof this.token === "string") {
              sessionStorage.setItem('JWT_TOKEN', this.token);
            }
            if (typeof this.userId === "string") {
              sessionStorage.setItem('userid', this.userId);
            }
            // On set le role quand on se connect (seulement le role visuel car meme si on change se role, le role inscrit dans le token ne peut pas être modifier par l'utilisateur)
            const decodedToken = jwtDecode<IToken>(this.token || '');
            this.role = decodedToken.role;
            this.viewRole = this.role;
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
    return !!this.getJwtToken() && !!this.getUserid();
  }
  logout() {
    this.userId = '';
    this.token = '';
    this.role = '';
    this.viewRole = '';
    sessionStorage.removeItem('JWT_TOKEN');
    sessionStorage.removeItem('userid')
    this.viewAllRoute = false;
    this.isAuth$.next(false);
  }
}
