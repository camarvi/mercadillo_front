export class TarifaModel {
    IDTARIFA: number;
    COD_MER:  number;
    TARIFA:   number;
    F_INICIO: string;
    F_FIN:    string | null;

    constructor(){
        this.IDTARIFA = 0;
        this.COD_MER = 0;
        this.F_INICIO = new Date().toLocaleDateString('es-ES',{ timeZone: 'UTC' });
        this.TARIFA = 0;
        this.F_FIN = null;
 
     }
}
