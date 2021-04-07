import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { UserModel } from '../../core/models/UserModel';
import { NameRoleUser, RoleUser } from '../enums/RoleUser';

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

  public allNamesRoles = [
    NameRoleUser.INVITE,
    NameRoleUser.ETUDIANT,
    NameRoleUser.TUTEUR,
    NameRoleUser.REPRESENTANT_ENTREPRISE,
    NameRoleUser.RESPONSABLE_PARCOURS,
    NameRoleUser.RESPONSABLE_PEDAGOGIQUE,
    NameRoleUser.SECRETAIRE,
    NameRoleUser.ADMIN,
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

  onLogout() {
    this.authService.logout();

  }

  changeDisplaySidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarEvent.emit(this.showSidebar);
  }

  isAdmin():boolean{
    return this.getRole() == RoleUser.ADMIN;
  }

  getRole():any{
    return this.authService.getRole();
  }
  getEmail(){
    return this.authService.getEmail();
  }

  getViewRole():any{ // on recupère le role de test
    return this.authService.getViewRole();
  }

  nameRole(role:RoleUser):any{
    switch (role) {
      case RoleUser.INVITE:     return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:   return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:     return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE: return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:      return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_PEDAGOGIQUE:  return NameRoleUser.RESPONSABLE_PEDAGOGIQUE;

      default: return NameRoleUser.UNDEFINED;
    }
  }

  nameViewRole():any{
    switch (this.getViewRole()) {
      case RoleUser.INVITE:     return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:   return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:     return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE: return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:      return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_PEDAGOGIQUE:  return NameRoleUser.RESPONSABLE_PEDAGOGIQUE;

      default: return NameRoleUser.UNDEFINED;
    }
  }

  setViewRole(role:RoleUser){
    this.authService.setViewRole(role);
  }

  ngOnDestroy() {
  this.isAuthSub?.unsubscribe();
  }
}

