const helper = require("../helper.js");
const ChatNachrichtDao = require("../dao/chatNachrichtDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.post("/chatNachricht", function(request, response) {
    helper.log("Service Vorstellung: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzerID)) {
        errorMsgs.push("benutzerID fehlt");
    } 
    if (helper.isUndefined(request.body.chatID)) {
        errorMsgs.push("chatID fehlt");
    }
    if (helper.isUndefined(request.body.nachricht)) {
        errorMsgs.push("nachricht fehlt");
    }
    if (helper.isUndefined(request.body.uhrzeit)) {
        errorMsgs.push("zeitpunkt fehlt");
    } 

    if (errorMsgs.length > 0) {
        helper.log("Service chatNachricht: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const chatNachrichtDao = new ChatNachrichtDao(request.app.locals.dbConnection);
    try {
        var result = chatNachrichtDao.create(request.body.benutzerID, request.body.chatID, request.body.nachricht, request.body.uhrzeit);
        helper.log("Service ChatNachricht: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service ChatNachricht: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

module.exports = serviceRouter;