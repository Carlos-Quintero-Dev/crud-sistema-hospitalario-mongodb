import { HistoriaClinicataModel } from "../data/mongodb/models/historiaClinica.model";
import { CreateHistoriaClinicaDto } from "../domain/dtos/historiasClinicas/create-historiaClinica.dto";
import { HistoriaClinicaEntity } from "../domain/entities/historiaClinica-entity";
import { CustomError } from "../domain/errors/custom.error";
import { HistoriaClinicaMaper } from "../domain/mapers/historiaClinica.mapers";
import {UpdateHistoriaClinicaDto} from "../domain/dtos/historiasClinicas/update-historiaClinica.dto"
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";

interface FindAllHistoriasClinicas{
    offset:number,
    limit:number,
    page:number,
    total:number,
    historiasClinicas: HistoriaClinicaEntity[],
}



export class HistoriaClinicaService{
    async create (createHistoriaClinicaDto:CreateHistoriaClinicaDto):Promise<HistoriaClinicaEntity>{
        try {
            const HistoriaClinica = await HistoriaClinicataModel.create(createHistoriaClinicaDto)
            if( !HistoriaClinica ) throw CustomError.badRequest("No se pudo crear la Historia Clinica")
            await HistoriaClinica.save();
            return HistoriaClinicaMaper.fromEntity(HistoriaClinica);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(updateHistoriaClinicaDto:UpdateHistoriaClinicaDto, id:string):Promise<HistoriaClinicaEntity>{
        try {
            const HistoriaClinica = await HistoriaClinicataModel.findByIdAndUpdate(id, {...updateHistoriaClinicaDto})
            if( !HistoriaClinica ) throw CustomError.badRequest("No se encuentra la Historia Clinica")
            await HistoriaClinica.save();
            return HistoriaClinicaMaper.fromEntity(HistoriaClinica);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<HistoriaClinicaEntity>{
        try {
            const HistoriaClinica= await HistoriaClinicataModel.findByIdAndDelete({_id})
            if( !HistoriaClinica) throw CustomError.badRequest("No se encuentra la Historia Clinica")
            return HistoriaClinicaMaper.fromEntity(HistoriaClinica);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

    async findOne(_id:string):Promise<HistoriaClinicaEntity>{
        try {
            const HistoriaClinica= await HistoriaClinicataModel.findById({_id})
            if( !HistoriaClinica) throw CustomError.badRequest("No se encuentra la Historia Clinica")
            return HistoriaClinicaMaper.fromEntity(HistoriaClinica);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findAll(paginationDto:PaginationDto):Promise<FindAllHistoriasClinicas>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, historiasClinicas] = await Promise.all([
                HistoriaClinicataModel.find({}).countDocuments(),
                HistoriaClinicataModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                historiasClinicas:historiasClinicas.map(dep=>HistoriaClinicaMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}