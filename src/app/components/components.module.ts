import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { UsuariosGridComponent } from './usuarios-grid/usuarios-grid.component';
import { CargandoComponent } from './cargando/cargando.component';
import { NoresultadosComponent } from './noresultados/noresultados.component';
import { MercadillosGridComponent } from './mercadillos-grid/mercadillos-grid.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent,
    MercadillosGridComponent
  ],
  exports : [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent,
    MercadillosGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
