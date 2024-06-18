import { PacienteEntity } from "../entities/paciente-entity"

export class PacienteMaper{

    static fromEntity(object:{[key:string]:any}):PacienteEntity{
        const {id, nombre, apellido, cedula, fecha_nacimiento} = object
        return new PacienteEntity(id, nombre, apellido, cedula, fecha_nacimiento)
    }
}