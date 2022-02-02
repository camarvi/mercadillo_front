import { Component, OnInit } from '@angular/core';
import { MercadillosService } from '../../../services/mercadillos.service';

import { AutorizadosPersonaInterface } from '../../../interfaces/informes-response';


@Component({
  selector: 'app-autorizadosper',
  templateUrl: './autorizadosper.component.html',
  styleUrls: ['./autorizadosper.component.css']
})
export class AutorizadosperComponent implements OnInit {

  public autorizadosPersonas : AutorizadosPersonaInterface[] = [];
  public noencontrados : boolean = false;
  public cargando : boolean = false;

  constructor(private mercadillosService : MercadillosService) { }

  ngOnInit(): void {

    this.cargando = true;
     this.mercadillosService.getInformesAutorizadosPer()
         .subscribe( (resp:AutorizadosPersonaInterface[])=>{
           this.autorizadosPersonas = resp;
           console.log(this.autorizadosPersonas);
           if (this.autorizadosPersonas.length<1){
            this.noencontrados = true;
          } else {
            this.noencontrados = false;
          }
          this.cargando = false;
         }) 
 

  }

}
