document.getElementById("btn").onclick=function(){
        console.log('click');
        requestFullScreen();
        start_game();
   };
    function requestFullScreen() {
        var element = document.getElementById('myCanvas');
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }