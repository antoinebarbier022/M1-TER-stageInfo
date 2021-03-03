import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private urlBase: string = 'http://localhost:3000/';

  private role:string = 'invite';

  constructor(private httpClient: HttpClient) { }
  getRole(): string {
    return this.role;
  }

  setRole(newRole: string ){
    if(['admin', 'invite', 'etudiant','secretaire','respParcours','repEntreprise','tuteur'].includes(newRole)){
      this.role = newRole;
    }
  }

  getStages(): Observable<any> {
    return this.httpClient.get(this.urlBase+'api/stage');
  }
}
