const helper = require("../helper.js");
const express = require("express");
const SnackDao = require("../dao/snackDao.js");
var serviceRouter = express.Router();

serviceRouter.get("/snack/gib/:id", function(request, response) {
    helper.log("Service BenutzerID: Client requested all records, BenutzerID=" + request.params.id);

    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.loadByBenutzerId(request.params.id);
        helper.log("Service Snack: Records loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/snack/alle", function(request, response) {
    helper.log("Service BenutzerID: Client requested all records");

    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.loadAll();
        helper.log("Service Snack: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/snack", function(request, response) {
    helper.log('Service Snack: Client requested creation of new record');

    var errorMsgs= [];
    if (helper.isUndefined(request.body.produktId)) 
         errorMsgs.push("ProduktID fehlt");
    if (helper.isUndefined(request.body.benutzerId)) 
         errorMsgs.push("benutzerID fehlt");
    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.create(request.body.produktId, request.body.benutzerId);
        helper.log("Service Snack: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.put("/snack", function(request, response) {
    helper.log("Service Snack: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Snack: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.update(request.body.id, request.body.name,request.body.vorname, request.body.email, request.body.bezahlmöglichkeit, request.body.kreditkartennummer, request.body.cvs, request.body.adresseId );
        helper.log("Service Snack: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/snack/bezahlt", function(request, response) {
    helper.log("Service Snack: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Snack: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.updateBezahlt(request.body.id, request.body.name,request.body.vorname, request.body.email, request.body.bezahlmöglichkeit, request.body.kreditkartennummer, request.body.cvs, request.body.adresseId );
        helper.log("Service Snack: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Snack: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

module.exports = serviceRouter;