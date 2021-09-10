const express = require('express');
const router = express.Router();

const app = express();
let productos = [];
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


    if (req.params.id > productos.length || req.params.id < 0) {
        res.send(JSON.stringify({ error: 'producto no encontrado' }))

    } else {
        res.send(JSON.stringify(productos[req.params.id - 1]))
    }


});

router.post('/agregar', (req, res) => {
    if (administrador) {
        console.log(req.body);
        let obj = req.body;
        obj.id = productos.length + 1;
        productos.push(req.body);
        res.send(req.body);
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'agregar')));
    }




});


router.put('/actualizar/:id', (req, res) => {

    console.log(req.body);
    if (administrador) {
        productos[req.params.id - 1].titulo = req.body.titulo;
        productos[req.params.id - 1].precio = req.body.precio;
        productos[req.params.id - 1].foto = req.body.foto;
        res.send(JSON.stringify(productos[req.params.id - 1]));
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'actualizar')));
    }


});

router.delete('/borrar/:id', (req, res) => {
    if (administrador) {
        let obj = productos.splice(req.params.id - 1, 1);
        res.send(JSON.stringify(obj));
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'borrar')));
    }


});



module.exports = router;
//module.exports = productos;