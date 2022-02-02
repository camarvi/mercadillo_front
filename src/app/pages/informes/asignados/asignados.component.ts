import { Component, OnInit } from '@angular/core';
import { MercadillosService } from '../../../services/mercadillos.service';

import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { AdjudicadosDetallenterface } from '../../../interfaces/informes-response';

import { DatePipe } from '@angular/common';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


//import * as jsPDF from 'jspdf';
//import * as jpt from 'jspdf-autotable';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.component.html',
  styleUrls: ['./asignados.component.css']
})
export class AsignadosComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];
  public asignados : AdjudicadosDetallenterface[] = [];
  public noencontrados : boolean;
  public nombre_mercadillo : string;

  constructor(private mercadillosService : MercadillosService,public datePipe: DatePipe) { }

  ngOnInit(): void {

    this.noencontrados = false;
    this.mercadillosService.getMercadillos()
          .subscribe( (resp : MercadilloInterface[])=>{
            this.mercadillos = resp;
          });
  }

  buscarAsignados(mercadillo : number, codigo : string){ //mercadillo : string){
    
   // console.log(mercadillo);
   //this.nombre_mercadillo = this.mercadillos[mercadillo].DESCRIPCION;
   
  //  this.mercadillosService.getAsignadosMer(mercadillo)

  this.nombre_mercadillo = this.mercadillos[mercadillo].DESCRIPCION;

    this.mercadillosService.getAsignadosMer(codigo)
      .subscribe( resp =>{
        this.asignados = resp;
        console.log(this.asignados);
        if (this.asignados.length<1){
          this.noencontrados = true;
        } else {
          this.noencontrados = false;
        }
      });
    
  }

  generarTablaPdf(){
   
    
    const header =[['Puesto', 'Superficie', 'Ap1', 'Ap2', 'Nombre', 'Nif', 'Actividad', 'Fecha']];
    const tableData = [];

    let nuevoRegistro = ['','','','','','','',''];

    for (var i=0;i<this.asignados.length;i++) {
        nuevoRegistro = [this.asignados[i].PUESTO.toString(),this.asignados[i].SUPERFICIE.toString(),
                         this.asignados[i].APE1, this.asignados[i].APE2,this.asignados[i].NOMBRE,
                        this.asignados[i].NIF, this.asignados[i].ACTIVIDAD,this.asignados[i].F_EFECTO];
        tableData.push(nuevoRegistro);                
    }

    var pdf = new jsPDF('l', 'mm', 'a4');

   // var pdf = new jsPDF({orientation : 'portrait',});
    pdf.setFont("courier","bold");
    pdf.setFontSize(18);
    let titulo = "ASIGNADOS : " + this.nombre_mercadillo;
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
