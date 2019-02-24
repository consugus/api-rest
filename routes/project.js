"use strict"

var express = require("express");
var ProjectController = require("../controllers/project");

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: "./uploads" });

var router = express.Router();

router.get("/home", ProjectController.home);
router.post("/test", ProjectController.test);
router.post("/save-project", ProjectController.saveProject);
router.get("/get-projectById/:id?", ProjectController.getProjectById);
router.get("/get-projects", ProjectController.getProjects);
router.put("/update-project/:id?", ProjectController.updateProject);
router.delete("/delete-project/:id?", ProjectController.deleteProject);
router.post("/upload-image/:id?", multipartMiddleware, ProjectController.uploadImage);

module.exports = router;
