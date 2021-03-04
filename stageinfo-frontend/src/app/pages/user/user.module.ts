import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { ProfileUserComponent } from './profile-user/profile-user.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserV2Component } from './edit-user-v2/edit-user-v2.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ImportUsersComponent } from './import-users/import-users.component';


@NgModule({
  declarations: [ProfileUserComponent, InfoUserComponent, ListUsersComponent, EditUserComponent, EditUserV2Component, AddUserComponent, ImportUsersComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],exports:[ProfileUserComponent, InfoUserComponent, ListUsersComponent],
})
export class UserModule { }
