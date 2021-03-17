import { Component, Output, EventEmitter, OnInit, Input, SimpleChange } from '@angular/core';

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

  @Input() public nbrEntries: number;
  @Input() public listSize: number;

  public pageCount: number;
  public currentPage: number;
  public lastPage: number;

  @Output() paginationChange = new EventEmitter<any>();

  constructor() { 
    this.listSize = 0;
    this.pageCount = 0;
    this.currentPage = 1;
    this.lastPage = this.currentPage;
    this.nbrEntries = 20;
    this.pagination.startIndex = 0;
    this.pagination.endIndex = 0;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any){
    if(changes['nbrEntries'] !== undefined){
      this.nbrEntries = changes['nbrEntries'].currentValue;
      this.setNumberEntries(this.nbrEntries);
    }

    if(changes['listSize'] !== undefined){
      this.listSize = changes['listSize'].currentValue;
      this.pageCount = Math.ceil(this.listSize/this.nbrEntries);
    }
    console.log('fils :');
    console.log(this.listSize);
  }

  setNumberEntries(nbr : number) : void{
    this.nbrEntries = nbr;
    this.pagination.endIndex = this.pagination.startIndex + this.nbrEntries;

    this.pageCount = Math.ceil(this.listSize / this.nbrEntries);
    this.lastPage = this.pageCount;
    
    this.currentPage = 1;
    this.pagination.startIndex = 0;
    this.pagination.endIndex = this.pagination.startIndex + this.nbrEntries;
    //this.getStagesByKeyword();
  }

  paginationChanged(): void{
    console.log("oooook");
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
