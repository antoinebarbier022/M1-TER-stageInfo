import { Component, OnInit } from '@angular/core';
import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SoutenanceService } from 'src/app/core/services/soutenance.service';

@Component({
  selector: 'app-list-soutenances',
  templateUrl: './list-soutenances.component.html',
  styleUrls: ['./list-soutenances.component.scss']
})
export class ListSoutenancesComponent extends CommonListingTable implements OnInit {

  public readonly title: string = "Liste des soutenances";

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private soutenanceService: SoutenanceService) { 
    super();
    this.visibleProperties = 
    [
      {
        name: 'etudiant',
        sorted: false
      },
      {
        name: 'entreprise',
        sorted: false
      },
      {
        name: 'tuteurUniv',
        sorted: false
      },
      {
        name: 'tuteurEntreprise',
        sorted: false
      }
    ];
  }

  ngOnInit(): void {
    this.getSoutenances();
  }


  getSoutenances() {
    this.soutenanceService.getAllSoutenances()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_soutenances: any[]) => {
        super.allItems = _soutenances;
        this.commonProperties.pageCount = Math.ceil(this.allItems.length / this.commonProperties.nbrEntries);
        this.commonProperties.sizeFilteredArray = this.allItems.length;
      }
    );
  }

}
