import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {

  public pagination = {
    startIndex: 0,
    endIndex: 0
  }

  public pageCount: number;
  public currentPage: number;
  public lastPage: number;
  public nbrEntries: number;

  @Output() paginationChange = new EventEmitter<any>();

  constructor() { 
    this.pageCount = 0;
    this.currentPage = 1;
    this.lastPage = this.currentPage;
    this.nbrEntries = 20;
    this.pagination.startIndex = 0;
    this.pagination.endIndex = 0;
  }

  ngOnInit(): void {}

  paginationChanged(): void{
    this.paginationChange.emit(this.pagination);
  }

  onClickPageNumber(nbr: number) : void {
    this.lastPage = this.currentPage;
    this.currentPage = nbr;

    if (this.lastPage < this.currentPage) {
      let difference = this.currentPage - this.lastPage;
      this.pagination.startIndex += this.nbrEntries * difference;
    }
    else {
      let difference = this.lastPage - this.currentPage;
      this.pagination.startIndex -= this.nbrEntries * difference;
    }

    this.pagination.endIndex = this.pagination.startIndex + this.nbrEntries;
    //this.getStagesByKeyword();
  }

  onClickNextPage() : void{
    if (this.currentPage + 1 <= this.pageCount) {
      this.lastPage = this.currentPage;
      this.currentPage++;
      this.pagination.startIndex += this.nbrEntries;
      this.pagination.endIndex = this.pagination.startIndex + this.nbrEntries;
      //this.getStagesByKeyword();
    }
  }

  onClickPreviousPage() : void{
    if (this.currentPage - 1 > 0) {
      this.lastPage = this.currentPage;
      this.currentPage--;
      this.pagination.startIndex -= this.nbrEntries;
      this.pagination.endIndex = this.pagination.startIndex + this.nbrEntries;
      //this.getStagesByKeyword();
    }
  }



}
