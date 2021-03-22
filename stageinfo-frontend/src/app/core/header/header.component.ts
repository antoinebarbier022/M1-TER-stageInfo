import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

import {AuthService} from "../services/auth.service";
import { TestService } from '../services/test.service';
import {UserService} from "../services/user.service";
import {userModel} from "../models/userModel";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: userModel | undefined
  public isAuth: boolean | undefined;
  monRole = "admin";
  @Input() onlyTitle = false;
  @Input() showSidebar = true;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  private isAuthSub: Subscription | undefined;
  monEmail: Object | undefined;
  constructor(private auth: AuthService,
              private router: Router,
              private testService: TestService,
              private userservice: UserService) {
  }

  ngOnInit(): void {
    this.monRole = this.testService.getRole();
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      });
      //this.userservice.getemailById(this.auth.getUserid()).subscribe( 
      //(email) => { this.monEmail=email; });
  }

  /*ngOnChanges(){
    this.userservice.getemailById(this.auth.getUserid()).subscribe(
      (email) => { this.monEmail=email; });
  }*/
  
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  changeDisplaySidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarEvent.emit(this.showSidebar);
  }


  setRole(role:string){
    this.monRole = role;
    this.testService.setRole(role);
  }
  ngOnDestroy() {
  this.isAuthSub?.unsubscribe();
  }
}

