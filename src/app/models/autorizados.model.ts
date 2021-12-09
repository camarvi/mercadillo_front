export class AutorizadosModel {
    ID_AUTORIZADO: number;
    TITULAR:       number;
    AUTORIZADO:    number;
    PARENTESCO:    number;
   // F_ALTA:        string;
   // F_BAJA:        string;  

   constructor(){
       this.ID_AUTORIZADO = 0;
       this.TITULAR = 0;
       this.AUTORIZADO = 0;
       this.PARENTESCO = 0;
    //   this.F_ALTA = new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' }); // .toDateString();  //this.datePipe.transform(new Date(),"dd/MM/yyyy");
    //   this.F_BAJA ="";

   } 
}
