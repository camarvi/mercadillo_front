export interface AdjudicadosDetallenterface {
    PUESTO:     number;
    APE1:       string;
    APE2:       string;
    NOMBRE:     string;
    NIF:        string;
    ACTIVIDAD:  string;
    F_EFECTO:   string;
    SUPERFICIE: number;
}

export interface PersonasPuestoInterface {
    APE1:           string;
    APE2:           null | string;
    NOMBRE:         string;
    NIF:            string;
    COD_MER:        number;
    MERCADILLO:     string;
    PUESTO:         number;
    SUPERFICIE:     number;
    ACTIVIDAD:      number;
    DESC_ACTIVIDAD: string;
}

