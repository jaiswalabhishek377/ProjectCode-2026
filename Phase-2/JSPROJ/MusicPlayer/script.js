let progress = document.getElementById('progress');
let audio = document.getElementById('audio');
let playBtn = document.getElementById('play');
let current = document.getElementById('current');
let duration = document.getElementById('duration');

function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

audio.onloadedmetadata = function() {
    duration.textContent = formatTime(audio.duration);
}

function playpause() {
    if(audio.paused) {
        audio.play();
        playBtn.innerHTML = '⏸';
    } else {
        audio.pause();
        playBtn.innerHTML = '▶';
    }
}

audio.ontimeupdate = function() {
    progress.value = (audio.currentTime / audio.duration) * 100;
    current.textContent = formatTime(audio.currentTime);
}

progress.onchange = function() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

document.getElementById('next').onclick = function() {
    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
}

document.getElementById('prev').onclick = function() {
    audio.currentTime = Math.max(audio.currentTime - 5, 0);
}
