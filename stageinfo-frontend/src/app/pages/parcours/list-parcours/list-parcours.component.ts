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

  public readonly title: string = "Liste des utilisateurs";

  public visibleProperties = 
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

  public allParcours: Array<any>;
  public idParcoursSelect:any;

  public commonProperties: {
    searchFilter: string,
    nbrEntries: number,
    pageCount: number,
    currentPage: number,
    lastpage: number,
    startIndex: number,
    endIndex: number,

    sizeFilteredArray: number
  }

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute, private parcoursService: ParcoursService) { 
    this.allParcours = new Array();

    this.commonProperties = {
      searchFilter: '',
      nbrEntries: 10,
      pageCount: 1,
      currentPage: 1,
      lastpage: 1,
      startIndex: 0,
      endIndex: 10,
      sizeFilteredArray: 0
    }
  }

  ngOnInit(): void {
    this.allParcours = this.route.snapshot.data.allParcours;  
  }

  parcoursSelected(id:any){
    this.idParcoursSelect = id;
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
      this.allParcours.sort((stage1, stage2) => (-1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = false;
    }
    else{
      this.allParcours.sort((stage1, stage2) => (1)*this.compare(stage1, stage2, index));
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
    let filteredArray = this.allParcours.filter(x => {
      if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });

    console.log('ok : ');
    console.log(filteredArray);

    this.commonProperties.sizeFilteredArray = filteredArray.length;
    this.commonProperties.pageCount = Math.ceil(filteredArray.length / this.commonProperties.nbrEntries);
    
    if(this.commonProperties.currentPage > this.commonProperties.pageCount){
      this.commonProperties.currentPage = 1;
      this.commonProperties.startIndex = 0;
      this.commonProperties.endIndex = this.commonProperties.startIndex+this.commonProperties.nbrEntries;
    }

    return filteredArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex);
  }

  deleteParcours(){
    this.parcoursService.deleteParcoursById(this.idParcoursSelect)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allParcours = this.allParcours.filter((object: { _id: any; }) => { return object._id != this.idParcoursSelect; });
        this.idParcoursSelect = "";
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
