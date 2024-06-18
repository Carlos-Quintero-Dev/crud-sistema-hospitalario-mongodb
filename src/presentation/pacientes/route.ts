import { Router } from "express";
import { PacientesController } from "./controller";
import { PacientesService } from "../../services/pacient.service";

export class PacientesRoute{
   static get route(): Router{
        const routes = Router();
        const pacientesService = new PacientesService()
        const controller = new PacientesController(pacientesService)
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}