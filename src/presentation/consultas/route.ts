import { Router } from "express";
import { consultasController } from "./controller";
import { ConsultasService } from "../../services/consulta.service";

export class consultasRoute{
   static get route(): Router{
        const routes = Router();
        const consultaService = new ConsultasService()
        const controller = new consultasController(consultaService) 
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}