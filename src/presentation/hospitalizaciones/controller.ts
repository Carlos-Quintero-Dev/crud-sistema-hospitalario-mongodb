import { Request, Response } from "express";
import { HospitalizacionService } from "../../services/hospitalizacion.service";
import { CreateHospitalizacionDto } from "../../domain/dtos/hospitalizaciones/create-hospitalizacion.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { UpdateHospitalizacionDto } from "../../domain/dtos/hospitalizaciones/update-hospitalizacion.dto";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class HospitalizacionesController{
    constructor(private readonly hospitalizacionesService:HospitalizacionService, ){}

    create = (req:Request, res:Response) => {
        const [error, createHospitalizacionDto] = CreateHospitalizacionDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.hospitalizacionesService.create(createHospitalizacionDto!)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
    const id = req.params.id
    if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
    const [error, updateHospitalizacionDto] = UpdateHospitalizacionDto.update({...req.body, id})
    if(error) return res.status(400).json({error})
    this.hospitalizacionesService.update(updateHospitalizacionDto!, id!)
    .then(category => res.json(category))
    .catch(error => HandleError.error(error, res));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.hospitalizacionesService.delete(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res))
    }

    findOne = async (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.hospitalizacionesService.findOne(id)
        .then(category => res.json(category))
        .catch(error => HandleError.error(error, res));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.hospitalizacionesService.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }
}