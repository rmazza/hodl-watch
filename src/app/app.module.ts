import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CryptoDashboardModule } from './crypto-dashboard/crypto-dashboard.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CryptoDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
