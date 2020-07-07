const helper = require("../helper.js");

class SnackTypDao{
    constructor(dbConnection) {
        this._conn = dbConnection;
    }
    getConnection() {
        return this._conn;
    }
    
    loadById(id){
        var sql = "SELECT * FROM Snacktyp WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {

        var sql = "SELECT * FROM Snacktyp";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];
            
        
        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    loadAllForFrontend() {

        var sql = "SELECT * FROM Snacktyp";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];
            
        
        var produkte = helper.arrayObjectKeysToLower(result);


        var sql2 = "SELECT DISTINCT art FROM Snacktyp";
        var statement2 = this._conn.prepare(sql2);
        result = statement2.all();

        var artList = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < artList.length; i++) {
            artList[i].produkte = [];
            for (var x = 0; x < produkte.length; x++) {
                if (produkte[x].art == artList[i].art) 
                    artList[i].produkte.push(produkte[x]);
            }
        }

        return artList;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Snacktyp WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(snackTypid = null, name = null, preis = null,beschreibung= "", bildpfad="", art=""){
        var sql = "INSERT INTO Snacktyp (SnackTypID, Name, Preis, Beschreibung, Bildpfad, Art) VALUES (?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [snackTypid, name, preis, beschreibung, bildpfad, art];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id,snackTypid = null, name = null, preis = null,beschreibung= "", bildpfad="", art="") {
        var sql = "UPDATE Snacktyp SET SnackTypID=?, Name=?, Preis=?, Beschreibung=?, Bildpfad=?, Art=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [snackTypid, name, preis, beschreibung, bildpfad, art, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Snacktyp WHERE ID=?";
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
        helper.log("SnackTypDao [_conn=" + this._conn + "]");
    }
}

module.exports = SnackTypDao;