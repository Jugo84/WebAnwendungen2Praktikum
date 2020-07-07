$(document).ready(function() {
    $("#checkTicketCode").click(function() {
        var ticketCodeInput = document.getElementById("ticketCodeInput");
        var ticketCode = ticketCodeInput.value;
        $.ajax({
            url: "http://localhost:8000/api/ticket/gib/" + ticketCode,
            method: "get",
            dataType: "json"
        }).done(function (response) {
            var vorstellungsid = (response['daten']['vorstellungsid']);
            if(isNaN(vorstellungsid)){
                return;
            }
            var benutzerId = (response['daten']['benutzerid']);
            
            setLocalData("VorstellungsID", vorstellungsid);
            setLocalData("benutzerId", benutzerId);
            window.location.href = "kinosaal_video.html";
    
        }).fail(function (jqXHR, statusText, error) {
            ticketCodeInput.style.color = "black";
            ticketCodeInput.style.backgroundColor = "red";
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
    });
});