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

  public values = [10,20,50];


  constructor() { 
    this.itemArray = [];
    this.visibleProperties = [];
    this.commonProperties = {};
  }

  setNumberEntries() : void{
    //console.log(this.commonProperties.nbrEntries);

    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;

    this.commonProperties.pageCount = Math.ceil(this.commonProperties.filteredArray.length / this.commonProperties.nbrEntries);
    this.commonProperties.lastPage = this.commonProperties.pageCount;
    
    this.commonProperties.currentPage = 1;
    this.commonProperties.startIndex = 0;
    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
  }

  ngOnInit(): void {}



}
