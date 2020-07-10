const helper = require("../helper.js");
const md5 = require("md5");
const VorstellungDao = require("./vorstellungDao.js");

class TicketDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadByTicketCode(Code) {

        var sql = "SELECT * FROM Ticket WHERE Code=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(Code);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by code=" + Code);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadByBenutzerID(id) {
        const vorstellungDao = new VorstellungDao(this._conn);

        var sql = "SELECT * FROM Ticket WHERE BenutzerID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by BenutzerID=" + id);

        result = helper.arrayObjectKeysToLower(result);
        for (var i = 0; i < result.length; i++){
            delete result[i].benutzerid;
            result[i].film = vorstellungDao.loadById(result[i].vorstellungsid);
        }
        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Ticket WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(vorstellungsID, benutzerID, preis=12.0) {
        var code='';
        for (var i = 0; i < 9; i++){
            code += parseInt(Math.random()*10);
        }
        var sql = "INSERT INTO Ticket (VorstellungsID,BenutzerID,Code,Preis) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [vorstellungsID, benutzerID, code, preis];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        return result.lastInsertRowid;
    }

    update(id) {
        var sql = 'UPDATE Ticket SET Bezahlt=1 WHERE ID=?'
        var statement = this._conn.prepare(sql);
        var params = [id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

    }

    delete(id) {
        try {
            var sql = "DELETE FROM Ticket WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("BenutzerDao [_conn=" + this._conn + "]");
    }
}

module.exports = TicketDao;