import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { entrepriseModel } from 'src/app/core/models/entrepriseModel';
import { EntrepriseService } from 'src/app/core/services/entreprise.service';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent implements OnInit {
  
  public readonly title: string = "Liste des entreprises";

  public visibleProperties = 
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

  public allEntreprises: Array<any>;
  public idEntrepriseSelect: any;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private entrepriseService: EntrepriseService) { 
    this.allEntreprises = [];
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
    this.allEntreprises = this.route.snapshot.data.entreprises;  
  }

  
  entrepriseSelected(id:any){
    this.idEntrepriseSelect = id;
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
      this.allEntreprises.sort((stage1, stage2) => (-1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = false;
    }
    else{
      this.allEntreprises.sort((stage1, stage2) => (1)*this.compare(stage1, stage2, index));
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
    let filteredArray = this.allEntreprises.filter(x => {
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

  deleteEntreprise(){
    this.entrepriseService.deleteEntrepriseById(this.idEntrepriseSelect)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allEntreprises = this.allEntreprises.filter((object: { _id: any; }) => { return object._id != this.idEntrepriseSelect; });
        this.idEntrepriseSelect = "";
      });
  }

}
