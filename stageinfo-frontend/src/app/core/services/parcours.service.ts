import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  private urlBase: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  /* Récupération de tous les parcours */
  getAllParcours(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/parcours');
  }

  /* Récupération d'un parcours avec son identifiant */
  getParcoursById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/parcours/'+id);
  }
  
  /* Suppression d'un parcours avec son identifiant */
  deleteParcoursById(id:any): Observable<any>{
      return this.httpClient.delete(this.urlBase+'/api/parcours/'+id);
  }

}
