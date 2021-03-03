import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup;
  loading = false;
  // @ts-ignore
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
            ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password).then(
      () => {
        this.loading = false;
        this.router.navigate(['/']);
      }
    ).catch(
      (error: { message: string; }) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
