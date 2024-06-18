import { Request, Response } from "express";
import { CreateDoctorDto } from "../../domain/dtos/doctores/create-doctor.dto";
import { DoctorService } from "../../services/doctor.service";
import { HandleError } from "../../domain/errors/handle.error";
import { UpdateDoctorDto } from "../../domain/dtos/doctores/update-doctor.dto";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class DoctoresController{
    constructor(private readonly doctresSrvice:DoctorService, ){}
    create = (req:Request, res:Response) => {
        const [error, createDoctorDto] = CreateDoctorDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.doctresSrvice.create(createDoctorDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateDoctorDto] = UpdateDoctorDto.update({...req.body, id})
        if(error) return res.status(400).json({error})
        this.doctresSrvice.update(updateDoctorDto!, id!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
        }
    
        delete = (req:Request, res:Response) => {
            const id = req.params.id
            if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
            this.doctresSrvice.delete(id)
            .then(category => res.json(category))
            .catch(error => HandleError.error(error, res))
        }
    
        findOne = async (req:Request, res:Response) => {
            const id = req.params.id
            if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
            this.doctresSrvice.findOne(id)
            .then(category => res.json(category))
            .catch(error => HandleError.error(error, res));
        }

        findAll = (req:Request, res:Response) => {
            const [error, paginationDto] = PaginationDto.paginate(req.query);
            if(error) return res.status(400).json({error})
            this.doctresSrvice.findAll(paginationDto!)
            .then(departament => res.json(departament))
            .catch(error => HandleError.error(error, res))  
        }

}