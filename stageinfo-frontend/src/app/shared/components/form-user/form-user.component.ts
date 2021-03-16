import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() addUser: boolean = false;
  @Input() editUser: boolean = false;
  @Input() viewUser: boolean = false;
  Message: string = "";

  @Input() title: string = "";

  user = {
    nom :"toto",
    prenom :"mateo",
    email :"titi@gmail.com",
    telephone :"089098",
    fax :"83839200",
    hash :"ndjcndj",
    role :"admin",

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

  roles = ["test", "invite", "etudiant","tuteur", "respEntreprise", "secretaire", "admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];
  parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"];

  constructor(private auth: AuthService) {
    this.displaySection(this.user.role);
  }

  ngOnInit(): void {
  }


  displaySection(role : string){
    switch (role) {
      case "respEntreprise":
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = true;
          break;
      case "etudiant":
          this.displaySectionEtudiant = true;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case "tuteur":
      case "secretaire":
      case "admin":
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case "invite":
      default:
        this.displaySectionEtudiant = false;
        this.displaySectionCoordonnees = false;
        this.displaySectionEntreprise = false;
        break;
    }
  }
  onSignup() {
    const prenom = this.user.prenom;
    const nom = this.user.nom;
    const email = this.user.email;
    const password = this.user.hash;
    const rolee = this.user.role;
    const numeroEtudiant=this.user.numeroEtudiant;
    const Promotion="" ;//  à faire
    const idParcours= "" ;// à faire
    const Fax = this.user.fax;
    const telephone = this.user.telephone;
    const fonction = this.user.fonction;
    const identreprise =" " ;// à faire
    this.auth.createNewUser(prenom,nom,email, password,rolee,numeroEtudiant,Promotion,idParcours,Fax,telephone,fonction,identreprise).then(
      () => {
        this.Message = "Utilisateur crée !! "
      }
    ).catch(
      (error) => {

        this.Message = error.message;
      }
    );
  }


}
