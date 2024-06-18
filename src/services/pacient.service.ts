
import { PacienteModel } from "../data/mongodb/models/paciente.model";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { CreatePacienteDto } from "../domain/dtos/pacientes/create-paciente.dto";
import { UpdatePacienteDto } from "../domain/dtos/pacientes/update-paciente.dto";
import { PacienteEntity } from "../domain/entities/paciente-entity";
import { CustomError } from "../domain/errors/custom.error";
import { PacienteMaper } from "../domain/mapers/Paciente.mapers";

interface FindAllPaciente{
    offset:number,
    limit:number,
    page:number,
    total:number,
    pacientes: PacienteEntity[],
}




export class PacientesService{
    async create (createPacienteDto:CreatePacienteDto):Promise<PacienteEntity>{
        try {
            const newPaciente = await PacienteModel.create(createPacienteDto)
            if( !newPaciente ) throw CustomError.badRequest("No se pudo anadir el Paciente")
            await newPaciente.save()
        return PacienteMaper.fromEntity(newPaciente)
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer(); 
        }
    }

    async update(updatePacienteDto:UpdatePacienteDto, id:string):Promise<PacienteEntity>{
        try {
            const updatePaciente = await PacienteModel.findByIdAndUpdate(id, {...updatePacienteDto})

            if( !updatePaciente ) throw CustomError.badRequest("No se encuentra el Paciente")
            await updatePaciente.save()
        return PacienteMaper.fromEntity(updatePaciente)
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findOne(_id:string): Promise<PacienteEntity>{
        try {
            const Paciente= await PacienteModel.findById({_id})
            if( !Paciente) throw CustomError.badRequest("No se encuentra el Paciente")
            return PacienteMaper.fromEntity(Paciente);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<PacienteEntity>{
        try {
            const Paciente= await PacienteModel.findByIdAndDelete({_id})
            if( !Paciente) throw CustomError.badRequest("No se encuentra el Paciente")
            return PacienteMaper.fromEntity(Paciente);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

      async findAll(paginationDto:PaginationDto):Promise<FindAllPaciente>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, pacientes] = await Promise.all([
                PacienteModel.find({}).countDocuments(),
                PacienteModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                pacientes:pacientes.map(dep=>PacienteMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }
}