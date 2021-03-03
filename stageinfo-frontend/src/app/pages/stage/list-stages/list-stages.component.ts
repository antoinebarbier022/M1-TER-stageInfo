import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {

  public filterVisibility: boolean;

  constructor() { 
    this.filterVisibility = false;
  }

  ngOnInit(): void {
  }

  toggleFilter(): void{
    this.filterVisibility? this.filterVisibility=false : this.filterVisibility=true;
  }

}
