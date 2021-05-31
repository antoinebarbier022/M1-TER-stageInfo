import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocalisationService{

  

  constructor(private httpClient: HttpClient) { }

  getInfoAdresse(adresse:string): Observable<any> {
    return this.httpClient.get('api/localisation'+adresse, httpOptions);
  }
}
