export class CreateHospitalizacionDto{
    constructor(
        public fecha_entrada: string,
        public fecha_salida:string
    ){}

    static create(object:{[key:string]:any}):[string?, CreateHospitalizacionDto?]{
        const {fecha_entrada, fecha_salida} = object

        return [undefined, new CreateHospitalizacionDto(fecha_entrada, fecha_salida)]
    }
}
