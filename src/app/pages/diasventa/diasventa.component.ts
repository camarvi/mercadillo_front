import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MercadillosService } from '../../services/mercadillos.service';

import { NgForm  } from '@angular/forms';

import { MovimientoDetallenterface } from '../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../interfaces/parcela-response';
import { DiasVentaUsuarioInterface } from '../../interfaces/diasventausuario-response';
import { DiasVentaUsuarioModel } from '../../models/diasventausuario.model';

@Component({
  selector: 'app-diasventa',
  templateUrl: './diasventa.component.html',
  styleUrls: ['./diasventa.component.css']
})
export class DiasventaComponent implements OnInit {

  public idMovimiento : string;
  public idParcela : string;
  public nombreMercadillo : string;
  public datosMovimiento : MovimientoDetallenterface;
  public datosParcela : ParcelaInterface;
  misDiasVenta : DiasVentaUsuarioInterface;
  miObjetoDiasVenta = new DiasVentaUsuarioModel();

  constructor(private mercadillosServices : MercadillosService,
              private route : ActivatedRoute,) { }

  ngOnInit(): void {

    this.idMovimiento = this.route.snapshot.paramMap.get('mov');
    //mercadillo
    this.idParcela = this.route.snapshot.paramMap.get('parcela');
    this.nombreMercadillo = this.route.snapshot.paramMap.get('mercadillo');


    console.log("ID MOVIMIENTO " + this.idMovimiento);
    console.log("IDPARCELA " + this.idParcela);
    console.log("NombreMercadillo " + this.nombreMercadillo);
  
     combineLatest([
       this.mercadillosServices.getMovimiento(this.idMovimiento),
       this.mercadillosServices.getParcelaId(this.idParcela),
       this.mercadillosServices.getDiasVentaUsuario(this.idMovimiento),
     ]).subscribe(([datosMovimiento, datosParcela,datosDiasVentas]) => {
       this.datosMovimiento = datosMovimiento[0];
       this.datosParcela = datosParcela[0];
       this.misDiasVenta = datosDiasVentas[0]; 
       console.log(datosDiasVentas[0]);
       this.mostrarDiasVenta();
       
     });
       
   

  }


  mostrarDiasVenta(){
    if (this.misDiasVenta.DOM == 'N') {
      this.misDiasVenta.DOM = false;
     } else { this.misDiasVenta.DOM = true;}
    
     if (this.misDiasVenta.LUN == 'N') {
      this.misDiasVenta.LUN = false;
     } else { this.misDiasVenta.LUN = true;}
    
     if (this.misDiasVenta.MAR == 'N') {
      this.misDiasVenta.MAR = false;
     } else { this.misDiasVenta.MAR = true;}
    
     if (this.misDiasVenta.MIE == 'N') {
      this.misDiasVenta.MIE = false;
     } else { this.misDiasVenta.MIE = true;}

     if (this.misDiasVenta.JUE == 'N') {
      this.misDiasVenta.JUE = false;
     } else { this.misDiasVenta.JUE = true;}

     if (this.misDiasVenta.VIE == 'N') {
      this.misDiasVenta.VIE = false;
     } else { this.misDiasVenta.VIE = true;}

     if (this.misDiasVenta.SAB == 'N') {
      this.misDiasVenta.SAB = false;
     } else { this.misDiasVenta.SAB = true;}


     console.log(this.misDiasVenta);
    }
   

  guardarDiasVenta() {
    if ( this.misDiasVenta.DOM = false) {
      this.miObjetoDiasVenta.DOM = 'N';
    } else {
      this.miObjetoDiasVenta.DOM = 'S';
    }
  }


guardar( forma : NgForm){

  if (forma.invalid) {
        // recorrer los elementos del formulario para que se dispare las validaciones
    Object.values(forma.controls).forEach(control => {
    control.markAsTouched(); //Lo pongo como pulsado
    });
      return;
   }
    
    }



}