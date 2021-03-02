import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileUserComponent } from './profile-user/profile-user.component';
import { InfoUserComponent } from './info-user/info-user.component';



@NgModule({
  declarations: [ProfileUserComponent, InfoUserComponent],
  imports: [
    CommonModule
  ],exports:[ProfileUserComponent],
})
export class UserModule { }
