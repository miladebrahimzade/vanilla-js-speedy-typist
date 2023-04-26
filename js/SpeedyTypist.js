const originText = document.querySelector("#origin-text p").innerHTML;
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var stillPlaying = true;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <=9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3]/6000);
    timer[1] = Math.floor(timer[3]/100 - timer[0]*60);
    timer[2] = Math.floor(timer[3] - timer[1]*100 - timer[0]*6000);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if(textEntered == originText && stillPlaying) {
        clearInterval(interval);
        alert("You Won!");
        stillPlaying = false;
        testWrapper.style.borderColor = "#429890";
    } else {
        if(textEntered == originTextMatch && stillPlaying) {
            testWrapper.style.borderColor = "#65ccf3";
        } else {
            if(stillPlaying) {
                testWrapper.style.borderColor = "#e95d0f";
            }
        }
    }
}

// Start the timer:
function start(){
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning) {
        interval = setInterval(runTimer, 10);
        timerRunning = true;
    }
    
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    stillPlaying = true;
    timer = [0,0,0,0];
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "gray";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
