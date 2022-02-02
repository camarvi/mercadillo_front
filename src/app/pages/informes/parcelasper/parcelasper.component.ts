import { Component, OnInit } from '@angular/core';

import { MercadillosService } from '../../../services/mercadillos.service';

import { PersonasPuestoInterface } from '../../../interfaces/informes-response';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-parcelasper',
  templateUrl: './parcelasper.component.html',
  styleUrls: ['./parcelasper.component.css']
})
export class ParcelasperComponent implements OnInit {

  public puestospersonas : PersonasPuestoInterface[] = [];
  public noencontrados : boolean = false;
  public cargando : boolean = false;

  constructor(private mercadillosService : MercadillosService,public datePipe: DatePipe) { }

  ngOnInit(): void {
      
    this.cargando = true;
       this.mercadillosService.getInformePersonasParcelas()
           .subscribe( (resp:PersonasPuestoInterface[])=>{
             this.puestospersonas = resp;
             console.log(this.puestospersonas);
             if (this.puestospersonas.length<1){
              this.noencontrados = true;
            } else {
              this.noencontrados = false;
            }
            this.cargando = false;
           }) 
    
  }


   generarTablaPdf() {
     
     const header =[['Titular', 'Nif', 'Mercadillo', 'Puesto', 'Sup', 'Actividad' ]];
     const tableData = [];
     // CONTROL PARA MOSTAR NOMBRE USUARIO O NO
     let nifLinea :string = ""; // this.puestospersonas[0].NIF;
     let lineaNombre : string;

     let nuevoRegistro = ['','','','','','','',''];

     for (var i=0;i<this.puestospersonas.length;i++) {
      
      if (nifLinea != this.puestospersonas[i].NIF.toString()){
        nifLinea = this.puestospersonas[i].NIF.toString(); 
        if (this.puestospersonas[i].APE2 === null ){
          lineaNombre = this.puestospersonas[i].APE1.toString() +  ', ' +
          this.puestospersonas[i].NOMBRE.toString()
        } else {
         lineaNombre = this.puestospersonas[i].APE1.toString() + ' ' 
                       + this.puestospersonas[i].APE2 + ' , ' +
                       this.puestospersonas[i].NOMBRE.toString()
        }
      } 
       else {
        lineaNombre = "";
        nifLinea = this.puestospersonas[i].NIF.toString();
      }

     



         nuevoRegistro = [lineaNombre,
                          this.puestospersonas[i].NIF.toString(),
                          this.puestospersonas[i].MERCADILLO.toString(),
                          this.puestospersonas[i].PUESTO.toString(),
                          this.puestospersonas[i].SUPERFICIE.toString(),
                          this.puestospersonas[i].DESC_ACTIVIDAD.toString(),
                         ];
         tableData.push(nuevoRegistro);                
     }

     var pdf = new jsPDF('l', 'mm', 'a4');

    // var pdf = new jsPDF({orientation : 'portrait',});
     pdf.setFont("courier","bold");
     pdf.setFontSize(18);
     let titulo = "Listado de Personas y sus Puestos";
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
     let nombre_archivo = "asignados_" + this.datePipe.transform(hoy, 'dd_MM_yyy') + ".pdf";
     pdf.save(nombre_archivo);
   

   }

  
}
