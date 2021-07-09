import { Component, OnInit } from '@angular/core';

import { MercadillosService } from '../../../services/mercadillos.service';
import { PersonaInterface } from '../../../interfaces/mercadillos-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public personas: PersonaInterface[] = [];

  public cargando : boolean = false;
  
  constructor(private mercadilloService : MercadillosService) { }

  ngOnInit(): void {
  }


  buscarPersona(nombre : string, ap1 : string, ap2:string) {

    this.cargando = true;
    nombre = nombre.trim().toUpperCase();
    ap1 = ap1.trim().toUpperCase();
    ap2 = ap2.trim().toUpperCase();

    this.mercadilloService.buscarUsuarioAp1(ap1)
    .subscribe(resp =>{
      //console.log(resp);
      this.personas = resp;
      this.cargando = false;
    });


  }

}
