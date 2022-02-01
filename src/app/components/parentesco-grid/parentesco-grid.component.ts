import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MercadillosService } from '../../services/mercadillos.service';
import { FechasService } from '../../services/fechas.service';

import { AutorizadosModel  } from '../../models/autorizados.model';

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

  editField: string;
  autorizado = new AutorizadosModel();


  constructor(private mercadilloService : MercadillosService,
              private fechaService : FechasService) { }

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

  // changeValue(id: number, property: string, event: any) {

  //   this.editField = event.target.textContent;
  // //  console.log("Dentro de ChangeValue");
  //  // console.log(this.editField);
  // }



  modificaFechaAlta(id: number, property: string, event: any) {
    const editField = event.target.textContent;
   
    console.log("MOD F alta " + editField);

   if (!this.fechaService.validaFecha(editField)){     
     Swal.fire({
       title : "Error",
       text : 'La fecha no es valida',
       icon : 'warning'
     });
   } else {
    // this.autorizado.F_ALTA = this.fechaService.almacenaFecha(editField);
     this.autorizado.F_ALTA = editField;
     this.autorizado.ID_AUTORIZADO = id; 
     console.log("AUTORIZADOS " + this.autorizado.F_ALTA);
     this.mercadilloService.updateFAltaAutorizado(this.autorizado)
         .subscribe(resp=>{
           Swal.fire({
             //  title : "Modificado",
               text : 'Fecha modificada correctamente',
               icon : 'success'
             });
         });
    
   }
  
      
  }

  modificaFechaBaja(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    
      if (!this.fechaService.validaFecha(editField)){  
        Swal.fire({
          title : "Error",
          text : 'La fecha no es valida',
          icon : 'warning'
        });
      } else {
      // this.autorizado.F_BAJA = this.fechaService.almacenaFecha(editField);
       this.autorizado.F_BAJA = editField;
       this.autorizado.ID_AUTORIZADO = id; 
       console.log("AUTORIZADOS " + this.autorizado.F_BAJA);
       this.mercadilloService.updateFBajaAutorizado(this.autorizado)
           .subscribe( resp => {
             Swal.fire({
               //  title : "Modificado",
                 text : 'Fecha modificada correctamente',
                 icon : 'success'
               });
          });
     
      }
    
  }


}
