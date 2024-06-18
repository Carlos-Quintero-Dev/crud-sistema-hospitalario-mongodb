import mongoose from "mongoose";


const consultasSchema = new mongoose.Schema({
    fecha: {
        type:String,
    },
    diagnostico: {
        type:String,
    }
})

export const ConsultaModel = mongoose.model('consultas',consultasSchema)