const helper = require("../helper.js");
const express = require("express");
const TicketDao = require("../dao/ticketDao.js");
var serviceRouter = express.Router();

serviceRouter.get("/ticket/gib/:TicketCode", function(request, response) {
    helper.log("Service Ticket: Client requested one record, TicketCode=" + request.params.TicketCode);

    const ticketDao = new TicketDao(request.app.locals.dbConnection);
    try {
        var result = ticketDao.loadByTicketCode(request.params.TicketCode);
        helper.log("Service Ticket: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Ticket: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/ticket/existiert/:id", function(request, response) {
    helper.log("Service Ticket: Client requested check, if record exists, id=" + request.params.id);

    const ticketDao = new TicketDao(request.app.locals.dbConnection);
    try {
        var result = ticketDao.exists(request.params.id);
        helper.log("Service Ticket: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Ticker: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/ticket", function(request, response) {
    helper.log("Service Ticket: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.vorstellungsID)) 
         errorMsgs.push("vorstellungsID fehlt");
    if (helper.isUndefined(request.body.benutzerID)) 
         errorMsgs.push("benutzerID fehlt");
    // if (helper.isUndefined(request.body.benutzerrolle)) {
    //     errorMsgs.push("benutzerrolle fehlt");
    // } else if (helper.isUndefined(request.body.benutzerrolle.id)) {
    //     errorMsgs.push("benutzerrolle gesetzt, aber id fehlt");
    // }        
    // if (helper.isUndefined(request.body.person)) {
    //     request.body.person = null;
    // } else if (helper.isUndefined(request.body.person.id)) {
    //     errorMsgs.push("person gesetzt, aber id fehlt");
    // } else {
    //     request.body.person = request.body.person.id;
    // }
    
    // if (errorMsgs.length > 0) {
    //     helper.log("Service Benutzer: Creation not possible, data missing");
    //     response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
    //     return;
    // }

    const ticketDao = new TicketDao(request.app.locals.dbConnection);
    try {
        var result = ticketDao.create(request.body.vorstellungsID, request.body.benutzerID);
        helper.log("Service Ticket: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Ticket: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.delete("/ticket/:id", function(request, response) {
    helper.log("Service Ticket: Client requested deletion of record, id=" + request.params.id);

    const ticketDao = new TicketDao(request.app.locals.dbConnection);
    try {
        var obj = ticketDao.loadById(request.params.id);
        ticketDao.delete(request.params.id);
        helper.log("Service Ticket: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Ticket: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;