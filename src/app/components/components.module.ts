import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { UsuariosGridComponent } from './usuarios-grid/usuarios-grid.component';
import { CargandoComponent } from './cargando/cargando.component';
import { NoresultadosComponent } from './noresultados/noresultados.component';
import { MercadillosGridComponent } from './mercadillos-grid/mercadillos-grid.component';
import { ParcelasGridComponent } from './parcelas-grid/parcelas-grid.component';
import { TarifasGridComponent } from './tarifas-grid/tarifas-grid.component';
import { ParentescoGridComponent } from './parentesco-grid/parentesco-grid.component';
import { MovimientosGridComponent } from './movimientos-grid/movimientos-grid.component';
import { AsignadosGridComponent } from './asignados-grid/asignados-grid.component';
import { ParcelaslibresGridComponent } from './parcelaslibres-grid/parcelaslibres-grid.component';
import { ParcelasperGridComponent } from './parcelasper-grid/parcelasper-grid.component';
import { MovpersonasGridComponent } from './movpersonas-grid/movpersonas-grid.component';
import { AutorizadospersonasGridComponent } from './autorizadospersonas-grid/autorizadospersonas-grid.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent,
    MercadillosGridComponent,
    ParcelasGridComponent,
    TarifasGridComponent,
    ParentescoGridComponent,
    MovimientosGridComponent,
    AsignadosGridComponent,
    ParcelaslibresGridComponent,
    ParcelasperGridComponent,
    MovpersonasGridComponent,
    AutorizadospersonasGridComponent
  ],
  exports : [
    NavbarComponent,
    UsuariosGridComponent,
    CargandoComponent,
    NoresultadosComponent,
    MercadillosGridComponent,
    ParcelasGridComponent,
    TarifasGridComponent,
    ParentescoGridComponent,
    MovimientosGridComponent,
    AsignadosGridComponent,
    ParcelaslibresGridComponent,
    ParcelasperGridComponent,
    MovpersonasGridComponent,
    AutorizadospersonasGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
