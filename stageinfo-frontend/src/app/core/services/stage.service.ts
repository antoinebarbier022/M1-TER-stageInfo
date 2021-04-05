import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StageModel } from '../models/StageModel';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private urlBase: string = 'http://localhost:3000';

  private role:string = 'invite';

  constructor(private httpClient: HttpClient) { }


  /* Récupération de tous les stages */
  getAllStages(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage');
  }

  /* Récupération d'un stage avec son identifiant */
  getStageById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage/'+id);
  }

  /* Ajouter un stage */
  addStage(stage: StageModel) :Observable<any>{
    return this.httpClient.post(this.urlBase+'/api/stage', stage);
  }


  addStageAvecFichier(data:StageModel, pdf: File):Observable<any>{
    const datastage = new FormData();
    datastage.append('data',JSON.stringify(data));
    datastage.append('pdf',pdf,data.titre);
    return this.httpClient.post(this.urlBase+'/api/stage', datastage);
  }

  /* Modifier un stage */
  editStage(id:any, data:StageModel):Observable<any>{
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id, data);
  }

  /* changer l'état d'un stage */
  editState(id:any, state:string, user:any=""):Observable<any>{
    var newState;
    if(state == 'affectEtudiant'){
      newState = {
        etat: state,
        etudiant : user ? user : null,
      };
    }else if(state == 'affectTuteur'){
      newState = {
        etat: state,
        tuteur : user ? user : null,
      };
    }else if(state == 'affectRapporteur'){
      newState = {
        etat: state,
        rapporteur : user ? user : null,
      };
    }else{
      newState = {
        etat: state
      };
    }
    console.log({message:'nouvel etat : ', etat: newState})
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id+'/changement-etat', newState);
  }

  /* Suppression d'un stage avec son identifiant */
  deleteStageById(id:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/stage/'+id);
  }


  editStageWithPdf(id:any, data:StageModel,pdf :File):Observable<any>{
    const datastage = new FormData();
    datastage.append('data',JSON.stringify(data));
    datastage.append('pdf',pdf,data.titre);
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id,datastage );
  }
}
