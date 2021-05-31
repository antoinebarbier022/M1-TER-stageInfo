import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleUser } from 'src/app/core/enums/RoleUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService} from "../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // @ts-ignore
  emailForm: FormGroup;
  email:String = '';
  alert: Boolean =false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  // @ts-ignore
  contactForm: FormGroup;
  // @ts-ignore
  errorMessage: String;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService ) { }

  ngOnInit(): void {


    this.contactForm = this.formBuilder.group({
      message:['', Validators.required]
    });
    this.userService.getEmailContact()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
          this.email=_res.email;
          this.emailForm = this.formBuilder.group({
            email:[this.email, [Validators.required,Validators.email]]
          });
        },
        error => {

          console.log(error)
        });
    this.emailForm = this.formBuilder.group({
      email:[this.email, [Validators.required,Validators.email]]
    });

  }

  envoyerMessage(){
    const formValue = this.contactForm.value;
    var data :any = {
      dateMessage: new Date(),
      message: formValue['message'],
    };
    this.userService.getEmailContact()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
          this.email=_res.email;
          this.userService.sendEmail(this.email,'Contact StageInfo','Mail envoyé par '+this.authService.getEmail()+'<br>" '+data.message+' " ')
            .pipe()
            .subscribe((_res: any) => {
                console.log('email envoyé')

                this.alert=true;
              },
              error => {

                console.log(error)
              });

        },
        error => {

          console.log(error)
        });

  }


  updateContact(){
    const formValue = this.emailForm.value;
    var data :any = {
      email: formValue['email'],
    };
    this.userService.editEmailContact(this.emailForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
         console.log('email modifié')
        },
        error => {

         console.log(error)
        });

  }

  canEditEmail():boolean{
      switch (this.authService.getViewRole()) {
        case RoleUser.INVITE:
        case RoleUser.ETUDIANT:
        case RoleUser.REPRESENTANT_ENTREPRISE:

          return false;
        case RoleUser.ADMIN:
          return true;
        default:
          return false;
      }
    }

}
