import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navigation = [
    {
      title:"Stages",
      items: [
        {icon:"", nom:"Listing des stages", lien:"/"},
        {icon:"", nom:"Télécharger la fiche", lien:"/"},
        {icon:"", nom:"Étudiant sans stages", lien:"/"},
        {icon:"", nom:"Proposer un stage", lien:"/"},
        {icon:"", nom:"Exporter CSV des stages", lien:"/"},
        {icon:"", nom:"Les notes des stages", lien:"/"},
      ] 
    },
    {
      title:"Soutenance M1",
      items: [
        {icon:"", nom:"Planing de soutenance", lien:"/"},
        {icon:"", nom:"Listing des soutenances", lien:"/"},
        {icon:"", nom:"Listing des soutenances non planifiées", lien:"/"},
        {icon:"", nom:"Télécharger fiche entreprise", lien:"/"},
        {icon:"", nom:"Saisir fiche suivie étudiant", lien:"/"},
        {icon:"", nom:"Télécharger la fiche de notation", lien:"/"},
        {icon:"", nom:"Export des soutenances", lien:"/"},
      ] 
    },
    {
      title:"Statistiques",
      items: [
        {icon:"", nom:"Suivi embauche", lien:"/"},
        {icon:"", nom:"Classement entreprises", lien:"/"},
        {icon:"", nom:"Tendances-Calcul d'occurences", lien:"/"},
        {icon:"", nom:"Etiquetage", lien:"/"}
      ]
    },
    {
      title:"Archivages",
      items: [
        {icon:"", nom:"Rapports téléchargeables", lien:"/"},
        {icon:"", nom:"Stages années précédentes", lien:"/"}
      ]
    },
    {
      title:"Besoin d'aide ?",
      items: [
        {icon:"", nom:"FAQ", lien:"/"},
        {icon:"", nom:"Nous contacter", lien:"/"},
      ] 
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
