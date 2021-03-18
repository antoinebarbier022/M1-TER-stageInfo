import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entries-number',
  templateUrl: './list-entries-number.component.html',
  styleUrls: ['./list-entries-number.component.scss']
})
export class ListEntriesNumberComponent implements OnInit {

  @Input() public itemArray: Array<any>;
  @Input() public visibleProperties: Array<any>;
  @Input() public commonProperties: any;


  constructor() { 
    this.itemArray = [];
    this.visibleProperties = [];
    this.commonProperties = {};
  }

  getNestedValue(obj: any, key : any): any{
    return key.split(".").reduce(function(result: any, key: any) {
       return result[key] 
    }, obj);
  }

  stageHasAllKeywords2(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    let row = new Array();

    this.visibleProperties.forEach(prop => {
      row.push(this.getNestedValue(stage, prop.name));
    });

    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  getStagesByKeyword2() : void {
    console.log(this.itemArray);
    console.log(this.commonProperties);
    this.commonProperties.filteredArray = this.itemArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex).filter(x => {
      if (this.stageHasAllKeywords2(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });
    console.log(this.commonProperties);
  }

  setNumberEntries(nbr : any) : void{
    this.commonProperties.nbrEntries = parseInt(nbr.target.value);

    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;

    this.commonProperties.pageCount = Math.ceil(this.commonProperties.filteredArray.length / this.commonProperties.nbEntries);
    this.commonProperties.lastPage = this.commonProperties.pageCount;
    
    this.commonProperties.currentPage = 1;
    this.commonProperties.startIndex = 0;
    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
  }

  printNbrEntries(){
    console.log('here : ');
    console.log(this.commonProperties.nbrEntries);
  }

  ngOnInit(): void {}



}
