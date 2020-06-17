var chatIntervalID;
var chatMessagesIDs = [];
var chatID;
var benutzerID;
$(document).ready(function() {
    var vorstellungsId = getLocalData('VorstellungsID');
    if (isNaN(vorstellungsId)){
        return;
    }
    // TODO Use when BenutzerID in Storage
    // benutzerID = getLocalData('BenutzerID');
    // if (isNaN(benutzerID)){
    //     return;
    // }
    benutzerID = 1;
    chatIntervalID = window.setInterval(function() { checkForMessages(vorstellungsId);}, 100);
});

function checkForMessages(vorstellungsId){
    $.ajax({
        url: "http://localhost:8000/api/chat/gibByVorstellungsID/" + vorstellungsId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        chatID = response['daten']['id'];
        var nachrichten = response['daten']['nachrichten'];
        for (var i = 0; i < nachrichten.length; i++){
            var nachricht = nachrichten[i];
            var messageID = nachricht['ID'];
            if (chatMessagesIDs.includes(messageID)){
                continue;
            }
            chatMessagesIDs.push(messageID);

            var nachrichtText = nachricht['Nachricht'];
            var uhrzeit = nachricht['Uhrzeit'];
            var benutzerName = nachricht['benutzer'];
            var nachrichtBenutzerID = nachricht['BenutzerID'];

            console.log(nachricht);

            if (nachrichtBenutzerID == benutzerID){
                addToChat(nachrichtText, benutzerName, uhrzeit, "messageRight");
            } else {
                console.log("MessegeLEft");
                addToChat(nachrichtText, benutzerName, uhrzeit, "messageLeft");
            }
        }

        scrollDown();

    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });
}

function addToChat(input, name, time, messageType){
    var parsedTime = getHoursAndMinutes(time);
    var $card = $('<div class="card '+messageType+'"/>');
    var $header = $('<div class="card-header header">'+name+'</div>');
    var $message = $('<div class="card-body body">' + input+ '</div>');
    var $footer = $('<span class="timeLeft">'+parsedTime+ '</span>');
    $card.append($header, $message, $footer);
    $("#chat").append($card);
    //scrollDown();
}

// Scroll down when ever new Message arrives
function scrollDown() {
    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
}

function getHoursAndMinutes(time){
    var d = new Date(time);
    var minutes = d.getMinutes();
    if (minutes.length <= 1){
        console.log(minutes);
        minutes = "0" + minutes; 
    }
    return d.getHours() + ":" +minutes;
}

$(document).on("click", "#sendMessage" ,function(){
    console.log("button addtax clicked");
    var message = document.getElementById('messageInput').value;
    var time = new Date();
    var obj = { "benutzerID": benutzerID, "chatID": chatID, "nachricht" : message, "uhrzeit": time};
    
    $.ajax({
        url: "http://localhost:8000/api/chatNachricht",
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
});