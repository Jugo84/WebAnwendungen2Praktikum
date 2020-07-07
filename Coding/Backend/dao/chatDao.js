const helper = require("../helper.js");
const ChatNachrichtDao = require("./chatNachrichtDao.js");

class ChatDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadByVorstellungsId(id) {
        var sql = "SELECT * FROM Chat WHERE VorstellungsID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        const chatNachrichtDao = new ChatNachrichtDao(this._conn);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        result.nachrichten = chatNachrichtDao.loadAllByChatId(result.id);

        result.zeitpunkt = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result.zeitpunkt));
        return result;
    }

    create(filmid = 1, kinosaalid = 1, zeitpunkt = null) {
        var sql = "INSERT INTO Vorstellung (FilmID,KinosaalID,Zeitpunkt) VALUES (?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [filmid, kinosaalid, helper.formatToSQLDateTime(zeitpunkt)];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id, filmid = 1, kinosaalid = 1, zeitpunkt = null, reservierungen = []) {
        const reservierungDao = new ReservierungDao(this._conn);
        reservierungDao.deleteByParent(id);

        var sql = "UPDATE Vorstellung SET FilmID=?,KinosaalID=?,Zeitpunkt=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [filmid, kinosaalid, helper.formatToSQLDateTime(zeitpunkt), id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        if (reservierungen.length > 0) {
            for (var element of reservierungen) {
                reservierungDao.create(helper.parseGermanDateTimeString(element.zeitpunkt), element.reservierer.id, element.zahlungsart.id, id, element.reserviertesitze);
            }
        }

        var updatedObj = this.loadById(id);
        return updatedObj;
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

module.exports = ChatDao;