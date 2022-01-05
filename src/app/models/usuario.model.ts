export class UsuarioModel{

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
    FECHA_ALTA: string;
    SEXO:       number;
    TIPOVIA:    number;
    NUM_DIRE:   number;
    KM_DIRE:    string;
    BLOQUE:     string;
    PORTAL:     string;
    ESCALERA:   string;
    PLANTA:     string;
    PUERTA:     string;

    constructor(){
        this.IDPERSONA = 0;
        this.NIF ="";
        this.APE1 ="";     
        this.APE2 = "";   
        this.NOMBRE = "";   
        this.TLF = "";       
        this.EMAIL = "";     
        this.DIRECCION = "";
        this.CP = "";        
        this.POBLACION = ""; 
        this.MUNICIPIO = ""; 
        this.FECHA_ALTA = new Date().toLocaleDateString('en-GB',{ timeZone: 'UTC' }); // .toDateString();  //this.datePipe.transform(new Date(),"dd/MM/yyyy");
        this.SEXO = 1;   
        this.TIPOVIA = 1;
        this.NUM_DIRE = 0;
        this.KM_DIRE = "";
        this.BLOQUE = "";
        this.PORTAL = "";
        this.ESCALERA = "";
        this.PLANTA = "";
        this.PUERTA = "";  
        // toLocaleDateString('es-ES',{ timeZone: 'UTC' })
    }
}