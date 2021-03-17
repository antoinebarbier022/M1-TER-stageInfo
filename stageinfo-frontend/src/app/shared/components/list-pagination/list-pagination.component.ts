import { Component, Output, EventEmitter, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {

  @Input() public itemArray: Array<any>;
  @Input() public visibleProperties: Array<any>;
  @Input() public commonProperties: any;


  constructor() { 
    this.itemArray = new Array();
    this.visibleProperties = new Array();
    this.commonProperties = {};
  }

  ngOnInit(): void {}

  onClickPageNumber(nbr: number) : void {
    this.commonProperties.lastPage = this.commonProperties.currentPage;
    this.commonProperties.currentPage = nbr;

    if (this.commonProperties.lastPage < this.commonProperties.currentPage) {
      let difference = this.commonProperties.currentPage - this.commonProperties.lastPage;
      this.commonProperties.startIndex += this.commonProperties.nbrEntries * difference;
    }
    else {
      let difference = this.commonProperties.lastPage - this.commonProperties.currentPage;
      this.commonProperties.startIndex -= this.commonProperties.nbrEntries * difference;
    }

    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
    console.log(this.commonProperties);
  }

  onClickNextPage() : void{
    if (this.commonProperties.currentPage + 1 <= this.commonProperties.pageCount) {
      this.commonProperties.lastPage = this.commonProperties.currentPage;
      this.commonProperties.currentPage++;
      this.commonProperties.startIndex += this.commonProperties.nbrEntries;
      this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
      console.log(this.commonProperties);
    }
  }

  onClickPreviousPage() : void{
    if (this.commonProperties.currentPage - 1 > 0) {
      this.commonProperties.lastPage = this.commonProperties.currentPage;
      this.commonProperties.currentPage--;
      this.commonProperties.startIndex -= this.commonProperties.nbrEntries;
      this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
      console.log(this.commonProperties);
    }
  }

}
