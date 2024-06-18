import { Router } from "express";
import { HospitalizacionesController } from "./controller";
import { HospitalizacionService } from "../../services/hospitalizacion.service";

export class HospitalizacionesRoute{
   static get route(): Router{
        const routes = Router();
        const hospitalizacionesService = new HospitalizacionService()
        const controller = new HospitalizacionesController(hospitalizacionesService)
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}