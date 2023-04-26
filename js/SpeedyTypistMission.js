const originText = document.querySelector("#origin-text p");
var originTextCheck = originText.innerHTML;
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const nextButton = document.querySelector("#next");

var timer = [5,0,0,30000];
var interval;
var timerRunning = false;
var stillPlaying = true;
var mission = 1;
var missionTime = [5,0,0,30000];
var timerTime = theTimer.innerHTML = "05:00:00";
var endMission = false;

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
    if(timer[3]>0) {
        timer[3]--;
        console.log(missionTime);
    } else {
        alert("وقت تمومه، دوباره تلاش کن");
        console.log(missionTime);
        reset();
    }

    timer[0] = Math.floor(timer[3]/6000);
    timer[1] = Math.floor(timer[3]/100 - timer[0]*60);
    timer[2] = Math.floor(timer[3] - timer[1]*100 - timer[0]*6000);
}
// game manager
function nextMission(){
    if(endMission) {
        mission++;
        console.log(mission);
        switch (mission) {
            case 2:
            {
                originText.innerHTML = "دید نوشته: فرزندتان کودن است. مدرسه ما جای کودن ها نیست. ولی مادرش نامه را برای ادیسون این گونه خواند:";
                missionTime = [5,0,0,30000];
                timerTime = theTimer.innerHTML = "05:00:00";
            }
            break;
            case 3:
            {
                originText.innerHTML = "فرزند شما نابغه است، مدرسه ما نمی تواند بیشتر از این به او آموزش دهد. شما شخصا آموزش او را به عهده بگیرید. مادر ادیسون در منزل به او آموزش می دهد و با او کار می کند.";
                missionTime = [5,0,0,30000];
                timerTime = theTimer.innerHTML = "05:00:00";
            }
            break;
            case 4:
            {
                originText.innerHTML = "ادیسون در 13 سالگی اولین اختراعش را به ثبت می رساند. مدتی پس از فوت مادر، یک روز ادیسون برای خود جشن تولد می گیرد و در آن جشن صندوق خاطرات مادرش را آورد.";
                missionTime = [5,0,0,30000];
                timerTime = theTimer.innerHTML = "05:00:00";
            }
            break;
            case 5:
            {
                originText.innerHTML = "نامه را باز کرد تا به همه بگوید که من از بچگی نابغه بودم. با دیدن اصل نامه شروع به گریه کرد و در آنجا او پی برد چطور مادرش از ادیسون کودن یک نابغه ساخت.";
                missionTime = [5,0,0,30000];
                timerTime = theTimer.innerHTML = "05:00:00";
            }
            break;
        } 
        originTextCheck = originText.innerHTML;
        interval = null;
        timerRunning = false;
        stillPlaying = true;
        timer = Array.from(missionTime);
        endMission = false;
        testArea.value = "";
        testWrapper.style.borderColor = "gray";
        nextButton.classList.remove("activate");
    }
    
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originTextCheck.substring(0, textEntered.length);

    if(textEntered == originTextCheck && stillPlaying) {
        clearInterval(interval);
        stillPlaying = false;
        
        testWrapper.style.borderColor = "#429890";
        if(mission < 5){
            endMission = true;
            nextButton.classList.add("activate");
        } else {
            alert ("تبریک میگم برنده شدی!");
        }        
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
    timer = Array.from(missionTime);
    endMission = false;
    testArea.value = "";
    theTimer.innerHTML = timerTime;
    testWrapper.style.borderColor = "gray";
    nextButton.classList.remove("activate");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
nextButton.addEventListener("click", nextMission, false);


