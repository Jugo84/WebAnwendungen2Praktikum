$( document ).ready(function() {
    $.ajax({
        url: "http://localhost:8000/api/film/alle",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        var film;
        for (film in response["daten"]){
            createCard(response['daten'][film]);
        }
        var i = 0
        for (film in response["daten"]){
            slideShow(response['daten'][film],i);
            if (i == 2){break;}
            i +=1;
        }
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
    var datum = ['','',''];
    var uhrzeit = ['','',''];
    var filmID = film['id'];
    $.ajax({
        url: "http://localhost:8000/api/vorstellung/film/" + filmID,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        // get Vorstellungen
        console.log(response)
        var i = 0;
        var _datum;
        var datumString;
        var vorstellungen = []
        var vorstellungen_sort = []
        for (vorstellung in response["daten"]){
            _datum = new Date((response['daten'][vorstellung]['datum']));
            vorstellungen.push(_datum)
        }
        vorstellungen_sort =  vorstellungen.sort(function(a, b){return a-b})
        for (i in vorstellungen_sort){
            vorstellung = vorstellungen_sort[i]
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
            if (i == 2){break;}
        }
        // create Card
        var titel = film['titel'];
        var dauer = film['dauer'];
        var image_pfad  = film['coverpfad'];
        var $cardBlock = $('<div class="col-4"/>');
        var $card = $('<div class="card mb-4 box-shadow"/>');
        var $header = $('<div class="card-header"><h4 class="my-0 font-weight-normal">' + titel + '</h4></div>');
        var $image = $('<img src="' +image_pfad + '" class="card-img-top">');
        var $body = $('<div class="card-body"><ul class="list-unstyled mt-3 mb-4 text-left"><li>' + datum[0] + ' ' + uhrzeit[0] + '</li><li>' + datum[1] + ' ' + uhrzeit[1] + '</li><li>' + datum[2] + ' ' + uhrzeit[2] + '</li></ul><a href="filmuebersicht.html?id=' + filmID + '"type="button" class="btn btn-lg btn-block btn-outline-primary"> Ticket bestellen</a><br><span>Dauer: '+ dauer +'min</span></div>')
        $card.append($header,$image,$body);
        $cardBlock.append($card);
        $('#film_cards').append($cardBlock);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}


function slideShow(film,i){
    var filmID = film['id'];
    var active = '';
    if (i == 0){
        active = 'active'
    }
    //create slideshow
    var bild =  film['coverpfad'];
    var titel = film['titel'];
    var $item   = $('<a href="filmuebersicht.html?id=' + filmID + '" class="carousel-item '+ active +'"/>');
    var $block  = $('<img class="d-block w-100" src="'+ bild + '" alt="Film1">');
    var $caption = $('<div class="carousel-caption d-none d-md-block"><h1 class="caption">'+ titel +'</h1></div>');
    $item.append($block,$caption);
    $('#slide_show').append($item);
}
