window.addEventListener("DOMContentLoaded", setupStopwatch);
window.addEventListener("DOMContentLoaded", numberClicker);

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

    counterReset.addEventListener("click", function () {
        numerator = denominator = 0;
        number.textContent = "null";
    });

    document.addEventListener("keyup", (event) => {
        const keyName = event.key;

        // console.log(keyName + "is pressed.");
        if (keyName == "ArrowRight") {
            denominator = denominator + 1;
            number.textContent = numerator + "/" + denominator;
        }
    });
}

// Sets up the stopwatch functionality for the app
function setupStopwatch() {
    var clock = document.getElementById("timer");
    var startStop = document.getElementById("beginButton");
    var reset = document.getElementById("resetButton");

    var startTime = 0;
    var stopTime = 0;
    var intervalID = 0;

    startStop.addEventListener("click", function () {
        // pause the clock
        if (intervalID) {
            // Keep track of the app stop time in case we restart the clock
            stopTime = Date.now();

            // Clear the interval that updates the clock
            clearInterval(intervalID);
            intervalID = 0;

            // Update the button text
            startStop.textContent = "start";
            reset.textContent = "reset";
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
        reset.textContent = "lap";
    });

    reset.addEventListener("click", function () {
        // If the timer is currently running, just reset the start time to now
        if (intervalID && reset.textContent === "lap") {
            var i = document.createElement("p");
            var text = document.createTextNode(clock.textContent);
            i.appendChild(text);
            document.getElementById('recordList').appendChild(i);
            return;
        } else {
            stopTime = Date.now();
            clearInterval(intervalID);
            intervalID = 0;
            startStop.textContent = "start";
        }
        startTime = intervalID ? Date.now() : 0;
        stopTime = 0;
        clock.textContent = "00:00.00";

        // get lap element and delete all of them
        i = document.getElementById('recordList');
        while (i.hasChildNodes()) {
            i.removeChild(i.firstElementChild);
        }
    });

    // Helper function that takes a UTC timestamp and returns a formatted time string
    function formatTime(timestamp) {
        var d = new Date(timestamp);
        var i = new Date('Thu Jan 01 1970 08:00:00');
        console.log(d);
        console.log("days: " + d.getDate() + ", hours: " + d.getHours());
        // console.log("hours:" + i.getHours());
        // console.log("day:" + i.getDate());
        var minutes = d.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        var seconds = d.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        var millisec = d.getMilliseconds();
        
        var hours = d.getHours();
        var days = d.getDate();
        /*
        1.day==1 and 8 < hours < 23
        2.day > 2 and 0 < hours < 8
        3.day >2 and hours > 8
        */

        // day == 1 and hours < 23
        if (days == 1) {
            if (hours < 10) {
                hours = "0" + hours;
            } 
            
            if ((hours - 8) == 0) {
                return minutes + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
            }

            return (hours - 8) + ":" + minutes + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
        }

        // day > 2 and 0 < hours < 8  Thu Jan 01 1970 08:00:00
        if (days > 1 && hours <= 8) {
            return (hours - 8) + (days - 1) * 24 + ":" + minutes + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
        }

        return (days - 1) * 24 + (i.getHours - hours) + ":" + minutes + ":" + seconds + "." + (millisec + Array(2).join(0)).slice(0, 2);
    }
}