import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private mercadillosService : MercadillosService ,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.parcela = this.route.snapshot.paramMap.get('par');
    console.log("Numero Parcela : " + this.parcela);
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Parametro recibido " + this.id);
    this.mercadillo = this.route.snapshot.paramMap.get('mercadillo');
    console.log("Mercadillo : " + this.mercadillo);
    
  }

}
