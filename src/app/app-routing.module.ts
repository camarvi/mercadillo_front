import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { AltausuarioComponent } from './pages/usuario/altausuario/altausuario.component';
//import { BuscardniComponent } from './pages/usuario/buscardni/buscardni.component';
import { BuscarComponent } from './pages/usuario/buscar/buscar.component';
import { MercadilloComponent } from './pages/mercadillo/mercadillo/mercadillo.component';
import { BuscarmercadilloComponent } from './pages/mercadillo/buscarmercadillo/buscarmercadillo.component';
import { ListadoparcelasComponent } from './pages/parcelas/listadoparcelas/listadoparcelas.component';
import { ParcelaComponent  } from './pages/parcelas/parcela/parcela.component';
import { TarifaComponent } from './pages/tarifas/tarifa/tarifa.component';

import { AutorizadosComponent } from './pages/autorizados/autorizados/autorizados.component';
import { AsignaparcelaComponent } from './pages/parcelas/asignaparcela/asignaparcela.component';

import { RouterModule, Routes } from '@angular/router';


const routes : Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'nuevousuario/:id', component: AltausuarioComponent },
  { path: 'buscarusuario', component: BuscarComponent },
  { path: 'mercadillo/:id' , component:MercadilloComponent},
  { path: 'buscarmercadillo', component: BuscarmercadilloComponent},
  { path: 'parcela/:id', component: ParcelaComponent},
  { path: 'listadoparcelas/:id/:desc', component: ListadoparcelasComponent},
  { path: 'tarifamer/:id/:desc', component: TarifaComponent },
  { path: 'autorizados/:id', component: AutorizadosComponent},
  { path: 'asignaparcela/:id', component : AsignaparcelaComponent},
  { path: '**', redirectTo : '/home'}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )
  ],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
