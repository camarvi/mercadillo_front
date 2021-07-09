import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { UsuariosGridComponent } from './usuarios-grid/usuarios-grid.component';
import { CargandoComponent } from './cargando/cargando.component';
import { NoresultadosComponent } from './noresultados/noresultados.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent
  ],
  exports : [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
