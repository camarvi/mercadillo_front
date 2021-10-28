import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesInterface } from 'src/app/interfaces/actividades-response';

import { MovimientoInterface } from '../../../interfaces/movimiento-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';

import { MercadillosService } from '../../../services/mercadillos.service';

@Component({
  selector: 'app-editamovimiento',
  templateUrl: './editamovimiento.component.html',
  styleUrls: ['./editamovimiento.component.css']
})
export class EditamovimientoComponent implements OnInit {

  public idMovimiento : string; // Parametro recibido
  public mercadillo : string;  // Parametro recibido

  public datosMovimiento : MovimientoInterface;
  public datosParcela : ParcelaInterface;
  public actividad : ActividadesInterface;

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
          console.log(this.datosMovimiento);

          if (this.datosMovimiento.IDPARCELA>0) {
            this.mercadilloService.getParcelaId(resp[0].IDPARCELA)
                .subscribe( resp => {
                  this.datosParcela = resp[0];
                  console.log("DATOS DE LA PARCELA");
                  console.log(this.datosParcela);
                });
          }

        })

  }

  editarMovimiento() {
    
  }

}
