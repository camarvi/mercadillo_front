import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';

import { MovimientoDetallenterface } from '../../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';

import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public idMovimiento : string;
  public datosMovimiento : MovimientoDetallenterface;
  public datosParcela : ParcelaInterface;
  listadoMercadillos: MercadilloInterface[] = [];
  mercadillo : string;

  

  constructor(private mercadillosServices : MercadillosService,
              private route : ActivatedRoute) { }

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
            // this.mercadillosServices.buscarMercadilloId(this.datosParcela.IDMERCADILLO)
            //     .subscribe(resp =>{
            //       console.log("Datos Mercadillo");
            //       console.log(resp);
            //     });  
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



}
