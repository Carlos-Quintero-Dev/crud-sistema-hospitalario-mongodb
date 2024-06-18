import mongoose from "mongoose";


const pacientesSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: [true, 'name Is Required']
    },
    apellido: {
        type:String,
    },
    cedula:{
        type:String,
    },
    fecha_nacimiento:{
        type:String,
    },

    ubicacion:{
        type:mongoose.Types.ObjectId,
        ref:"ubicacion"
    }

})

export const PacienteModel = mongoose.model('pacientes',pacientesSchema)