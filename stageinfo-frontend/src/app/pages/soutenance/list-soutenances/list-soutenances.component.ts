import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-soutenances',
  templateUrl: './list-soutenances.component.html',
  styleUrls: ['./list-soutenances.component.scss']
})
export class ListSoutenancesComponent implements OnInit {
  title = "Liste des soutenances"

  // l'id de l'entreprise sert à afficher les informations de l'entreprise lors du clique sur le lien
  soutenances = [
    { id:"1", etudiant:"Antoine Barbier", stage:"Developpeur Angular", entreprise:"Shadow",tuteur:"Pascal", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
    { id:"1", etudiant:"Eric Terreau", stage:"Architecte systeme", entreprise:"IBM",tuteur:"Marie", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
    { id:"1", etudiant:"Hervé Fontaine", stage:"Refonte site web", entreprise:"Ubisoft",tuteur:"Diego", representant:"André Fernand", date:"25/05/21", salle:"TD12",heure:"11h30"},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
