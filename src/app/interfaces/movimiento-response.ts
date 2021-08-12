export interface MovimientoInterface {
    IDMOV:          number;
    IDPARCELA:      number;
    TITULAR:        number;
    ACTIVIDAD:      number;
    FECHA_MOV:      Date;
    F_EFECTIVA_MOV: Date;
    OPERACION:      string;
    F_OPERACION:    Date;
    ACTIVO:         string;
    FIN_VIGENCIA:   Date;
}


export interface MovimientoDetallenterface {
    JJAA:           string;
    TITULAR:        number;
    NIF:            string;
    APE1:           string;
    APE2:           string;
    NOMBRE:         string;
    F_EFECTIVA_MOV: string;
    DES_OPERACION:  string;
    ACTIVO:         string;
    FIN_VIGENCIA:   string;
}
