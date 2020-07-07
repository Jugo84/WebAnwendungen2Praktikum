const helper = require("../helper.js");
const ChatDao = require("../dao/chatDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/chat/gibByVorstellungsID/:id", function(request, response) {
    helper.log("Service Chat: Client requested one record, id=" + request.params.id);

    const chatDao = new ChatDao(request.app.locals.dbConnection);
    try {
        var result = chatDao.loadByVorstellungsId(request.params.id);
        helper.log("Service Chat: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Chat: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;