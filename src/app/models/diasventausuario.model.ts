export class DiasVentaUsuarioModel {
    IDVENTA: number;
    IDMOV:   number;
    LUN:     string | boolean;
    MAR:     string | boolean;
    MIE:     string | boolean;
    JUE:     string | boolean;
    VIE:     string | boolean;
    SAB:     string | boolean;
    DOM:     string | boolean;

    constructor() {
        this.IDVENTA = 0;
        this.IDMOV = 0;
        this.LUN = false;
        this.MAR = false;
        this.MIE = false;
        this.JUE = false;
        this.VIE = false;
        this.SAB = false;
        this.DOM = false;
        // this.LUN = "N";
        // this.MAR = "N";
        // this.MIE = "N";
        // this.JUE = "N";
        // this.VIE = "N";
        // this.SAB = "N";
        // this.DOM = "N";

    }
}
