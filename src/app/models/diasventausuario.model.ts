export class DiasVentaUsuarioModel {
    IDVENTA: number;
    IDMOV:   number;
    LUN:     string;
    MAR:     string;
    MIE:     string;
    JUE:     string;
    VIE:     string;
    SAB:     string;
    DOM:     string;

    constructor() {
        this.IDVENTA = 0;
        this.IDMOV = 0;
        this.LUN = "N";
        this.MAR = "N";
        this.MIE = "N";
        this.JUE = "N";
        this.VIE = "N";
        this.SAB = "N";
        this.DOM = "N";

    }
}
