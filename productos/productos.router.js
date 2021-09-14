const express = require('express');
const router = express.Router();
const Archivo = require('../archivo');

const app = express();
let productos = [];
let administrador = true;
let archivo = new Archivo('productos.txt');

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

    console.log('ID ' + req.params.id);
    if (req.params.id === undefined) {
        res.send(JSON.stringify(productos));

    } else {
        if (req.params.id > productos.length || req.params.id < 0) {
            res.send(JSON.stringify({ error: 'producto no encontrado' }))

        } else {
            res.send(JSON.stringify(productos[req.params.id - 1]))
        }
    }


});

router.post('/agregar', (req, res) => {
    if (administrador) {
        //console.log(req.body);
        let obj = req.body;
        obj.id = productos.length + 1;
        obj.timestamp = Date.now();
        obj.codigo = obj.id;
        productos.push(req.body);
        res.send(req.body);
        archivo.guardar(obj);
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'agregar')));
    }




});


router.put('/actualizar/:id', (req, res) => {

    console.log(req.body);
    if (administrador) {
        productos[req.params.id - 1].nombre = req.body.nombre;
        productos[req.params.id - 1].precio = req.body.precio;
        productos[req.params.id - 1].descripcion = req.body.descripcion;
        productos[req.params.id - 1].stock = req.body.stock;
        productos[req.params.id - 1].foto = req.body.foto;
        res.send(JSON.stringify(productos[req.params.id - 1]));


        archivo.actualizar(productos);
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'actualizar')));
    }


});

router.delete('/borrar/:id', (req, res) => {
    if (administrador) {
        console.log('Antes de borrar ' + JSON.stringify(productos));
        let obj = productos.splice(req.params.id - 1, 1);
        console.log('Despues de borrar ' + JSON.stringify(productos));
        archivo.actualizar(productos);

        res.send(JSON.stringify(obj));

    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/productos', 'borrar')));
    }


});



module.exports = router;
//module.exports = productos;