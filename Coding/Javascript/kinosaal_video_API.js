var intervalID;
$(document).ready(function() {
    var vorstellungsId = getLocalData('VorstellungsID');
    if (isNaN(vorstellungsId)){
        return;
    }
    $.ajax({
        url: "http://localhost:8000/api/vorstellung/gib/" + vorstellungsId,
        method: "get",
        dataType: "json"
    }).done(function (response) {
        var videoPfad = response['daten']['film']['videopfad'];
        var video = document.getElementById("video");
        video.src = videoPfad;

        intervalID = window.setInterval(function() { playVideoLive(video, response);}, 1000);

    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });
});

function playVideoLive(video, response){
    var date = response['daten']['datum'];

    var videoStartDate = new Date(date);
    var currentDate = new Date();

    var timeDifference = videoStartDate.getTime() - currentDate.getTime();
    var secondsDifference = Math.abs(timeDifference) / (1000);
    if (timeDifference < 0 ){
        secondsDifference = secondsDifference * -1;
    }
    if(isNaN(video.duration)){
        return;
    }
    // before film-show
    if (secondsDifference > 0)
    {    
        return;
    }
    // while film-show 
    if ((secondsDifference <= 0) && ((secondsDifference + video.duration) >= 0)){
        video.currentTime = Math.ceil(Math.abs(secondsDifference));
        var supposedCurrentTime = video.currentTime
        video.onpause = function() {
            video.play();
        };
        // Settings for disable to step back or forwards during film
        video.addEventListener('timeupdate', function() {
        if (!video.seeking) {
                supposedCurrentTime = video.currentTime;
        }
        });
        video.addEventListener('seeking', function() {

        var delta = video.currentTime - supposedCurrentTime;
        if (Math.abs(delta) > 0.01) {
            video.currentTime = supposedCurrentTime;
        }
        });
        video.addEventListener('ended', function() {
            video.pause();
            video.onpause = function() {
                video.pause();
            };
            video.onplay = function(){
                video.pause();
            };
            video.src = "";
        });
        
        video.currentTime = Math.ceil(Math.abs(secondsDifference));
        video.muted = true;
        video.play();
        clearInterval(intervalID);
        return;
    }
    // after film-show
    if ((secondsDifference <= 0) && ((secondsDifference + video.duration) <= 0)){
        video.pause();
        video.src = "";
        clearInterval(intervalID);
        return;
    }
}
