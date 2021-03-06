import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MercadillosService } from '../../../services/mercadillos.service';

import { MovimientoDetallenterface } from '../../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ActividadesInterface } from '../../../interfaces/actividades-response';

import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public idMovimiento : string;
  public datosMovimiento : MovimientoDetallenterface;
  public datosParcela : ParcelaInterface;
  public datosMercadillo : MercadilloInterface;
  public multititular : string = 'N';

  //listadoMercadillos: MercadilloInterface[] = [];
  actividad : ActividadesInterface;
  mercadillo : string;

  

  constructor(private mercadillosServices : MercadillosService,
              private route : ActivatedRoute,
              private location : Location,
              private router : Router) { }

  ngOnInit(): void {
    
    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    //mercadillo
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    console.log(this.idMovimiento);
    this.mercadillosServices.getMovimiento(this.idMovimiento)
        .subscribe ( resp =>{
          this.datosMovimiento = resp[0];
          //console.log(resp[0]);
          console.log("Datos del Movimiento");
          console.log(this.datosMovimiento);
          if ( this.datosMovimiento.IDPARCELA>0 ) { //  (resp[0].IDPARCELA>0) {
            this.mercadillosServices.getParcelaId(resp[0].IDPARCELA)
              .subscribe(resp => {
                this.datosParcela = resp[0];
                console.log("Datos de la Parcela");
                console.log(resp[0]);
              });
            this.mercadillosServices.getActividadId(this.datosMovimiento.ACTIVIDAD.toString())
                 .subscribe(resp =>{
                  console.log("Datos Actividad");
                  this.actividad = resp[0];
                   console.log(this.actividad);
                 });  
          

          }

          // if (this.datosParcela.IDMERCADILLO>0) {
          //   this.mercadillosServices.buscarMercadilloId(this.datosParcela.IDMERCADILLO.toString())
          //     .subscribe(resp => {
          //       console.log("Datos Merca");
          //       console.log(resp);
          //     })
          // }


        });


  }

onRegresar(){

    this.location.back();

}
verAutorizados() {
 
    //console.log(movie.id);
    this.router.navigate(['/autorizados', this.datosMovimiento.TITULAR]);
  
  }

altaAdjudicatario() {

      // && this.datosMovimiento.ACTIVO ='S' 
    if ( this.datosMovimiento.DES_OPERACION.toUpperCase() === 'ALTA' && this.datosMovimiento.ACTIVO.toUpperCase() === 'S') {  
      Swal.fire({
        allowOutsideClick : false,
        title : 'Error',
        text: 'El puesto/variante ya est?? adjudicado..',
        icon : 'error'
      });

    }  else {

      ///asignaparcela', parcela.NUMERO, parcela.IDPARCELAS, mercadillo
      //this.router.navigate(['/editamovimiento']);
      this.router.navigate(['asignaparcela',  this.datosParcela.NUMERO , this.datosParcela.IDPARCELAS,
           this.mercadillo]);
    }

  }

bajaAdjudicatario() {

  if (this.datosMovimiento.DES_OPERACION.toUpperCase() === 'ALTA' 
      && this.datosMovimiento.ACTIVO.toUpperCase() === 'S') {
        this.router.navigate(['/baja_adjudicatario', this.idMovimiento,this.mercadillo]);
      } else {
        Swal.fire({
          allowOutsideClick : false,
          title : 'Error',
          text : 'El puesto/variante no esta adjudicado..',
          icon : 'error'
        });
      }
 
}  

editarMovimiento(){

  // SOLO SE PUEDEN EDITAR LOS REGISTROS QUE ESTAN ACTIVOS

  console.log("Dentro de editar");
  if (this.datosMovimiento.ACTIVO.toUpperCase() === 'S') {
    this.router.navigate(['/editamovimiento', this.idMovimiento,this.mercadillo]);
  } else {
    Swal.fire({
      allowOutsideClick : false,
      title : 'Error',
      text : 'No es el regisro activo. No se puede modificar..',
      icon : 'error'
    });
  }


}


tienediasVenta() {

    let esMulti : string;

     console.log("DENTRO DIAS VENTA");
     this.mercadillosServices.buscarMercadilloId(this.datosParcela.IDMERCADILLO.toString())
         .subscribe( ( resp : MercadilloInterface)=>{
          esMulti = resp[0].MULTITITULAR;
          //console.log(resp);
           //  console.log("DATOS DEL MERCADILLO");
           //  console.log(this.datosMercadillo);
            // return this.datosMercadillo.MULTITITULAR
            if (esMulti ==='S') {
            //  console.log("ES MULT" + esMulti);
              this.router.navigate(['/diasventa',this.idMovimiento,this.datosParcela.IDPARCELAS, this.mercadillo]);
            } else {
              Swal.fire({
                allowOutsideClick : false,
                title : 'Error',
                text:  this.mercadillo +  ' no permite multititularidad',
                icon : 'error'
              });
            //  console.log("No es multi " + esMulti);
            }
         });  

  }


}
