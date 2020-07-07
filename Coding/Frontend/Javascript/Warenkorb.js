// Shorthand function for $(document).ready(...);
$(async () => {
    $('#createEntryButton').click(async () => await createNewGuestbookEntry());
});


async function createNewGuestbookEntry() {
    const newEntryModal = $('#zumVerschenkenModal');
    const newEntryForm = $('form', newEntryModal).first();

    const nameInput = $('input[name="name"]', newEntryForm);
    const textInput = $('textarea[name="text"]', newEntryForm);

    const newEntry = {
        name: nameInput.val(),
        text: textInput.val(),
    };

    // Send the new entry via HTTP POST to the API
    var response = await fetch('/api/v1/entries', {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
    });

    // In case something went wrong, show an error
    if(response.status != 200) {
        showError("Failed to create new Guestbook entry!");
        return;
    }

    // Reset the input fields
    textInput.val("");
    nameInput.val("");

    // Hide the newEntryModal
    newEntryModal.modal("hide");
}

document.addEventListener('DOMContentLoaded', function () {
    function rechne(){
        $.ajax({
            url: "http://localhost:8000/api/snacktyp/alle/",
            method: "get",
            dataType: "json"
        }).done(function (response) {
            var summe = 0;
            var zwischensumme = 0;
            var summeSnacks = 0;
            var mwst = 19;
            for (inhalt in response["daten"]){
                var preis = response['daten'][inhalt]['preis'];
                var name = response['daten'][inhalt]['name'];
                try {
                    var menge = document.getElementById(name);
                    zwischensumme = zwischensumme + (menge.valueAsNumber * parseFloat(preis));
                    var doppel = name + name;
                    document.getElementById(doppel)
                        .value = (menge.valueAsNumber * parseFloat(preis));
                } catch (error) {
                    
                }
                
            }
            summeSnacks = zwischensumme;
            $.ajax({
                url: "http://localhost:8000/api/film/alle",
                method: "get",
                dataType: "json"
            }).done(function (response) {
                var summeFilme;
                var zwischen1 = 0;
                for (film in response["daten"]){
                    var filmname = response['daten'][film]['titel'];
                    try {
                        var menge1=document.getElementById(filmname);
                        zwischen1 = zwischen1 +(menge1.valueAsNumber * parseFloat(12));
                        var doppelt =filmname+filmname;
                        document.getElementById(doppelt)
                            .value = (menge1.valueAsNumber*parseFloat(12));
                    } catch (error) {
                        
                    }
                }
                summeFilme = zwischen1;
                summe = (summeSnacks + summeFilme) ;
                summe = summe.toFixed(2);
                document.getElementById('betrag')
                    .value = summe;
                var steuer = summe * (parseFloat(mwst)/100);
                steuer = steuer.toFixed(2);
                document.getElementById('mwst')
                    .value =  steuer;
                
            
            }).fail(function (jqXHR, statusText, error) {
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
                $("#output").html("Ein Fehler ist aufgetreten");
            });
            
            
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
    }
    document.getElementById("Warenkorbberechnen")
		.addEventListener("input", rechne);


});
function bezahlen(){
    var benutzerId = window.localStorage.getItem("benutzerId");
    $.ajax({
        url: "http://localhost:8000/api/ticket/gib/BenutzerId/"+benutzerId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        var ticket;
        for (ticket in response["daten"]){
            var vorstellungsId = response['daten'][ticket]['vorstellungsid'];
            var filmname = response['daten'][ticket]['film']['film']['titel'];
            try {
                var menge2 = document.getElementById(filmname);
                    for (var i = 1; i < menge2.valueAsNumber; i++) {
                    createTicket(vorstellungsId, benutzerId);
                }
                
            } catch (error) {
                
            }   
        }
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
    $.ajax({
        url: "http://localhost:8000/api/snack/gib/"+benutzerId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        var inhalt;
        for (inhalt in response["daten"]){
            var ids = response['daten'][inhalt]['id'];
            var beschreibung = response['daten'][inhalt]['snack']['name'];
            var menge3 = document.getElementById(beschreibung);
            var snacktypID = response['daten'][inhalt]['snacktypid'];
            updateSnack(parseInt(ids),parseInt(snacktypID),parseInt(benutzerId),menge3.valueAsNumber);
        }
        window.location.href = 'kasse.html';
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });

    
    
}
function createTicket(vorstellungsId, benutzerId){
    var obj = { "vorstellungsID": vorstellungsId, "benutzerID": benutzerId};
        $.ajax({
            url: "http://localhost:8000/api/ticket",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).done(function (response) {
            $("#output").html(JSON.stringify(response));
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
}
function updateSnack(id,snackTypid=null, benutzerid=null, menge){
    var obj = {'id': id, 'snacktypid': snackTypid, 'benutzerid': benutzerid, 'menge':menge};
    $.ajax({
        url: "http://localhost:8000/api/snack/update",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(obj)
    }).done(function (response) {
        $("#output").html(JSON.stringify(response));
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
}




