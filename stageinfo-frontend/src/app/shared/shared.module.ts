import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FormUserComponent } from './components/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/form-entreprise/form-entreprise.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormParcoursComponent } from './components/form-parcours/form-parcours.component';
import { ButtonAddComponent } from './components/buttons/button-add/button-add.component';
import { CardComponent } from './components/card/card.component';
import { CardItemStageComponent } from './components/card-item-stage/card-item-stage.component';



@NgModule({
  declarations: [
    FormUserComponent, 
    FormEntrepriseComponent, 
    ModalComponent, 
    NavigationComponent, 
    FormParcoursComponent, 
    ButtonAddComponent, 
    CardComponent, 
    CardItemStageComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[
    FormUserComponent, 
    FormEntrepriseComponent, 
    ModalComponent, 
    NavigationComponent,
    FormParcoursComponent,
    ButtonAddComponent,
    CardComponent,
    CardItemStageComponent]
})
export class SharedModule { }
