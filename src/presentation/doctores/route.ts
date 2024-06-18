import { Router } from "express";
import { DoctoresController } from "./controller";
import { DoctorService } from "../../services/doctor.service";

export class DoctorRoute{
   static get route(): Router{
        const routes = Router();
        const doctoresService = new DoctorService()
        const controller = new DoctoresController(doctoresService)
        routes.get('/', controller.findAll)
        routes.get('/:id', controller.findOne);
        routes.put('/:id', controller.update);
        routes.delete('/:id', controller.delete);
        routes.post('/', controller.create)
        return routes;
    }
}