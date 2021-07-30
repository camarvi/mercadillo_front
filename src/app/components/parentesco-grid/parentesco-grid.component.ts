import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AutorizadosInterface } from '../../interfaces/autorizados-response';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-parentesco-grid',
  templateUrl: './parentesco-grid.component.html',
  styleUrls: ['./parentesco-grid.component.css']
})
export class ParentescoGridComponent implements OnInit {

  @Input() autorizados !:  AutorizadosInterface[];
  @Output()
  propagar = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  eliminar(id, indice : number){
    
  Swal.fire({
    title:'¿Está seguro ?',
    text :`Está seguro que desea borrar el registro`,
    icon : 'question',
    showConfirmButton : true,
    showCancelButton : true
  }).then( resp => {

     if (resp.value) {
      this.autorizados.splice(indice,1);
      this.propagar.emit(id);
     } 

  });
   
  }

}
