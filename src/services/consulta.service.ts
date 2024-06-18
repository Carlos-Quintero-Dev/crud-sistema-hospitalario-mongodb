import { ConsultaModel } from "../data/mongodb/models/consulta.model";
import { CreateConsultaDto } from "../domain/dtos/consultas/create-consulta.dto";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { UpdateConsultaDto } from "../domain/dtos/consultas/update-consulta.dto";
import { ConsultaEntity } from "../domain/entities/consulta-entity";
import { CustomError } from "../domain/errors/custom.error";
import { ConsultaMaper } from "../domain/mapers/consulta.mapers";

interface FindAllConsulta{
    offset:number,
    limit:number,
    page:number,
    total:number,
    consultas: ConsultaEntity[],
}


export class ConsultasService{
    async create (createConsultaDto:CreateConsultaDto):Promise<ConsultaEntity>{
        try {
            const newConsulta = await ConsultaModel.create(createConsultaDto)
            if( !newConsulta ) throw CustomError.badRequest("No se pudo crear la consulta")
            await newConsulta.save();
            return ConsultaMaper.fromEntity(newConsulta);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(updateConsultaDto:UpdateConsultaDto, id:string):Promise<ConsultaEntity>{
        const {fecha} = updateConsultaDto
        try {
            const updateConsulta = await ConsultaModel.findByIdAndUpdate(id, {...updateConsultaDto})
            if( !updateConsulta ) throw CustomError.badRequest("No se encuentra la consulta")
            await updateConsulta.save();
            return ConsultaMaper.fromEntity(updateConsulta);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<ConsultaEntity>{
        try {
            const deleteConsulta= await ConsultaModel.findByIdAndDelete({_id})
            if( !deleteConsulta) throw CustomError.badRequest("No se encuentra la consulta")
            return ConsultaMaper.fromEntity(deleteConsulta);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

    async findOne(_id:string):Promise<ConsultaEntity>{
        try {
            const findConsulta= await ConsultaModel.findById({_id})
            if( !findConsulta) throw CustomError.badRequest("No se encuentra la consulta")
            return ConsultaMaper.fromEntity(findConsulta);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findAll(paginationDto:PaginationDto):Promise<FindAllConsulta>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, consultas] = await Promise.all([
                ConsultaModel.find({}).countDocuments(),
                ConsultaModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                consultas:consultas.map(dep=>ConsultaMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}