const express = require('express');
const router = express.Router();
const Archivo = require('../archivo');
let archivo = new Archivo('productos.txt');
let archivo2 = new Archivo('carritos.txt');

// let productos = require('../productos/productos.router');

// console.log(productos);

const app = express();
let carritos = [];
let productos = [];
archivo.leer().then(e => productos = JSON.parse(e));
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

    console.log('ID ' + req.params.id);
    if (req.params.id === undefined) {
        res.send(JSON.stringify(carritos));

    } else {
        if (req.params.id > carritos.length || req.params.id < 0) {
            res.send(JSON.stringify({ error: 'carrito no encontrado' }));

        } else {
            res.send(JSON.stringify(carritos[req.params.id - 1]))
        }
    }
    // console.log(productos);


});

router.post('/agregar/:id', (req, res) => {
    if (administrador) {
        // console.log(req.body);
        // let obj = req.body;
        let obj = {};
        obj.id = carritos.length + 1;
        obj.timestamp = Date.now();
        console.log("productos " + JSON.stringify(productos));
        obj.producto = productos[req.params.id - 1];
        carritos.push(obj);
        console.log("carritos " + JSON.stringify(carritos));
        archivo2.guardar(obj);
        res.send("Se agrego producto al carrito");
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }




});


router.put('/actualizar/:id', (req, res) => {

    //console.log(req.body);
    if (administrador) {
        // console.log('productos ' + JSON.stringify(productos));
        let obj = productos.find(p => p.id == req.body.id);
        // console.log('productos ' + JSON.stringify(productos));
        // console.log('producto recuperado de productos ' + JSON.stringify(obj));
        let pos;
        carritos.forEach(function(elemento, indice, array) {
            // console.log('elemento ' + JSON.stringify(elemento));
            // console.log('parametro por ruta ' + req.params.id);
            // console.log('id ' + elemento.producto.id);
            // console.log('req.params.id ' + req.params.id);
            if (elemento.producto.id == req.params.id) {
                pos = indice;
                console.log('Posicion del producto en el carrito ' + pos);
            }
        })

        if (pos >= 0) {
            carritos[pos].producto = obj;
            console.log('carritos ' + JSON.stringify(carritos));
            archivo2.actualizar(carritos);

            res.send('Ok');
        } else {
            res.send('Producto no encontrado en carrito');
        }
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }


});

router.delete('/borrar/:id', (req, res) => {
    if (administrador) {

        let pos;
        carritos.forEach(function(elemento, indice, array) {
            if (elemento.producto.id == req.params.id) {
                pos = indice;
                console.log('Posicion del producto en el carrito ' + pos);
            }
        })

        if (pos >= 0) {
            let obj = carritos.splice(pos, 1);
            archivo2.actualizar(carritos);

            res.send('Ok');
        } else {
            res.send('Producto no encontrado en carrito');
        }
    } else {
        res.send(JSON.stringify(mensajeNoAdmin('/carritos', 'listar')));
    }

});





module.exports = router;