import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { entrepriseModel } from 'src/app/core/models/entrepriseModel';
import { EntrepriseService } from 'src/app/core/services/entreprise.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent extends CommonListingTable implements OnInit {
  
  public readonly title: string = "Liste des entreprises";

  allEntreprises: entrepriseModel[] = new Array();

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private entrepriseService: EntrepriseService) { 
    super();
    this.visibleProperties = 
    [
      {
        name: 'id',
        sorted: false
      },
      {
        name: 'nom',
        sorted: false
      }
    ];
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.entreprises;  
  }

  deleteEntreprise(id:any){
    this.entrepriseService.deleteEntrepriseById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allEntreprises = this.allEntreprises.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

}
