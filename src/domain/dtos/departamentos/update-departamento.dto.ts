export class UpdateDepartamentoDto{
    constructor(
        public id:string,
        public nombre: string,
        public especialidad: string
    ){};

    static update(object:{[key:string]:any}):[string?, UpdateDepartamentoDto?]{
        const {id, nombre, especialidad} = object

        if(!nombre) return ['nombre es requerido', undefined]
        if(!especialidad) return ['especialidad es requerida', undefined]

        return [undefined, new UpdateDepartamentoDto( id, nombre, especialidad)]
    }
}