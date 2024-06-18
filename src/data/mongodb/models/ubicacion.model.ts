import mongoose from "mongoose";


const ubicacionesSchema = new mongoose.Schema({
    estado: {
        type:String,
        required: [true, 'estado Is Required']
    },
    ciudad: {
        type:String,
    },
    municipio:{
        type:String,
    },
    direccion:{
        type:String,
    }
})

export const UbicacionModel = mongoose.model('ubicaciones',ubicacionesSchema)