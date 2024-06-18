import { Router } from "express";
import { consultasRoute } from "./consultas/route";
import { DepartamentosRoute } from "./departamentos/route";
import { DoctorRoute } from "./doctores/route";
import { HistoriaClinicaRoute } from "./historiaClinica/route";
import { HospitalizacionesRoute } from "./hospitalizaciones/route";
import { PacientesRoute } from "./pacientes/route";
import { UbicacionesRoute } from "./ubicaciones/route";

export class AppRoute{
   static get route(): Router{
        const routes = Router();
        routes.use('/api/consultas', consultasRoute.route)
        routes.use('/api/departamentos', DepartamentosRoute.route)
        routes.use('/api/doctores', DoctorRoute.route)
        routes.use('/api/historiaClinicas', HistoriaClinicaRoute.route)
        routes.use('/api/hospitalizaciones', HospitalizacionesRoute.route)
        routes.use('/api/pacientes', PacientesRoute.route)
        routes.use('/api/ubicaciones', UbicacionesRoute.route)

        return routes;
    }
}