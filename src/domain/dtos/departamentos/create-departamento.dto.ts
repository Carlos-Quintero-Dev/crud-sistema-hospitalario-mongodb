export class CreateDepartamentoDto{
    constructor(
        public nombre: string,
        public especialidad: string
    ){};

    static create(object:{[key:string]:any}):[string?, CreateDepartamentoDto?]{
        const {nombre, especialidad} = object
        if(!nombre) return ['nombre es requerido', undefined]
        if(!especialidad) return ['especialidad es requerida', undefined]
        return [undefined, new CreateDepartamentoDto(nombre, especialidad)]
    }
}