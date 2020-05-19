window.onload = function() {

    // Video
    var video = document.getElementById("video");
    video.muted = true;
    video.play();

    video.onpause = function() {
        video.play();
    };

    // chat functionality
    // var videoBox = this.document.getElementById("video_container");
    // var chatButton = document.getElementById("chatButton");
    // var chatBox = document.getElementById("chatBox");
    // chatBox.style.display = "none";
    // chatButton.addEventListener("click", function(){
    //     if (chatBox.style.display == "none"){
    //         chatBox.style.display = "block";

    //     } else {
    //         chatBox.style.display = "none";
    //     }
    // });

    var sendMessage = document.getElementById("sendMessage");
    var messageInput = document.getElementById("messageInput");
    sendMessage.addEventListener("click", function(){
        var input = messageInput.value;
        
        if (input.length > 0){
            addToChat(input, "messageRight");
        }
    });

    function getHoursAndMinutes(){
        var d = new Date();
        var minutes = d.getMinutes();
        if (minutes.length <= 1){
            console.log(minutes);
            minutes = "0" + minutes; 
        }
        return d.getHours() + ":" +minutes;
    }


    function addToChat(input, messageType){
        var time = getHoursAndMinutes();
        var $card = $('<div class="card '+messageType+'"/>');
        var $header = $('<div class="card-header header">Josef Bierle</div>');
        var $message = $('<div class="card-body body">' + input+ '</div>');
        var $footer = $('<span class="timeLeft">'+time+ '</span>');
        $card.append($header, $message, $footer);
        $("#chat").append($card);
        scrollDown();
    }

    // Scroll down when ever new Message arrives
    function scrollDown() {
        var elem = document.getElementById('chat');
        elem.scrollTop = elem.scrollHeight;
      }

    window.setInterval(function() {
        var input = "Gut";
        addToChat(input, "messageLeft");
    }, 5000);
}