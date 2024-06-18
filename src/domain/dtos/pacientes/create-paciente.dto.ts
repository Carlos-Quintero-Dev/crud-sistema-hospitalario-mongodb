
export class CreatePacienteDto{
    constructor(
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public fecha_nacimiento: string
    ){};

    static create(object:{[key:string]:any}):[string?, CreatePacienteDto?]{
        const {nombre, apellido, cedula, fecha_nacimiento} = object

        return [undefined, new CreatePacienteDto(nombre, apellido, cedula, fecha_nacimiento)]
    }
}