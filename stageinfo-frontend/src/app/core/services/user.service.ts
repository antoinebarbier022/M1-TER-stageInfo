import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { userModel } from '../models/userModel';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",	  
    "Access-Control-Allow-Headers": "Content-type",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    
  }

  addUser(user: userModel): Observable<any> {
    return this.httpClient.post(this.urlBase+'api/auth/signup', user); 
  }

  updateUser(id: any, user: userModel): Observable<any> {
    return this.httpClient.put(this.urlBase+'api/auth/' + id, user); 
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

