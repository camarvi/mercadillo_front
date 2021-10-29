import { Component, OnInit } from '@angular/core';
import { MercadilloInterface } from '../../../interfaces/mercadillos-response';
import { ParcelaInterface } from '../../../interfaces/parcela-response';
import { MercadillosService} from '../../../services/mercadillos.service';

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

  constructor(private mercadilloService : MercadillosService) { }

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


  /*
  const header = [['Registro', 'Fecha', 'Dni', 'Ap1', 'Ap2', 'Nombre', 'Resumen', 'Destino']];
    
  
  const tableData = [];
  
  let nuevoRegistro = [10,'','',''];
  
  
  for (i=0;i<this.listadosRegistros.length; i++) {
    nuevoRegistro = [this.listadosRegistros[i][0],
    this.datePipe.transform(this.listadosRegistros[i][2],'dd/MM/yyy'),
      this.listadosRegistros[i][3],this.listadosRegistros[i][4],this.listadosRegistros[i][5],this.listadosRegistros[i][6],this.listadosRegistros[i][7],this.listadosRegistros[i][8]];
    tableData.push(nuevoRegistro);
  };
   
    var pdf = new jsPDF({
      orientation : "landscape",
    
    });

  
      pdf.setFont("courier", "bold");
      pdf.setFontSize(18);
      
      this.filtro.desde
  
      let titulo = "ENTRADAS DESDE : " + this.datePipe.transform( this.filtro.desde,'dd/MM/yyy') + 
      " HASTA " + this.datePipe.transform( this.filtro.hasta,'dd/MM/yyy');
      pdf.text(titulo, 55, 15);
      // Poner una linea debajo
  
      const textWidth =pdf.getTextWidth(titulo);
      pdf.setLineWidth(0.7);
      pdf.line(55,17, 55 + textWidth, 17);
  
  
      (pdf as any).autoTable({
          head: header,
          body: tableData,
          tableLineColor:  [44, 62, 80],//[189, 195, 199],
          tableLineWidth: 0.75,
          styles: {
            font: 'Meta',
            lineColor: [44, 62, 80],
            lineWidth: 0.55
                  },
                  headerStyles: {
                      fillColor: [186, 235, 236],  //[250, 252,215],
                      lineColor: [44, 62, 80],
                      lineWidth: 0.55,
                      fontSize: 11
                  },
                  bodyStyles: {
                      fillColor: [242, 251, 251],  //[254,255,241], //[255, 255, 255],
                      lineColor: [44, 62, 80],
                      lineWidth: 0.55,
                      textColor: 50
                  },
                  alternateRowStyles: {
                      fillColor: [255, 255, 255], //  [254,255,241]
                      lineColor: [44, 62, 80],
                      lineWidth: 0.55,
                      textColor: 50
                  },
  
  
          //body : this.listadosRegistros,
          margin:{ top : 25},
          theme: 'plain',
          didDrawCell: (data:any) => {
              //console.log(data.column.index)
          }
          })
  
          // Open PDF document in browser's new tab
          //pdf.output('dataurlnewwindow')
  
          // Download PDF doc  
  
  
  // PONER EL NUMERO DE LA PAGINA
  
  const pageCount = pdf.getNumberOfPages();
  
  // For each page, print the page number and the total pages
  
  pdf.setFont("courier", "normal");
  pdf.setFontSize(12);
      
  for(var i = 1; i <= pageCount; i++) {
       // Go to page i
      pdf.setPage(i);
       //Print Page 1 of 4 for example
      pdf.text('Pagina ' + String(i) + ' de ' + String(pageCount),250,15);
  }
  
    let hoy: Date = new Date();
    let nombre_archivo = "entradas_" + this.datePipe.transform( hoy , 'dd_MM_yyy') + ".pdf"
  
    pdf.save(nombre_archivo);
  

    */
  }
  

  
/************************************************************************************ */


}
