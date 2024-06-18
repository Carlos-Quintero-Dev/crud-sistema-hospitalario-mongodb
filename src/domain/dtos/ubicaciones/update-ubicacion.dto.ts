export class UpdateUbicacionDto{
    constructor(
        public id: string,
        public estado: string,
        public ciudad: string,
        public municipio: string,
        public direccion: string
    ){};

    static update(object:{[key:string]:any}):[string?, UpdateUbicacionDto?]{
        const {id, estado, ciudad, municipio, direccion} = object

        if(!municipio) return ['municipio es requerido', undefined]
        if(!ciudad) return ['ciudad es requerido', undefined]

        return [undefined, new UpdateUbicacionDto(id,estado, ciudad, municipio, direccion)]
    }
}