export interface PersonaInterface {
    IDPERSONA:  number;
    NIF:        string;
    APE1:       string;
    APE2:       string;
    NOMBRE:     string;
    TLF:        string;
    EMAIL:      string;
    DIRECCION:  string;
    CP:         string;
    POBLACION:  string;
    MUNICIPIO:  string;
    FECHA_ALTA: Date;
    SEXO:       number;
    TIPOVIA:    number;
}


export interface MercadilloInterface{
    
    IDMERCADILLO:  number;
    DESCRIPCION:   string;
    MULTITITULAR:  string;
    NUMERO_DIAS:   number;
    DIASEMANA:     number;
    LOCALIZACION:  string;
}


export interface DiaSemanaInterface {
    NUMERO_DIA:  number;
    NOMBRE_DIA:  string;
    ABREVIATURA: string;
}


export interface Parentesco {
    COD_PARENTESCO: number;
    DES_PARENTESCO: string;
}


export interface Tipovia {
    COD_VIA:  number;
    DESC_VIA: string;
}


export interface Sexo {
    COD_SEXO:  number;
    DESC_SEXO: string;
}

