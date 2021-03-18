import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private urlBase: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  /* Récupération de toutes les entreprises */
  getAllEntreprises(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/entreprise');
  }

  /* Récupération d'une entreprise avec son identifiant */
  getEntrepriseById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/entreprise/'+id);
  }
  
  /* Suppression d'une entreprise avec son identifiant */
  deleteEntrepriseById(id:any): Observable<any>{
      return this.httpClient.delete(this.urlBase+'/api/entreprise/'+id);
  }

}
