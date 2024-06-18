export class UpdatePacienteDto{
    constructor(
        public id:string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public fecha_nacimiento: string
    ){};

    static update(object:{[key:string]:any}):[string?, UpdatePacienteDto?]{
        const {id, nombre, apellido, cedula, fecha_nacimiento} = object
        
        return [undefined, new UpdatePacienteDto(id, nombre, apellido, cedula, fecha_nacimiento)]
    }
}