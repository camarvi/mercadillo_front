export class MercadilloModel{
    
    IDMERCADILLO    : number;
    DESCRIPCION     : string;
    MULTITITULAR    : string;
    NUMERO_DIAS     : number;
    DIASEMANA       : number;
    LOCALIZACION    : string;

    constructor() {
        this.IDMERCADILLO = 0;
        this.DESCRIPCION = "";
        this.MULTITITULAR = "N";
        this.NUMERO_DIAS = 0;
        this.DIASEMANA = 0;
        this.LOCALIZACION = "";
    }
}