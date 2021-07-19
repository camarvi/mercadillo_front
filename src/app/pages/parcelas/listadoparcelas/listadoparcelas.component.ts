import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';
import { ParcelaInterface } from '../../../interfaces/parcela-response';


@Component({
  selector: 'app-listadoparcelas',
  templateUrl: './listadoparcelas.component.html',
  styleUrls: ['./listadoparcelas.component.css']
})

export class ListadoparcelasComponent implements OnInit {

  public parcelas : ParcelaInterface[] = [];
  public cargando : boolean = false;


  constructor(private mercadilloService : MercadillosService,
               private route : ActivatedRoute) { }

  ngOnInit(): void {
    //Obtener el Id del mercadillo
    const id= this.route.snapshot.paramMap.get('id');

    console.log("Id recibido" + id);
    this.mercadilloService.getParcelasMer(id)
      .subscribe( (resp)=>{     
        console.log(resp);
        this.parcelas = resp;
      });
  }

}
