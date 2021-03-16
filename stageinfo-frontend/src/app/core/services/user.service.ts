import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = 'http://localhost:3000/';

  private role:string = 'admin';

  constructor(private httpClient: HttpClient) { }

  getemailById(id: string | null): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/auth/email/'+id);
  }

  /* Récupération de la liste de tous les utilisateurs */
  getUsers(): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/users');
  }

  /* Récupération de la liste de tous les utilisateurs avec leur identifiant */
  getUserById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/'+id);
  }

}

