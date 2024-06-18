import { Request, Response } from "express";
import { PacientesService } from "../../services/pacient.service";
import { CreatePacienteDto } from "../../domain/dtos/pacientes/create-paciente.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { UpdatePacienteDto } from "../../domain/dtos/pacientes/update-paciente.dto";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class PacientesController{
    constructor(private readonly pacientesService:PacientesService, ){}

    create = (req:Request, res:Response) => {
        const [error, createPacientesDto] = CreatePacienteDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.pacientesService.create(createPacientesDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
    const [error, updatePacientesDto] = UpdatePacienteDto.update({...req.body, id})
    if(error) return res.status(400).json({error})
    this.pacientesService.update(updatePacientesDto!, id!)
    .then(category => res.json(category))
    .catch(error => HandleError.error(error, res));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.pacientesService.delete(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    findOne = async (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.pacientesService.findOne(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.pacientesService.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }
}