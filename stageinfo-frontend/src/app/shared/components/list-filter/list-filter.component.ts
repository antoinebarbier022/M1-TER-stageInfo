import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit{

  @Input() public itemArray: Array<any>;
  @Input() public searchFilter: string;
  @Input() public visibleProperties: Array<any>;
  @Input() public startIndex: number;
  @Input() public endIndex: number;

  public arrayFilter: Array<string>;

  constructor() {
    this.itemArray = [];
    this.searchFilter = "";
    this.visibleProperties = [];
    this.startIndex = 0;
    this.endIndex = 0;

    this.arrayFilter = [];
  }

  ngOnInit(): void {}

  printArray(){
    console.log(this.searchFilter);
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

  getStagesByKeyword() : any {
    this.itemArray = this.searchFilter.trim().split(/\s+/);

    return this.itemArray.slice(this.startIndex, this.endIndex).filter(x => {
      if (this.stageHasAllKeywords(x, this.itemArray)) return x;
    });
  }

}
