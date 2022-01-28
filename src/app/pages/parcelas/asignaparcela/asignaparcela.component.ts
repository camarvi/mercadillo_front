import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { MercadillosService } from '../../../services/mercadillos.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { ActividadesInterface } from '../../../interfaces/actividades-response';
import { EpigrafeIAEInterface } from '../../../interfaces/epigrafesiae-response';

import { MovimientoModel } from '../../../models/movimiento.model';
import { ParcelaModel } from '../../../models/parcela.model';

import { FechasService } from '../../../services/fechas.service';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asignaparcela',
  templateUrl: './asignaparcela.component.html',
  styleUrls: ['./asignaparcela.component.css']
})
export class AsignaparcelaComponent implements OnInit {

  public buscarPersonas = new UsuarioModel();
  public listadoActividades : ActividadesInterface[] = []; 
  public listadoEpigrafesIae : EpigrafeIAEInterface[] = [];
  public mercadillo : string;
  public parcela : string;
  public id : string;
  public nuevoMovimiento = new MovimientoModel();
  public modificaParcela = new ParcelaModel();

 

  constructor(private mercadillosService : MercadillosService,
              private fechaService : FechasService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
   
    this.modificaParcela.COD_ESTADO = "A";
    
    this.parcela = this.route.snapshot.paramMap.get('par');
    //console.log("Numero Parcela : " + this.parcela);
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log("Parametro recibido " + this.id);
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    //console.log("Mercadillo : " + this.mercadillo);
    // this.mercadillosService.getActividades()
    //     .subscribe( resp => {
    //       this.listadoActividades = resp;
    //     })

    this.cargaCombox();
 

  }


  cargaCombox(){

    combineLatest([
      this.mercadillosService.getActividades(),
      this.mercadillosService.getEpigrafesIae()
    ]).subscribe( ([actividades,epigrafes]) =>{
      this.listadoActividades = actividades;  
      this.listadoEpigrafesIae= epigrafes;
    });
   
  }



  buscarUsuario(){  //(termino : string){
  
    this.mercadillosService.buscarUsuarioNif(this.buscarPersonas.NIF)
        .subscribe( (resp: any) => {
          if (resp.length>0) {
            this.buscarPersonas = resp[0];
            console.log(resp.length)   

          }  else {
            Swal.fire({
              title : "Error",
              text : 'Usuario no encontrado',
              icon : 'warning'
            });
            this.buscarPersonas = new UsuarioModel();
          }      
        });

  }

  guardar(forma: NgForm) {

    // IMPORTANTE : NO SOLO HAY QUE GUARDAR EL MOVIMIENTO,
    // TAMBIEN HAY QUE CAMBIAR EL ESTADO DE LA PARCELA Y PONERLO COMO ASIGNADO


    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }
  
    this.nuevoMovimiento.IDPARCELA = Number(this.id);
    this.nuevoMovimiento.TITULAR = this.buscarPersonas.IDPERSONA;
    this.nuevoMovimiento.ACTIVIDAD = Number(this.nuevoMovimiento.ACTIVIDAD);
    console.log("Datos que se tienen que guardar");
    console.log(this.nuevoMovimiento);

    this.modificaParcela.IDPARCELAS = Number(this.id);
    this.modificaParcela.COD_ESTADO = "A";
 

   //*************************************************************************** */
   //*************************************************************************** */

    this.nuevoMovimiento.F_EFECTIVA_MOV = this.fechaService.almacenaFecha(
      this.nuevoMovimiento.F_EFECTIVA_MOV);
    this.nuevoMovimiento.FIN_VIGENCIA = this.fechaService.almacenaFecha(
      this.nuevoMovimiento.FIN_VIGENCIA);
 
   //****************************************************************************** */
  //***************************************************************************** */

   console.log("DATOS DESPUES DE FECHASERVIC.ALMACENAFECHA");
   console.log(this.nuevoMovimiento);
   console.log("MODIFICA PARCELA " + this.modificaParcela);
    

      combineLatest([
        this.mercadillosService.modificaEstadoParcela(this.modificaParcela),
        this.mercadillosService.newMovimiento(this.nuevoMovimiento),
      ]).subscribe(([resp, resp2]) => {
        Swal.fire({
          title: 'Asignado',
          text: 'Se asigna parcela correctamente..',
          icon: 'success',
        });
        this.buscarPersonas = new UsuarioModel();
        this.nuevoMovimiento.F_EFECTIVA_MOV = this.fechaService.mostrarfecha(this.nuevoMovimiento.F_EFECTIVA_MOV);
        this.nuevoMovimiento.FIN_VIGENCIA = this.fechaService.mostrarfecha(this.nuevoMovimiento.FIN_VIGENCIA);

      });



     this.nuevoMovimiento.F_EFECTIVA_MOV = this.fechaService.mostrarfecha(this.nuevoMovimiento.F_EFECTIVA_MOV);
     this.nuevoMovimiento.FIN_VIGENCIA = this.fechaService.mostrarfecha(this.nuevoMovimiento.FIN_VIGENCIA);

    //console.log("TERMINAR PROCESO : " + this.nuevoMovimiento);

  }

}
