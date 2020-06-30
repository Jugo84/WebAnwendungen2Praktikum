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
	function rechne() {
        console.log("in rechen");
        var summeBier = 0;
        var summeNachos = 0;
        var summePopcorn = 0;
        var summeSprite = 0;
        var summeChips = 0;
        var summeSchokolade = 0;
        var summeHaribo = 0;
        var summeErdnüsse = 0;
        var summeSmarties = 0;
        var summeCola = 0;
        var summeFanta = 0;
        try {
            var popcorn = document.getElementById('Popcorn');
            var popcornPreis = window.localStorage.getItem('Popcorn');
            var summePopcorn = popcorn.valueAsNumber * parseFloat(popcornPreis);
            document.getElementById('PopcornGesamt')
                .value = summePopcorn;
         } catch (error) {
            console.log("nicht vorhanden:"+error);
         }
        try {
            var haribo = document.getElementById('Haribo');
            var hariboPreis = window.localStorage.getItem('Haribo');
            var summeHaribo = haribo.valueAsNumber * parseFloat(hariboPreis);
            document.getElementById('HariboGesamt')
                .value = summeHaribo;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var schokolade = document.getElementById('Schokolade');
            var schokoladePreis = window.localStorage.getItem('Schokolade');
            var summeSchokolade = schokolade.valueAsNumber * parseFloat(schokoladePreis);
            document.getElementById('SchokoladeGesamt')
                .value = summeSchokolade;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var smarties = document.getElementById('Smarties');
            var smartiesPreis = window.localStorage.getItem('Smarties');
            var summeSmarties = smarties.valueAsNumber * parseFloat(smartiesPreis);
            document.getElementById('SmartiesGesamt')
                .value = summeSmarties;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var chips = document.getElementById('Chips');
            var chipsPreis = window.localStorage.getItem('Chips');
            var summeChips = chips.valueAsNumber * parseFloat(chipsPreis);
            document.getElementById('ChipsGesamt')
                .value = summeChips;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var erdnüsse = document.getElementById('Erdnüsse');
            var erdnüssePreis = window.localStorage.getItem('Erdnüsse');
            var summeErdnüsse = erdnüsse.valueAsNumber * parseFloat(erdnüssePreis);
            document.getElementById('ErdnüsseGesamt')
                .value = summeErdnüsse;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var cola = document.getElementById('Cola');
            var colaPreis = window.localStorage.getItem('Cola');
            var summeCola = cola.valueAsNumber * parseFloat(colaPreis);
            document.getElementById('ColaGesamt')
                .value = summeCola;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var sprite = document.getElementById('Sprite');
            var spritePreis = window.localStorage.getItem('Sprite');
            var summeSprite = sprite.valueAsNumber * parseFloat(spritePreis);
            document.getElementById('SpriteGesamt')
                .value = summeSprite;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var fanta = document.getElementById('Fanta');
            var fantaPreis = window.localStorage.getItem('Fanta');
            var summeFanta = fanta.valueAsNumber * parseFloat(fantaPreis);
            document.getElementById('FantaGesamt')
                .value = summeFanta;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var bier = document.getElementById('Bier');
            var bierPreis = window.localStorage.getItem('Bier');
            var summeBier = bier.valueAsNumber * parseFloat(bierPreis);
            document.getElementById('BierGesamt')
                .value = summeBier;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var nachos = document.getElementById('Nachos');
            var nachosPreis = window.localStorage.getItem('Nachos');
            var summeNachos = nachos.valueAsNumber * parseFloat(nachosPreis);
            document.getElementById('NachosGesamt')
                .value = summeNachos;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
            mwst = 0.19;
        
        var summeSnacks = summeSprite + summeSmarties + summeSchokolade + summePopcorn+ summeNachos+ summeHaribo+ summeFanta+ summeErdnüsse+ summeCola+ summeChips + summeBier 
        document.getElementById('snacksGesamt')
            .value = summeSnacks;

        var summeRufDerWildnis = 0;
        var summeBerlinBerlin = 0;
        var summeJamesBond = 0;
        var summeInception = 0;
        try {
            var rufDerWildnis = document.getElementById('Ruf der Wildnis');
            var summeRufDerWildnis = rufDerWildnis.valueAsNumber *parseFloat(12);
            document.getElementById('Ruf der WildnisGesamt')
                .value = summeRufDerWildnis;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var jamesBond = document.getElementById('James Bond');
            var summeJamesBond = jamesBond.valueAsNumber * parseFloat(12);
            document.getElementById('James BondGesamt')
                .value = summeJamesBond;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var berlinBerlin = document.getElementById('Berlin Berlin');
            var summeBerlinBerlin = berlinBerlin.valueAsNumber * parseFloat(12);
            document.getElementById('Berlin BerlinGesamt')
                .value = summeBerlinBerlin;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var inception = document.getElementById('Inception');
            var summeInception = inception.valueAsNumber * parseFloat(12);
            document.getElementById('Berlin BerlinGesamt')
                .value = summeInception;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        var summeFilme = summeBerlinBerlin + summeRufDerWildnis + summeJamesBond + summeInception;
        document.getElementById('filmeGesamt')
            .value = summeFilme;
        console.log("mwst: "+mwst.valueAsNumber);
        console.log("mwst: "+parseInt(mwst));
        var summe = (summeSnacks + summeFilme);
        summe = summe.toFixed(2);
        var steuer = summe*parseFloat(mwst);
        steuer = steuer.toFixed(2);
        document.getElementById('Steuer')
			.value = steuer;
		document.getElementById('betrag')
			.value = summe;
	}
	document.getElementById("Warenkorbberechnen")
		.addEventListener("input", rechne);
});

function bezahlen(){
    console.log('in bezahlen');
    // var benutzerId = window.localStorage.getItem("benutzerId");
    var benutzerId = 1;
    try {
        var rufDerWildnis = document.getElementById('Ruf der Wildnis');
        for (let i = 0; i < rufDerWildnis.valueAsNumber; i++) {
            var vorstellungsId = window.localStorage.getItem('Ruf der Wildnis');
            createTicket(vorstellungsId, benutzerId);
            console.log(i);
        }

    } catch (error) {
        
    }
    try {
        console.log('createTicket JB');
        var jamesBond = document.getElementById('James Bond');
        for (let i = 0; i < jamesBond.valueAsNumber; i++) {
            var vorstellungsId = window.localStorage.getItem('James Bond');
            createTicket(vorstellungsId, benutzerId);
        }
        
    } catch (error) {
        
    }
    try {
        console.log('createTicket I');
        var inception = document.getElementById('Inception');
        for(let i = 0; i < inception.valueAsNumber; i++) {
            var vorstellungsId = window.localStorage.getItem('Inception');
            createTicket(vorstellungsId, benutzerId);
        
        }
        
    } catch (error) {
        
    }
    try {
        console.log('createTicket BB');
        var berlinBerlin = document.getElementById('Berlin Berlin');
        for (let i = 0; i < berlinBerlin.valueAsNumber; i++) {
            var vorstellungsId = window.localStorage.getItem('Berlin Berlin');
            createTicket(vorstellungsId, benutzerId);
        }
    } catch (error) {
        
    }
    
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



