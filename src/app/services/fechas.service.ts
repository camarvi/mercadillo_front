import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor() { }


// convierteFechaNormal(fecharecibida : string) {

// console.log(fecharecibida);

//   let arrayFecha = fecharecibida.split('-');
//   let anio: string = arrayFecha[0];
//   let mes : string = arrayFecha[1];
//   let dia : string = arrayFecha[2];

//   console.log("Dia " + dia);
//   console.log("MES :" + mes);
//   console.log("ANIO " + anio);

//   if (dia.length==1) {
//     dia = "0" + dia;
//   }
//   if (mes.length==1) {
//     mes = "0" + mes;
//   }
//   let fechaok : string = dia + "/" + mes + "/" + anio;
//  return  fechaok;
 
//  }


// conviertefecha(fecharecibida:string) 
//   {
//     let arrayFecha = fecharecibida.split('/');
//     let dia: string = arrayFecha[0];
//     let mes : string = arrayFecha[1];
//     let anio : string = arrayFecha[2];
  
//     if (dia.length==1) {
//       dia = "0" + dia;
//     }
//     if (mes.length==1) {
//       mes = "0" + mes;
//     }
//     let fechaok : string = dia + "/" + mes + "/" + anio;
//    return  fechaok;
  
   
  
//   }

  
mostrarfecha(fecharecibida:string) 
  {
    console.log("Dentro MostrarFecha");
    console.log(fecharecibida);
    let arrayFecha = fecharecibida.split('/');
    let dia: string = arrayFecha[0];
    let mes : string = arrayFecha[1];
    let anio : string = arrayFecha[2];
  
    if (dia.length==1) {
      dia = "0" + dia;
    }
    if (mes.length==1) {
      mes = "0" + mes;
    }
    let fechaok : string = anio + "-" + mes + "-" + dia;
    console.log(fechaok);
   return  fechaok;
  }

almacenaFecha(fecha : string)  {

    let fechaOk : string = "";

    if (fecha!=null) {
      let anioF = fecha.slice(0, 4);
      let mesF = fecha.slice(5, 7);
      let diaF =fecha.slice(8, 10);
      fechaOk = diaF + "/" + mesF + "/" + anioF;
  
    } else {
      fechaOk = null;
    }
  
    if (fechaOk ==="//") {
      fechaOk = null;
    }

    return fechaOk;

  }



}




