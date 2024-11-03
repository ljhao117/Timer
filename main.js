window.addEventListener("DOMContentLoaded", setupStopwatch);

var numerator = 0, denominator = 0;
var counterError = document.getElementById("number1");
var counterReset = document.getElementById("number2");
var number = document.getElementById("number");
var intervalAlert = 0, timer = 10;

function numberClicker() {
    counterError.addEventListener("click", function () {
       numerator = numerator + 1;
       denominator = denominator + 1;
       number.textContent = numerator + "/" + denominator; 
    });

    counterReset.addEventListener("click", function() {
        numerator = denominator = 0;
        number.textContent = "null";
    });
}

    document.addEventListener("keyup", (event) => {
    const keyName = event.key;

    console.log(keyName + "is pressed.");
    if (keyName == "ArrowRight")
    {
        denominator = denominator + 1;
        number.textContent = numerator + "/" + denominator;
    }
});

// Sets up the stopwatch functionality for the app
function setupStopwatch() {
    var clock = document.getElementById("timer");
    var startStop = document.getElementById("beginButton");
    var reset = document.getElementById("resetButton");

    var startTime = 0;
    var stopTime = 0;
    var intervalID = 0;

    startStop.addEventListener("click", function() {
       if (intervalID) {
        // Keep track of the app stop time in case we restart the clock
        stopTime = Date.now();
        
        // Clear the interval that updates the clock
        clearInterval(intervalID);
        intervalID = 0;

        // Update the button text
        startStop.textContent = "Start";
        return;
       }

       // If we're restarting the clock, account fo the paused time
       if (startTime > 0) {
        var pauseTime = Date.now() - stopTime;
        startTime = startTime + pauseTime;
       } else {
        startTime = Date.now();
       }

       // Set an interval to update the clock
       intervalID = setInterval(() => {
        var elapsedTime = Date.now() - startTime;
        clock.textContent = formatTime(elapsedTime);
       }, 100);

       // Update the button text
       startStop.textContent = "Stop";
    });

    reset.addEventListener("click", function() {
        // If the timer is currently running, just reset the start time to now
        if (intervalID) {
            stopTime = Date.now();
            clearInterval(intervalID);
            intervalID = 0;
            startStop.textContent = "Start";
        }
        startTime = intervalID ? Date.now() : 0;
        stopTime = 0;
        clock.textContent = "00:00.00";
    });

    // Helper function that takes a UTC timestamp and returns a formatted time string
    function formatTime(timestamp) {
        var d = new Date(timestamp);
        console.log("Date():" + d);
        var minutes = d.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        var seconds = d.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        var hours = d.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        console.log(hours);

        var millisec = d.getMilliseconds();
        if ((hours - 8) == 0) {
            return minutes + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
        }

        return (hours - 8) + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
    }
}