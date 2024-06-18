import { HistoriaClinicaEntity } from "../entities/historiaClinica-entity"

export class HistoriaClinicaMaper{

    static fromEntity(object:{[key:string]:any}):HistoriaClinicaEntity{
        const {id, fecha, descripcion} = object
        return new HistoriaClinicaEntity(id, fecha, descripcion)
    }
}