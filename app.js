const express = require('express');
const Archivo = require('./archivo.js');

const app = express();

const productos = require('./productos/productos.router');
const carritos = require('./carritos/carritos.router');




let carrito = [];
let messages = [];
let archivo = new Archivo('productos.txt');

const server = app.listen(8080, () => { console.log(`Se levanto correctamente el servidor en el puerto ${server.address().port}`) });



server.on('error', error => {
    console.log(`Ocurrio un error: ${error}   `);
});





app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', productos);
app.use('/carritos', carritos);



app.use('/static', express.static(__dirname + '/public'));