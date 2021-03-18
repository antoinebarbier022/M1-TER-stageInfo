import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-soutenances',
  templateUrl: './list-soutenances.component.html',
  styleUrls: ['./list-soutenances.component.scss']
})
export class ListSoutenancesComponent implements OnInit {
  
  public readonly title: string = "Liste des soutenances";

  // l'id de l'entreprise sert à afficher les informations de l'entreprise lors du clique sur le lien
  soutenances = [
    { id:"1", etudiant:"Antoine Barbier", stage:"Developpeur Angular", entreprise:"Shadow",tuteur:"Pascal", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
    { id:"1", etudiant:"Eric Terreau", stage:"Architecte systeme", entreprise:"IBM",tuteur:"Marie", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
    { id:"1", etudiant:"Hervé Fontaine", stage:"Refonte site web", entreprise:"Ubisoft",tuteur:"Diego", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
  ];

  public visibleProperties = 
  [
    {
      name: 'nom',
      sorted: false
    },
    {
      name: 'prenom',
      sorted: false
    },
    {
      name: 'email',
      sorted: false
    },
    {
      name: 'role',
      sorted: false
    }
  ];

  public allSoutenances: Array<any>;

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

  constructor() { 
    this.allSoutenances = new Array();

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
      this.allSoutenances.sort((stage1, stage2) => (-1)*this.compare(stage1, stage2, index));
      this.visibleProperties[index].sorted = false;
    }
    else{
      this.allSoutenances.sort((stage1, stage2) => (1)*this.compare(stage1, stage2, index));
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
    let filteredArray = this.allSoutenances.filter(x => {
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

}
