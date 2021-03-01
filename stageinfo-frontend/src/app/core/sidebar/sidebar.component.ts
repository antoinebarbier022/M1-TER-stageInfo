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
        {icon:"fas fa-list", nom:"Listing des stages", lien:"/listing-stages", items:[]},
        {icon:"fas fa-user-friends", nom:"Étudiant sans stages", lien:"/etudiant-sans-stages", items:[]},
        {icon:"fas fa-pencil-alt", nom:"Proposer un stage", lien:"/saisir-stage", items:[]},
        {icon:"fas fa-table", nom:"Les notes des stages", lien:"/note-de-stage", items:[]},
        {icon:"fas fa-file-csv", nom:"Exporter CSV", lien:"/", items:[
          {icon:"", nom:"Les stages", lien:"/stages-csv", items:[]},
          {icon:"", nom:"Les soutenances", lien:"/soutenances-csv", items:[]},
          {icon:"", nom:"Les notes de stage", lien:"/notes-de-stage-csv", items:[]},
        ]},
        {icon:"fas fa-download", nom:"Télécharger", items:[
          {icon:"fas fa-border-all", nom:"Feuille de stage", lien:"/fiche-stage", items:[]},
          {icon:"", nom:"Fiche entreprise", lien:"/fiche-entreprise", items:[]},
          {icon:"", nom:"Fiche de notation", lien:"/fiche-notation", items:[]},
        ]}
      ] 
    },
    {
      title:"Soutenances",
      items: [
        {icon:"fas fa-list", nom:"Listing des soutenances", lien:"/listing-soutenance", items:[]},
        {icon:"fas fa-list", nom:"Listing des soutenances non planifiées", lien:"/listing-soutenance", items:[]},
        {icon:"fas fa-calendar-alt", nom:"Planing de soutenance", lien:"/planing-soutenance", items:[]},

        //{icon:"fas fa-comment", nom:"Télécharger fiche entreprise", lien:"/", items:[]},
        //{icon:"fas fa-database", nom:"Saisir fiche suivie étudiant", lien:"/", items:[]},
        {icon:"fas fa-pencil-alt", nom:"Saisir fiche de suivie", lien:"/saisir-fiche-suivi", items:[]},
        //{icon:"fas fa-file", nom:"Télécharger la fiche de notation", lien:"/", items:[]},
        //{icon:"fas fa-file-alt", nom:"Export des soutenances", lien:"/", items:[]},
      ] 
    },
    {
      title:"Statistiques",
      items: [
        {icon:"fas fa-chart-bar", nom:"Suivi d'embauche", lien:"/suivi-embauche", items:[]},
        {icon:"fas fa-clipboard-list", nom:"Classement entreprises", lien:"/classement-entreprise", items:[]},
        {icon:"fas fa-chart-pie", nom:"Tendances-Calcul d'occurences", lien:"/tendance-truc", items:[]},
        {icon:"fas fa-server", nom:"Etiquetage", lien:"/etiquetage", items:[]}
      ]
    },
    {
      title:"Archivages",
      items: [
        {icon:"fas fa-file-archive", nom:"Rapports téléchargeables", lien:"/rapports-de-stages", items:[]},
        {icon:"fas fa-book", nom:"Stages années précédentes", lien:"/archive-stages", items:[]}
      ]
    },
    {
      title:"Vous êtes développeur ?",
      items: [
        {icon:"fas fa-book", nom:"Documentation", lien:"/documentation", items:[]},
        {icon:"fab fa-gitlab", nom:"Lien du GitLab", lien:"/gitlab", items:[]},
        {icon:"fas fa-comment", nom:"Contacter le support", lien:"/support", items:[]},
      ]
    },
    {
      title:"Besoin d'aide ?",
      items: [
        {icon:"fas fa-question", nom:"FAQ", lien:"/faq", items:[]},
        {icon:"fas fa-comment", nom:"Nous contacter", lien:"/nous-contacter", items:[]},
        //{icon:"fas fa-phone", nom:"Nous contacter", lien:"/", items:[]},
      ] 
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }


}
