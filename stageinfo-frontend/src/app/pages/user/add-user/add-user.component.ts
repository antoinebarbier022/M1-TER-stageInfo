import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  title = "Ajouter un utilisateur"
  user = {
    nom :"toto",
    prenom :"mateo",
    email :"titi@gmail.com",
    telephone :"089098",
    fax :"83839200",
    hash :"ndjcndj",
    role :"Admin",
    
    //etudiant
    numeroEtudiant :"12345689",
    promotion :"2019/2020",
    parcours :"M2 IMAGINA",
    
    // representant_entreprise
    fonction :"dj",
    entreprise :"dk",
  };

  // Boolean pour l'affichage des sections
  displaySectionEtudiant = false;
  displaySectionCoordonnees = false;
  displaySectionEntreprise = false;

  roles = ["Invite", "Etudiant","Tuteur", "Représentant entreprise", "Secretaire", "Admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];
  parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"]

  constructor() { 
    this.displaySection(this.user.role);
  }

  ngOnInit(): void {
  }

  displaySection(role : string){
    switch (role) {
      case "Représentant entreprise":
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = true;
          break;
      case "Etudiant":
          this.displaySectionEtudiant = true;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case "Tuteur":
      case "Secretaire":
      case "Admin":
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case "Invite":
      default:
        this.displaySectionEtudiant = false;
        this.displaySectionCoordonnees = false;
        this.displaySectionEntreprise = false;
        break;
    }
  }

}
