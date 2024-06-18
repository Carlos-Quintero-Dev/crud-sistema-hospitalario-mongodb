export class UpdateConsultaDto{
    constructor(
        public id:string,
        public fecha: string,
        public diagnostico?:string
    ){}

    static update(object:{[key:string]:any}):[string?, UpdateConsultaDto?]{
        const {id, fecha, diagnostico} = object
        return [undefined, new UpdateConsultaDto(id, fecha, diagnostico)]
    }
}