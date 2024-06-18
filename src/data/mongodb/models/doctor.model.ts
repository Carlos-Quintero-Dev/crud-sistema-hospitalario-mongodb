import mongoose from "mongoose";


const doctoresSchema = new mongoose.Schema({
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

    departamento:{
        type:mongoose.Types.ObjectId,
        ref:"departamentos"
    },

    ubicacion:{
        type:mongoose.Types.ObjectId,
        ref:"ubicaciones"
    }

})

export const DoctorModel = mongoose.model('doctores',doctoresSchema)