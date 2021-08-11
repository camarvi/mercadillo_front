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



@Injectable({
  providedIn: 'root'
})
export class MercadillosService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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
    let anio = miparcela.FECHA_ESTADO.slice(0, 4);
    let mes = miparcela.FECHA_ESTADO.slice(5, 7);
    let dia = miparcela.FECHA_ESTADO.slice(8, 10);
    //console.log(anio);
    //console.log(mes);
    //console.log(dia); 
    let fechaok = dia + "/" + mes + "/" + anio;
    miparcela.FECHA_ESTADO = fechaok;

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

// TARIFAS


  getTarifasMer(id: string): Observable<TarifaInterface[]> {

    return this.http.get<TarifaInterface[]>(`${this.baseUrl}/tarifas/${id}`);
  }

  newTarifa(tarifa: TarifaModel) {

    let mitarifa = new TarifaModel;
    mitarifa = tarifa;
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

    let fechaAok = diaA + "/" + mesA + "/" + anioA;
    mitarifa.F_INICIO = fechaAok;
    mitarifa.F_FIN = fechaFok;


    return this.http.post(`${this.baseUrl}/tarifas`, mitarifa)
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

  updateTarifa(tarifa : TarifaModel) {

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

// MOVIMIENTOS

newMovimiento(movimiento: MovimientoModel) {

  let mimovimiento = new MovimientoModel;
  mimovimiento = movimiento;
  let fechaFinok;
  let anioF = mimovimiento.FIN_VIGENCIA.slice(0, 4);
  let mesF = mimovimiento.FIN_VIGENCIA.slice(5, 7);
  let diaF = mimovimiento.FIN_VIGENCIA.slice(8, 10);
  fechaFinok = diaF + "/" + mesF + "/" + anioF;

  let fechaEfecok;
  let anioEfe = mimovimiento.F_EFECTIVA_MOV.slice(0, 4);
  let mesEfe = mimovimiento.F_EFECTIVA_MOV.slice(5, 7);
  let diaEfe = mimovimiento.F_EFECTIVA_MOV.slice(8, 10);
  fechaEfecok = diaEfe + "/" + mesEfe + "/" + anioEfe;

  mimovimiento.FIN_VIGENCIA = fechaFinok;
  mimovimiento.F_EFECTIVA_MOV = fechaEfecok;

  /*if (mitarifa.F_FIN!=null) {
    let anioF = mitarifa.F_FIN.slice(0, 4);
    let mesF = mitarifa.F_FIN.slice(5, 7);
    let diaF = mitarifa.F_FIN.slice(8, 10);
    fechaFok = diaF + "/" + mesF + "/" + anioF;

  } else {
    fechaFok = null;
  } */

  //let fechaAok = diaA + "/" + mesA + "/" + anioA;
  //mitarifa.F_INICIO = fechaAok;
  //mitarifa.F_FIN = fechaFok;



  return this.http.post(`${this.baseUrl}/movimiento`, mimovimiento)
    .pipe(
      map((resp: any) => {
        //console.log("Respuesta de Node");
        //console.log(resp[0]);
        mimovimiento.IDMOV = resp[0];
        return mimovimiento;
      })
    );

}


}
