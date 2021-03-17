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

  setNumberEntries(nbr : any) : void{
    this.commonProperties.nbrEntries = parseInt(nbr.target.value);

    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;

    this.commonProperties.pageCount = Math.ceil(this.commonProperties.filteredArray.length / this.commonProperties.nbEntries);
    this.commonProperties.lastPage = this.commonProperties.pageCount;
    
    this.commonProperties.currentPage = 1;
    this.commonProperties.startIndex = 0;
    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;

    this.commonProperties.fun;
  }

  printNbrEntries(){
    console.log('here : ');
    console.log(this.commonProperties.nbrEntries);
  }

  ngOnInit(): void {}



}
