import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private urlBase: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }


  getStages(): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/stage');
  }
}
