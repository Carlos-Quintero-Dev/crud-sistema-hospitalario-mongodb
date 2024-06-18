import mongoose from "mongoose";


const hospitalizacionesSchema = new mongoose.Schema({
    fecha_entrada: {
        type:String,
    },
    fecha_salida: {
        type:String,
    }
})

export const HospitalizacionModel = mongoose.model('hospitalizaciones',hospitalizacionesSchema)