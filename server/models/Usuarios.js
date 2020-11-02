const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const rolesValidos ={
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} role no válido'
}

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'La password es obligatoria']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        enum:rolesValidos,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})
usuariosSchema.methods.toJSON = function(){
    const usuario = this;
    const usuarioObject = usuario.toObject();

    delete usuarioObject.password;
    return usuarioObject;
}

usuariosSchema.plugin( uniqueValidator, {message: '{PATH}: deber de ser unico'} )

module.exports = model('usuarios',usuariosSchema);
