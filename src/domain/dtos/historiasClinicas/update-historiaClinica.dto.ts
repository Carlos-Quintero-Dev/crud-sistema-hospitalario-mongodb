export class UpdateHistoriaClinicaDto{
    constructor(
        public id:string,
        public fecha: string,
        public descripcion:string,
    ){};

    static update(object:{[key:string]:any}):[string?, UpdateHistoriaClinicaDto?]{
        const {id, fecha,descripcion} = object

        if(!descripcion) return ['descripcion es requerida', undefined]

        return [undefined, new UpdateHistoriaClinicaDto(id, fecha, descripcion)]
    }
}