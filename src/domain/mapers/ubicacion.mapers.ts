import { UbicacionEntity } from "../entities/ubicacion-entity"

export class UbicacionMaper{

    static fromEntity(object:{[key:string]:any}):UbicacionEntity{
        const {id, estado, ciudad, minicipio, direccion} = object
        return new UbicacionEntity(id, estado, ciudad, minicipio, direccion)
    }
}