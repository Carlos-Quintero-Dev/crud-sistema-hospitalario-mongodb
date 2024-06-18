export class PacienteEntity{
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public fecha_nacimiento: string
    ){};
}