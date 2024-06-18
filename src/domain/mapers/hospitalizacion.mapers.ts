import { HospitalizacionEntity } from "../entities/hopitalizacion-entity"

export class HospitalizacionMaper{

    static fromEntity(object:{[key:string]:any}):HospitalizacionEntity{
        const {id, fecha_entrada, fecha_salida} = object
        return new HospitalizacionEntity(id, fecha_entrada, fecha_salida)
    }
}