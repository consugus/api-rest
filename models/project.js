"use strict"

 var mongoose = require('mongoose');
 var schema = mongoose.Schema;

 var ProjectSchema = schema({
     name: String,
     description: String,
     category: String,
     year: number,
     langs: [String]
 });

 module.exports = mongoose.model('Project', 'ProjectSchema');