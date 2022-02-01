import { Component, OnInit } from '@angular/core';

import { MercadillosService } from '../../../services/mercadillos.service';

import { PersonasPuestoInterface } from '../../../interfaces/informes-response';



@Component({
  selector: 'app-parcelasper',
  templateUrl: './parcelasper.component.html',
  styleUrls: ['./parcelasper.component.css']
})
export class ParcelasperComponent implements OnInit {

  public puestospersonas : PersonasPuestoInterface[] = [];
  public noencontrados : boolean = false;
  public cargando : boolean = false;

  constructor(private mercadillosService : MercadillosService) { }

  ngOnInit(): void {
      
    this.cargando = true;
       this.mercadillosService.getInformePersonasParcelas()
           .subscribe( (resp:PersonasPuestoInterface[])=>{
             this.puestospersonas = resp;
             console.log(this.puestospersonas);
             if (this.puestospersonas.length<1){
              this.noencontrados = true;
            } else {
              this.noencontrados = false;
            }
            this.cargando = false;
           }) 
    
  }

}
