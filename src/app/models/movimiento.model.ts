
export class  MovimientoModel {
    IDMOV:          number;
    IDPARCELA:      number;
    TITULAR:        number;
    ACTIVIDAD:      number;
    FECHA_MOV:      string;
    F_EFECTIVA_MOV: string;
    OPERACION:      string;
    F_OPERACION:    string;
    ACTIVO:         string;
    FIN_VIGENCIA:   string;
    IAE:            string;

    constructor(){
        
        this.IDMOV = 0;
        this.IDPARCELA = 0;
        this.TITULAR = 0;
        this.ACTIVIDAD = 0;
        this.FECHA_MOV = new Date().toLocaleDateString('es-ES',{ timeZone: 'UTC' });
        this.F_EFECTIVA_MOV = new Date().toLocaleDateString('es-ES',{ timeZone: 'UTC' });
        this.OPERACION = "A";
        this.F_OPERACION = new Date().toLocaleDateString('es-ES',{ timeZone: 'UTC' });
        this.ACTIVO = "S";
        this.FIN_VIGENCIA = "";
        this.IAE ="";
 
    } 
}
