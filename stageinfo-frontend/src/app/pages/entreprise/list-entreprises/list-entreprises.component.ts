import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { entrepriseModel } from 'src/app/core/models/entrepriseModel';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent implements OnInit {
  title = "Liste des entreprises";

  entreprises: entrepriseModel[] = new Array();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entreprises = this.route.snapshot.data.entreprises;  
  }

}
