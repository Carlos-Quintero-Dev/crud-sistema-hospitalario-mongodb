export class UpdateHospitalizacionDto{
    constructor(
        public id:string,
        public fecha_entrada: string,
        public fecha_salida:string
    ){}

    static update(object:{[key:string]:any}):[string?, UpdateHospitalizacionDto?]{
        const {id, fecha_entrada, fecha_salida} = object
        

        return [undefined, new UpdateHospitalizacionDto(id, fecha_entrada, fecha_salida)]
    }
}