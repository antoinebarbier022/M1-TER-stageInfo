import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { FormEntrepriseComponent } from './components/form-entreprise/form-entreprise.component';



@NgModule({
  declarations: [FormUserComponent, FormEntrepriseComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[FormUserComponent]
})
export class SharedModule { }
