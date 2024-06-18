import { Router } from "express";
import { HistoriaClinicaController } from "./controller";
import { HistoriaClinicaService } from "../../services/historiasClinica.service";

export class HistoriaClinicaRoute{
   static get route(): Router{
        const routes = Router();
        const historiaClinicaService = new HistoriaClinicaService();
        const controller = new HistoriaClinicaController(historiaClinicaService) 
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}