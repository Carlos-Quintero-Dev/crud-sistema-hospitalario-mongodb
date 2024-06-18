import { Request, Response } from "express";
import { UbicacionesService } from "../../services/ubicacion.service";
import { CreateUbicacionDto } from "../../domain/dtos/ubicaciones/create-ubicacion.dto";
import { UpdateUbicacionDto } from "../../domain/dtos/ubicaciones/update-ubicacion.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { Validators } from "../../config/validator";
import { PaginationDto } from "../../domain/dtos/consultas/pagination-departamento";

export class UbicacionesController{
    constructor(private readonly ubicacionesService:UbicacionesService, ){}

    create = (req:Request, res:Response) => {
        const [error, createUbicacionesDto] = CreateUbicacionDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.ubicacionesService.create(createUbicacionesDto!)
        .then(ubicacion => res.json(ubicacion))
        .catch(error => HandleError.error(error, res))
    }

    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
    const [error, updateUbicacionesDto] = UpdateUbicacionDto.update({...req.body, id})
    if(error) return res.status(400).json({error})
    this.ubicacionesService.update(updateUbicacionesDto!, id!)
    .then(ubicacion => res.json(ubicacion))
    .catch(error => HandleError.error(error, res));
    }

    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.ubicacionesService.delete(id)
        .then(ubicacion => res.json(ubicacion))
        .catch(error => HandleError.error(error, res))
    }

    findOne = async (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators .validationMongoId(id)) throw Error('mongo id is not valid')
        this.ubicacionesService.findOne(id)
        .then(ubicacion => res.json(ubicacion))
        .catch(error => HandleError.error(error, res));
    }

    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.ubicacionesService.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }

}