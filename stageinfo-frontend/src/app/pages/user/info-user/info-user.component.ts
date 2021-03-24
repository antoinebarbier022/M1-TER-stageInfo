import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  user:any;

  stages = [
    { titre:"Stage Ingénieur SALESFORCE/CPQ", entreprise:"IBM Montpellier", etat:"terminé", date:"2015"},
    { titre:"Pilotage, conception et développement d'applications web.", entreprise:"SMILE", etat:"terminé", date:"2019"},
    { titre:"Administrateur Réseau / Système, Développement soft Interne", entreprise:"EIGHT.TECH", etat:"terminé", date:"2014"},
    { titre:"Stage Ingénieur", entreprise:"IBM Montpellier", etat:"terminé", date:"2015"},
    { titre:"Développeur web.", entreprise:"SMILE", etat:"terminé", date:"2019"}
  ];

  constructor(private route:ActivatedRoute) { 
    this.user = this.route.snapshot.data.user; 
  }

  ngOnInit(): void {
    
  }

}
