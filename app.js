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

// CORS (Cross Origin Resource Sharing)
// Por razones de seguridad los navegadores restringen las solicitudes HTTP de orígen cruzado
// iniciadas dentro de un script: esto significa que una aplicación que utilice éstas APIs solo
// puede hacer peticiones HTTP a su propio dominio a menos que se utilicen cabeceras CORS.
// Para ello se puede utilizar un middleware como el siguiente
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Cuando se publique la app en lugar de "*" hay que poner la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



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
