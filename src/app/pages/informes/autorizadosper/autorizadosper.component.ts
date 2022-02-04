import { Component, OnInit } from '@angular/core';
import { MercadillosService } from '../../../services/mercadillos.service';

import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';

import { AutorizadosPersonaInterface } from '../../../interfaces/informes-response';


@Component({
  selector: 'app-autorizadosper',
  templateUrl: './autorizadosper.component.html',
  styleUrls: ['./autorizadosper.component.css']
})
export class AutorizadosperComponent implements OnInit {

  public autorizadosPersonas : AutorizadosPersonaInterface[] = [];
  public noencontrados : boolean = false;
  public cargando : boolean = false;

  constructor(private mercadillosService : MercadillosService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.cargando = true;
     this.mercadillosService.getInformesAutorizadosPer()
         .subscribe( (resp:AutorizadosPersonaInterface[])=>{
           this.autorizadosPersonas = resp;
           console.log(this.autorizadosPersonas);
           if (this.autorizadosPersonas.length<1){
            this.noencontrados = true;
          } else {
            this.noencontrados = false;
          }
          this.cargando = false;
         }) 
 

  }

  generarTablaPdf(){

    const header =[['Titular', 'Nif Titular', 'Autorizado', 'Nif Aut.', 'F Alta', 'F Baja']];
    const tableData = [];

    let nuevoRegistro = ['','','','','','','',''];
    let nifLinea :string = ""; // this.puestospersonas[0].NIF;
    let lineaNombreTitular : string;
    let lineaNombreAut : string;
    let muestraNifTitular : string



    for (var i=0;i<this.autorizadosPersonas.length;i++) {

     // FORMATEAR NOMBRE TITULAR , AUTORIZADO Y MOSTRAR DATOS

     if (nifLinea != this.autorizadosPersonas[i].NIF_TITULAR.toString()){
      nifLinea = this.autorizadosPersonas[i].NIF_TITULAR.toString(); 
      muestraNifTitular = nifLinea;
      if (this.autorizadosPersonas[i].APE2_TITULAR === null ){
        lineaNombreTitular = this.autorizadosPersonas[i].APE1_TITULAR.toString() +  ', ' +
        this.autorizadosPersonas[i].NOMBRE_TITULAR.toString()
      } else {
        lineaNombreTitular = this.autorizadosPersonas[i].APE1_TITULAR.toString() + ' ' 
                     + this.autorizadosPersonas[i].APE2_TITULAR.toString() + ' , ' +
                     this.autorizadosPersonas[i].NOMBRE_TITULAR.toString()
      }
    } 
     else {
      lineaNombreTitular = "";
      muestraNifTitular = "";
      nifLinea = this.autorizadosPersonas[i].NIF_TITULAR.toString();
    }
     
   // FORMATEAR EL NOMBRE DE LOS AUTORIZADOS

    if (this.autorizadosPersonas[i].APE2_TITULAR === null ){
      lineaNombreAut = this.autorizadosPersonas[i].APE1_AUT.toString() +  ', ' +
      this.autorizadosPersonas[i].NOMBRE_AUT.toString()
    } else {
      lineaNombreAut = this.autorizadosPersonas[i].APE1_AUT.toString() + ' ' 
                   + this.autorizadosPersonas[i].APE2_AUT.toString() + ' , ' +
                   this.autorizadosPersonas[i].NOMBRE_AUT.toString()
    }



     //******************************************************* */


        nuevoRegistro = [ lineaNombreTitular,
                          muestraNifTitular,
                          lineaNombreAut,
                          this.autorizadosPersonas[i].NIF_AUT,
                          this.autorizadosPersonas[i].F_ALTA,
                          this.autorizadosPersonas[i].F_BAJA];
        tableData.push(nuevoRegistro);                
    }

    var pdf = new jsPDF('l', 'mm', 'a4');

   // var pdf = new jsPDF({orientation : 'portrait',});
    pdf.setFont("courier","bold");
    pdf.setFontSize(18);
    let titulo = "Listado Titulares y Pesonas Autorizadas";
    pdf.text(titulo,50,15);
    //Poner una linea debajo
    const textWidth = pdf.getTextWidth(titulo);
    pdf.setLineWidth(0.7);
    pdf.line(50,17,50 + textWidth, 17);

    (pdf as any).autoTable({
      head : header,
      body : tableData,
      tableLineColor : [44,62,80],
      tableLineWidth : 0.75,
      styles:{
        font : "courier",
        lineColor : [44, 62, 80],
        lineWidth : 0.55},
      headerStyles: {
        fillColor : [186, 235, 236],
        lineColor : [44, 62, 80],
        lineWidth : 0.55,
        fontSize : 11
      },
      bodyStyles : {
        fillColor : [242, 251, 251],
        lineColor : [44, 62, 80],
        lineWidth : 0.55,
        textColor : 50
      },
      alternateRowStyles: {
        fillColor : [255,255,255],
        lineColor : [44, 62, 80],
        lineWidth : 0.55,
        textColor : 50
      },
      margin: { top:25},
      theme : 'plain',
      didDrawCell: (data:any)=> {
        //console.log(data.column.index)
      }
    });

    //Poner el número de la página
    const pageCount = pdf.getNumberOfPages();
    pdf.setFont("courier","normal");
    pdf.setFontSize(12);

    for (var j=1;j<=pageCount;j++){
      pdf.setPage(j);
      pdf.text('Pagina ' + String(j) + ' / ' + String(pageCount),250,15);
    }

    let hoy : Date = new Date();
    let nombre_archivo = "listadoautorizados_" + this.datePipe.transform(hoy, 'dd_MM_yyy') + ".pdf";
    pdf.save(nombre_archivo);
   



  }  


}
