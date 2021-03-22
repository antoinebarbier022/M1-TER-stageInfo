import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StageService } from 'src/app/core/services/stage.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent extends CommonListingTable implements OnInit {
  
  public readonly title: string = "Liste des stages";

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private stageService: StageService) {
    super();
    this.visibleProperties = [
      { name: 'titre', sorted: false },
      { name: 'entreprise.nomComplet',sorted: false },
      { name: 'parcours.nomComplet',sorted: false },
      { name: 'duree',sorted: false },
      { name: 'etat',sorted: false }
    ];
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.allStages;
    console.log(sessionStorage.getItem('userid'));
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
