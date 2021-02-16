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
        {icon:"", nom:"Listing des stages", lien:"/", items:[]},
        {icon:"", nom:"Étudiant sans stages", lien:"/", items:[]},
        {icon:"", nom:"Proposer un stage", lien:"/", items:[]},
        {icon:"", nom:"Exporter CSV des stages", lien:"/", items:[
          {icon:"", nom:"Proposer un stage", lien:"/", items:[]},
          {icon:"", nom:"Exporter CSV des stages", lien:"/", items:[]},
          {icon:"", nom:"Les notes des stages", lien:"/", items:[]},
        ]},
        {icon:"", nom:"Les notes des stages", lien:"/", items:[]},
        {icon:"", nom:"Téléchargement", items:[
          {icon:"", nom:"Proposer un stage", lien:"/", items:[]},
          {icon:"", nom:"Exporter CSV des stages", lien:"/", items:[]},
          {icon:"", nom:"Les notes des stages", lien:"/", items:[
            {icon:"", nom:"Proposer un stage", lien:"/", items:[]},
            {icon:"", nom:"Exporter CSV des stages", lien:"/", items:[]},
            {icon:"", nom:"Les notes des stages", lien:"/", items:[]},
          ]},
        ]}
      ] 
    },
    {
      title:"Soutenance M1",
      items: [
        {icon:"", nom:"Planing de soutenance", lien:"/", items:[]},
        {icon:"", nom:"Listing des soutenances", lien:"/", items:[]},
        {icon:"", nom:"Listing des soutenances non planifiées", lien:"/", items:[]},
        {icon:"", nom:"Télécharger fiche entreprise", lien:"/", items:[]},
        {icon:"", nom:"Saisir fiche suivie étudiant", lien:"/", items:[]},
        {icon:"", nom:"Télécharger la fiche de notation", lien:"/", items:[]},
        {icon:"", nom:"Export des soutenances", lien:"/", items:[]},
      ] 
    },
    {
      title:"Statistiques",
      items: [
        {icon:"", nom:"Suivi embauche", lien:"/", items:[]},
        {icon:"", nom:"Classement entreprises", lien:"/", items:[]},
        {icon:"", nom:"Tendances-Calcul d'occurences", lien:"/", items:[]},
        {icon:"", nom:"Etiquetage", lien:"/", items:[]}
      ]
    },
    {
      title:"Archivages",
      items: [
        {icon:"", nom:"Rapports téléchargeables", lien:"/", items:[]},
        {icon:"", nom:"Stages années précédentes", lien:"/", items:[]}
      ]
    },
    {
      title:"Besoin d'aide ?",
      items: [
        {icon:"", nom:"FAQ", lien:"/", items:[]},
        {icon:"", nom:"Nous contacter", lien:"/", items:[]},
      ] 
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }


}
