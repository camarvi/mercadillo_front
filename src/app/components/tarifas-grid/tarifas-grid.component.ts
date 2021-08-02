import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MercadillosService } from '../../services/mercadillos.service';
import {Router} from '@angular/router';
import { TarifaInterface } from '../../interfaces/tarifa-response';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tarifas-grid',
  templateUrl: './tarifas-grid.component.html',
  styleUrls: ['./tarifas-grid.component.css']
})
export class TarifasGridComponent implements OnInit {

  @Input() tarifas !:  TarifaInterface[];

  @Output()
  propagar = new EventEmitter<string>();

  @Output()
  propagaEditar = new EventEmitter<TarifaInterface>();

  //constructor(private mercadilloService : MercadillosService,
  //            private router: Router) { }

  constructor() { }

  ngOnInit(): void {

  }

eliminar(id, indice:number){
  //console.log("Dentro de eliminar");
  //console.log("IDTARIFA RECIBIDO " + id);
  //this.mercadilloService.deleteTarifa(id)
  //  .subscribe( resp => {
  //    console.log(resp);
  //    Swal.fire({
  //      title : "Eliminar",
  //      text : 'Registro eliminado correctamente..',
  //      icon : 'success'
  //    });
  //  });
  //
  //  this.router.navigate(['/tarifamer/1/ERCADILLO%20CABO%20DE%20GATA']);

  


  Swal.fire({
    title:'¿Está seguro ?',
    text :`Está seguro que desea borrar el registro`,
    icon : 'question',
    showConfirmButton : true,
    showCancelButton : true
  }).then( resp => {

     if (resp.value) {
      this.tarifas.splice(indice,1);
      this.propagar.emit(id);
     } 

  });
   
}

editar(tarifa : TarifaInterface) {
  this.propagaEditar.emit(tarifa);
}

}
