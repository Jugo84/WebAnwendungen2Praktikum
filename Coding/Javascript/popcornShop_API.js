$( document ).ready(function() {
    $.ajax({
        url: "http://localhost:8000/api/SnackTyp/alle",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        ///
        ////
        } 
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        $("#output").html("Ein Fehler ist aufgetreten");
    });
});