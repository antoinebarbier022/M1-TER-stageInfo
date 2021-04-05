import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserModel } from 'src/app/core/models/userModel';
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
  @Input() selectedUser: UserModel = new UserModel();
  @Input() viewUser: boolean = false;

  @Input() idUser: any = '';

  @Output() userEvent = new EventEmitter<UserModel>();

  Message: string = "";

  user: UserModel = new UserModel();
  allParcours: any;
  allEntreprises: any;

  // Boolean pour l'affichage des sections
  displaySectionEtudiant = false;
  displaySectionCoordonnees = false;
  displaySectionEntreprise = false;


  // @ts-ignore
  userForm: FormGroup;

  //roles = ["invite", "etudiant","tuteur", "respEntreprise", "secretaire", "admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private userService: UserService) { 
    this.selectedUser = new UserModel();
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allEntreprises = this.route.snapshot.data.allEntreprises;
  }

  ngOnInit(): void {
    this.initForm();

    if(!this.addUser){
      this.idUser = this.selectedUser._id;
      this.setInputForm(this.selectedUser._id);
    }
    this.displaySection(this.selectedUser.role);
    this.onRoleValueChanges();
  }

  // detecte les changements de valeur pour le role
  onRoleValueChanges(): void {
    console.log("changement de role utilisateur");
    this.userForm.get('role')?.valueChanges.subscribe((newRole: any)=>{
      this.displaySection(newRole);
    });
  }

  // lorsque le user selectionner à changer :
  ngOnChanges(){
    this.initForm();
    if(!this.addUser){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idUser = this.selectedUser._id;
      this.setInputForm(this.selectedUser._id);
    } 
    this.displaySection(this.selectedUser.role);
    this.onRoleValueChanges();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      telephone: '',
      fax:'',
      password: ['',Validators.required],
      role: ['',Validators.required],

      // Étudiant
      numeroEtudiant: [''],
      promotion:'',
      parcours:null,

      // Entreprise
      fonction:'',
      entreprise:null
    });
  }

  setInputForm(id:any){
    // récupération des données du user
    this.userService.getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_parcours: any) => {
        this.user = _parcours;
        // On set les données du user dans le formulaire
        this.userForm.patchValue({
          nom: _parcours.nom,
          prenom: _parcours.prenom,
          email: _parcours.email,
          telephone: _parcours.telephone,
          fax: _parcours.fax,
          password: _parcours.password,
          role: _parcours.role,

          // Étudiant
          numeroEtudiant: _parcours.numeroEtudiant,
          promotion: _parcours.promotion,
          parcours: _parcours.parcours?._id,

          // Entreprise
          fonction: _parcours.fonction,
          entreprise: _parcours.entreprise?._id
        });
      });
  }

  


  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new UserModel(
      this.idUser,
      formValue['nom'],
      formValue['prenom'],
      formValue['email'],
      formValue['telephone'],
      formValue['fax'],
      formValue['password'],
      formValue['role'],

      // Étudiant
      formValue['numeroEtudiant'],
      formValue['promotion'],
      formValue['parcours'],

      // Entreprise
      formValue['fonction'],
      formValue['entreprise']
    );

    console.log(newUser);
    
    if(this.addUser){
      this.ajouterUser(newUser);
    }
    else{
      this.modifierUser(this.idUser, newUser);
    }
  }

  ajouterUser(user:any){
    this.userService.addUser(user)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " ajouté à la plateforme !");
        this.userForm.reset();  // on reset les données dans le forumulaire
    });
  }

  modifierUser(id:any, user:any){
    this.userService.updateUser(id, user)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " modifié !");
        this.userForm.reset(); // on reset les données dans le forumulaire
        this.userEvent.emit(user); // on envoie le parcours dans le component parent
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  displaySection(role : string){

    switch (role) {
      case "representantEntreprise":
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
      case "responsableParcours":
      case "responsablePedagogique":
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
}
