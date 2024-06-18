import { Request, Response } from "express";
import { HistoriaClinicaService } from "../../services/historiasClinica.service";
import { CreateHistoriaClinicaDto } from "../../domain/dtos/historiasClinicas/create-historiaClinica.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { UpdateHistoriaClinicaDto } from "../../domain/dtos/historiasClinicas/update-historiaClinica.dto";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class HistoriaClinicaController{
    constructor(private readonly historiaClinicaService:HistoriaClinicaService, ){}
    create = (req:Request, res:Response) => {
        const [error, createHistoriaClinicaDto] = CreateHistoriaClinicaDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.historiaClinicaService.create(createHistoriaClinicaDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateHistoriaClinicaDto] =UpdateHistoriaClinicaDto.update({...req.body, id})
        if(error) return res.status(400).json({error})
        this.historiaClinicaService.update(updateHistoriaClinicaDto!, id!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
        }
    
        delete = (req:Request, res:Response) => {
            const id = req.params.id
            if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
            this.historiaClinicaService.delete(id)
            .then(category => res.json(category))
            .catch(error => HandleError.error(error, res))
        }
    
        findOne = async (req:Request, res:Response) => {
            const id = req.params.id
            if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
            this.historiaClinicaService.findOne(id)
            .then(category => res.json(category))
            .catch(error => HandleError.error(error, res));
        }

        findAll = (req:Request, res:Response) => {
            const [error, paginationDto] = PaginationDto.paginate(req.query);
            if(error) return res.status(400).json({error})
            this.historiaClinicaService.findAll(paginationDto!)
            .then(departament => res.json(departament))
            .catch(error => HandleError.error(error, res))
        }

}