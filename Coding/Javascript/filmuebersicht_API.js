$( document ).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
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

    $(document).on("click", ".createTicket" , function() {
        var obj = {};
        var vorstellungsId = this.value
        var benutzerId = getLocalData("benutzerId");
        if (benutzerId == null){
            console.log("hier");
            $.ajax({
                url: "http://localhost:8000/api/benutzer",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(obj)
            }).done(function (response) {
                console.log(response);
                $("#output").html(JSON.stringify(response));
                benutzerId = response['daten']['id'];
                setLocalData("benutzerId",benutzerId)
                benutzerId = getLocalData("benutzerId");
                createTicket(vorstellungsId, benutzerId);
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
                $("#output").html("Ein Fehler ist aufgetreten");
            });
        }
        else{
            createTicket(vorstellungsId, benutzerId);
        }

        
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
    var vorstellungen = [];
    var vorstellungen_sort = [];
    var allID = [];
    $.ajax({
        url: "http://localhost:8000/api/vorstellung/film/" + filmId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        // get Vorstellungen
        for (vorstellung in response["daten"]){
            vorstellungsID = response['daten'][vorstellung]['id'];
            _datum = new Date((response['daten'][vorstellung]['datum']));
            vorstellungen.push([_datum,vorstellungsID])
        }
        console.log(vorstellungen)
        vorstellungen_sort =  vorstellungen.sort(function(a, b){return a[0]-b[0]})
        for (i in vorstellungen_sort){
            vorstellung = vorstellungen_sort[i][0];
            allID.push(vorstellungen_sort[i][1]);
            datumString = vorstellung.getDate() + '.' + (vorstellung.getMonth() + 1) + '.' + vorstellung.getFullYear();
            if (datumString == heuteString){
                datumString = 'Heute';
            }
            if (datumString == morgenString){
                datumString = 'Morgen';
            }
            if (vorstellung >= heute){
                datum[i] = datumString;
                uhrzeit[i] = vorstellung.getHours() + ':' + vorstellung.getMinutes() + ' Uhr';
                i += 1;
            }
        }

        // create Card
        var $header = $('<div class="card-header"><div class="row"><div class="col-4"><h4 class="my-0 font-weight-normal">' + titel + '</h4></div><div class="col-3"><i>Laufzeit: ' + dauer + ' min</i></div><div class="col-3"><i>Altersfreigabe: FSK' + fsk + '</i></div><div class="col-2"><i>Genre: ' + genre + '</i></div></div></div>');
        var $body = $('<div class="card-body"/>');
        var $bt = $('<div class="row"><div class="col-md-6 text-left"><span >' + beschreibung + '</span></div><div class="col-md-6"><iframe width="373" height="210" src="' + trailer + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   </div></div><br>')
        var $vorstellungen_row = $('<div class="row"/>');
        var $vorstellungen = vorstellungCards(datum,uhrzeit,allID);
        var $info = ('<span class="text-center"><i>Uhrzeit anklicken, um Ticket zu bestellen!</i></span>')
        $($vorstellungen_row).append($vorstellungen);
        $($body).append($bt,$vorstellungen_row);
        $('#filmuebersicht_card').append($header,$body,$info);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function vorstellungCards(datum,uhrzeit,allID){
    var i;
    var vorstellungen = "";
    for (i = 0; i < datum.length; i++){
        vorstellungen += '<div class="col-md-2 col-sm-4"><div class="card text-center box-shadow"><div class="card-header"><h6 class="my-0 font-weight-normal">' + datum[i] + '</h4></div><div class="card-body"><ul class="list-unstyled " data-toggle="modal" data-target="#Modal_filmuebersicht"><a href="#"><li class="createTicket" value=' + allID[i] + '>' + uhrzeit[i] + '</li></a></ul></div></div></div>'
    }
    return vorstellungen;
}

function createTicket(vorstellungsId, benutzerId){
    var obj = { "vorstellungsID": vorstellungsId, "benutzerID": benutzerId};
        $.ajax({
            url: "http://localhost:8000/api/ticket",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).done(function (response) {
            console.log(response);
            $("#output").html(JSON.stringify(response));
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
}

function setLocalData(key, value) {
    window.localStorage.setItem(key, value);
  }
  
function getLocalData(key) {
    var result = window.localStorage.getItem(key);
    return result;
  }



