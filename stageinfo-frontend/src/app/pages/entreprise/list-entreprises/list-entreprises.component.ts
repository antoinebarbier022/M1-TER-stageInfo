import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent implements OnInit {
  title = "Liste des entreprises"
  
  constructor() { }

  ngOnInit(): void {
  }

}
