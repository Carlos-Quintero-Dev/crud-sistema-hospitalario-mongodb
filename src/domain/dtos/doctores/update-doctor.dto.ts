export class UpdateDoctorDto{
    constructor(
        public id:string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public fecha_nacimiento: string
    ){};

    static update(object:{[key:string]:any}):[string?, UpdateDoctorDto?]{
        const {id, nombre, apellido, cedula, fecha_nacimiento} = object

        if(!nombre) return ['nombre es requerido', undefined]
        if(!apellido) return ['apellido es requerido', undefined]
        if(!cedula) return ['cedula es requerida', undefined]

       
        

        return [undefined, new UpdateDoctorDto(id, nombre, apellido, cedula, fecha_nacimiento)]
    }
}