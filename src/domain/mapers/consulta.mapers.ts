import { ConsultaEntity } from "../entities/consulta-entity"

export class ConsultaMaper{

    static fromEntity(object:{[key:string]:any}):ConsultaEntity{
        const {id, fecha, diagnostico} = object
        return new ConsultaEntity(id, fecha, diagnostico)
    }
}