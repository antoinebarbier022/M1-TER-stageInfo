import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit{

  @Input() public itemArray: Array<any>;
  @Input() public visibleProperties: Array<any>;
  @Input() public commonProperties: any;

  constructor() {
    this.itemArray = [];
    this.visibleProperties = [];
    this.commonProperties = {};
  }

  ngOnInit(): void {}

  printArray(){
    //console.log(this.commonProperties);
    this.getStagesByKeyword();
    //console.log(this.commonProperties.filteredArray);
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

  getStagesByKeyword() : void {
    console.log(this.itemArray);
    console.log(this.commonProperties);
    this.commonProperties.filteredArray = this.itemArray.slice(this.commonProperties.startIndex, this.commonProperties.endIndex).filter(x => {
      if (this.stageHasAllKeywords(x, this.commonProperties.searchFilter.trim().split(/\s+/))) return x;
    });
    console.log(this.commonProperties);
  }
  

}
