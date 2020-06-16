const helper = require("../helper.js");

class snacktypDao{
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
}

module.exports = snacktypDao;