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



