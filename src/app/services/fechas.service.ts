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


 validaFecha(dateString : string)
  {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;
  
      // Parse the date parts to integers
      var parts = dateString.split("/");
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[2], 10);
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
     
      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;
   
  
      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;
  
      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];

      // if (day > 0  && day <= monthLength[month - 1]) {
      //   return true;
      // } else { return false;}


  };


}




