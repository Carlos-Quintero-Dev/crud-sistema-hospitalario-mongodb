import { UbicacionModel } from "../data/mongodb/models/ubicacion.model";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { CreateUbicacionDto } from "../domain/dtos/ubicaciones/create-ubicacion.dto";
import { UpdateUbicacionDto } from "../domain/dtos/ubicaciones/update-ubicacion.dto";
import { UbicacionEntity } from "../domain/entities/ubicacion-entity";
import { CustomError } from "../domain/errors/custom.error";
import { UbicacionMaper } from "../domain/mapers/ubicacion.mapers";

interface FindAllUbicacion{
    offset:number,
    limit:number,
    page:number,
    total:number,
    ubicacion: UbicacionEntity[],
}




export class UbicacionesService{
    async create (createUbicacionDto:CreateUbicacionDto):Promise<UbicacionEntity>{
        try {
            const Ubicacion = await UbicacionModel.create(createUbicacionDto)
            if( !Ubicacion ) throw CustomError.badRequest("No se pudo anadir la Ubicacion")
            await Ubicacion.save()
        return UbicacionMaper.fromEntity(Ubicacion)
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer(); 
        }
    }

    async update(updateUbicacionDto:UpdateUbicacionDto, id:string):Promise<UbicacionEntity>{
        try {
            const Ubicacion = await UbicacionModel.findByIdAndUpdate(id, {...updateUbicacionDto})

            if( !Ubicacion ) throw CustomError.badRequest("No se encuentra la Ubicacion")
            await Ubicacion.save()
        return UbicacionMaper.fromEntity(Ubicacion)
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findOne(_id:string): Promise<UbicacionEntity>{
        try {
            const Ubicacion= await UbicacionModel.findById({_id})
            if( !Ubicacion) throw CustomError.badRequest("No se encuentra la Ubicacion")
            return UbicacionMaper.fromEntity(Ubicacion);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<UbicacionEntity>{
        try {
            const Ubicacion= await UbicacionModel.findByIdAndDelete({_id})
            if( !Ubicacion) throw CustomError.badRequest("No se encuentra la Ubicacion")
            return UbicacionMaper.fromEntity(Ubicacion);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

      async findAll(paginationDto:PaginationDto):Promise<FindAllUbicacion>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, ubicacion] = await Promise.all([
                UbicacionModel.find({}).countDocuments(),
                UbicacionModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                ubicacion:ubicacion.map(dep=>UbicacionMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }
}