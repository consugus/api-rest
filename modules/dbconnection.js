var mongoose = require("mongoose");
var app = require("../app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser:true})
    .then( () => {
        console.log("Conexión a la Base de Datos establecida correctamente");

        // Server creation
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en el puerto 3700");
        });
    })
    .catch( (err) => console.log(err) );

