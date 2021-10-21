import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActividadesInterface } from 'src/app/interfaces/actividades-response';
import { MovimientoDetallenterface } from  '../../../interfaces/movimiento-response'; //'src/app/interfaces/movimiento-response';
import { ParcelaInterface } from  '../../../interfaces/parcela-response'; //'src/app/interfaces/parcela-response';

import { Observable, combineLatest } from 'rxjs';

import Swal from 'sweetalert2';

import { MercadillosService } from '../../../services/mercadillos.service';
import { ParcelaModel } from 'src/app/models/parcela.model';


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

  actividad : ActividadesInterface;
  mercadillo : string;
  
   
  constructor(private  mercadilloService : MercadillosService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    console.log(this.idMovimiento);
    console.log(this.mercadillo);

    this.mercadilloService.getMovimiento(this.idMovimiento)
        .subscribe ( resp => {
          this.datosMovimiento = resp[0];
          console.log("Datos del Movimiento");
          console.log(this.datosMovimiento);
          console.log("Fin datos del Movimiento");
          
          
          if ( this.datosMovimiento.IDPARCELA>0 ) { //  (resp[0].IDPARCELA>0) {
            this.mercadilloService.getParcelaId(resp[0].IDPARCELA)
              .subscribe(resp => {
                this.datosParcela = resp[0];
                console.log("Datos de la Parcela");
                console.log(resp[0]);
                console.log("MODELO PARCELA")
              });

              this.mercadilloService.getActividadId(this.datosMovimiento.ACTIVIDAD.toString())
              .subscribe(resp =>{
               console.log("Datos Actividad");
               this.actividad = resp[0];
                console.log(this.actividad);
              });  

            }   
        });

  }


realizaBaja(fecha : string){

// Hay que hacer varias tareas:
// 1 - Poner la parcela como Vacante : FECHA_ESTADO = fecha Actual, COD_ESTADO=V
// 2 - Poner el ultimo movimiento en estado activo=N
// 3 - Registrar el nuevo movimiento


  let peticion: Observable<any>;

    console.log(fecha);

    console.log(this.datosParcela);
    
    console.log("MODIFICAR DATOS PARCELA");
    
    this.modeloParcela.COD_ESTADO = 'V';
    this.modeloParcela.IDPARCELAS = this.datosParcela.IDPARCELAS;

    console.log(this.modeloParcela);
    
    // 1 - Modificar estado parcela a Vacante
    // Funciona Ok
    peticion = this.mercadilloService.modificaEstadoParcela(this.modeloParcela);

    this.datosMovimiento.ACTIVO = 'N';
      
    peticion.subscribe((resp) => {
      Swal.fire({
        title: 'Baja Adj. Parcela Nº ' + this.datosParcela.NUMERO ,
        text: 'Se realiza la baja correctamente..',
        icon: 'success',
      });
    });


   // Metodo para combinar las instrucciones en un único paso

  /*
   combineLatest([
    this.mercadillosService.modificaEstadoParcela(this.modificaParcela),
    this.mercadillosService.newMovimiento(this.nuevoMovimiento)
  ]).subscribe( ([resp,resp2]) =>{

    Swal.fire({
      title : 'Asignado',
      text : 'Se asigna parcela correctamente..',
      icon : 'success'
    });

    this.buscarPersonas = new UsuarioModel();

  });

   */
   //



  }


}
