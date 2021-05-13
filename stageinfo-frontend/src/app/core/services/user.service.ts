import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/UserModel';

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

  /* Récupération de la liste de tous les utilisateurs */
  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user');
  }

  /* Récupération de la liste de tous les utilisateurs avec leur identifiant */
  getUserById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/'+id);
  }

  addUser(user: UserModel): Observable<any> {
    return this.httpClient.post(this.urlBase+'api/user', user);
  }

  updateUser(id: any, user: UserModel): Observable<any> {
    return this.httpClient.put(this.urlBase+'api/auth/' + id, user);
  }

  deleteUserById(id: any){
    return this.httpClient.delete(this.urlBase+'api/user/'+id);
  }

  getAllUserByRole(role: string): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/role/'+role);
  }

  getemailById(id: string | null): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/user/email/'+id);
  }

  getRoleById(id: string | null): Observable<any>{
    return this.httpClient.get(this.urlBase+'api/auth/role/'+id);
  }




}

