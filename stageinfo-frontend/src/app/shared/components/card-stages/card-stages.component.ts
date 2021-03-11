import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-stages',
  templateUrl: './card-stages.component.html',
  styleUrls: ['./card-stages.component.scss']
})
export class CardStagesComponent implements OnInit {
  title="Les stages"

  stages = [
    { titre:"Stage Ingénieur SALESFORCE/CPQ", entreprise:"IBM Montpellier", etat:"terminé", date:"2018"},
    { titre:"Pilotage, conception et développement d'applications web.", entreprise:"SMILE", etat:"terminé", date:"2018"},
    { titre:"Administrateur Réseau / Système, Développement soft Interne", entreprise:"EIGHT.TECH", etat:"terminé", date:"2018"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  badgeColor(etat:string){
    switch (etat) {
      case "valide":
        
        break;
      case "propose":
        
        break;
      case "refus":
        
          break;

      case "termine":
        
          break;
      default:
        break;
    }
  }

}
