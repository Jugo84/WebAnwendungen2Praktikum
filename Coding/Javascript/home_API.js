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
            //slideShow(response['daten'][film]);
        } 
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
});

function createCard(film){
    var datum = ['','',''];
    var uhrzeit = ['','',''];
    var filmID = film['id'];
    $.ajax({
        url: "http://localhost:8000/api/vorstellung/film/" + filmID,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        // get Vorstellungen
        for (vorstellung in response["daten"]){
            datum[vorstellung] = (response['daten'][vorstellung]['datum']);
            uhrzeit[vorstellung] = (response['daten'][vorstellung]['uhrzeit']);
            //hier hat es nicht break
            if (vorstellung == 1){break;}
        }
        // create Card
        var titel = film['titel'];
        var dauer = film['dauer'];
        var image_pfad  = film['coverpfad'];
        var $card = $('<div class="card mb-4 box-shadow"/>');
        var $header = $('<div class="card-header"><h4 class="my-0 font-weight-normal">' + titel + '</h4></div>');
        var $image = $('<img src="' +image_pfad + '" class="card-img-top">');
        var $body = $('<div class="card-body"><ul class="list-unstyled mt-3 mb-4 text-left"><li>' + datum[0] + ' ' + uhrzeit[0] + '</li><li>' + datum[1] + ' ' + uhrzeit[1] + '</li><li>' + datum[2] + ' ' + uhrzeit[2] + '</li></ul><a href="filmuebersicht.html"type="button" class="btn btn-lg btn-block btn-outline-primary"> Ticket bestellen</a><br><span>Dauer: '+ dauer +'min</span></div>');
        $card.append($header,$image,$body);
        $('#film_cards').append($card);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}


async function slideShow(film){
    var filmID = fim['id'];
    $.ajax({
        url: "http://localhost:8000/api/film/gib/" + filmID,
        method: "get",
        dataType: "json"
    }).done(function(response){
    //create slideshow
        var bild    = film['coverpfad'];
        var caption = film['titel'];
        var $item   = $('<div class="carousel-item"></div>');
        //die Attribute 'alt'(alternative) in img habe ich nicht geändert
        var $block  = $('<img class="d-block w-100" src="'+ bild + '" alt="Film1">');
        var $caption = $('<div class="carousel-caption d-none d-md-block"><h1 class="caption">'+ titel +'</h1></div>');
        $item.append($block,$caption);
        $('#slide_show').append($item);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });    
}
