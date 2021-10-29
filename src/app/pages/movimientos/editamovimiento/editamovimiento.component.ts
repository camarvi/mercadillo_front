import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { ActividadesInterface } from  '../../../interfaces/actividades-response';
import { MovimientoDetallenterface } from '../../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MovimientoModel } from '../../../models/movimiento.model';
import { MercadillosService } from '../../../services/mercadillos.service';

@Component({
  selector: 'app-editamovimiento',
  templateUrl: './editamovimiento.component.html',
  styleUrls: ['./editamovimiento.component.css']
})
export class EditamovimientoComponent implements OnInit {

  public idMovimiento : string; // Parametro recibido
  public mercadillo : string;  // Parametro recibido


  public datosMovimiento : MovimientoDetallenterface;
  public datosParcela : ParcelaInterface;
 
  public listadoActividades : ActividadesInterface[] = [];
  public nuevoMovimiento = new MovimientoModel();

 // public actividad : ActividadesInterface;
  public nombreActividad : String;

  constructor(private mercadilloService :  MercadillosService, 
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    
    console.log("DENTRO DE EDITAMOVIMIENTO.COMPONENTS");
    console.log(this.idMovimiento);
    console.log(this.mercadillo)

    console.log("DATOS DEL MOVIMIENTO A EDITAR");
    this.mercadilloService.getMovimiento(this.idMovimiento)
        .subscribe( resp => {
          this.datosMovimiento = resp[0];
          console.log("Datos del Movimiento");
          console.log(this.datosMovimiento);

        /*
            this.mercadilloService.getActividadId(this.datosMovimiento.ACTIVIDAD.toString())
              .subscribe(resp =>{
               this.actividad = resp[0];
              });  

        */ 
          if (this.datosMovimiento.IDPARCELA>0){
            combineLatest([
              this.mercadilloService.getParcelaId(resp[0].IDPARCELA),
              this.mercadilloService.getActividades(),
             // this.mercadilloService.getActividadId(this.datosMovimiento.ACTIVIDAD.toString())
             this.mercadilloService.getActividadId("7")
            ]).subscribe( ([resp,resp2, resp3]) =>{
              this.datosParcela = resp[0];
              this.listadoActividades = resp2;
             // this.actividad = resp3[0];
              console.log("DENTRO DE COMBINELATEST");
              console.log(this.datosParcela);
              console.log(this.listadoActividades);
              console.log("Actividad Actual ");
             // console.log(this.actividad.DESC_ACTIVIDAD);
              this.nombreActividad = resp3[0].DESC_ACTIVIDAD //this.actividad.DESC_ACTIVIDAD;
            });   
            
          }

       /*   if (this.datosMovimiento.IDPARCELA>0) {
            this.mercadilloService.getParcelaId(resp[0].IDPARCELA)
                .subscribe( resp => {
                  this.datosParcela = resp[0];
                  console.log("DATOS DE LA PARCELA");
                  console.log(this.datosParcela);
                });

            
          } */

        })

  }

  guardar(forma: NgForm) {

    // IMPORTANTE : NO SOLO HAY QUE GUARDAR EL MOVIMIENTO,
    // TAMBIEN HAY QUE CAMBIAR EL ESTADO DE LA PARCELA Y PONERLO COMO ASIGNADO

    // TAREAS A REALIZAR
    // 1 - PONER EL ESTADO DEL MOVIMIENTO ACTUAL COMO "N"
    // 2 - CREAR UN NUEVO MOVIMIENTO DE TIPO MODIFICAR Y ESTADO ACTUAL "S"
    
    console.log(forma);

    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }
    
  }



}
