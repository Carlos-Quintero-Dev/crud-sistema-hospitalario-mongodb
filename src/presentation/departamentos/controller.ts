import { Request, Response } from "express";
import { CreateDepartamentoDto } from "../../domain/dtos/departamentos/create-departamento.dto";
import { DepartamentoService } from "../../services/departament.service";
import { HandleError } from "../../domain/errors/handle.error";
import { UpdateDepartamentoDto } from "../../domain/dtos/departamentos/update-departamento.dto";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class DepartamentosController{
    constructor(private readonly departamentoService:DepartamentoService, ){}
    
    create = (req:Request, res:Response) => {
        const [error, createDepartamentoDto] = CreateDepartamentoDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.departamentoService.create(createDepartamentoDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateDepartamentoDto] = UpdateDepartamentoDto.update({...req.body, id})
        if(error) return res.status(400).json({error})
        this.departamentoService.update(updateDepartamentoDto!, id!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
        }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.departamentoService.delete(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    findOne = async (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.departamentoService.findOne(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.departamentoService.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }

}