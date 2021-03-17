import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit{

  @Input() public itemArray: Array<any>;
  @Input() public visibleProperties: Array<any>;
  @Input() public startIndex: number;
  @Input() public endIndex: number;

  @Output() inputFilterChange = new EventEmitter<any>();


  public searchFilter: string;

  constructor() {
    this.itemArray = [];
    this.searchFilter = "";
    this.visibleProperties = [];
    this.startIndex = 0;
    this.endIndex = 10;
  }

  ngOnInit(): void {}

  inputChanged(): void{
    //console.log(this.searchFilter);
    this.inputFilterChange.emit(this.getStagesByKeyword());
  }

  printArray(){
    //console.log(this.itemArray);
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
    return this.itemArray.filter(x => {
      if (this.stageHasAllKeywords(x, this.searchFilter.trim().split(/\s+/))) return x;
    });
  }
  

}
