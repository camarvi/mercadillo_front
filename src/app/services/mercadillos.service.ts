import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//import { DatePipe } from '@angular/common';

import { MercadilloInterface, Sexo, Tipovia } from '../interfaces/mercadillos-response';
import { ParcelaInterface } from '../interfaces/parcela-response';
import { DiaSemana } from '../interfaces/diasemana-response';
import { UsuarioModel } from '../models/usuario.model';
import { PersonaInterface, ParentescoInterface } from '../interfaces/mercadillos-response';
import { MercadilloModel } from '../models/mercadillo.model';
import { ParcelaModel } from '../models/parcela.model';
//import { TarifaInterface } from '../interfaces/tarifa-response';
import { TarifaModel } from '../models/tarifa.model';
import { TarifaInterface } from '../interfaces/tarifa-response';
import { AutorizadosInterface } from '../interfaces/autorizados-response';
import { AutorizadosModel } from '../models/autorizados.model';
import { ActividadesInterface } from '../interfaces/actividades-response';
import { MovimientoModel } from '../models/movimiento.model';
import { MovimientoDetallenterface, MoviPersonasInterface } from '../interfaces/movimiento-response';
import { AdjudicadosDetallenterface } from '../interfaces/informes-response';
import { EpigrafeIAEInterface } from '../interfaces/epigrafesiae-response';
import { PersonasPuestoInterface , AutorizadosPersonaInterface } from '../interfaces/informes-response';

import { DiasVentaUsuarioInterface } from '../interfaces/diasventausuario-response';
import { DiasVentaUsuarioModel } from '../models/diasventausuario.model';


@Injectable({
  providedIn: 'root'
})
export class MercadillosService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


// LLAMADAS A TABLAS AUXILIARES

  getActividades(): Observable<ActividadesInterface[]> {
    return this.http.get<ActividadesInterface[]>(`${this.baseUrl}/actividad`);
  }

  getSexo(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>(`${this.baseUrl}/sexo`);
  }

  getTipoVia(): Observable<Tipovia[]> {
    return this.http.get<Tipovia[]>(`${this.baseUrl}/tipovia`);
  }

  getDiaSemana(): Observable<DiaSemana[]> {
    return this.http.get<DiaSemana[]>(`${this.baseUrl}/diassemana`);
  }

  getParentesco(): Observable<ParentescoInterface[]>{
    return this.http.get<ParentescoInterface[]>(`${this.baseUrl}/parentesco`);
  }

  getEpigrafesIae() : Observable<EpigrafeIAEInterface[]>{
    return this.http.get<EpigrafeIAEInterface[]>(`${this.baseUrl}/epigrafesiae`);
  }


//***************************************************************************** */
//****************************************************************************** */
// GESTION DE USUARIOS 

  crearUsuario(usuario: UsuarioModel) {

    return this.http.post(`${this.baseUrl}/persona`, usuario)
      .pipe(
        map((resp: any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          usuario.IDPERSONA = resp[0];
          return usuario;
        })
      );
  }


  updateUsuario(usuario: UsuarioModel) {

    return this.http.put(`${this.baseUrl}/persona/${usuario.IDPERSONA}`, usuario);

  }


  buscarUsuarioAp1(ap1: string): Observable<PersonaInterface[]> {

    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_ap/${ap1}`);

  }

  buscarUsuarioAp1Ap2(ap1: string, ap2: string): Observable<PersonaInterface[]> {
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_ap/${ap1}/${ap2}`);
  }

  buscarUsuarioNombre(nombre: string, ap1: string): Observable<PersonaInterface[]> {
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_nombre/${nombre}/${ap1}`);
  }

  buscarUsuarioNif(nif: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.baseUrl}/persona/${nif}`);
  }

  buscarUsuarioNifGrid(nif: string): Observable<PersonaInterface[]> {
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona/${nif}`);
  }

  buscarUsuarioId(id: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.baseUrl}/personaid/${id}`);
  }

  buscarMercadilloId(id: string): Observable<MercadilloModel> {
    return this.http.get<MercadilloModel>(`${this.baseUrl}/mercadillo/${id}`);
  }

  getMercadillos(): Observable<MercadilloInterface[]> {
    return this.http.get<MercadilloInterface[]>(`${this.baseUrl}/mercadillos`);
  }

  crearMercadillo(mercadillo: MercadilloModel) {

    return this.http.post(`${this.baseUrl}/mercadillo`, mercadillo)
      .pipe(
        map((resp: any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          mercadillo.IDMERCADILLO = resp[0];
          return mercadillo;
        })
      );
  }

  modificarMercadillo(mercadillo: MercadilloModel) {
    return this.http.put(`${this.baseUrl}/mercadillo/${mercadillo.IDMERCADILLO}`, mercadillo);
  }

  // ACTIVIDAD

  getActividadId(id : string) : Observable<ActividadesInterface> {
    return this.http.get<ActividadesInterface>(`${this.baseUrl}/actividad/${id}`);
  }


  // PARCELAS

  newParcela(parcela: ParcelaModel) {

   
    let miparcela = new ParcelaModel;
    miparcela = parcela;
    
    let anio = miparcela.FECHA_ALTA.slice(0, 4);
    let mes = miparcela.FECHA_ALTA.slice(5, 7);
    let dia = miparcela.FECHA_ALTA.slice(8, 10);
    //console.log(anio);
    //console.log(mes);
    //console.log(dia); 
    let fechaok = dia + "/" + mes + "/" + anio;
    miparcela.FECHA_ALTA = fechaok;
    miparcela.FECHA_ESTADO = fechaok;
    //console.log("Fechas Modificadas");
    //console.log(miparcela);

    //miparcela.FECHA_ALTA = datepipe.transform(parcela.FECHA_ALTA, 'dd/MM/YYYY');

    //console.log("NEWPARCELA");
    //console.log(parcela);
    return this.http.post(`${this.baseUrl}/parcela`, miparcela)
      .pipe(
        map((resp: any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          parcela.IDPARCELAS = resp[0];
          return parcela;
        })
      );
  }

  modificaParcela(parcela: ParcelaModel) {
    let miparcela = new ParcelaModel;
    miparcela = parcela;
    // Transformar la fecha para poder insertar en oracle
   // let anio = miparcela.FECHA_ESTADO.slice(0, 4);
   // let mes = miparcela.FECHA_ESTADO.slice(5, 7);
   // let dia = miparcela.FECHA_ESTADO.slice(8, 10);
   // //console.log(anio);
   // //console.log(mes);
   // //console.log(dia); 
   // let fechaok = dia + "/" + mes + "/" + anio;
   // miparcela.FECHA_ESTADO = fechaok;

    return this.http.put(`${this.baseUrl}/parcela/${parcela.IDPARCELAS}`, miparcela);

  }

  getParcelaId(id: string): Observable<ParcelaInterface> {
    return this.http.get<ParcelaInterface>(`${this.baseUrl}/parcela/${id}`);
  }

  getParcelasMer(id: string): Observable<ParcelaInterface[]> {
    return this.http.get<ParcelaInterface[]>(`${this.baseUrl}/parcelas_mer/${id}`);

  }

  getParcelaNumMer(merc: string, parc: string): Observable<ParcelaInterface> {
    return this.http.get<ParcelaInterface>(`${this.baseUrl}/parcela/${merc}/${parc}`)
    /* this.http.get<ParcelaInterface>(`${this.baseUrl}/parcela/${merc}/${parc}`)
     .subscribe(resp=>{
       if (resp[0]){
         //Ya existen esos datos
         return true;
       } else {
         return false;
       }
     });    */



  }

  modificaEstadoParcela(parcela : ParcelaModel) {
    //let miparcela = new ParcelaModel;
    //miparcela = parcela;
    //
    //let anio = miparcela.FECHA_ESTADO.slice(0, 4);
    //let mes = miparcela.FECHA_ESTADO.slice(5, 7);
    //let dia = miparcela.FECHA_ESTADO.slice(8, 10);
    //let fechaok = dia + "/" + mes + "/" + anio;
    //miparcela.FECHA_ESTADO = fechaok;
    console.log("Dentro de Modifica Estado Parcela");
    console.log(parcela); 
    return this.http.put(`${this.baseUrl}/modificaparcela/${parcela.IDPARCELAS}`, parcela);

  }

  getParcelasLibres(id : string) : Observable<ParcelaInterface[]> {
    return this.http.get<ParcelaInterface[]>(`${this.baseUrl}/parcelaslibres/${id}`);
  }

// TARIFAS


  getTarifasMer(id: string): Observable<TarifaInterface[]> {

    return this.http.get<TarifaInterface[]>(`${this.baseUrl}/tarifas/${id}`);
  }

  // newTarifaOLD(tarifa: TarifaModel) {

  //   let mitarifa = new TarifaModel;
  //   mitarifa = tarifa;
  //   let fechaFok;
  //   let anioA = mitarifa.F_INICIO.slice(0, 4);
  //   let mesA = mitarifa.F_INICIO.slice(5, 7);
  //   let diaA = mitarifa.F_INICIO.slice(8, 10);
  //   if (mitarifa.F_FIN!=null) {
  //     let anioF = mitarifa.F_FIN.slice(0, 4);
  //     let mesF = mitarifa.F_FIN.slice(5, 7);
  //     let diaF = mitarifa.F_FIN.slice(8, 10);
  //     fechaFok = diaF + "/" + mesF + "/" + anioF;

  //   } else {
  //     fechaFok = null;
  //   }

  //   let fechaAok = diaA + "/" + mesA + "/" + anioA;
  //   mitarifa.F_INICIO = fechaAok;
  //   mitarifa.F_FIN = fechaFok;


  //   return this.http.post(`${this.baseUrl}/tarifas`, mitarifa)
  //     .pipe(
  //       map((resp: any) => {
  //         //console.log("Respuesta de Node");
  //         //console.log(resp[0]);
  //         tarifa.IDTARIFA = resp[0];
  //         return tarifa;
  //       })
  //     );

  // }

  newTarifa(tarifa: TarifaModel) {

    return this.http.post(`${this.baseUrl}/tarifas`, tarifa)
      .pipe(
        map((resp: any) => {
          //console.log("Respuesta de Node");
          //console.log(resp[0]);
          tarifa.IDTARIFA = resp[0];
          return tarifa;
        })
      );

  }

  

  deleteTarifa(id: string) {
    return this.http.delete(`${this.baseUrl}/tarifas/${id}`);
  }

  updateTarifaOLD(tarifa : TarifaModel) {

    console.log("DENTRO DE UPDATE TARIFA")

    let mitarifa = new TarifaModel;
    mitarifa = tarifa;
    console.log(mitarifa);

    let fechaFok;
    let anioA = mitarifa.F_INICIO.slice(0, 4);
    let mesA = mitarifa.F_INICIO.slice(5, 7);
    let diaA = mitarifa.F_INICIO.slice(8, 10);
    if (mitarifa.F_FIN!=null) {
      let anioF = mitarifa.F_FIN.slice(0, 4);
      let mesF = mitarifa.F_FIN.slice(5, 7);
      let diaF = mitarifa.F_FIN.slice(8, 10);
      fechaFok = diaF + "/" + mesF + "/" + anioF;

    } else {
      fechaFok = null;
    }

    if (fechaFok ==="//") {
      fechaFok = null;
    }

    let fechaAok = diaA + "/" + mesA + "/" + anioA;
    mitarifa.F_INICIO = fechaAok;
    mitarifa.F_FIN = fechaFok;
  
    return this.http.put(`${this.baseUrl}/tarifas/${mitarifa.IDTARIFA}`, mitarifa)
      .pipe(
        map((resp: any) => {
          //console.log("Respuesta de Node");
          //console.log(resp[0]);
         // tarifa.IDTARIFA = resp[0];
          return tarifa;
        })
      );


  }


  updateTarifa(tarifa : TarifaModel) {

    console.log("DENTRO DE UPDATE TARIFA")

    //let mitarifa = new TarifaModel;
   // mitarifa = tarifa;
   // console.log(mitarifa);
    // return this.http.put(`${this.baseUrl}/tarifas/${mitarifa.IDTARIFA}`, mitarifa)
    //   .pipe(
    //     map((resp: any) => {
    //       return tarifa;
    //     })
    //   );
    
      return this.http.put(`${this.baseUrl}/tarifas/${tarifa.IDTARIFA}`, tarifa)
      .pipe(
        map((resp: any) => {
          return tarifa;
        })
      );
 

  }


// AUTORIZADOS

getAutorizados(id : string ): Observable<AutorizadosInterface[]> {
  return this.http.get<AutorizadosInterface[]>(`${this.baseUrl}/autorizados/${id}`);
}

deleteAutorizado(id : string) {
  return this.http.delete(`${this.baseUrl}/autorizados/${id}`);
}

newAutorizado( autorizado : AutorizadosModel) {
    return this.http.post(`${this.baseUrl}/autorizados`,autorizado)
      .pipe(
        map((resp : any)=>{
          autorizado.ID_AUTORIZADO = resp[0];
          return autorizado;
        })
      );
}

updateFAltaAutorizado ( autorizado : AutorizadosModel ) {
  return this.http.put(`${this.baseUrl}/autorizadofalta/${autorizado.ID_AUTORIZADO}`, autorizado);
}

updateFBajaAutorizado ( autorizado : AutorizadosModel ) {
  return this.http.put(`${this.baseUrl}/autorizadofbaja/${autorizado.ID_AUTORIZADO}`, autorizado);
}

// MODIFICAR FECHA ALTA Y FECHA BAJA


// MOVIMIENTOS


newMovimiento(movimiento: MovimientoModel) {

  return this.http.post(`${this.baseUrl}/movimiento`, movimiento)
    .pipe(
      map((resp: any) => {
        //console.log("Respuesta de Node");
        //console.log(resp[0]);
        movimiento.IDMOV = resp[0];
        return movimiento;
      })
    );

}


getDetallesMovimientos(id : string ) : Observable<MovimientoDetallenterface[]> {
  return this.http.get<MovimientoDetallenterface[]>(`${this.baseUrl}/movimientosdetalles/${id}`);
}

getMovimiento(id : string) : Observable<MovimientoDetallenterface> {
  return this.http.get<MovimientoDetallenterface>(`${this.baseUrl}/movimiento/${id}`);
}

updateMovimiento(movimiento : MovimientoModel){
  let mimovimiento = new MovimientoModel;
  mimovimiento = movimiento;
  return this.http.put(`${this.baseUrl}/movimiento/${mimovimiento.IDMOV}`, mimovimiento);

} 

 updateMovimientoNoActivo(movimiento : MovimientoDetallenterface) {
   let mimovimiento = new MovimientoModel;
   mimovimiento.IDMOV = movimiento.IDMOV;
   return this.http.put(`${this.baseUrl}/movimientonoactivo/${mimovimiento.IDMOV}`, mimovimiento);
 }

 getMovimientosPesona(id : string) : Observable<MoviPersonasInterface[]> {
    return this.http.get<MoviPersonasInterface[]>(`${this.baseUrl}/movimientosper/${id}`);
 }


// DIAS VENTA  - MULTITITULAR
//////////////////////
/////////////////////////
//////////////////////////////
/////////////////////////////
//////////////////////////////  DiasVentaUsuarioModel

// getDiasVentaUsuario(id : string) : Observable<DiasVentaUsuarioInterface> {
//   return this.http.get<DiasVentaUsuarioInterface>(`${this.baseUrl}/diasventamov/${id}`);
// }


getDiasVentaUsuario(id : string) : Observable<DiasVentaUsuarioModel> {
  return this.http.get<DiasVentaUsuarioModel>(`${this.baseUrl}/diasventamov/${id}`);
}



newDiasVentaUsuario(diasventa: DiasVentaUsuarioModel) {

  return this.http.post(`${this.baseUrl}/diasventa`, diasventa)
    .pipe(
      map((resp: any) => {
        //console.log("Respuesta de Node");
        //console.log(resp[0]);
        diasventa.IDVENTA = resp[0];
        return diasventa;
      })
    );

}

updateDiasVentaUsuario(diasventa : DiasVentaUsuarioModel){
    //let mimovimiento = new MovimientoModel;
    //mimovimiento = movimiento;
    return this.http.put(`${this.baseUrl}/diasventa/${diasventa.IDVENTA}`, diasventa);
}


// INFORMES - LISTADOS

getAsignadosMer(id : string) : Observable<AdjudicadosDetallenterface[]>{
  return this.http.get<AdjudicadosDetallenterface[]>(`${this.baseUrl}/adjudicadosmer/${id}`);
}

getInformeAutorizados() : Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/informeautorizados`);
}

 getInformePersonasParcelas() : Observable<PersonasPuestoInterface[]> {
   return this.http.get<PersonasPuestoInterface[]>(`${this.baseUrl}/personaspuestos`);
 }

 getInformesAutorizadosPer() : Observable<AutorizadosPersonaInterface[]> {
   return this.http.get<AutorizadosPersonaInterface[]>(`${this.baseUrl}/informeautorizados`)
 }


}
