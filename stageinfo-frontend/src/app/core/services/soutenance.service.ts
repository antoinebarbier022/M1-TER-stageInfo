import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  private urlBase: string = 'http://localhost:3000';

  private role:string = 'invite';

  constructor(private httpClient: HttpClient) { }

  setRole(newRole: string){
    if(['admin', 'invite', 'etudiant','secretaire','respParcours','repEntreprise','tuteur'].includes(newRole)){
      this.role = newRole;
    }
  }

  getAllSoutenances(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/soutenance');
  }

  getSoutenanceById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/soutenance/'+id);
  }

  deleteSoutenanceById(id:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/soutenance/'+id);
  }
}
