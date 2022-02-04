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

export interface AutorizadosPersonaInterface {
    NIF_TITULAR: string;
    APE1_TITULAR: string;
    APE2_TITULAR: null | string;
    NOMBRE_TITULAR: string;
    NIF_AUT: string;
    APE1_AUT: string;
    APE2_AUT: string;
    NOMBRE_AUT: string;
    F_ALTA :  null | string;
    F_BAJA : null | string;
}
