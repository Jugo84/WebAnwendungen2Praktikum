$( document ).ready(function() {
    $('#bezahlen').click(function(){
        var benutzerId = getLocalData("benutzerId");
        var bezahlmöglichkeit = $('#bezahlmöglichkeit').val();
        var vorname = $("#vorname").val();
        var nachname = $("#nachname").val();
        var kreditkartennummer = $('#kartennummer').val();
        var gültigBis = $('#gültigBis').val()
        var cvs = $('#cvs').val();
        var email = $('#email').val();
        var straße = $('#straße').val();
        var nummer = $('#nummer').val();
        var plz = $('#plz').val();
        var stadt = $('#stadt').val();
        var error = 0;
        
        //check Bezahlmöglichkeit
        if(!bezahlmöglichkeit){
            $('#bezahlError').text('Bitte geben Sie eine Bezahlmöglichkeit an!');
            error = 1;
        }else{
            $('#bezahlError').text('');
        }

        //check Name
        var letters = /^[a-zA-Z]+$/;
        if(!vorname || !letters.test(vorname)){
            $('#vornameError').text('Bitte geben Sie einen korrekten Vornamen an!');
            error = 1;
        }else{
            $('#vornameError').text('');
        }
        if(!nachname || !letters.test(nachname)){
            $('#nachnameError').text('Bitte geben Sie einen korrekten Nachnamen an!');
            error = 1;
        }else{
            $('#nachnameError').text('');
        }

        //check Kreditkarte
        var numbers = /^[0-9]+$/;
        today = new Date();
        date = new Date(gültigBis);
        if(bezahlmöglichkeit == 'Kreditkarte'){
            if (!kreditkartennummer || !numbers.test(kreditkartennummer)){
                $('#kreditnummerError').text('Keine korrekte Kreditkartennummer!')
                error = 1;
            }else{
                $('#kreditnummerError').text('');
            }
            if(!gültigBis || date < today){
                $('#gültigBisError').text('Ungültig!');
                error = 1;
            }else{
                $('#gültigBisError').text('');
            }
            if (!cvs || !numbers.test(cvs)){
                $('#cvsError').text('Keine korrekte CVS!');
                error = 1;
            }else{
                $('#cvsError').text('');
            }
        }else{
            $('#kreditnummerError').text('');
            $('#gültigBisError').text('');
            $('#cvsError').text('');
        }

        //check email
        var emailFormat = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailFormat.test(email)){
            $('#emailError').text('Bitte geben Sie eine korrekte Email-Adresse an!');
            error = 1;
        }else{
            $('#emailError').text('');
        }

        //update Benutzer
        if (error == 0){
            //create Adresse
            if(straße != ""){
                var obj = { "strasse": straße, "hausnummer": nummer, 'plz': plz, 'ort': stadt };
                $.ajax({
                    url: "http://localhost:8000/api/adresse",
                    method: "post",
                    contentType: "application/json",
                    data: JSON.stringify(obj)
                }).done(function (response) {
                    console.log(response);
                    $("#output").html(JSON.stringify(response));
                    var adresseId = response['daten']['id'];
                    if (bezahlmöglichkeit == 'Kreditkarte'){
                        updateBenutzer(benutzerId, nachname, vorname, email, bezahlmöglichkeit,adresseId,kreditkartennummer,cvs);
                    }else{
                        updateBenutzer(benutzerId, nachname, vorname, email, bezahlmöglichkeit,adresseId);
                    }
                }).fail(function (jqXHR, statusText, error) {
                    console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
                    $("#output").html("Ein Fehler ist aufgetreten");
                });
            }else{
                if (bezahlmöglichkeit == 'Kreditkarte'){
                    updateBenutzer(benutzerId, nachname, vorname, email, bezahlmöglichkeit,null,kreditkartennummer,cvs);
                }else{
                    updateBenutzer(benutzerId, nachname, vorname, email, bezahlmöglichkeit);
                }
            }
        // zu checkout weiterleiten
        var checkout = '<div class="gap"></div><div class="card container background_white"> <div class="row"> <div class="col-sm-12 p-3"> <p>Großartig ! Vielen Dank für Deine Bestellung! Du erhälst in Kürze eine Bestätigungemail mit deinen Ticket-Codes.</p> <div class="row"> <div class="col-sm-auto"> <p>Aufgeregt? Teil es gleich mit Deinen Freunde</p> </div> <div class="col-sm-auto"> <a href="https://facebook.com/" target="blank"> <i class="fa fa-facebook"></i> </a> <a href="https://twitter.com/" target="blank"> <i class="fa fa-twitter"></i></a><a href="https://www.wechat.com/en/" target="blank"> <i class="fa fa-wechat"></i> </a> <a href="https://www.viber.com/de/" target="blank"> <i class="fab fa-viber"></i> </a> <a  href="https://www.pinterest.de/" target="blank"> <i class="fa fa-pinterest"></i> </a> <a  href="https://whatsapp.com/" target="blank"> <i class="fa fa-whatsapp"></i> </a> <a href="https://instagram.com/" target="blank"> <i class="fa fa-instagram"></i> </a> <a  href="https://www.tumblr.com/" target="blank"> <i class="fa fa-tumblr"></i> </a> </div> </div> </div> </div> <p>Oder setzt ein Reminder für den Film<a href="" target="blank"> <i class="material-icons" style="font-size:18px">access_alarm</i> </a> </p> <p>Wir benachrichtigen Dich 1 Stunde bevor es los geht</p> <p><a href="https://albstadt.zollernalb-kinos.de/"><img class="img-fluid" src="Bilder/zollernalb.jpg"></a> bedankt sich für Deine Unterstützung ! </p> </div>';
        $('main').html(checkout);
        }
    })
})

function updateBenutzer(benutzerId, nachname, vorname, email, bezahlmöglichkeit,adresseId = null, kreditkartennummer=null, cvs = null){
    if (adresseId != null){
        if (kreditkartennummer != null){
            var obj = { 'id': benutzerId, "name": nachname, "vorname": vorname, "email": email, "bezahlmöglichkeit": bezahlmöglichkeit, 'adresseId': adresseId, 'kreditkartennummer':kreditkartennummer, 'cvs':cvs };
        }else{
            var obj = { 'id': benutzerId, "name": nachname, "vorname": vorname, "email": email, "bezahlmöglichkeit": bezahlmöglichkeit, 'adresseId': adresseId };
        }
    }else{
        if (kreditkartennummer != null){
            var obj = { 'id': benutzerId, "name": nachname, "vorname": vorname, "email": email, "bezahlmöglichkeit": bezahlmöglichkeit, 'kreditkartennummer':kreditkartennummer, 'cvs':cvs };
        }else{
            var obj = { 'id': benutzerId, "name": nachname, "vorname": vorname, "email": email, "bezahlmöglichkeit": bezahlmöglichkeit };
        }
    }
    $.ajax({
        url: "http://localhost:8000/api/benutzer",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(obj)
    }).done(function (response) {
        console.log(response);
        $("#output").html(JSON.stringify(response));
        getTickets(benutzerId);
        getSnacks(benutzerId);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function getTickets(benutzerId){
    // get and update Tickets
    $.ajax({
        url: "http://localhost:8000/api/ticket/gib/BenutzerId/" + benutzerId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        var i;
        for (i=0;i<response['daten'].length;i++){
            var id = response['daten'][i]['id'];
            updateTicket(id);
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function updateTicket(id){
    var obj = {'id': id}
    $.ajax({
        url: "http://localhost:8000/api/ticket",
        method: "put",
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

function getSnacks(benutzerId){
    // get and update Snack
    $.ajax({
        url: "http://localhost:8000/api/snack/gib/" + benutzerId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        var i;
        for (i=0;i<response['daten'].length;i++){
            var id = response['daten'][i]['id'];
            updateSnack(id);
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function updateSnack(id){
    var obj = {'id': id}
    $.ajax({
        url: "http://localhost:8000/api/snack/bezahlt",
        method: "put",
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

function getLocalData(key) {
    var result = window.localStorage.getItem(key);
    return result;
  }