export class ParcelaModel{

    IDPARCELAS : number;
    FECHA_ALTA : string;
    IDMERCADILLO : number;
    SUPERFICIE : number;
    NUMERO : number;
    FECHA_ESTADO : string;
    COD_ESTADO : string;

    constructor(){
       this.IDPARCELAS = 0;
       this.FECHA_ALTA = new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' });
       this.IDMERCADILLO = 0;
       this.SUPERFICIE = 0;
       this.NUMERO = 0;
       this.FECHA_ESTADO = new Date().toLocaleDateString('es-ES',{ timeZone: 'UTC' });
       this.COD_ESTADO = "V"

    }


}