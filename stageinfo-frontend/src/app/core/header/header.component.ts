import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { UserModel } from '../../core/models/UserModel';
import { RoleUser } from '../enums/RoleUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: UserModel | undefined;
  public isAuth: boolean | undefined;

  public allRoles = [
    RoleUser.INVITE,
    RoleUser.ETUDIANT,
    RoleUser.TUTEUR,
    RoleUser.REPRESENTANT_ENTREPRISE,
    RoleUser.RESPONSABLE_PARCOURS,
    RoleUser.RESPONSABLE_PEDAGOGIQUE,
    RoleUser.SECRETAIRE,
    RoleUser.ADMIN,
  ];

  getSwitch():boolean{
    return this.authService.getViewAllRoute();
  }

  changeSwitch(){
    this.authService.changeViewAllRoute();
  }

  @Input() onlyTitle = false;
  @Input() showSidebar = true;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  private isAuthSub: Subscription | undefined;
  monEmail: Object | undefined;
  constructor(private authService: AuthService,
              private router: Router,
              private userservice: UserService) {
  }

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      });

  }

  ngOnChanges(){

  }

  onLogout() {
    this.authService.logout();

  }

  changeDisplaySidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarEvent.emit(this.showSidebar);
  }

  isAdmin(){
    return this.getRole() == RoleUser.ADMIN;
  }

  getRole(){
    return this.authService.getRole();
  }
  getEmail(){
    return this.authService.getEmail();
  }

  getViewRole(){ // on recupère le role de test
    return this.authService.getViewRole();
  }
  setViewRole(role:RoleUser){
    this.authService.setViewRole(role);
  }

  ngOnDestroy() {
  this.isAuthSub?.unsubscribe();
  }
}

