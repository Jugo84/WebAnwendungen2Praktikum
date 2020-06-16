const helper = require("../helper.js");
const SnackTypDao = require("../dao/snackTypDao.js");
const SnackDao = require("../dao/snackDao.js")
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/snacktyp/gib/:id", function(request,response) {
    helper.log("Service SnackTyp: Client requested one record, id=" + request.params.id);

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var result = snackTypDao.loadById(request.params.id);
        helper.log("Service Snack: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/snacktyp/alle/", function(request, response) {
    helper.log("Service SnackTyp: Client requested all records");

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var result = snackTypDao.loadAll();
        helper.log("Service Snack: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/snacktyp/existiert/:id", function(request, response) {
    helper.log("Service SnackTyp: Client requested check, if record exists, id=" + request.params.id);

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var result = snackTypDao.exists(request.params.id);
        helper.log("Service SnackTyp: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service SnackTyp: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/snacktyp", function(request, response) {
    helper.log("Service SnackTyp: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name))
        errorMsgs.push("name fehlt");
    if (helper.isUndefined(request.body.preis))
        errorMsgs.push("preis fehlt");
    if (helper.isUndefined(request.body.beschreibung)) 
        request.body.beschreibung = "";
    if (helper.isUndefined(request.body.bildpfad)) 
        request.body.bildpfad = null;

    if (errorMsgs.length > 0) {
        helper.log("Service SnackTyp: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var result = snackTypDao.create(request.body.name, request.body.preis, request.body.beschreibung, request.body.bildpfad);
        helper.log("Service SnackTyp: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service SnackTyp: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }   
        
});   

serviceRouter.put("/snackTyp", function(request, response) {
    helper.log("Service SnackTyp: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("name fehlt");
    if (helper.isUndefined(request.body.preis)) 
        errorMsgs.push("preis fehlt");    
    if (helper.isUndefined(request.body.beschreibung)) 
        request.body.beschreibung = "";
    if (helper.isUndefined(request.body.bildpfad)) 
        request.body.bildpfad = null;

    if (errorMsgs.length > 0) {
        helper.log("Service SnackTyp: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var result = snackTypDao.update(request.body.id, request.body.bezeichnung, request.body.beschreibung, request.body.bildpfad);
        helper.log("Service SnackTyp: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service SnackTyp: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/snacktyp/:id", function(request, response) {
    helper.log("Service SnackTyp: Client requested deletion of record, id=" + request.params.id);

    const snackTypDao = new SnackTypDao(request.app.locals.dbConnection);
    try {
        var obj = snackTypDao.loadById(request.params.id);
        snackTypDao.delete(request.params.id);
        helper.log("Service SnackTyp: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service SnackTyp: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;