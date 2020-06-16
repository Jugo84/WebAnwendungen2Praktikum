const helper = require("../helper.js");
const express = require("express");
const SnackDao = require("../dao/snackDao.js");
var serviceRouter = express.Router();

serviceRouter.get("/snack/gib/:id", function(request, response) {
    helper.log("Service BenutzerID: Client requested all records, BenutzerID=" + request.params.id);

    const snackDao = new SnackDao(request.app.locals.dbConnection);
    try {
        var result = snackDao.loadByBenutzerId(request.params.id);
        helper.log("Service Snack: Record loaded");
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

module.exports = serviceRouter;