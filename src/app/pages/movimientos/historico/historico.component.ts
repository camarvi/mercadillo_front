import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovimientoDetallenterface} from '../../../interfaces/movimiento-response';
import { MercadillosService } from '../../../services/mercadillos.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  public mercadillo : string;
  public parcela : string;
  public id : string;
  public movimientos : MovimientoDetallenterface[] = [];

  constructor(private mercadillosService : MercadillosService ,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.parcela = this.route.snapshot.paramMap.get('par');
    //console.log("Numero Parcela : " + this.parcela);
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log("Parametro recibido " + this.id);
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    //console.log("Mercadillo : " + this.mercadillo);
    this.mercadillosService.getDetallesMovimientos(this.id)
        .subscribe( resp =>{
          this.movimientos = resp;
          console.log("Listado de Movimientos");
          console.log(this.movimientos);
        });
    
  }

}
