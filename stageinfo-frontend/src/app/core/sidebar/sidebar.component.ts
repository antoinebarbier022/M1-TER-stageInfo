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
        {icon:"fas fa-list", nom:"Listing des stages", lien:"/", items:[]},
        {icon:"fas fa-user-friends", nom:"Étudiant sans stages", lien:"/", items:[]},
        {icon:"fas fa-pencil-alt", nom:"Proposer un stage", lien:"/", items:[]},
        {icon:"fas fa-table", nom:"Les notes des stages", lien:"/", items:[]},
        {icon:"fas fa-file-csv", nom:"Exporter CSV", lien:"/", items:[
          {icon:"", nom:"Les stages", lien:"/", items:[]},
          {icon:"", nom:"Les soutenances", lien:"/", items:[]},
          {icon:"", nom:"Les notes de stage", lien:"/", items:[]},
        ]},
        {icon:"fas fa-download", nom:"Télécharger", items:[
          {icon:"fas fa-border-all", nom:"Feuille de stage", lien:"/", items:[]},
          {icon:"", nom:"Fiche entreprise", lien:"/", items:[]},
          {icon:"", nom:"Fiche de notation", lien:"/", items:[]},
        ]}
      ] 
    },
    {
      title:"Soutenances",
      items: [
        {icon:"fas fa-list", nom:"Listing des soutenances", lien:"/", items:[]},
        {icon:"fas fa-list", nom:"Listing des soutenances non planifiées", lien:"/", items:[]},
        {icon:"fas fa-calendar-alt", nom:"Planing de soutenance", lien:"/", items:[]},

        //{icon:"fas fa-comment", nom:"Télécharger fiche entreprise", lien:"/", items:[]},
        //{icon:"fas fa-database", nom:"Saisir fiche suivie étudiant", lien:"/", items:[]},
        {icon:"fas fa-pencil-alt", nom:"Saisir fiche de suivie", lien:"/", items:[]},
        //{icon:"fas fa-file", nom:"Télécharger la fiche de notation", lien:"/", items:[]},
        //{icon:"fas fa-file-alt", nom:"Export des soutenances", lien:"/", items:[]},
      ] 
    },
    {
      title:"Statistiques",
      items: [
        {icon:"fas fa-file-archive", nom:"Suivi d'embauche", lien:"/", items:[]},
        {icon:"fas fa-clipboard-list", nom:"Classement entreprises", lien:"/", items:[]},
        {icon:"fas fa-chart-pie", nom:"Tendances-Calcul d'occurences", lien:"/", items:[]},
        {icon:"fas fa-chart-bar", nom:"Etiquetage", lien:"/", items:[]}
      ]
    },
    {
      title:"Archivages",
      items: [
        {icon:"fas fa-server", nom:"Rapports téléchargeables", lien:"/", items:[]},
        {icon:"fas fa-book", nom:"Stages années précédentes", lien:"/", items:[]}
      ]
    },
    {
      title:"Besoin d'aide ?",
      items: [
        {icon:"fas fa-question", nom:"FAQ", lien:"/", items:[]},
        {icon:"fas fa-comment", nom:"Nous contacter", lien:"/", items:[]},
        //{icon:"fas fa-phone", nom:"Nous contacter", lien:"/", items:[]},
      ] 
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }


}
