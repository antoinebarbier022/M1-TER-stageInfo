import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StageService } from 'src/app/core/services/stage.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';
import { ActivatedRoute } from '@angular/router';
import { StageModel } from 'src/app/core/models/stageModel';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent extends CommonListingTable implements OnInit {
  
  public readonly title: string = "Liste des stages";

  destroy$: Subject<boolean> = new Subject<boolean>();
  selectItem:any; // item qui est selectionné 

  constructor(private route:ActivatedRoute, private stageService: StageService) {
    super();
    this.visibleProperties = [
      { name: 'titre', sorted: false },
      { name: 'entreprise.nomComplet',sorted: false },
      { name: 'parcours.nomComplet',sorted: false },
      { name: 'duree',sorted: false },
      { name: 'etat',sorted: false }
    ];
    this.selectItem = new StageModel();
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.allStages;
    console.log(sessionStorage.getItem('userid'));
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

    /**
   * @fonction selectedItem
   * @description Met à jour l'item selectionné, permet au modal de savoir quelle contenu afficher
   * @params item : ParcoursModel -> contient les informations du parcours selectionné
   */
  selectedItem(item:any){
    this.selectItem = item;
  }

  /**
   * @fonction updateTable
   * @description Met à jour le tableau local des parcours (afin d'eviter de recharger la page pour avoir la donnée modifier)
   * @params parcours : any -> contient toutes les données du parcours qui a été modifié
   */
  updateTable(item:any){
    // on cherche l'index de l'item modifié
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));
    console.log("index update : "+ index);
    this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas
  }

  addStage(parcours:any){
    // On ajoute le nouveau stage dans le tableau local (afin de ne pas recharger la page pour voir l'ajout)
    //this.allItems = this.route.snapshot.data.allItems; 
    console.log(parcours);
  }


  /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionné sur la base de donnée et met à jour le tableau local
   * @params id : any -> identifiant du parcours à supprimer
   */
  deleteStage(id:any){
    console.log({message:"delete", id: id});
    this.stageService.deleteStageById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allItems = this.allItems.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

}
