"use strict"
var Project = require("../models/project");
var fs = require("fs");

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "soy la página home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: "soy la acción test del controlador de proyect"
        });
    },
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ messaje: "Error al guardar el documento" })

            if(!projectStored) return res.status(404).send("No se ha podido guardar el documento");

            return res.status(200).send({project: projectStored});
        });
    },// end saveproject

    getProjectById: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({ message:"El proyecto no existe"});

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({ message:"Error al devolver los datos"});
            if(!project) return res.status(404).send({ message:"El proyecto no existe"});

            return res.status(200).send({ project });
        });
    }, // end getProjectById

      getProjects: function(req, res){

        Project.find({}).sort("year").exec( (err, projects) => {
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!projects == null) return res.status(404).send({message:"No hay proyectos para mostrar"});

            return res.status(200).send({ projects });
        });
    }, // end getProjects

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;
        if(projectId == null) return res.status(404).send({ message:"El proyecto no existe"});

        Project.findByIdAndUpdate( projectId, update, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: "Error al actualizar"});
            if(!projectUpdated) return req.status(404).send({message: "No existe el proyecto para actualizar"});

            return res.status(200).send({project: update});
        });
    }, // end updateProject

    deleteProject: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({ message:"El proyecto no existe"});

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({message: "Error al eliminar el projecto"});
            if(!projectDeleted) return res.status(404).send({message: "No se pudo eliminar el projecto"});

            return res.status(200).send({message: "Documento eliminado"});
        });
    }, // end deleteProject

    uploadImage: function(req, res){
        var fileName = "Image no subida...";
        var projectId = req.params.id;
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            var extentionSplit = fileName.split(".");
            var extention = extentionSplit[1].toLowerCase();
            var admisibleExtentions = ["jpg", "png", "jpeg", "gif"];

            if(admisibleExtentions.includes(extention)){
                console.log("si incluye el valor");
                Project.findOneAndUpdate(projectId, {image:fileName}, {new: true} , (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: "La imagen no se ha subido"});
                    if(!projectUpdated) return res.status(404).send({message: "El projecto no existe y no se ha asignado la imagen"});

                    return res.status(200).send({project: projectUpdated});
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "El archivo no tiene un formato válido"});
                });
            };
        } else{
                // console.log("Extensión: " + extention + "no encontrada");
                return res.status(200).send({message: fileName});
            };
    } // end uploadImage


}; // End var controller

module.exports = controller;