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
  public mercadillo : string;
  public id : string;


  constructor(private mercadilloService : MercadillosService,
               private route : ActivatedRoute) { }

  ngOnInit(): void {
    //Obtener el Id del mercadillo
    this.id= this.route.snapshot.paramMap.get('id');
    this.mercadillo = this.route.snapshot.paramMap.get('desc');
    this.cargando = true;
   // console.log("Id recibido " + this.id);
  //  console.log("Nombre recibido " + this.mercadillo);
    this.mercadilloService.getParcelasMer(this.id)
      .subscribe( (resp)=>{     
      //  console.log(resp);
        this.parcelas = resp;
        this.cargando = false;
      });
  }

}
