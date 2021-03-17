import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// forms components
import { FormUserComponent } from './components/forms/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/forms/form-entreprise/form-entreprise.component';
import { FormParcoursComponent } from './components/forms/form-parcours/form-parcours.component';
// modal component
import { ModalComponent } from './components/modal/modal.component';
// navigation component
import { NavigationComponent } from './components/navigation/navigation.component';
// buttons components
import { ButtonAddComponent } from './components/buttons/button-add/button-add.component';
// cards components
import { CardComponent } from './components/cards/card/card.component';
import { CardItemStageComponent } from './components/cards/card-item-stage/card-item-stage.component';
import { CardItemCommentComponent } from './components/cards/card-item-comment/card-item-comment.component';



@NgModule({
  declarations: [
    FormUserComponent, 
    FormEntrepriseComponent, 
    ModalComponent, 
    NavigationComponent, 
    FormParcoursComponent, 
    ButtonAddComponent, 
    CardComponent, 
    CardItemStageComponent, 
    CardItemCommentComponent],
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
    CardItemStageComponent,
    CardItemCommentComponent]
})
export class SharedModule { }
