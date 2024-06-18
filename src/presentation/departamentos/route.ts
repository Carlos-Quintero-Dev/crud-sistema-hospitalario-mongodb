import { Router } from "express";
import { DepartamentosController } from "./controller";
import { DepartamentoService } from "../../services/departament.service";

export class DepartamentosRoute{
   static get route(): Router{
        const routes = Router();
        const departamentoService = new DepartamentoService()
        const controller = new DepartamentosController(departamentoService)
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}