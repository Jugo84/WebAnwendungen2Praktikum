$( document ).ready(function() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);
    $.ajax({
        url: "http://localhost:8000/api/film/gib/" + id,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        createCard(response['daten']);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
});

function createCard(film){
    const heute = new Date('2020-05-31');
    const morgen = new Date(heute);
    morgen.setDate(morgen.getDate()+1);
    heuteString = heute.getDate() + '.' + (heute.getMonth() + 1) + '.' + heute.getFullYear();
    morgenString = morgen.getDate() + '.' + (morgen.getMonth() + 1) + '.' + morgen.getFullYear();
    var titel = film['titel'];
    var dauer = film['dauer'];
    var fsk = film['fsk'];
    var genre = film['genre'];
    var beschreibung = film['beschreibung'];
    var trailer = film['trailer'];
    var filmId = film['id'];
    var datum = [];
    var uhrzeit = [];
    $.ajax({
        url: "http://localhost:8000/api/vorstellung/film/" + filmId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        // get Vorstellungen
        for (vorstellung in response["daten"]){
            _datum = new Date((response['daten'][vorstellung]['datum']));
            datumString = _datum.getDate() + '.' + (_datum.getMonth() + 1) + '.' + _datum.getFullYear();
            if (datumString == heuteString){
                datumString = 'Heute';
            }
            if (datumString == morgenString){ 
                datumString = 'Morgen';
            }
            datum.push(datumString);
            uhrzeit.push(_datum.getHours() + ':' + _datum.getMinutes() + ' Uhr');
        }

        // create Card
        var $header = $('<div class="card-header"><div class="row"><div class="col-4"><h4 class="my-0 font-weight-normal">' + titel + '</h4></div><div class="col-3"><i>Laufzeit: ' + dauer + ' min</i></div><div class="col-3"><i>Altersfreigabe: FSK' + fsk + '</i></div><div class="col-2"><i>Genre: ' + genre + '</i></div></div></div>');
        var $body = $('<div class="card-body"/>');
        var $bt = $('<div class="row"><div class="col-md-6 text-left"><span >' + beschreibung + '</span></div><div class="col-md-6"><iframe width="373" height="210" src="' + trailer + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   </div></div><br>')
        var $vorstellungen_row = $('<div class="row"/>');
        var $vorstellungen = vorstellungCards(datum,uhrzeit);
        console.log($vorstellungen);
        var $info = ('<span class="text-center"><i>Uhrzeit anklicken, um Ticket zu bestellen!</i></span>')
        $($vorstellungen_row).append($vorstellungen);
        $($body).append($bt,$vorstellungen_row);
        $('#filmuebersicht_card').append($header,$body,$info);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function vorstellungCards(datum,uhrzeit){
    var i;
    var vorstellungen = "";
    for (i = 0; i < datum.length; i++){
        vorstellungen += '<div class="col-md-2 col-sm-4"><div class="card text-center box-shadow"><div class="card-header"><h6 class="my-0 font-weight-normal">' + datum[i] + '</h4></div><div class="card-body"><ul class="list-unstyled " data-toggle="modal" data-target="#Modal_filmuebersicht"><a href="#"><li>' + uhrzeit[i] + '</li></a></ul></div></div></div>'
    }
    return vorstellungen;
}