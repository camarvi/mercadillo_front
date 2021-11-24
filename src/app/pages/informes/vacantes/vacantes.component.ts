import { Component, OnInit } from '@angular/core';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MercadillosService} from '../../../services/mercadillos.service';

import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {

  public mercadillos : MercadilloInterface[] = [];
  public parcelaslibres : ParcelaInterface[] = [];
  public nombre_mercadillo : string;
  public noencontrados : boolean;

  constructor(private mercadilloService : MercadillosService,public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.noencontrados = false;
    this.nombre_mercadillo ="";
    this.mercadilloService.getMercadillos()
        .subscribe( (resp : MercadilloInterface[])   => {
            this.mercadillos = resp;
        });
  }

  buscarVacantes(mercadillo : number, codigo : string){

   this.nombre_mercadillo = this.mercadillos[mercadillo].DESCRIPCION;

    this.mercadilloService.getParcelasLibres(codigo)
        .subscribe( resp=>{
          console.log(resp);
          this.parcelaslibres = resp;
          console.log(this.parcelaslibres);
          if (this.parcelaslibres.length<1){
            this.noencontrados = true;
          } else {
            this.noencontrados = false;
          }

        }); 

  }

 /********************************************************************** */


 generarTablaPdf(){

  
  const header =[['Puesto', 'Superficie', 'Fecha Vacante']];
  const tableData = [];

  let nuevoRegistro = ['','',''];
 
  for (var i=0;i<this.parcelaslibres.length;i++){

    nuevoRegistro = [this.parcelaslibres[i].NUMERO.toString(),this.parcelaslibres[i].SUPERFICIE.toString(),
                      this.parcelaslibres[i].FECHA_ESTADO.toString()];
   // nuevoRegistro = ['150', '19' , '19/06/2021' ];
    tableData.push(nuevoRegistro);                  
  }
  
  var pdf = new jsPDF({ orientation : 'landscape', });
  pdf.setFont("courier", "bold");
  pdf.setFontSize(18);

  let titulo = "Vacantes " + this.nombre_mercadillo;
  pdf.text(titulo, 55 , 15);
  //Poner una linea debajo
  const textWidth = pdf.getTextWidth(titulo);
  pdf.setLineWidth(0.7);
  pdf.line(55,17,55 + textWidth , 17);
 
  (pdf as any).autoTable({
    head: header,
    body:tableData,
    tableLineColor : [44,62,80],
    tableLineWidth: 0.75,
    styles:{
      font : "courier",
      lineColor : [44, 62, 80],
      lineWidth: 0.55
          },
    headerStyles: {
      fillColor: [186, 235 , 236],
      lineColor: [44, 62, 80],
      lineWidth: 0.55,
      fontSize: 11
    },
    bodyStyles: {
      fillColor : [242, 251, 251], //[254,255,241], //[255, 255, 255],
      lineColor : [44, 62, 80],
      lineWidth : 0.55,
      textColor : 50
    },
    alternateRowStyles: {
      fillColor : [255, 255, 255],
      lineColor : [44, 62, 80],
      lineWidth : 0.55,
      textColor : 50
    },
    margin:{ top : 25},
    theme: 'plain',
    didDrawCell: (data:any) => {
        //console.log(data.column.index)
    }
  })

  // PONER EL NUMERO DE LA PAGINA
  
  const pageCount = pdf.getNumberOfPages();
  pdf.setFont("courier", "normal");
  pdf.setFontSize(12);
  
  for (var j=1;j<=pageCount;j++){
    pdf.setPage(j);
    pdf.text('Pagina ' + String(j) + ' de ' + String(pageCount),250,15);
  }

  let hoy : Date = new Date();
  let nombre_archivo = "vacantes_" + this.datePipe.transform(hoy, 'dd_MM_yyy') + ".pdf";
  pdf.save(nombre_archivo);

  }
  

}
