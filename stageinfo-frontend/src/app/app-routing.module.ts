import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
