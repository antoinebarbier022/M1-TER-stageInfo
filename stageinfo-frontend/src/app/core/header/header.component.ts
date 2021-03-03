import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

import {AuthService} from "../services/auth.service";
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuth: boolean | undefined;
  monRole = "invite";

  private isAuthSub: Subscription | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private testService: TestService) { }

  ngOnInit(): void {
    this.monRole = this.testService.getRole();
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );}


  setRole(role:string){
    this.monRole = role;
    this.testService.setRole(role);
  }


}

