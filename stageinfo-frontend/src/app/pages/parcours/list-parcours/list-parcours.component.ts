import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParcoursModel } from 'src/app/core/models/ParcoursModel';
import { ParcoursService } from 'src/app/core/services/parcours.service';

@Component({
  selector: 'app-list-parcours',
  templateUrl: './list-parcours.component.html',
  styleUrls: ['./list-parcours.component.scss']
})
export class ListParcoursComponent implements OnInit, OnDestroy {
  title="Liste des parcours"

  allParcours:any ;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,
              private router: Router,
              private parcoursService: ParcoursService) { }

  ngOnInit(): void {
    this.allParcours = this.route.snapshot.data.allParcours;  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  /**
   * @fonction updateTable
   * @description Met à jour le tableau local des parcours (afin d'eviter de recharger la page pour avoir la donnée modifier)
   * @params parcours : any -> contient toutes les données du parcours qui a été modifié
   */
  updateTable(parcours:any){
    // on cherche l'index du parcours modifié
    var indexParcours = this.allParcours.findIndex(((obj: { _id: any; }) => obj._id == parcours._id));
    this.allParcours[indexParcours] = parcours;  // On met a jour le tableau local avec les nouvelles datas
  }

  addParcours(parcours:any){
    // On ajoute le nouveau parcours dans le tableau local (afin de ne pas recharger la page pour voir l'ajout)
    //this.allParcours = this.route.snapshot.data.allParcours; 
    console.log(parcours);
  }

    /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionné sur la base de donnée et met à jour le tableau local
   * @params id : any -> identifiant du parcours à supprimer
   */
  deleteParcours(id:any){
    console.log({message:"delete", id: id});
    this.parcoursService.deleteParcoursById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allParcours = this.allParcours.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

}
