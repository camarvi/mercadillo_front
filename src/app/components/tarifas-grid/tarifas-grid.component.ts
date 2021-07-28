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

  constructor(private mercadilloService : MercadillosService,
              private router: Router) { }

  ngOnInit(): void {

  }

eliminar(id){
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
  this.propagar.emit(id);

}

}
