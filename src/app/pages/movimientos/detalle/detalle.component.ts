import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public idMovimiento : string;

  //mercadillosService

  constructor(private mercadillosServices : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.idMovimiento = this.route.snapshot.paramMap.get('iddetalle');
    console.log(this.idMovimiento);
    this.mercadillosServices.getMovimiento(this.idMovimiento)
        .subscribe ( resp =>{
          console.log(resp[0]);
          if (resp[0].IDPARCELA>0) {
            this.mercadillosServices.getParcelaId(resp[0].IDPARCELA)
              .subscribe(resp => {
                console.log("Datos de la Parcela");
                console.log(resp[0]);
              });
          }
        });
    

   
    //    combineLatest([
    //      this.mercadillosService.modificaEstadoParcela(this.modificaParcela),
    //      this.mercadillosService.newMovimiento(this.nuevoMovimiento)
    //    ]).subscribe( ([resp,resp2]) =>{



  }

}
