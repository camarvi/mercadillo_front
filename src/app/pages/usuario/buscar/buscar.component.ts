import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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


  buscarPersona(dni : string, ap1 : string, ap2:string) {

    console.log(ap1);

    dni = dni.trim().toUpperCase();
    ap1 = ap1.trim().toUpperCase();
    ap2 = ap2.trim().toUpperCase();

    let peticion : Observable<PersonaInterface[]>;
   
   if ((dni.length>4) || (ap1.length>2)) {
    this.cargando = true;
    if (dni.length>4) {
    peticion = this.mercadilloService.buscarUsuarioNifGrid(dni);
      
    } else {
      if (ap2.length>2) {
      peticion = this.mercadilloService.buscarUsuarioAp1Ap2(ap1,ap2);
          
      } else {
      peticion = this.mercadilloService.buscarUsuarioAp1(ap1);
       
      }
     
    }

    peticion.subscribe( resp => {
      console.log(resp);
      this.personas = resp;
      this.cargando = false;
    })


   }
    
  

  }

}
