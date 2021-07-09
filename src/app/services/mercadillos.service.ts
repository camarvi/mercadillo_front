import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Sexo, Tipovia } from '../interfaces/mercadillos-response';
import { UsuarioModel } from '../models/usuario.model';
import { PersonaInterface } from '../interfaces/mercadillos-response';



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

/*
  updateUsuario(usuario : UsuarioModel){

    return this.http.put(`${ this.baseUrl}/persona/${ usuario.IDPERSONA}`, usuario);

  }
*/


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


}
