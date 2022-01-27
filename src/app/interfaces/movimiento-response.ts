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
    IDMOV:          number;
    IDPARCELA:      number;
    IAE:           string;
    TITULAR:        number;
    FECHA_MOV:      string;
    NIF:            string;
    APE1:           string;
    APE2:           string;
    NOMBRE:         string;
    ACTIVIDAD:      number;
    F_EFECTIVA_MOV: string;
    DES_OPERACION:  string;
    ACTIVO:         string;
    FIN_VIGENCIA:   string;
}
