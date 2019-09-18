import { TipoEpidemia } from "./TipoEpidemia";

export interface Epidemia {
    epidemia: TipoEpidemia;
    doenca: string;
    lat: number;
    lng: number;
    radius: number;
}