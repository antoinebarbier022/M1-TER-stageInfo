import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// forms components
import { FormUserComponent } from './components/forms/form-user/form-user.component';
import { FormEntrepriseComponent } from './components/forms/form-entreprise/form-entreprise.component';
import { FormParcoursComponent } from './components/forms/form-parcours/form-parcours.component';

// modal component
import { ModalComponent } from './components/modal/modal.component';
import { ListFilterComponent } from './components/cards/card-filter/card-filter.component';
import { ListPaginationComponent } from './components/pagination/pagination.component';
import { ListEntriesNumberComponent } from './components/nbItems/nbItems.component';

// navigation component
import { NavigationComponent } from './components/navigation/navigation.component';
// buttons components
import { ButtonAddComponent } from './components/buttons/button-add/button-add.component';
// cards components
import { CardComponent } from './components/cards/card/card.component';
import { CardItemStageComponent } from './components/cards/card-item-stage/card-item-stage.component';
import { CardItemCommentComponent } from './components/cards/card-item-comment/card-item-comment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ButtonEditComponent } from './components/buttons/button-edit/button-edit.component';
import { ButtonDeleteComponent } from './components/buttons/button-delete/button-delete.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { FormStageComponent } from './components/forms/form-stage/form-stage.component';
import { CardMapComponent } from './components/cards/card-map/card-map.component';
import { StateBadgeComponent } from './components/badges/state-badge/state-badge.component';
import { GestionEtatStageComponent } from './components/gestion-etat-stage/gestion-etat-stage.component';



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
    CardItemCommentComponent, 
    DateAgoPipe, 
    ButtonEditComponent, 
    ButtonDeleteComponent, 
    ListFilterComponent, 
    ListPaginationComponent, 
    ListEntriesNumberComponent, 
    CardTableComponent, 
    FormStageComponent, 
    CardMapComponent, 
    StateBadgeComponent, 
    GestionEtatStageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    CardItemCommentComponent,
    DateAgoPipe,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ListFilterComponent, 
    ListPaginationComponent, 
    ListEntriesNumberComponent,
    CardTableComponent,
    FormStageComponent,
    CardMapComponent,
    StateBadgeComponent,
    GestionEtatStageComponent
  ]
})
export class SharedModule { }
