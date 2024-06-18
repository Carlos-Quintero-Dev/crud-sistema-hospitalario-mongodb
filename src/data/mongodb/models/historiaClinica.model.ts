import mongoose from "mongoose";


const historiaClinicasSchema = new mongoose.Schema({
    fecha: {
        type:String,
    },
    descripcion: {
        type:String,
    },

    doctor:{
        type:mongoose.Types.ObjectId,
        ref:"doctores"
    },

    paciente:{
        type:mongoose.Types.ObjectId,
        ref:"pacientes"
    },

    consulta:{
        type:mongoose.Types.ObjectId,
        ref:"consultas"
    },

    hospitalizacion:{
        type:mongoose.Types.ObjectId,
        ref:"hospitalizaciones"
    }
})

export const HistoriaClinicataModel = mongoose.model('historiaClinicas',historiaClinicasSchema)