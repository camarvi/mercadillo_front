import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
//TRABAJAR CON FORMULARIOS
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// IMPORTAR EL ROUTING
import { AppRoutingModule } from './app-routing.module';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
