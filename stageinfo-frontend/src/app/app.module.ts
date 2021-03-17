import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';


// importation mes modules
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    // Loading bar
    LoadingBarRouterModule,
    LoadingBarModule,

    PagesModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // Permet de commencer la bar de chargement un peu plus tard (quand ça commence à faire long)
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
