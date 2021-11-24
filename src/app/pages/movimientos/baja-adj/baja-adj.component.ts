import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActividadesInterface } from 'src/app/interfaces/actividades-response';
import { MovimientoDetallenterface } from  '../../../interfaces/movimiento-response'; //'src/app/interfaces/movimiento-response';
import { ParcelaInterface } from  '../../../interfaces/parcela-response'; //'src/app/interfaces/parcela-response';

import { combineLatest } from 'rxjs';

import Swal from 'sweetalert2';

import { MercadillosService } from '../../../services/mercadillos.service';
import { ParcelaModel } from  '../../../models/parcela.model';
import { MovimientoModel } from 'src/app/models/movimiento.model';




@Component({
  selector: 'app-baja-adj',
  templateUrl: './baja-adj.component.html',
  styleUrls: ['./baja-adj.component.css']
})
export class BajaAdjComponent implements OnInit {

  public idMovimiento : string;
  public datosMovimiento : MovimientoDetallenterface;
  public datosParcela : ParcelaInterface;

  public modeloParcela = new ParcelaModel();

  // Se utiliza para alta Nuevo Movimiento

  public nuevoMovimiento = new MovimientoModel();


  actividad : ActividadesInterface;
  mercadillo : string;
  
   
  constructor(private  mercadilloService : MercadillosService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    //console.log(this.idMovimiento);
    //console.log(this.mercadillo);

    this.mercadilloService.getMovimiento(this.idMovimiento)
        .subscribe ( resp => {
          this.datosMovimiento = resp[0];
          
          if ( this.datosMovimiento.IDPARCELA>0 ) { //  (resp[0].IDPARCELA>0) {
            this.mercadilloService.getParcelaId(resp[0].IDPARCELA)
              .subscribe(resp => {
                this.datosParcela = resp[0];
              });

              this.mercadilloService.getActividadId(this.datosMovimiento.ACTIVIDAD.toString())
              .subscribe(resp =>{
               this.actividad = resp[0];
              });  

            }   
        });

  }


realizaBaja(fecha : string){


  console.log("FECHA RECIBIDA");
  console.log(fecha);

    
    this.modeloParcela.COD_ESTADO = 'V';
    this.modeloParcela.IDPARCELAS = this.datosParcela.IDPARCELAS;

   // console.log(this.modeloParcela);
    // 3 - Registrar el nuevo movimiento
    this.nuevoMovimiento.ACTIVIDAD = this.datosMovimiento.ACTIVIDAD;
    this.nuevoMovimiento.ACTIVO = "S";
    this.nuevoMovimiento.IDPARCELA = this.datosMovimiento.IDPARCELA;
    this.nuevoMovimiento.JJAA = this.datosMovimiento.JJAA;
    this.nuevoMovimiento.OPERACION = "B";
    this.nuevoMovimiento.FIN_VIGENCIA = ""; //this.nuevoMovimiento.F_EFECTIVA_MOV;
    this.nuevoMovimiento.TITULAR = this.datosMovimiento.TITULAR;
    this.nuevoMovimiento.F_EFECTIVA_MOV = fecha;
    
/*
    let fechaok ="";
    let anioA ="";
    let mesA ="";
    let diaA ="";

    if (fecha.length>5){
      let anioA = fecha.slice(0, 4);
      let mesA = fecha.slice(5, 7);
      let diaA = fecha.slice(8, 10);
      fechaok = diaA + "/" + mesA + "/" + anioA;
    } else {
      fechaok ="";
    }
    this.nuevoMovimiento.F_EFECTIVA_MOV =  fechaok  //this.fechasService.convierteFechaNormal(fecha);
    
    console.log("DIA " + diaA);
    console.log("MES " + mesA);
    console.log("ANIO " + anioA);
    console.log("FECHA COMPUESTA " + fechaok);
*/

   combineLatest([
     // 1 - Modificar estado parcela a Vacante (FUNCIONA)
      this.mercadilloService.modificaEstadoParcela(this.modeloParcela),

     // 2 - PONER EL ESTADO DEL MOVIMIENTO ACTUAL COMO "N"   (FUNCIONA)
     this.mercadilloService.updateMovimientoNoActivo(this.datosMovimiento),

     // 3 - Registrar el nuevo movimiento ( FUNCIONA )
     this.mercadilloService.newMovimiento(this.nuevoMovimiento) 
     
     
   ]).subscribe( ([resp,resp2,resp3]) =>{
    Swal.fire({
      title: 'Baja Adj. Parcela Nº ' + this.datosParcela.NUMERO ,
      text: 'Se realiza la baja correctamente..',
      icon: 'success',
    });

  });
     


  }


}
