import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MercadillosService } from '../../services/mercadillos.service';

import { MovimientoDetallenterface } from '../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../interfaces/parcela-response';

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
      this.mercadillosServices.getParcelaId(this.idParcela)  
    ]).subscribe(([datosMovimiento, datosParcela]) => {
      this.datosMovimiento = datosMovimiento[0];
      this.datosParcela = datosParcela[0]
    });
     
    

  }

}
