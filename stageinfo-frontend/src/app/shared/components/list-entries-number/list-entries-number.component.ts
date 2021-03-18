import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entries-number',
  templateUrl: './list-entries-number.component.html',
  styleUrls: ['./list-entries-number.component.scss']
})
export class ListEntriesNumberComponent implements OnInit {

  @Input() public commonProperties: any;

  public optionEntries: Array<number>

  constructor() { 
    this.commonProperties = {};
    this.optionEntries = [10,20,50];
  }

  setNumberEntries() : void{
    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
    this.commonProperties.pageCount = Math.ceil(this.commonProperties.filteredArray.length / this.commonProperties.nbrEntries);
    this.commonProperties.lastPage = this.commonProperties.pageCount;
    this.commonProperties.currentPage = 1;
    this.commonProperties.startIndex = 0;
    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
  }

  ngOnInit(): void {}



}
