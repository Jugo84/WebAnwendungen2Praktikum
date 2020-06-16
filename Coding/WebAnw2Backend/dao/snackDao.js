const helper = require("../helper.js");
const BenutzerDao = require("./benutzerDao.js");
const SnackTypDao = require("./snackTypDao.js");
const snacktypDao = require("./snackTypDao.js");

class SnackDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection(){
        return this._conn;
    }

    loadById(id){
        const snackTypDao = new SnackTypDao(this._conn);
        const benutzerDao = new BenutzerDao(this._conn);

        var sql = "SELECT * FROM Snack WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id); 

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);  
        
        // because Snack has 2 foreign keys benutzerid and snackTypid
        result.snackTyp = snackTypDao.loadById(result.snackTypid);
        delete result.snackTypid;

        result.benutzer = { "id": result.benutzerid};
        delete result.benutzerid;

        return result;
    }

    loadAll(){
        const snackTypDao = new SnackTypDao(this._conn);
        var snacks = snackTypDao.loadAll();  

        var sql = "SELECT * FROM Snack";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        result = helper.arrayObjectKeysToLower(result);

        //muss man noch delete result[i].snackTypid ?

        for (var i = 0; i < result.length; i++){
            result[i].benutzer = { "id": result[i].benutzerid };
            delete result[i].benutzerid;

            for (var element of snacks) {
                if (element.id == result[i].snackTypid) {
                    result[i].snackTyp = element;
                    break;
                }
            }
            delete result[i].snackTypid;
        }

        return result;

    }

    // snacks which a user ordered

    loadByBenutzerId(id){
        const snackTypDao = new SnackTypDao(this._conn);

        var sql = "SELECT * FROM Snack WHERE BenutzerID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);
        helper.log(result);

        if (helper.isUndefined(result)){
            helper.log("hier drin");
            return [];
        }

        result = helper.arrayObjectKeysToLower(result);
        helper.log(result.length);
        for (var i = 0; i < result.length; i++){
            helper.log("wieder drin");
            helper.log(result[i]);
            delete result[i].benutzerid;
            result[i].snack = snackTypDao.loadById(result[i].snacktypid);
            delete result[i].snacktypid;
        }

        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Snack WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(snackTypid = null, benutzerid = null, menge = 1){
        var sql = "INSERT INTO Snack (SnackTypID,BenutzerID,Menge) VALUES (?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [snackTypid, benutzerid, menge];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id, snackTypid = null, benutzerid = null, menge = 1) {
        var sql = "UPDATE Snack SET SnackTypID=?, BenutzerID=?, Menge=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [snackTypid, benutzerid, menge, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Snack WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    // when a Benutzer ID is deleted
    deleteByParent(id) {
        try {
            var sql = "DELETE FROM Snack WHERE BenutzerID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Records by parent id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("SnackDao [_conn=" + this._conn + "]");
    }
    
}

module.exports = SnackDao;