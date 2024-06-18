import { DepartamentoModel } from "../data/mongodb/models/departamento.model";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { CreateDepartamentoDto } from "../domain/dtos/departamentos/create-departamento.dto";
import { UpdateDepartamentoDto } from "../domain/dtos/departamentos/update-departamento.dto";
import { DepartamentoEntity } from "../domain/entities/departamento-entity";
import { CustomError } from "../domain/errors/custom.error";
import { DepartamentoMaper } from "../domain/mapers/departamento.maper";


interface FindAllDepartament{
    offset:number,
    limit:number,
    page:number,
    total:number,
    departaments: DepartamentoEntity[],
}


export class DepartamentoService{
    async create (createDepartamentoDto:CreateDepartamentoDto):Promise<DepartamentoEntity>{
        try {
            const Departamento = await DepartamentoModel.create(createDepartamentoDto)
            if( !Departamento ) throw CustomError .badRequest("No se pudo crear el departamento")
            await Departamento.save();
            return DepartamentoMaper.fromEntity(Departamento);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(updateDepartamentoDto:UpdateDepartamentoDto, id:string):Promise<DepartamentoEntity>{
        try {
            const Departamento = await DepartamentoModel.findByIdAndUpdate(id, {...updateDepartamentoDto})
            if( !Departamento ) throw CustomError.badRequest("No se encuentra el departamento")
            await Departamento.save();
            return DepartamentoMaper.fromEntity(Departamento);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<DepartamentoEntity>{
        try {
            const Departamento= await DepartamentoModel.findByIdAndDelete({_id})
            if( !Departamento) throw CustomError.badRequest("No se encuentra el departamento")
            return DepartamentoMaper.fromEntity(Departamento);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

    async findOne(_id:string):Promise<DepartamentoEntity>{
        try {
            const Departamento= await DepartamentoModel.findById({_id})
            if( !Departamento) throw CustomError.badRequest("No se encuentra el departamento")
            return DepartamentoMaper.fromEntity(Departamento);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findAll(paginationDto:PaginationDto):Promise<FindAllDepartament>{
        const {offset, limit} = paginationDto

        try {
            
            const [total,departaments] = await Promise.all([
                DepartamentoModel.find({}).countDocuments(),
                DepartamentoModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                departaments:departaments.map(dep=>DepartamentoMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}
