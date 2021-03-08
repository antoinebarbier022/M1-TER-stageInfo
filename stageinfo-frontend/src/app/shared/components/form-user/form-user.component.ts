import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() addUser: boolean = false;
  @Input() editUser: boolean = false;
  @Input() viewUser: boolean = false;

  @Input() title: string = "";

  user = {
    nom :"toto",
    prenom :"mateo",
    email :"titi@gmail.com",
    telephone :"089098",
    fax :"83839200",
    hash :"ndjcndj",
    role :"test",
    
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

  roles = ["test", "Invite", "Etudiant","Tuteur", "Représentant entreprise", "Secretaire", "Admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];
  parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"];

  constructor() { 
    this.displaySection(this.user.role);
  }

  ngOnInit(): void {
  }


  displaySection(role : string){
    switch (role) {
      case "test":
          this.displaySectionEtudiant = true;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = true;
          break;
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
