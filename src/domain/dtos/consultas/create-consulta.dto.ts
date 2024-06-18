
export class CreateConsultaDto{
    constructor(
        public fecha: string,
        public diagnostico:string
    ){}

    static create(object:{[key:string]:any}):[string?, CreateConsultaDto?]{
        const {fecha, diagnostico} = object

        if( !fecha ) return ["Necesita fecha de la consulta", undefined];

        if(!diagnostico) return ['el diagnostico es requerido', undefined]


        return [undefined, new CreateConsultaDto(fecha, diagnostico)]
    }
}
