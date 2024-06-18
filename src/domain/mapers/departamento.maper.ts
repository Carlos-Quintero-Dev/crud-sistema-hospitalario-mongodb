import { DepartamentoEntity } from "../entities/departamento-entity"

export class DepartamentoMaper{

    static fromEntity(object:{[key:string]:any}):DepartamentoEntity{
        const {id, nombre, especialidad} = object
        return new DepartamentoEntity(id, nombre, especialidad)
    }
}