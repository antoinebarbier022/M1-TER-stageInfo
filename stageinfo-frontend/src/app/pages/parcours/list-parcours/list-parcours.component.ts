import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
              private parcoursService: ParcoursService) { }

  ngOnInit(): void {
    this.allParcours = this.route.snapshot.data.allParcours;  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


  deleteParcours(id:any){
    this.parcoursService.deleteParcoursById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allParcours = this.allParcours.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

}
