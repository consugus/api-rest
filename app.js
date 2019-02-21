"use strict"

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Carga de archivos de rutas
var project_routes = require("./routes/project");

// middlewares
// (metodos que se ejecutan antes de hacer la llamada a un controlador)
app.use(bodyParser.urlencoded({extended:false}) );
app.use(bodyParser.json() );

// CORS

//rutas
//#region rutas para ejemplo
// app.get('/', (req, res) => {
//     res.status(200).send(
//          "<h1>Hola mundo desde mi API de NodeJS</h1>"
//     )
// });

// app.get('/test', (req, res) => {
//     res.status(200).send({
//         message:"Hola mundo desde mi API de NodeJS"
//     });
// });
//#endregion
app.use("/api", project_routes);

//exportar
module.exports = app;
