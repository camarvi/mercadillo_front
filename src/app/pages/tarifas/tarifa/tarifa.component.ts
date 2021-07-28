import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MercadillosService } from 'src/app/services/mercadillos.service';
import { TarifaInterface } from '../../../interfaces/tarifa-response';
import { TarifaModel } from '../../../models/tarifa.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  public tarifas : TarifaInterface[] = [];
  
  public mercadillo : string;
  public cargando : boolean = false;
  public nuevaTarifa = new TarifaModel();

  constructor(private mercadilloService : MercadillosService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.mercadillo = this.route.snapshot.paramMap.get('desc');
    this.cargando = true;
    this.nuevaTarifa.COD_MER = Number(id);

    this.mercadilloService.getTarifasMer(id)
        .subscribe( (resp)=>{
          this.tarifas = resp;
          console.log(this.tarifas);
          this.cargando = false;
        });
  }


 
  guardar(forma: NgForm) {
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

   // Swal.fire({
   //   allowOutsideClick : false,
   //   title : 'Espere',
   //   text: 'Guardando información..',
   //   icon : 'info'
   // });
   // Swal.showLoading();

   
    let peticion : Observable<any>;
   // console.log("DATOS NUEVA TARIFA");
   //console.log(this.nuevaTarifa);
    peticion = this.mercadilloService.newTarifa(this.nuevaTarifa); 
  
   // if (this.nuevaTarifa.IDTARIFA !==0 ){
   //   //peticion = this.mercadillosService.updateUsuario(this.usuario);
   // } else { //NUEVO REGISTRO  
   //   console.log(this.nuevaTarifa);
   //  peticion = this.mercadilloService.newTarifa(this.nuevaTarifa);   
   // }

      peticion.subscribe( resp => {
        
        Swal.fire({
          title : "Tarifa",
          text : 'Se almaceno correctamente..',
          icon : 'success'
        });
        this.ngOnInit();
        });
  
  }

  eliminar(id: string){
  
    //console.log("Dentro de eliminar");
    //console.log("IDTARIFA RECIBIDO " + id);
    this.mercadilloService.deleteTarifa(id)
      .subscribe( resp => {
        console.log(resp);
        Swal.fire({
          title : "Eliminar",
          text : 'Registro eliminado correctamente..',
          icon : 'success'
        });
      });
      this.ngOnInit();
  }



  procesaPropagar(id : string) {
   // console.log(id);
    this.eliminar(id);
    this.ngOnInit();
  }

  

}
