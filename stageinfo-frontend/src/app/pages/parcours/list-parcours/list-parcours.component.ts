import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParcoursService } from 'src/app/core/services/parcours.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-parcours',
  templateUrl: './list-parcours.component.html',
  styleUrls: ['./list-parcours.component.scss']
})
export class ListParcoursComponent extends CommonListingTable implements OnInit, OnDestroy {

  public readonly title: string = "Liste des parcours";

  public idParcoursSelect:any;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private parcoursService: ParcoursService) { 
    super();
    this.visibleProperties = 
    [
      {
        name: 'acronyme',
        sorted: false
      },
      {
        name: 'intitule',
        sorted: false
      },
      {
        name: 'niveau',
        sorted: false
      }
    ];
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.allParcours;  
  }

  parcoursSelected(id:any){
    this.idParcoursSelect = id;
  }

  deleteParcours(){
    this.parcoursService.deleteParcoursById(this.idParcoursSelect)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allItems = this.allItems.filter((object: { _id: any; }) => { return object._id != this.idParcoursSelect; });
        this.idParcoursSelect = "";
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
