import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StageService } from 'src/app/core/services/stage.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';
import { ActivatedRoute } from '@angular/router';
import { StageModel } from 'src/app/core/models/StageModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { EtatStage } from 'src/app/core/enums/EtatStage';
import { RoleUser } from 'src/app/core/enums/RoleUser';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent extends CommonListingTable implements OnInit {
  
  public readonly title: string = "Liste des stages";

  destroy$: Subject<boolean> = new Subject<boolean>();
  selectItem:any; // item qui est selectionn√© 

  constructor(private route:ActivatedRoute, 
    private stageService: StageService,
    private authService:AuthService) {
    super();
    this.visibleProperties = [
      { name: 'etat',sorted: false },
      { name: 'titre', sorted: false },
      { name: 'entreprise.nom',sorted: false },
      { name: 'parcours.acronyme',sorted: false },
      { name: 'duree',sorted: false },

    ];
    this.selectItem = new StageModel();
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.allStages;
  }

  getPromotion(dateDebut: string): String{
    var annee1 = Number(new Date(dateDebut).getFullYear().toString()) - 1;
    var annee2 = Number(new Date(dateDebut).getFullYear().toString());
    if(annee1 || annee2){
      return annee1.toString() + "/" + annee2.toString();
    }else{
      return "";
    }
    
  }

  canEditStage():boolean{
    switch (this.authService.getViewRole()) {
      case RoleUser.INVITE:
      case RoleUser.ETUDIANT:
      case RoleUser.TUTEUR:
      case RoleUser.REPRESENTANT_ENTREPRISE:
        return false;
      
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.SECRETAIRE:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.ADMIN:
        return true;
      default:
        return false;
    }
  }


  canAddStage():boolean{
    switch (this.authService.getViewRole()) {
      case RoleUser.INVITE:
        return false;
      case RoleUser.ETUDIANT:
      case RoleUser.TUTEUR:
      case RoleUser.REPRESENTANT_ENTREPRISE:
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.SECRETAIRE:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.ADMIN:
        return true;
      default:
        return false;
    }
  }

  stagesForRoles(allStage:any):any{
    this.allItems = this.route.snapshot.data.allStages;
    switch (this.authService.getViewRole()) {
      case RoleUser.INVITE:
      case RoleUser.ETUDIANT:
        this.allItems = this.allItems.filter(((obj: { etat: any; }) => (obj.etat == EtatStage.VALIDE)));
        return this.allItems;
      case RoleUser.REPRESENTANT_ENTREPRISE:
        this.allItems = this.allItems.filter(((obj: { etat: any; }) => obj.etat != EtatStage.PROPOSE && obj.etat != EtatStage.REFUSE && obj.etat != EtatStage.TERMINE));
        return this.allItems;
      case RoleUser.TUTEUR:
        this.allItems = this.allItems.filter(((obj: { etat: any; }) => (obj.etat == EtatStage.AFFECT_ETUDIANT) || (obj.etat == EtatStage.AFFECT_TUTEUR) ));
        return this.allItems;
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.SECRETAIRE:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.ADMIN:
        this.allItems = this.route.snapshot.data.allStages;
        return this.allItems;
    }
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

    /**
   * @fonction selectedItem
   * @description Met √† jour l'item selectionn√©, permet au modal de savoir quelle contenu afficher
   * @params item : ParcoursModel -> contient les informations du parcours selectionn√©
   */
  selectedItem(item:any){
    this.selectItem = item;
  }

  /**
   * @fonction updateTable
   * @description Met √† jour le tableau local des parcours (afin d'eviter de recharger la page pour avoir la donn√©e modifier)
   * @params parcours : any -> contient toutes les donn√©es du parcours qui a √©t√© modifi√©
   */
  updateTable(item:any){
    // on cherche l'index de l'item modifi√©
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));
    // si on ne trouve pas l'identifiant du stage cela signifie que c'est un nouveau stage
    if(index == -1){
      this.allItems.push(item); // on push le nouveau stage dans le tableau
    }else{
      console.log("index update : "+ index);
      this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas
    }

  }

  addStage(parcours:any){
    // On ajoute le nouveau stage dans le tableau local (afin de ne pas recharger la page pour voir l'ajout)
    //this.allItems = this.route.snapshot.data.allItems; 
    console.log(parcours);
  }


  /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionn√© sur la base de donn√©e et met √† jour le tableau local
   * @params id : any -> identifiant du parcours √† supprimer
   */
  deleteStage(id:any){
    console.log({message:"delete", id: id});
    this.stageService.deleteStageById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donn√©e donc on peut le supprimer sans recharger les donn√©es distantes)
        this.allItems = this.allItems.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

}
