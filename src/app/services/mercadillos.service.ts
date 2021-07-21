import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import { MercadilloInterface, Sexo, Tipovia } from '../interfaces/mercadillos-response';
import { ParcelaInterface } from '../interfaces/parcela-response';
import { DiaSemana } from '../interfaces/diasemana-response';
import { UsuarioModel } from '../models/usuario.model';
import { PersonaInterface } from '../interfaces/mercadillos-response';
import { MercadilloModel } from '../models/mercadillo.model';
import { ParcelaModel } from '../models/parcela.model';



@Injectable({
  providedIn: 'root'
})
export class MercadillosService {

  private baseUrl : string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  getSexo() : Observable<Sexo[]> {
    return this.http.get<Sexo[]>(`${this.baseUrl}/sexo`);
  }

  getTipoVia() : Observable<Tipovia[]> {
    return this.http.get<Tipovia[]>(`${this.baseUrl}/tipovia`);
  }

  getDiaSemana(): Observable<DiaSemana[]> {
    return this.http.get<DiaSemana[]>(`${this.baseUrl}/diassemana`);
  }


  crearUsuario(usuario : UsuarioModel){

    return this.http.post(`${ this.baseUrl }/persona`, usuario)
      .pipe(
        map( (resp:any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          usuario.IDPERSONA = resp[0];
          return usuario;
        })
      );
  }


  updateUsuario(usuario : UsuarioModel){

    return this.http.put(`${ this.baseUrl}/persona/${ usuario.IDPERSONA}`, usuario);

  }


  buscarUsuarioAp1(ap1 : string): Observable<PersonaInterface[]>{
    
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_ap/${ap1}`);

  }

  buscarUsuarioAp1Ap2(ap1 : string, ap2 : string) : Observable<PersonaInterface[]>{
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_ap/${ap1}/${ap2}`);
  }

  buscarUsuarioNombre(nombre : string, ap1 : string) : Observable<PersonaInterface[]>{
    return this.http.get<PersonaInterface[]>(`${this.baseUrl}/persona_nombre/${nombre}/${ap1}`);
  }

  buscarUsuarioNif(nif : string) : Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.baseUrl}/persona/${nif}`);
  }

  buscarUsuarioId(id : string) : Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.baseUrl}/personaid/${id}`);
  }

  buscarMercadilloId(id : string) : Observable<MercadilloModel> {
    return this.http.get<MercadilloModel>(`${this.baseUrl}/mercadillo/${id}`);
  }

  getMercadillos(): Observable<MercadilloInterface[]> {
    return this.http.get<MercadilloInterface[]>(`${this.baseUrl}/mercadillos`);
  }
  
  crearMercadillo(mercadillo : MercadilloModel){

    return this.http.post(`${ this.baseUrl }/mercadillo`, mercadillo)
      .pipe(
        map( (resp:any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          mercadillo.IDMERCADILLO = resp[0];
          return mercadillo;
        })
      );
  }

  modificarMercadillo(mercadillo : MercadilloModel){
    return this.http.put(`${ this.baseUrl}/mercadillo/${ mercadillo.IDMERCADILLO}`, mercadillo);
  }

  newParcela(parcela :ParcelaModel){

    let datepipe: DatePipe = new DatePipe('en-US');
    let miparcela = new ParcelaModel;
    miparcela = parcela;
    
    miparcela.FECHA_ALTA = datepipe.transform(parcela.FECHA_ALTA, 'dd/MM/YYYY');

    console.log("NEWPARCELA");
    console.log(parcela);
    return this.http.post(`${ this.baseUrl}/parcela`, parcela)
      .pipe(
        map((resp:any) => {
          console.log("Respuesta de Node");
          console.log(resp[0]);
          parcela.IDPARCELAS = resp[0];
          return parcela;
        })
      );
  }

  modificaParcela(parcela : ParcelaModel){
    return this.http.put(`${this.baseUrl}/parcela/${parcela.IDPARCELAS}`,parcela);
  }

  getParcelaId(id : string): Observable<ParcelaInterface> {
    return this.http.get<ParcelaInterface>(`${this.baseUrl}/parcela/${id}`);
  }

  getParcelasMer(id : string): Observable<ParcelaInterface[]> {
    return this.http.get<ParcelaInterface[]>(`${this.baseUrl}/parcelas_mer/${id}`);

  }

  getParcelaNumMer(merc: string, parc : string) : Observable<ParcelaInterface> {
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


}
