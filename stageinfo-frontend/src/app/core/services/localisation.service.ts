import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class localisationService{
  constructor(private httpClient: HttpClient) { }
  getInfoadresse(adresse:string): Observable<any> {
    return this.httpClient.get('https://api-adresse.data.gouv.fr/search/?q='+adresse);
  }
}
