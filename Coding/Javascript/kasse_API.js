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
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}

function getLocalData(key) {
    var result = window.localStorage.getItem(key);
    return result;
  }