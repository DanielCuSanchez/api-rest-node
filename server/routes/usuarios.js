const { Router } = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/Usuarios');


const usuarios = Router();

usuarios.get('/', (req, res) =>{
    res.send('Servidor corriendo....');
})

usuarios.get("/usuarios", (req, res) => {

    const desde = Number(req.query.desde);
    const limite = Number(req.query.limite) || 3;


    Usuario.find({estado: true})
        .skip(desde)
        .limit(limite)
        .exec((error, usuarios)=>{
            if(error){
                return res.json({
                    ok: false,
                    error
                })
            }
            Usuario.countDocuments({estado: true},(err, cantidad)=>{
                res.json({
                    ok: true,
                    cantidad,
                    usuarios
                })
            })
        })
    })

usuarios.post("/usuarios", (req, res) => {
    const {
        nombre,
        email,
        password,
        role
    } = req.body

    const passwordHashed = bcrypt.hashSync(password,10);

    //console.log('😀',passwordHashed);
    
    const usuario = new Usuario({
        nombre,
        email,
        password: passwordHashed,
        role
    });
    usuario.save((error, usuarioDB)=>{
        if(error){
            return res.status(400).json({
                ok: false,
                error
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

usuarios.put("/usuarios/:id", (req, res) => {
    const _id = req.params.id;
    const nuevoUsuario = _.pick(req.body,['nombre','email','img','role','estado']);
    Usuario.findOneAndUpdate(_id,nuevoUsuario,{new: true},(err, usuarioDB)=>{
        if(err) {
            return res.json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

usuarios.delete("/usuarios/:id", (req, res) => {
    const _id = req.params.id;
    const nuevoEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(_id, nuevoEstado,(err, usuarioDB)=>{
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                err: 'User to delete not found'
            })
        }
        usuarioDB.estado = false;
        usuarioDB.save();
        res.json({
            ok: true,
            usuario: 'Eliminado'
        })
    })
});
// usuarios.delete("/usuarios/:id", (req, res) => {
//     const _id = req.params.id;

//     Usuario.find({_id, estado: true},async (err, usuarioDB)=>{
//         const [usuario] = usuarioDB
//         console.log(usuario)
//         if(err){
//             return res.json({
//                 ok: false,
//                 err
//             })
//         }

//         if(!usuario){
//             return res.status(404).json({
//                 ok: false,
//                 err: 'User to delete not found'
//             })
//         }
//         usuario.estado = false;
//         await usuario.save();
//         res.json({
//             ok: true,
//             usuario: 'Eliminado'
//         })
//     })
// });

module.exports = usuarios;