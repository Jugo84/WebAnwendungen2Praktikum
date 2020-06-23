const functions=require('../dao/filmDao','../dao/ticketDao', '../dao/benutzerDao', '../dao/vorstellungDao', '../dao/adresseDao'); 
const axios = require ("axios");
const FilmDao = require('../dao/filmDao');
const Database = require("better-sqlite3");
const TicketDao = require('../dao/ticketDao');
const BenutzerDao = require("../dao/benutzerDao");
const VorstellungDao = require("../dao/vorstellungDao");
const dbFile = "./db/db.sqlite";
const dbConnection = new Database(dbFile);

test ('loadById (FilmDao)', ()=>{
    var filmDao = new FilmDao(dbConnection);
    var result = filmDao.loadById(1);
    var film = {"id":1,"titel":"Ruf der Wildnis","beschreibung":"Ruf der Wildnis ist ein US-amerikanischer Abenteuerfilm aus dem Jahr 2020 unter der Regie von Chris Sanders, der auf dem gleichnamigen Roman von Jack London aus 1903 basiert und das Realfilm-Debüt des Regisseurs markiert. Der Film spielt während des Klondike-Goldrausches in den 1890er-Jahren und handelt von einem Hund namens Buck, der in seiner Heimat Kalifornien gestohlen und als Schlittenhund in den Yukon gebracht wird, wo er sich mit John anfreundet und beginnt seine Lebensweise zu ändern.","genre":"Drama","trailer":"https://www.youtube.com/embed/n-MB85CBVv4","fsk":12,"dauer":100,"coverpfad":"Bilder/RufDerWildnis.jpg","videopfad":"Videos/RufDerWildnis.mp4"};
    expect(result).toEqual(film)
});

test ('loadbyFilm, (Voratellung)', ()=>{
    var vorstellungDao = new VorstellungDao(dbConnection);
    var result = vorstellungDao.loadAllByFilm(1)[0]['datum']
    expect(result).toEqual('2020-06-10T15:56')
})

test ('create and delete Ticket', ()=>{
    var ticketDao = new TicketDao(dbConnection);
    var id = ticketDao.create(1,1);
    expect(ticketDao.exists(id)).toBeTruthy();
    ticketDao.delete(id);
    expect(ticketDao.exists(id)).toBeFalsy();
});

test ('create and update Benutzer', ()=>{
    var benutzerDao = new BenutzerDao(dbConnection);
    var id = benutzerDao.create()['id']
    var updated = benutzerDao.update(id,'Mustermann', 'Max', 'M-M@web.de', 'Paypal', 12345, 456, 1)
    expect(benutzerDao.exists(id)).toBeTruthy();
    expect(updated['name']).toEqual('Mustermann');
    expect(updated['email']).toEqual('M-M@web.de');
    expect(updated['adresseid']).toEqual(1);
});
