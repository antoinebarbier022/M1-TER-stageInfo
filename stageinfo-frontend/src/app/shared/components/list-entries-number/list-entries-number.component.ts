import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entries-number',
  templateUrl: './list-entries-number.component.html',
  styleUrls: ['./list-entries-number.component.scss']
})
export class ListEntriesNumberComponent implements OnInit {

  public nbrEntries: number;

  @Output() nbrEntriesChange = new EventEmitter<any>();

  constructor() { 
    this.nbrEntries = 20;
  }

  printNbrEntries(): void{
    console.log(this.nbrEntries);
  }

  entriesChanged(): void{
    this.nbrEntriesChange.emit(this.nbrEntries);
  }

  ngOnInit(): void {}



}
