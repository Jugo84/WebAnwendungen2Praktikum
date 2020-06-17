const helper = require("../helper.js");
const BenutzerDao = require("./benutzerDao.js");

class ChatNachrichtDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadAllByChatId(id) {
        var sql = "SELECT * FROM ChatNachricht WHERE ChatID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);
        const benutzerDao = new BenutzerDao(this._conn);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        for (var i = 0; i < result.length; i++) {
            var benutzer = benutzerDao.loadById(result[i].BenutzerID)
            result[i].benutzer = benutzer.vorname + " " + benutzer.name;
        }

        return result;
    }

    create(benutzerID, chatID, nachricht, uhrzeit) {
        var sql = "INSERT INTO ChatNachricht (benutzerID, chatID, nachricht, uhrzeit) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [benutzerID, chatID, nachricht, uhrzeit];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    delete(id) {
        try {
            const reservierungDao = new ReservierungDao(this._conn);
            reservierungDao.deleteByParent(id);

            var sql = "DELETE FROM Vorstellung WHERE ID=?";
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
        helper.log("VorstellungDao [_conn=" + this._conn + "]");
    }
}

module.exports = ChatNachrichtDao;