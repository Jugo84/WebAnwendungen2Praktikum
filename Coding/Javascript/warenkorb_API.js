$( document ).ready(function() {
    const id = 1;
    $.ajax({
        url: "http://localhost:8000/api/snack/gib/"+id,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        console.log("hier bin ich");
        var inhalt;
        var nummer;
        var preisgesamt = 0;
        var $gesamt =$('<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Produkt</th><th scope="col">Menge</th><th scope="col">Preis</th></tr></thead><tbody>');
        nummer=1;
        
        for (inhalt in response["daten"]){
            console.log('Inhalt:'+inhalt);
            console.log("hier bin ich auch");
            var menge = response['daten'][inhalt]['menge'];
            console.log(menge);
            var preisEinzeln = response['daten'][inhalt]['snack']['preis'];
            var preis = preisEinzeln * menge;
            preisgesamt = preisgesamt + preis;
            console.log(preisEinzeln);
            console.log(preis);
            var beschreibung = response['daten'][inhalt]['snack']['name'];
            console.log(beschreibung);
            
            
            var $reihe = $('<tr><th scope="row">'+nummer+'</th><td>'+ beschreibung + '</td><td><input type="number" min="0" value="'+ menge +'" class="warenkorb_numbertype"></input></td><td>'+preis+'€</td></tr>')
            
            console.log($reihe);
            $($gesamt).append($reihe);
            nummer = nummer +1;
            console.log($gesamt);
        }
        var $snacks =$('<tr><td></td><td><label for="snacks">Snacks</label></td><td></td><td>'+preisgesamt+'€</td></tr> ')
        $($gesamt).append($snacks);
        $.ajax({
            url: "http://localhost:8000/api/ticket/gib/BenutzerId/"+id,
            method: "get",
            dataType: "json"
        }).done(function (response) {
            console.log(response);
            var ticket;
            var preisfilme = 0;
            for (ticket in response["daten"]){
                var ticketpreis= response['daten'][ticket]['preis'];
                var filmname = response['daten'][ticket]['film']['film']['titel']
                var $reiheticket = $('<tr><th scope="row">'+nummer+'</th><td>'+ filmname + '</td><td><input type="number" min="0" value="1" class="warenkorb_numbertype"></input></td><td>'+ticketpreis+'€</td></tr>')
                nummer = nummer +1;
                preisfilme = ticketpreis + preisfilme;
                $($gesamt).append($reiheticket);
            }
            var $filme =$('<tr><td></td><td><label for="filme">Filmtickets</label></td><td></td><td>'+preisfilme+'€</td></tr> ')
            $($gesamt).append($filme);
            var $footer =$('<tr><td></td><td><label for="mwst">MwSt (%)</label></td><td><input type="number" min="0" id="mwst" value="19" class="warenkorb_numbertype"></td><td></td></tr> <tr><td></td><td>Gesamt:</td><td></td><td><output id="betrag" for="stunden satz mwst">0</output> €</td></tr></tbody></table>');     
            $($gesamt).append($footer);
            $('#warenkorb_reihe_snack').append($gesamt);
        
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
        
        
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
});

 