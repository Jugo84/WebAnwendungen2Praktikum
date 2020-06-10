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
            // Not working because html, css and javascript only rendered through browser and not spreaded via node.js
            //setCookie('vorstellungsid', String(vorstellungsid), 365);
            setLocalData("VorstellungsID", vorstellungsid);
            window.location.href = "kinosaal_video.html";
    
        }).fail(function (jqXHR, statusText, error) {
            ticketCodeInput.style.color = "black";
            ticketCodeInput.style.backgroundColor = "red";
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        });
    });
});

