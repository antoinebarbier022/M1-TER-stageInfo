import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private urlBase: string = 'http://localhost:3000';

  private role:string = 'invite';

  constructor(private httpClient: HttpClient) { }

  setRole(newRole: string){
    if(['admin', 'invite', 'etudiant','secretaire','respParcours','repEntreprise','tuteur'].includes(newRole)){
      this.role = newRole;
    }
  }

  /* Récupération de tous les stages */
  getAllStages(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage');
  }

  /* Récupération d'un stage avec son identifiant */
  getStageById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage/'+id);
  }

}
