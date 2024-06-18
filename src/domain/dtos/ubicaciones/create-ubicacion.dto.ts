export class CreateUbicacionDto{
    constructor(
        public estado: string,
        public ciudad: string,
        public municipio: string,
        public direccion: string
    ){};

    static create(object:{[key:string]:any}):[string?, CreateUbicacionDto?]{
        const {estado, ciudad, municipio, direccion} = object

        if(!municipio) return ['municipio es requerido', undefined]
        if(!ciudad) return ['ciudad es requerido', undefined]
        return [undefined, new CreateUbicacionDto(estado, ciudad, municipio,direccion)]
    }
}