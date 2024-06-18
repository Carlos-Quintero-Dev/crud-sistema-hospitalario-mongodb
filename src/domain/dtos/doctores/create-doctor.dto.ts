export class CreateDoctorDto{
    constructor(
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public fecha_nacimiento: string
    ){};

    static create(object:{[key:string]:any}):[string?, CreateDoctorDto?]{
        const {nombre, apellido, cedula, fecha_nacimiento} = object

        if(!nombre) return ['nombre es requerido', undefined]
        if(!apellido) return ['apellido es requerido', undefined]
        if(!cedula) return ['cedula es requerida', undefined]
        

        return [undefined, new CreateDoctorDto(nombre, apellido, cedula, fecha_nacimiento)]
    }
}