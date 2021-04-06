import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ProfileUserComponent } from './profile-user/profile-user.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserV2Component } from './edit-user-v2/edit-user-v2.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ImportUsersComponent } from './import-users/import-users.component';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';



@NgModule({
  declarations: [
    ProfileUserComponent,
    InfoUserComponent,
    ListUsersComponent,
    EditUserComponent,
    EditUserV2Component,
    AddUserComponent,
    ImportUsersComponent,
    ListEtudiantsComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
    ],exports:[
    ProfileUserComponent,
    InfoUserComponent,
    ListUsersComponent,
    EditUserComponent,
    EditUserV2Component,
    AddUserComponent,
    ImportUsersComponent,
    ListEtudiantsComponent],
})
export class UserModule { }
