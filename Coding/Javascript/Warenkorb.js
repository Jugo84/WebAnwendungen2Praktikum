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
            var summePopcorn = popcorn.valueAsNumber * parseInt(popcornPreis);
            document.getElementById('PopcornGesamt')
                .value = summePopcorn;
         } catch (error) {
            console.log("nicht vorhanden:"+error);
         }
        try {
            var haribo = document.getElementById('Haribo');
            var hariboPreis = window.localStorage.getItem('Haribo');
            var summeHaribo = haribo.valueAsNumber * parseInt(hariboPreis);
            document.getElementById('HariboGesamt')
                .value = summeHaribo;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var schokolade = document.getElementById('Schokolade');
            var schokoladePreis = window.localStorage.getItem('Schokolade');
            var summeSchokolade = schokolade.valueAsNumber * parseInt(schokoladePreis);
            document.getElementById('SchokoladeGesamt')
                .value = summeSchokolade;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var smarties = document.getElementById('Smarties');
            var smartiesPreis = window.localStorage.getItem('Smarties');
            var summeSmarties = smarties.valueAsNumber * parseInt(smartiesPreis);
            document.getElementById('SmartiesGesamt')
                .value = summeSmarties;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var chips = document.getElementById('Chips');
            var chipsPreis = window.localStorage.getItem('Chips');
            var summeChips = chips.valueAsNumber * parseInt(chipsPreis);
            document.getElementById('ChipsGesamt')
                .value = summeChips;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var erdnüsse = document.getElementById('Erdnüsse');
            var erdnüssePreis = window.localStorage.getItem('Erdnüsse');
            var summeErdnüsse = erdnüsse.valueAsNumber * parseInt(erdnüssePreis);
            document.getElementById('ErdnüsseGesamt')
                .value = summeErdnüsse;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var cola = document.getElementById('Cola');
            var colaPreis = window.localStorage.getItem('Cola');
            var summeCola = cola.valueAsNumber * parseInt(colaPreis);
            document.getElementById('ColaGesamt')
                .value = summeCola;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var sprite = document.getElementById('Sprite');
            var spritePreis = window.localStorage.getItem('Sprite');
            var summeSprite = sprite.valueAsNumber * parseInt(spritePreis);
            document.getElementById('SpriteGesamt')
                .value = summeSprite;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var fanta = document.getElementById('Fanta');
            var fantaPreis = window.localStorage.getItem('Fanta');
            var summeFanta = fanta.valueAsNumber * parseInt(fantaPreis);
            document.getElementById('FantaGesamt')
                .value = summeFanta;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var bier = document.getElementById('Bier');
            var bierPreis = window.localStorage.getItem('Bier');
            var summeBier = bier.valueAsNumber * parseInt(bierPreis);
            document.getElementById('BierGesamt')
                .value = summeBier;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var nachos = document.getElementById('Nachos');
            var nachosPreis = window.localStorage.getItem('Nachos');
            var summeNachos = nachos.valueAsNumber * parseInt(nachosPreis);
            document.getElementById('NachosGesamt')
                .value = summeNachos;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
            mwst = 19;
        
        var summeSnacks = summeSprite + summeSmarties + summeSchokolade + summePopcorn+ summeNachos+ summeHaribo+ summeFanta+ summeErdnüsse+ summeCola+ summeChips + summeBier 
        document.getElementById('snacksGesamt')
            .value = summeSnacks;

        var summeRufDerWildnis = 0;
        var summeBerlinBerlin = 0;
        var summeJamesBond = 0;
        var summeInception = 0;
        try {
            var rufDerWildnis = document.getElementById('Ruf der Wildnis');
            var summeRufDerWildnis = rufDerWildnis.valueAsNumber *parseInt(12);
            document.getElementById('Ruf der WildnisGesamt')
                .value = summeRufDerWildnis;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var jamesBond = document.getElementById('James Bond');
            var summeJamesBond = jamesBond.valueAsNumber * parseInt(12);
            document.getElementById('James BondGesamt')
                .value = summeJamesBond;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var berlinBerlin = document.getElementById('Berlin Berlin');
            var summeBerlinBerlin = berlinBerlin.valueAsNumber * parseInt(12);
            document.getElementById('Berlin BerlinGesamt')
                .value = summeBerlinBerlin;
        } catch (error) {
            console.log("nicht vorhanden:"+error);
        }
        try {
            var inception = document.getElementById('Inception');
            var summeInception = inception.valueAsNumber * parseInt(12);
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
        var summe = (summeSnacks + summeFilme) * (1 + parseInt(mwst) /100);
		summe = summe.toFixed(2);
		document.getElementById('betrag')
			.value = summe;
	}
	document.getElementById("Warenkorbberechnen")
		.addEventListener("input", rechne);
});



