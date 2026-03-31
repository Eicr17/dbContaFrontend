export interface RespuestaMdl<T> {
    datos : T[];
    mensaje : string;
    total_registros : number;
    exitosa:  string;

}