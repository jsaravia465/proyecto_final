const express = require('express');
const router = express.Router();

// let productos = require('../productos/productos.router');

// console.log(productos);

const app = express();
let carritos = [];
let administrador = true;

function mensajeNoAdmin(ruta, metodo) {
    return { error: -1, descripcion: 'ruta ' + ruta + ' ' + 'método ' + metodo + ' ' + 'no autorizada' };
}

// router.get('/listar', (req, res) => {

//     if (productos.length > 0) {
//         res.send(JSON.stringify(productos));
//     } else {
//         res.send(JSON.stringify({ error: 'no hay productos cargados' }));
//     }


// });

router.get('/listar/:id?', (req, res) => {


    if (req.params.id > carritos.length || req.params.id < 0) {
        res.send(JSON.stringify({ error: 'carrito no encontrado' }));

    } else {
        res.send(JSON.stringify(carritos[req.params.id - 1]))
    }

    // console.log(productos);


});

router.post('/agregar', (req, res) => {
    if (administrador) {
        console.log(req.body);
        let obj = req.body;
        obj.id = carritos.length + 1;
        carritos.push(req.body);
        res.send(req.body);
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }




});


router.put('/actualizar/:id', (req, res) => {

    console.log(req.body);
    if (administrador) {
        carritos[req.params.id - 1].titulo = req.body.titulo;
        carritos[req.params.id - 1].precio = req.body.precio;
        carritos[req.params.id - 1].foto = req.body.foto;
        res.send(JSON.stringify(carritos[req.params.id - 1]));
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }


});

router.delete('/borrar/:id', (req, res) => {
    if (administrador) {
        let obj = carritos.splice(req.params.id - 1, 1);
        res.send(JSON.stringify(obj));
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }


});



module.exports = router;