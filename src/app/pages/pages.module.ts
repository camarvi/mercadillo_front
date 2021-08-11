import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { AltausuarioComponent } from './usuario/altausuario/altausuario.component';
import { FormsModule }   from '@angular/forms';
import { BuscardniComponent } from './usuario/buscardni/buscardni.component';
import { BuscarComponent } from './usuario/buscar/buscar.component';
import { MercadilloComponent } from './mercadillo/mercadillo/mercadillo.component';
import { BuscarmercadilloComponent } from './mercadillo/buscarmercadillo/buscarmercadillo.component';
import { ParcelaComponent } from './parcelas/parcela/parcela.component';
import { ListadoparcelasComponent } from './parcelas/listadoparcelas/listadoparcelas.component';
import { TarifaComponent } from './tarifas/tarifa/tarifa.component';
import { AutorizadosComponent } from './autorizados/autorizados/autorizados.component';
import { AsignaparcelaComponent } from './parcelas/asignaparcela/asignaparcela.component';
import { HistoricoComponent } from './movimientos/historico/historico.component';



@NgModule({
  declarations: [
    HomeComponent,
    AltausuarioComponent,
    BuscardniComponent,
    BuscarComponent,
    MercadilloComponent,
    BuscarmercadilloComponent,
    ParcelaComponent,
    ListadoparcelasComponent,
    TarifaComponent,
    AutorizadosComponent,
    AsignaparcelaComponent,
    HistoricoComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
