import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
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
  @Input() selectedUser: userModel = new userModel();
  @Input() viewUser: boolean = false;

  @Input() idUser: any = '';

  @Output() userEvent = new EventEmitter<userModel>();

  Message: string = "";

  user: userModel = new userModel();
  //public role: string = '';

  // Boolean pour l'affichage des sections
  displaySectionEtudiant = false;
  displaySectionCoordonnees = false;
  displaySectionEntreprise = false;


  // @ts-ignore
  userForm: FormGroup;

  //roles = ["invite", "etudiant","tuteur", "respEntreprise", "secretaire", "admin"];
  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];
  //parcours = ["M2 AIGLE", "M2 MIT","M2 DECOL", "M2 IMAGINA"];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private auth: AuthService) { 
    this.selectedUser = new userModel();
  }

  ngOnInit(): void {
    this.initForm();


    if(this.editUser){
      this.idUser = this.selectedUser._id;
    }

    this.displaySection(this.user.role);
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required], 
      email: ['',Validators.required],
      telephone: '',
      fax:'',
      password: ['',Validators.required],
      role: ['',Validators.required],

      // Étudiant
      numeroEtudiant: '',
      promotion:'',
      parcours:'',

      // Entreprise
      fonction:'',
      entreprise:''
    });
  }


  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new userModel(
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
    
    if(this.addUser){
      this.userService.addUser(newUser).subscribe(x => {
        console.log(x);
      });
    }
    else{
      newUser.email = this.selectedUser.email;
      this.userService.updateUser(this.idUser,newUser).subscribe(x => {
        console.log(x);
      });
    }
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
