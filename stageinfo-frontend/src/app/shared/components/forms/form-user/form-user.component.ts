import { Component, OnInit, Input } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { userModel } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() title: string = "";

  @Input() addUser: boolean = false;
  @Input() editUser: boolean = false;
  @Input() viewUser: boolean = false;

  @Input() idUser : any = undefined;

  Message: string = "";

  user: userModel = new userModel();

  // Boolean pour l'affichage des sections
  displaySectionEtudiant = false;
  displaySectionCoordonnees = false;
  displaySectionEntreprise = false;

  roles = ["invite", "etudiant","tuteur", "respEntreprise", "secretaire", "admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];
  parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private auth: AuthService) { }

  ngOnInit(): void {
    if(!this.addUser){
      this.user = this.route.snapshot.data.user;
    }
    this.displaySection(this.user.role);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUser(id:any) {
    this.userService.getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_user: userModel) => {
        this.user = _user;
        //this.displaySection(this.user.role);
      }, (_error:any) =>{
        // redirection vers la page d'erreur 404 si le stage n'est pas trouvé
        if(_error.status == "404"){
          this.router.navigate(['not-found']);
        }
      }
    );
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
    this.auth.createNewUser(nom, prenom, email, password,rolee,numeroEtudiant,Promotion,idParcours,Fax,telephone,fonction,identreprise).then(
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
