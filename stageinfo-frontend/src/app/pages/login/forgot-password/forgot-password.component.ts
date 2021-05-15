import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Papa} from "ngx-papaparse";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // @ts-ignore
  importForm: FormGroup ;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.importForm = this.formBuilder.group({
      Email: ['',Validators.required],
    });
  }

  envoyer() {
console.log(this.importForm?.value['Email'])
  }
}
