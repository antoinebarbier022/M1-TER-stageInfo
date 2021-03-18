import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StageService } from 'src/app/core/services/stage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {
  
  public readonly title: string = "Liste des stages";

  public visibleProperties = 
  [
    {
      name: 'titre',
      sorted: false
    },
    {
      name: 'entreprise.nomComplet',
      sorted: false
    },
    {
      name: 'parcours.nomComplet',
      sorted: false
    },
    {
      name: 'duree',
      sorted: false
    },
    {
      name: 'etat',
      sorted: false
    }
  ];

  public allStages: Array<any>;
  public stagesPrinted: Array<any>;

  public commonProperties: {
    searchFilter: string,
    nbrEntries: number,
    pageCount: number,
    currentPage: number,
    lastpage: number,
    startIndex: number,
    endIndex: number,
    filteredArray: Array<any>
  }

  public searchFilter: string; // Déplacé dans list-filter

  public nbrEntries: number; // Déplacé dans list-entries-number

  public pageCount: number; // Déplacé dans list-pagination
  public currentPage: number; // Déplacé dans list-pagination
  public lastPage: number; // Déplacé dans list-pagination

  public startIndex: number; // Déplacé dans list-pagination
  public endIndex: number; // Déplacé dans list-pagination

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService: StageService) {
    this.allStages = new Array();
    this.stagesPrinted = new Array();
    this.searchFilter = "";
    this.nbrEntries = 20;
    this.pageCount = 0;
    this.currentPage = 1;
    this.lastPage = this.currentPage;
    this.startIndex = 0;
    this.endIndex = this.startIndex+this.nbrEntries;

    this.commonProperties = {
      searchFilter: '',
      nbrEntries: 10,
      pageCount: 1,
      currentPage: 1,
      lastpage: 1,
      startIndex: 0,
      endIndex: 10,
      filteredArray: []
    }
  }

  printCommon(){
    this.getStagesByKeyword();
  }

  getArrayFiltered(): any{
    return this.commonProperties.filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.startIndex);
  }

  ngOnInit(): void {
    this.getStages();
  }

  getStages() : void {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.allStages = _stages;
        this.stagesPrinted = _stages;
        console.log("nombre de stage : " + this.allStages.length);
        

        this.commonProperties.pageCount = Math.ceil(this.allStages.length / this.commonProperties.nbrEntries);
        
        this.commonProperties.filteredArray = _stages;

        this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
      }
    );
  }

  compare(obj1: any, obj2: any, index: number) : number {
    if(this.getNestedValue(obj1, this.visibleProperties[index].name) > this.getNestedValue(obj2, this.visibleProperties[index].name))
      return 1;

    if(this.getNestedValue(obj2, this.visibleProperties[index].name) > this.getNestedValue(obj1, this.visibleProperties[index].name))
      return -1;
    
    return 0;
  }

  sortByAscendingDescendingOrder(index: number){
    if(this.visibleProperties[index].sorted){
      this.allStages.sort((stage1, stage2) => (-1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = false;
    }
    else{
      this.allStages.sort((stage1, stage2) => (1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = true;
    }
  }

  // Dans le component list-pagination
  setNumberEntries(nbr : any) : void{
    this.nbrEntries = parseInt(nbr.target.value);
    
    this.endIndex = this.startIndex + this.nbrEntries;

    this.pageCount = Math.ceil(this.allStages.length / this.nbrEntries);
    this.lastPage = this.pageCount;
    
    this.currentPage = 1;
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.nbrEntries;
    this.getStagesByKeyword();
  }

  getNestedValue(obj: any, key : any): any{
    return key.split(".").reduce(function(result: any, key: any) {
       return result[key] 
    }, obj);
  }

  // Dans le component list-filter
  stageHasAllKeywords(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    let row = new Array();
    
    this.visibleProperties.forEach(prop => {
      row.push(this.getNestedValue(stage, prop.name));
    });
    
    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  // Dans le component list-filter
  getStagesByKeyword() : any {
    return this.allStages.filter(x => {
      if (this.stageHasAllKeywords(x, this.searchFilter.trim().split(/\s+/))) return x;
    }).slice(this.startIndex, this.endIndex);
  }

  /* ULTRA IMPORTANT PUTAIN */
  getStagesByKeyword2() : any {

    let filteredArray = this.allStages.filter(x => {
      if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });

    this.commonProperties.pageCount = Math.ceil(filteredArray.length / this.commonProperties.nbrEntries);

    return filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex);;
  }

  // Dans le component list-pagination
  onClickPageNumber(nbr: number) : void {
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

  // Dans le component list-pagination
  onClickNextPage() : void{
    if (this.currentPage + 1 <= this.pageCount) {
      this.lastPage = this.currentPage;
      this.currentPage++;
      this.startIndex += this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;
      this.getStagesByKeyword();
    }
  }

  // Dans le component list-pagination
  onClickPreviousPage() : void{
    if (this.currentPage - 1 > 0) {
      this.lastPage = this.currentPage;
      this.currentPage--;
      this.startIndex -= this.nbrEntries;
      this.endIndex = this.startIndex + this.nbrEntries;
      this.getStagesByKeyword();
    }
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
