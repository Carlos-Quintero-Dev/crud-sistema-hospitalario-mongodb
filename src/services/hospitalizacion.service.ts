import { HospitalizacionModel } from "../data/mongodb/models/hospitalizacion.model";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { CreateHospitalizacionDto } from "../domain/dtos/hospitalizaciones/create-hospitalizacion.dto";
import { UpdateHospitalizacionDto } from "../domain/dtos/hospitalizaciones/update-hospitalizacion.dto";
import { HospitalizacionEntity } from "../domain/entities/hopitalizacion-entity";
import { CustomError } from "../domain/errors/custom.error";
import { HospitalizacionMaper } from "../domain/mapers/hospitalizacion.mapers";

interface FindAllHospitalizacion{
    offset:number,
    limit:number,
    page:number,
    total:number,
    hospitalizacion: HospitalizacionEntity[],
}




export class HospitalizacionService{
    async create (createHospitalizacionDto:CreateHospitalizacionDto):Promise<HospitalizacionEntity>{
        try {
            const Hospitalizacion = await HospitalizacionModel.create(createHospitalizacionDto)
            if( !Hospitalizacion ) throw CustomError.badRequest("No se pudo crear la Hospitalizacion")
            await Hospitalizacion.save();
            return HospitalizacionMaper.fromEntity(Hospitalizacion);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(updateHospitalizacionDto:UpdateHospitalizacionDto, id:string):Promise<HospitalizacionEntity>{
        try {
            const Hospitalizacion = await HospitalizacionModel.findByIdAndUpdate(id, {...updateHospitalizacionDto})
            if( !Hospitalizacion ) throw CustomError.badRequest("No se encuentra la Hospitalizacion")
            await Hospitalizacion.save();
            return HospitalizacionMaper.fromEntity(Hospitalizacion);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<HospitalizacionEntity>{
        try {
            const Hospitalizacion= await HospitalizacionModel.findByIdAndDelete({_id})
            if( !Hospitalizacion) throw CustomError.badRequest("No se encuentra la Hospitalizacion")
            return HospitalizacionMaper.fromEntity(Hospitalizacion);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

    async findOne(_id:string):Promise<HospitalizacionEntity>{
        try {
            const HistoriaClinica= await HospitalizacionModel.findById({_id})
            if( !HistoriaClinica) throw CustomError.badRequest("No se encuentra la Hospitalizacion")
            return HospitalizacionMaper.fromEntity(HistoriaClinica);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findAll(paginationDto:PaginationDto):Promise<FindAllHospitalizacion>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, hospitalizacion] = await Promise.all([
                HospitalizacionModel.find({}).countDocuments(),
                HospitalizacionModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                hospitalizacion:hospitalizacion.map(dep=>HospitalizacionMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}