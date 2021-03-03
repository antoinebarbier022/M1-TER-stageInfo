import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { ProfileUserComponent } from './profile-user/profile-user.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [ProfileUserComponent, InfoUserComponent, ListUsersComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],exports:[ProfileUserComponent, InfoUserComponent, ListUsersComponent],
})
export class UserModule { }
