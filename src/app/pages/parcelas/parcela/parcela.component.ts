import { Component, OnInit } from '@angular/core';
import { MercadillosService } from '../../../services/mercadillos.service';

import { MercadilloInterface } from '../../../interfaces/mercadillos-response';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css']
})

export class ParcelaComponent implements OnInit {

  listadoMercadillos : MercadilloInterface[] = [];


  constructor(private mercadilloService : MercadillosService) { }

  ngOnInit(): void {
   this.cargaCombox();

  }

  cargaCombox(){
    this.mercadilloService.getMercadillos()
      .subscribe( resp => {
       // console.log(resp);
        this.listadoMercadillos = resp;
        console.log(this.listadoMercadillos);
      })
  }


}
