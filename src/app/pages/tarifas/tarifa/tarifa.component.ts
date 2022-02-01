import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MercadillosService } from '../../../services/mercadillos.service';
import { FechasService } from '../../../services/fechas.service';
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
              private route : ActivatedRoute,
              private fechasService : FechasService) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.mercadillo = this.route.snapshot.paramMap.get('desc');
    this.cargando = true;
    this.nuevaTarifa.COD_MER = Number(id);

    this.mercadilloService.getTarifasMer(id)
        .subscribe( (resp)=>{
          this.tarifas = resp;
          //console.log(this.tarifas);
          this.cargando = false;
        });
    
    console.log(this.nuevaTarifa);

  }


 
  guardar(forma: NgForm) {
    if (forma.invalid) {
      // recorrer los elementos del formulario para que se dispare las validaciones
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched(); //Lo pongo como pulsado
      });
      return;
    }

   
    let peticion : Observable<any>;
    // ESTA LINEA FUNCIONA BIEN
    // peticion = this.mercadilloService.newTarifa(this.nuevaTarifa); 
  
    this.nuevaTarifa.F_FIN = this.fechasService.almacenaFecha(this.nuevaTarifa.F_FIN);
    this.nuevaTarifa.F_INICIO = this.fechasService.almacenaFecha(this.nuevaTarifa.F_INICIO);

    if (this.nuevaTarifa.IDTARIFA !==0 ){
      console.log("MODIFICAR TARIFA");
      console.log(this.nuevaTarifa);
     peticion = this.mercadilloService.updateTarifa(this.nuevaTarifa);
     console.log("NUEVA TARIFA");
     console.log(this.nuevaTarifa);
    } else { //NUEVO REGISTRO  
   //   console.log(this.nuevaTarifa);
     peticion = this.mercadilloService.newTarifa(this.nuevaTarifa);   
    }

      peticion.subscribe( resp => {
        
        Swal.fire({
          title : "Tarifa",
          text : 'Se almaceno correctamente..',
          icon : 'success'
        });
        this.nuevaTarifa = new TarifaModel();
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
      //this.ngOnInit();
  }




  procesaPropagar(id : string) {
   // console.log(id);
    this.eliminar(id);
    //this.ngOnInit();
  }

  
  procesaPropagarEditar(tarifaRecibida : TarifaInterface) {
    
    console.log("TarifaRecibida");
    console.log(tarifaRecibida);
    
    this.nuevaTarifa.IDTARIFA = tarifaRecibida.IDTARIFA;
    this.nuevaTarifa.COD_MER = tarifaRecibida.COD_MER;
    this.nuevaTarifa.F_INICIO = tarifaRecibida.F_INICIO.toString();
    this.nuevaTarifa.F_INICIO = this.fechasService.mostrarfecha(this.nuevaTarifa.F_INICIO);
    this.nuevaTarifa.TARIFA = tarifaRecibida.TARIFA;

    try {
      this.nuevaTarifa.F_FIN = tarifaRecibida.F_FIN.toString();
      this.nuevaTarifa.F_FIN = this.fechasService.mostrarfecha(this.nuevaTarifa.F_FIN);
    } catch {
      this.nuevaTarifa.F_FIN = null;
    }
   

   }
 
  atras(){
   this.nuevaTarifa = new TarifaModel();
  }

  

}
