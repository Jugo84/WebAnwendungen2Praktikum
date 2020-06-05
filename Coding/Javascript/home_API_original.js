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
        var $card = $('<div class="card mb-4 box-shadow"/>');
        var $header = $('<div class="card-header"><h4 class="my-0 font-weight-normal">' + titel + '</h4></div>');
        var $image = $('<img src="Bilder/Film3.jpg" class="card-img-top">');
        var $body = $('<div class="card-body"><ul class="list-unstyled mt-3 mb-4 text-left"><li>' + datum[0] + ' ' + uhrzeit[0] + '</li><li>' + datum[1] + ' ' + uhrzeit[1] + '</li><li>' + datum[2] + ' ' + uhrzeit[2] + '</li></ul><a href="filmuebersicht.html"type="button" class="btn btn-lg btn-block btn-outline-primary"> Ticket bestellen</a><br><span>Dauer: '+ dauer +'min</span></div>');
        $card.append($header,$image,$body);
        $('#film_cards').append($card);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}
