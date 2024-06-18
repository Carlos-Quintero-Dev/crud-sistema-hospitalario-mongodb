import { DoctorModel } from "../data/mongodb/models/doctor.model";
import { PaginationDto } from "../domain/dtos/consultas/pagination-departamento";
import { CreateDoctorDto } from "../domain/dtos/doctores/create-doctor.dto";
import { UpdateDoctorDto } from "../domain/dtos/doctores/update-doctor.dto";
import { DoctorEntity } from "../domain/entities/doctor-entity";
import { CustomError } from "../domain/errors/custom.error";
import { DoctorMaper } from "../domain/mapers/doctores.mapers";

interface FindAllDoctor{
    offset:number,
    limit:number,
    page:number,
    total:number,
    doctores: DoctorEntity[],
}


export class DoctorService{
    async create (createDoctorDto:CreateDoctorDto):Promise<DoctorEntity>{
        try {
            const Doctor = await DoctorModel.create(createDoctorDto)
            if( !Doctor ) throw CustomError .badRequest("No se pudo crear el Doctor")
            await Doctor.save();
            return DoctorMaper.fromEntity(Doctor);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async update(updateDoctorDto:UpdateDoctorDto, id:string):Promise<DoctorEntity>{
        try {
            const Doctor = await DoctorModel.findByIdAndUpdate(id, {...updateDoctorDto})
            if( !Doctor ) throw CustomError.badRequest("No se encuentra el Doctor")
            await Doctor.save();
            return DoctorMaper.fromEntity(Doctor);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(_id:string):Promise<DoctorEntity>{
        try {
            const Doctor= await DoctorModel.findByIdAndDelete({_id})
            if( !Doctor) throw CustomError.badRequest("No se encuentra el Doctor")
            return DoctorMaper.fromEntity(Doctor);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
      }

    async findOne(_id:string):Promise<DoctorEntity>{
        try {
            const Doctor= await DoctorModel.findById({_id})
            if( !Doctor) throw CustomError.badRequest("No se encuentra el Doctor")
            return DoctorMaper.fromEntity(Doctor);
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    async findAll(paginationDto:PaginationDto):Promise<FindAllDoctor>{
        const {offset, limit} = paginationDto

        try {
            
            const [total, doctores] = await Promise.all([
                DoctorModel.find({}).countDocuments(),
                DoctorModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                doctores:doctores.map(dep=>DoctorMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}