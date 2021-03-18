import { Component, OnInit } from '@angular/core';
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

  public commonProperties: {
    searchFilter: string,
    nbrEntries: number,
    pageCount: number,
    currentPage: number,
    lastpage: number,
    startIndex: number,
    endIndex: number
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private stageService: StageService) {
    this.allStages = new Array();

    this.commonProperties = {
      searchFilter: '',
      nbrEntries: 10,
      pageCount: 1,
      currentPage: 1,
      lastpage: 1,
      startIndex: 0,
      endIndex: 10
    }
  }

  ngOnInit(): void {
    this.getStages();
  }

  getStages() : void {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_stages: any[]) => {
        this.allStages = _stages;
        this.commonProperties.pageCount = Math.ceil(this.allStages.length / this.commonProperties.nbrEntries);
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

  getNestedValue(obj: any, key : any): any{
    return key.split(".").reduce(function(result: any, key: any) {
       return result[key] 
    }, obj);
  }

  stageHasAllKeywords(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    let row = new Array();
    
    this.visibleProperties.forEach(prop => {
      row.push(this.getNestedValue(stage, prop.name));
    });
    
    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  printStages() : any {
    let filteredArray = this.allStages.filter(x => {
      if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });

    this.commonProperties.pageCount = Math.ceil(filteredArray.length / this.commonProperties.nbrEntries);
    
    if(this.commonProperties.currentPage > this.commonProperties.pageCount){
      this.commonProperties.currentPage = 1;
      this.commonProperties.startIndex = 0;
      this.commonProperties.endIndex = this.commonProperties.startIndex+this.commonProperties.nbrEntries;
    }

    return filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex);
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
