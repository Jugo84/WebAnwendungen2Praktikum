// globale variable
var produktDaten = [];

$( document ).ready(function() {
    $.ajax({
        url: "http://localhost:8000/api/snacktyp/alleFrontend",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        // Daten an globalen Variablen zuweisen
        produkteDaten = response.daten;
        for (var i =0 ; i < response.daten.length; i++){
            var entry = response.daten[i];
            createCard(entry);
        }
         
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
});

function createCard(allsnacks){
    var art = allsnacks.art;
    var produkte = allsnacks.produkte; //array

    if (produkte.length == 1) { // kein Dropdown
       
        var node = $('<button>', { class: 'btn PopcornButton' });
        node.attr('type', 'button');
        node.attr('onClick', 'showProductDetails(' + produkte[0].id + ')');
        node.text(art);
        $('.btn-group-vertical').append(node);

    } else { // mit Dropdown

        var parent = $('<div>', { class: 'btn-group dropright' });

            var button = $('<button>', { class: 'btn PopcornButton dropdown-toggle' });
            button.attr({
                'type': 'button',
                'data-toggle': 'dropdown',
                'aria-haspopup': 'true',
                'aria-expanded': 'false'
            })
            button.text(art);

        parent.append(button);

            var div = $('<div>', { class: 'dropdown-menu' });
            // loop
            $.each(produkte, function(idx, produkt) {
                var link = $('<a>', { class: 'dropdown-item' });
                link.attr('href', 'javascript:showProductDetails(' + produkt.id + ')');
                link.text(produkt.name);
                div.append(link);
            });
        parent.append(div);

        $('.btn-group-vertical').append(parent);
    }
}   // end create card

function showProductDetails(produktId) {
    //console.log('Produkt mit der id: ' + produktId + ' anzeigen');
    $( document ).ready(function() {
        $.ajax({
            url: "http://localhost:8000/api/snacktyp/gib/" + produktId,
            method: "get",
            dataType: "json"
        }).done(function (response) {

            var produkt = response.daten;
            //Produkt Name
            $('.card-header').html(
                $('<h6>', { class: 'my-0 font-weight-normal'})
                    .text(produkt.name) 
            );
            //Produkt Bild
            $('#snackBild').html(
                $('<img>', { class: 'd-block w-100'})
                    .attr('src' , produkt.bildpfad)
                    .attr('alt', produkt.name )
            );
            // Produkt Beschreibung    
            var span = $('<span>').text(produkt.beschreibung);
            var div = $('<div>', { class: 'row'});
            var button = $('<button>', { class: 'createSnack mt-4 mb-0 btn btn-md btn-block btn-outline-primary'});
            button.attr({
                'type' : 'button',
                'data-toggle' : 'modal',
                'data-target' : '#exampleModal'
            })
            button.text('In den Warenkorb');
            span.append(div,button);
            $('#snackText').html(span);
            
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });

        $(document).on("click", ".createSnack" , function() {
            var obj = {};
            var produktId = this.value;
            var benutzerId = getLocalData("benutzerId");
            if (benutzerId == null){
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
                    createSnack(produktId, benutzerId);
                }).fail(function (jqXHR, statusText, error) {
                    console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
                    $("#output").html("Ein Fehler ist aufgetreten");
                });
            }
            else{
                createSnack(produktId, benutzerId);
            }  
        }); //end on click
    });
} //end 

function createSnack(produktId, benutzerId){
    var obj = { 'produktID' : produktId, 'BenutzerID': benutzerId};
    $.ajax({
        url: "http://localhost:8000/api/snack",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(obj)
    }).done(function (response){
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
