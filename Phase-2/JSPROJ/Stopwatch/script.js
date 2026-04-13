const playBtn= document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let [seconds, minutes, hours] = [0, 0, 0]; // global Destructuring assignment to initialize seconds, minutes, and hours to 0 
let displayTime=document.getElementById('displayTime');
let timer=null;

function stopwatch(){
    seconds++;
    if(seconds==60){
        seconds=0;
        minutes++;
        if(minutes==60){
            minutes=0;
            hours++;
        }
    }
    displayTime.textContent = 
    `${hours.toString().padStart(2, '0')}:
    ${minutes.toString().padStart(2, '0')}:
    ${seconds.toString().padStart(2, '0')}`;
}

function watchstart(){
    if(timer!==null){
        clearInterval(timer);
    }
    timer= setInterval(stopwatch, 1000);
}

function watchstop(){
    clearInterval(timer); // clearInterval  just stops the timer from running further the value of timer is not changed to null so that we can resume the timer from where it was stopped
}
function watchreset(){
    clearInterval(timer);
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.textContent = '00:00:00';
}