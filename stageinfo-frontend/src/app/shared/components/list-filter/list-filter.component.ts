import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit, OnChanges{

  @Input() public itemArray: any;
  @Input() public searchFilter: string;
  @Input() public visibleProperties: any;

  public arrayFilter: Array<string>;

  constructor() {
    this.arrayFilter = [];
    this.searchFilter = "";
  }

  ngOnInit(): void {}

  printArray(){
    console.log(this.itemArray);
  }

  getNestedValue(obj: any, key : any): any{
    return key.split(".").reduce(function(result: any, key: any) {
       return result[key] 
    }, obj);
  }

  /*
  stageHasAllKeywords(stage: any, str: string[]): boolean {
    const keywords = str.filter(e => e).map(v => v.toLowerCase());

    let row = new Array();
    
    this.visibleProperties.forEach(prop => {
      row.push(this.getNestedValue(stage, prop.name));
    });

    return keywords.every(word => row.join(' ').toLowerCase().includes(word));
  }

  getStagesByKeyword() : any {
    this.arrayFilter = this.searchFilter.trim().split(/\s+/);

    return this.allStages.slice(this.startIndex, this.endIndex).filter(x => {
      if (this.stageHasAllKeywords(x, this.arrayFilter)) return x;
    });
  }
  */
}
