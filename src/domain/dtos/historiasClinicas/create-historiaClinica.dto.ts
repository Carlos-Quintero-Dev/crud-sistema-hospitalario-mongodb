export class CreateHistoriaClinicaDto{
    constructor(
        public fecha: string,
        public descripcion:string,
    ){};

    static create(object:{[key:string]:any}):[string?, CreateHistoriaClinicaDto?]{
        const {fecha,descripcion} = object

        
        if(!descripcion) return ['descripcion es requerida', undefined]
        return [undefined, new CreateHistoriaClinicaDto(fecha, descripcion)]
    }
}