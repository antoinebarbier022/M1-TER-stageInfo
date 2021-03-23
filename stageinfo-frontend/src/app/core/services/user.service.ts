import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { userModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    
  }

  /* Ajouter un parcours */
  addUser(user:userModel): void {
    this.httpClient.post(this.urlBase+'/api/auth/signup/', user); 
  }

  getemailById(id: string | null): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/email/'+id);
  }

  getRoleById(id: string | null): Observable<any>{
    return this.httpClient.get(this.urlBase+'api/auth/role/'+id);
  }

  /* Récupération de la liste de tous les utilisateurs */
  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user');
  }

  /* Récupération de la liste de tous les utilisateurs avec leur identifiant */
  getUserById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/'+id);
  }

}

