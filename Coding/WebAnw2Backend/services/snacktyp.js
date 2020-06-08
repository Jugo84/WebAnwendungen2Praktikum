const helper = require("../helper.js");
const FilmDao = require("../dao/snackDao.js");
//load express Modul
const express = require("express");
// sorgt dafür, HTTP Request/Anfragen ankommt an der gewuenschten Ziel/richtigen End-point zu routen
var serviceRouter = express.Router();

//Define a route for a HTTP-GET on "/snack/gib/:id"


module.exports = serviceRouter;