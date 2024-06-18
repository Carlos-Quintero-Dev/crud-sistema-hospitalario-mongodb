import { DoctorEntity } from "../entities/doctor-entity"

export class DoctorMaper{

    static fromEntity(object:{[key:string]:any}):DoctorEntity{
        const {id, nombre, apellido, cedula, fecha_nacimiento} = object
        return new DoctorEntity(id, nombre, apellido, cedula, fecha_nacimiento)
    }
}