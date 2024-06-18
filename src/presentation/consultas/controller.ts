import { Request, Response } from "express";
import { ConsultasService } from "../../services/consulta.service";
import { CreateConsultaDto } from "../../domain/dtos/consultas/create-consulta.dto";
import { UpdateConsultaDto } from "../../domain/dtos/consultas/update-consulta.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class consultasController{
    constructor(private readonly consultasService:ConsultasService, ){}

    create = (req:Request, res:Response) => {
        const [error, createConsultaDto] = CreateConsultaDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.consultasService.create(createConsultaDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
    const id = req.params.id
    if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
    const [error, updateConsultaDto] = UpdateConsultaDto.update({...req.body, id})
    if(error) return res.status(400).json({error})
    this.consultasService.update(updateConsultaDto!, id!)
    .then(category => res.json(category))
    .catch(error => HandleError.error(error, res));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.consultasService.delete(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    findOne = async (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.consultasService.findOne(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.consultasService.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }
}
