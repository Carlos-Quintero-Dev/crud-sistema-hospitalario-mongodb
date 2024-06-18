import mongoose from "mongoose";


const departamentosSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: [true, 'name Is Required']
    },
    especialidad: {
        type:String,
    },
})

export const DepartamentoModel = mongoose.model('departamentos',departamentosSchema)