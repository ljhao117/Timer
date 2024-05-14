let beginButton = document.getElementById('beginButton');
let stopButton = document.getElementById('stopBUtton');
let resetButton = document.getElementById('resetButton');

let mileSec = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let interID = null;
let onGoing = null;

// begin button listener event
document.getElementById("beginButton").addEventListener("click", function() {

    if (onGoing !== null) {
        return;
    }
    interID = setInterval(function(){
        console.log("mileSec = " + mileSec);
        seconds += 1;
        // if (mileSec === 1000) {
        //     mileSec = 0;
        //     seconds++
        // }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        document.getElementById("timer").innerHTML = (Array(2).join(0) + hours).slice(-2) + ":" + 
                                                     (Array(2).join(0) + minutes).slice(-2) + ":" + 
                                                     (Array(2).join(0) + seconds).slice(-2)/* + "." +
                                                     (Array(2).join(0) + mileSec).slice(-2)*/;
    
    }, 1000);
    onGoing = 1;
});

// stop listener event
document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(interID);
    onGoing = null;
});

// reset listener event
document.getElementById("resetButton").addEventListener("click", function () {
    clearInterval(interID);
    mileSec = seconds = minutes = hours = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
    onGoing = null;
});
