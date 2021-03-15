import { Component, OnChanges, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StageService } from 'src/app/core/services/stage.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {
  title="Liste des stages"

  public visibleProperties = ['titre','entreprise.nomComplet', 'parcours.nomComplet', 'duree', 'etat'];

  public allStages: Array<any>;

  public searchFilter: string;
  public arrayFilter: Array<string>;


  public nbrEntries: number;
  public pageCount: number;
  public currentPage: number;
  public lastPage: number;

  public startIndex;
  public endIndex;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService: StageService, private auth: AuthService) {
    this.allStages = new Array();
    this.searchFilter = "";
    this.arrayFilter = [];
    this.nbrEntries = 20;
    this.pageCount = 0;
    this.currentPage = 1;
    this.lastPage = this.currentPage;
    this.startIndex = 0;
    this.endIndex = this.startIndex+this.nbrEntries;
  }

  ngOnInit(): void {
    this.stageService.getStages().subscribe(stages => {
      this.allStages = stages;
      this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
    })
  }

  setNumberEntries(nbr : any){
    this.nbrEntries = parseInt(nbr.target.value);
    this.endIndex = this.startIndex + this.nbrEntries;

    this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
    this.lastPage = this.pageCount;
    
    this.currentPage = 1;
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.nbrEntries;

    this.getStagesByKeyword();
  }

  getStages() {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.allStages = _stages;
      }
    );
  }

  stageHasAllKeywords(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    function getNestedValue(obj: any, key : any) {
      return key.split(".").reduce(function(result: any, key: any) {
         return result[key] 
      }, obj);
    }

    let row = new Array();
    
    this.visibleProperties.forEach(prop => {
      row.push(getNestedValue(stage, prop));
    });

    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  getStagesByKeyword() {
    this.arrayFilter = this.searchFilter.trim().split(/\s+/);

    return this.allStages.slice(this.startIndex, this.endIndex).filter(x => {
      if (this.stageHasAllKeywords(x, this.arrayFilter)) return x;
    });
  }

  onClickPageNumber(nbr: number) {
    this.lastPage = this.currentPage;
    this.currentPage = nbr;

    if (this.lastPage < this.currentPage) {
      let difference = this.currentPage - this.lastPage;
      this.startIndex += this.nbrEntries * difference;
    }
    else {
      let difference = this.lastPage - this.currentPage;
      this.startIndex -= this.nbrEntries * difference;
    }

    this.endIndex = this.startIndex + this.nbrEntries;
    this.getStagesByKeyword();
  }

  onClickNextPage() {
    if (this.currentPage + 1 <= this.pageCount) {
      this.lastPage = this.currentPage;
      this.currentPage++;
      this.startIndex += this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;

      this.getStagesByKeyword();
    }
  }

  onClickPreviousPage() {
    if (this.currentPage - 1 > 0) {
      this.lastPage = this.currentPage;
      this.currentPage--;
      this.startIndex -= this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;

      this.getStagesByKeyword();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
