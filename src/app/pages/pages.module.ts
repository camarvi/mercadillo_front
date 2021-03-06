import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { AltausuarioComponent } from './usuario/altausuario/altausuario.component';
import { FormsModule }   from '@angular/forms';
//import { BuscardniComponent } from './usuario/buscardni/buscardni.component';
import { BuscarComponent } from './usuario/buscar/buscar.component';
import { MercadilloComponent } from './mercadillo/mercadillo/mercadillo.component';
import { BuscarmercadilloComponent } from './mercadillo/buscarmercadillo/buscarmercadillo.component';
import { ParcelaComponent } from './parcelas/parcela/parcela.component';
import { ListadoparcelasComponent } from './parcelas/listadoparcelas/listadoparcelas.component';
import { TarifaComponent } from './tarifas/tarifa/tarifa.component';
import { AutorizadosComponent } from './autorizados/autorizados/autorizados.component';
import { AsignaparcelaComponent } from './parcelas/asignaparcela/asignaparcela.component';
import { HistoricoComponent } from './movimientos/historico/historico.component';
import { BuscaparcelaComponent } from './parcelas/buscaparcela/buscaparcela.component';
import { DetalleComponent } from './movimientos/detalle/detalle.component';
import { AsignadosComponent } from './informes/asignados/asignados.component';
import { EditamovimientoComponent } from './movimientos/editamovimiento/editamovimiento.component';
import { BajaAdjComponent } from './movimientos/baja-adj/baja-adj.component';
import { VacantesComponent } from './informes/vacantes/vacantes.component';
import { ParcelasperComponent } from './informes/parcelasper/parcelasper.component';
import { MovpersonasComponent } from './movimientos/movpersonas/movpersonas.component';
import { AutorizadosperComponent } from './informes/autorizadosper/autorizadosper.component';
import { DiasventaComponent } from './diasventa/diasventa.component';



@NgModule({
  declarations: [
    HomeComponent,
    AltausuarioComponent,
   // BuscardniComponent,
    BuscarComponent,
    MercadilloComponent,
    BuscarmercadilloComponent,
    ParcelaComponent,
    ListadoparcelasComponent,
    TarifaComponent,
    AutorizadosComponent,
    AsignaparcelaComponent,
    HistoricoComponent,
    BuscaparcelaComponent,
    DetalleComponent,
    AsignadosComponent,
    EditamovimientoComponent,
    BajaAdjComponent,
    VacantesComponent,
    ParcelasperComponent,
    MovpersonasComponent,
    AutorizadosperComponent,
    DiasventaComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
