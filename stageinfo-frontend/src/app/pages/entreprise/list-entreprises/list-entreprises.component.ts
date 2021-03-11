import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent implements OnInit {
  title = "Liste des entreprises"

  // l'id de l'entreprise sert à afficher les informations de l'entreprise lors du clique sur le lien
  entreprises = [
    { id:"1", nom:"IBM", ville:"Montpellier", representant:"André Fernand"},
    { id:"2", nom:"Ubisoft", ville:"Montpellier", representant:"Aymeric Dumont"},
    { id:"3", nom:"Cap Gemini", ville:"Paris", representant:"Pascal Legrand-frère"},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
