const helper = require("../helper.js");
const md5 = require("md5");
const BenutzerrolleDao = require("./benutzerrolleDao.js");
const PersonDao = require("./personDao.js");
const TicketDao = require("./ticketDao.js");

class BenutzerDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM Benutzer WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {
        //const benutzerrolleDao = new BenutzerrolleDao(this._conn);
        //var roles = benutzerrolleDao.loadAll();
        //const personDao = new PersonDao(this._conn);
        //var persons = personDao.loadAll();

        var sql = "SELECT * FROM Benutzer";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        result = helper.arrayObjectKeysToLower(result);

        // for (var i = 0; i < result.length; i++) {

        //     for (var element of roles) {
        //         if (element.id == result[i].benutzerrolleid) {
        //             result[i].benutzerrolle = element;
        //             break;
        //         }
        //     }
        //     delete result[i].benutzerrolleid;

        //     if (helper.isNull(result[i].personid)) {
        //         result[i].person = null;
        //     } else {
        //         for (var element of persons) {
        //             if (element.id == result[i].personid) {
        //                 result[i].person = element;
        //                 break;
        //             }
        //         }
        //     }
        //     delete result[i].personid;
        // }

        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Benutzer WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    isunique(benutzername) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Benutzer WHERE Benutzername=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);

        if (result.cnt == 0) 
            return true;

        return false;
    }

    hasaccess(benutzername, passwort) {
        const benutzerrolleDao = new BenutzerrolleDao(this._conn);
        const personDao = new PersonDao(this._conn);

        var sql = "SELECT ID FROM Benutzer WHERE Benutzername=? AND Passwort=?";
        var statement = this._conn.prepare(sql);
        var params = [benutzername, md5(passwort)];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            throw new Error("User has no access");
     
        return this.loadById(result.ID);
    }

    create(name = null, vorname = null, email = null, bezahlmöglichkeit = null, kreditkartennummer=null, cvs = null, adresseId = null) {
        var sql = "INSERT INTO Benutzer (Name,Vorname,Email,Bezahlmöglichkeit,Kreditkartennummer,CVS,AdresseID) VALUES (?,?,?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [name, vorname, email, bezahlmöglichkeit, kreditkartennummer, cvs, adresseId];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id, name, vorname, email, bezahlmöglichkeit, kreditkartennummer=null, cvs = null, adresseId = null) {
        var sql = "UPDATE Benutzer SET name=?,vorname=?,email=?,bezahlmöglichkeit=?, kreditkartennummer=?, cvs=?, adresseId=? WHERE ID=?"
        var statement = this._conn.prepare(sql);
        var params = [name, vorname, email, bezahlmöglichkeit, kreditkartennummer, cvs, adresseId, id];
        var result = statement.run(params);
        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);
        var updatedObj = this.loadById(id);
        
        //Email
        sendEmail(updatedObj, this._conn);
        

        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Benutzer WHERE ID=?";
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

module.exports = BenutzerDao;

function sendEmail(obj,_conn){
    var name = obj['vorname'] + " " + obj['name'];
    var email = obj['email'];
    var id = obj['id'];

    const ticketDao = new TicketDao(_conn);
    tickets = ticketDao.loadByBenutzerID(id);
    helper.log(tickets);
    var codes = [];
    var filme = [];
    var i = 0;
    for (ticket in tickets){
        if(tickets[ticket]['bezahlt'] == 0){
            codes[i] = tickets[ticket]['code'];
            filme[i] = tickets[ticket]['film']['film']['titel'];
            i ++;
        }
    }
    helper.log(codes);

    var nachicht = ''
    if (codes.length == 1){
        var nachicht = 'Ihr Ticket Code zu dem Film ' + filme[0] + ' lautet: ' + codes[0];
    }
    else if (codes.length > 1){
        nachicht = 'Die Codes zu den von Ihnen bestellten Tickets lauten:\n\n';
        var i;
        for(i=0; i<codes.length; i++){
            nachicht += '- ' + filme[i] + ': ' + codes[i] + '\n';
        }
    }

    var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'virtual.cinema.njjs@gmail.com',
              pass: 'WebAnwendungen'
            }
          });
          var mailOptions = {
            from: 'virtual.cinema.NJJS@gmail.com',
            to: email,
            subject: 'Ihre Bestellung bei Virtual Cinema',
            text: 'Guten Tag ' + name + ',\n\nvielen Dank für Ihre Bestellung bei Virtual Cinema!\n\n' + nachicht + '\n\n Ihr Cinema-Team'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
}