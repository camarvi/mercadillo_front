import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadillosService } from '../../../services/mercadillos.service';

import { MoviPersonasInterface } from '../../../interfaces/movimiento-response';

@Component({
  selector: 'app-movpersonas',
  templateUrl: './movpersonas.component.html',
  styleUrls: ['./movpersonas.component.css']
})
export class MovpersonasComponent implements OnInit {

  public cargando : boolean = false;
  public movimientos : MoviPersonasInterface[] = [];

  public codper : string;
  public nif : string;
  public nombre : string;
  public ap1 : string;
  public ap2 : string;

  //:id/:nif/:ap1/:ap2/:nombre

  constructor(private mercadilloService : MercadillosService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
   
    this.cargando = true;
    this.codper = this.route.snapshot.paramMap.get('id');
    this.nif = this.route.snapshot.paramMap.get('nif');
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.ap1 = this.route.snapshot.paramMap.get('ap1');
    this.ap2 = this.route.snapshot.paramMap.get('ap2');

    if (this.ap2 == 'NULL' ||this.ap2 == 'null')  {
      this.ap2 = "";
    }

    this.mercadilloService.getMovimientosPesona(this.codper)
        .subscribe ( (resp :MoviPersonasInterface[] )=>{
           this.movimientos = resp;
           console.log(this.movimientos); 
           this.cargando = false;
        });

  }

}
