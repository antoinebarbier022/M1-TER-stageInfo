import { Component, OnInit } from '@angular/core';

import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import { TestService } from '../services/test.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // On défini tous les liens possibles de navigation
  listeStages =             {icon:"fas fa-list",          nom:"Listing des stages",       lien:"/liste-stages",       items:[]};
  listeSoutenances =        {icon:"fas fa-list",          nom:"Listing des soutenances",  lien:"/liste-soutenances",   items:[]};
  listeEntreprise =         {icon:"fas fa-list",          nom:"Listing des entreprises",  lien:"/liste-entreprises",   items:[]};
  listeUtilisateurs =       {icon:"fas fa-list",          nom:"Listing des utilisateurs", lien:"/liste-utilisateurs",   items:[]};
  listeEtudiants =          {icon:"fas fa-user-friends",  nom:"Listing des étudiants ",   lien:"/liste-etudiants", items:[]};
  listeEnseignants =        {icon:"fas fa-user-friends",  nom:"listing des enseignants",  lien:"/liste-enseignants", items:[]};
  listeParcours =           {icon:"fas fa-list",          nom:"Listing des parcours",     lien:"/liste-parcours",       items:[]};
  listeEtudiantsSansStage = {icon:"fas fa-user-friends",  nom:"Étudiant sans stages",     lien:"/etudiant-sans-stages", items:[]};
  listeSoutenancesNonPlanifie = {icon:"fas fa-list",      nom:"Listing des soutenances non planifiées", lien:"/listing-soutenance-non-planifie", items:[]};

  planingSoutenance =       {icon:"fas fa-calendar-alt",  nom:"Planing de soutenance",    lien:"/planing-soutenance", items:[]};
  notesStage =              {icon:"fas fa-table",         nom:"Les notes des stages",     lien:"/note-de-stage", items:[]};

  saisirStage =             {icon:"fas fa-pencil-alt",    nom:"Proposer un stage",        lien:"/saisir-stage", items:[]};
  saisirFicheSuivi =        {icon:"fas fa-pencil-alt",    nom:"Saisir fiche de suivie",   lien:"/saisir-fiche-suivi", items:[]};

  suiviEmbauche =           {icon:"fas fa-chart-bar",     nom:"Suivi d'embauche",         lien:"/suivi-embauche", items:[]};
  classementEntreprise =    {icon:"fas fa-clipboard-list", nom:"Classement entreprises",  lien:"/classement-entreprise", items:[]};
  tendance =                {icon:"fas fa-chart-pie",     nom:"Tendances-Calcul d'occurences", lien:"/tendance-truc", items:[]};
  etiquetage =              {icon:"fas fa-server",        nom:"Etiquetage",               lien:"/etiquetage", items:[]};

  archivesRapports =        {icon:"fas fa-file-archive",  nom:"Rapports téléchargeables",  lien:"/rapports-de-stages", items:[]};
  archivesStages =          {icon:"fas fa-book",          nom:"Stages années précédentes", lien:"/archive-stages", items:[]};

  faq =                     {icon:"fas fa-question",      nom:"FAQ",                  lien:"/faq", items:[]};
  nousContacter =           {icon:"fas fa-comment",       nom:"Nous contacter",       lien:"/nous-contacter", items:[]};

  documentation =           {icon:"fas fa-book",          nom:"Documentation",        lien:"/documentation", items:[]};
  gitlab =                  {icon:"fab fa-gitlab",        nom:"Lien du GitLab",       lien:"/gitlab", items:[]};
  contacterSupport =        {icon:"fas fa-comment",       nom:"Contacter le support", lien:"/support", items:[]};

  exporterCSV = {icon:"fas fa-file-csv", nom:"Exporter CSV", lien:"/", items:[
    {icon:"", nom:"Les stages", lien:"/stages-csv"},
    {icon:"", nom:"Les soutenances", lien:"/soutenances-csv"},
    {icon:"", nom:"Les notes de stage", lien:"/notes-de-stage-csv"}]};

  telechargerPDF = {icon:"fas fa-download", nom:"Télécharger", items:[
    {icon:"fas fa-border-all", nom:"Feuille de stage", lien:"/fiche-stage"},
    {icon:"", nom:"Fiche entreprise", lien:"/fiche-entreprise"},
    {icon:"", nom:"Fiche de notation", lien:"/fiche-notation"}]};


  navigationInvite = [
    {
      title:"Stage",
      items: [ this.listeStages, this.planingSoutenance]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  navigationEtudiant = [
    {
      title:"Stage",
      items: [ this.listeStages, this.saisirStage, this.planingSoutenance]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  navigationTuteur = [
    {
      title:"Stage",
      items: [ this.listeStages, this.saisirFicheSuivi, this.planingSoutenance]
    },
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  navigationRepresentantEntreprise = [
    {
      title:"Stage",
      items: [ this.listeStages, this.saisirStage, this.saisirFicheSuivi, this.planingSoutenance]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  navigationResponsableParcours = [
    {
      title:"Stage",
      items: [ this.listeStages, this.saisirFicheSuivi, this.planingSoutenance]
    },
    {
      title:"Documents",
      items: []
    },
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  navigationSecretaire = [
    {
      title:"Administration",
      items: [ this.listeStages, this.listeUtilisateurs, this.listeEntreprise, this.listeSoutenances, this.listeParcours]
    },
    {
      title:"Stage",
      items: [ this.saisirStage, this.saisirFicheSuivi, this.planingSoutenance]
    },
    {
      title:"Documents",
      items: [ this.exporterCSV, this.telechargerPDF,]
    },
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },
    {
      title:"Besoin d'aide ?",
      items: [ this.faq, this.nousContacter]
    }
  ];

  public isAuth: boolean | undefined;

  private isAuthSub: Subscription | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private testService: TestService) { }

  ngOnInit(): void {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  choixNavigation() : any{
    switch (this.testService.getRole()){
      case "admin":
      case "secretaire":
        return this.navigationSecretaire;
      case "etudiant":
        return this.navigationEtudiant;
      case "tuteur":
        return this.navigationTuteur;
      case "respParcours":
        return this.navigationResponsableParcours;
      case "repEntreprise":
        return this.navigationRepresentantEntreprise;
      case "invite":
          return this.navigationInvite;
      default:
        return this.navigationInvite;
    }
  }





}
