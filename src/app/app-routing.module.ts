import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { AltausuarioComponent } from './pages/usuario/altausuario/altausuario.component';
//import { BuscardniComponent } from './pages/usuario/buscardni/buscardni.component';
import { BuscarComponent } from './pages/usuario/buscar/buscar.component';


import { RouterModule, Routes } from '@angular/router';


const routes : Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'nuevousuario/:id', component: AltausuarioComponent },
  { path: 'buscarusuario', component: BuscarComponent },
  { path: '**', redirectTo : '/home'}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
