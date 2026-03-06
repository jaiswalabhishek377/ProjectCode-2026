// <!-- Use this HTML -->
// <!DOCTYPE html>
// <html>
// <body>
//   <h1>Browser APIs Demo</h1>
  
//   <!-- Clipboard Section -->
//   <section>
//     <h2>Clipboard API</h2>
//     <textarea id="text-to-copy" rows="3">Hello World!</textarea>
//     <button id="copy-btn">Copy</button>
//     <button id="paste-btn">Paste</button>
//     <div id="paste-result"></div>
//   </section>
  
//   <!-- Geolocation Section -->
//   <section>
//     <h2>Geolocation API</h2>
//     <button id="get-location-btn">Get My Location</button>
//     <div id="location-result"></div>
//   </section>
  
//   <!-- Speech Section -->
//   <section>
//     <h2>Web Speech API</h2>
//     <textarea id="speech-text" rows="3">Hello! This is text-to-speech.</textarea>
//     <select id="voice-select"></select>
//     <label>Rate: <input type="range" id="rate" min="0.5" max="2" step="0.1" value="1"></label>
//     <label>Pitch: <input type="range" id="pitch" min="0" max="2" step="0.1" value="1"></label>
//     <button id="speak-btn">Speak</button>
//     <button id="stop-btn">Stop</button>
//   </section>
// </body>
// </html>

// Challenge 1 — Copy to Clipboard with Feedback
// When copy button is clicked:
// - Copy textarea content to clipboard
// - Change button text to "Copied! ✓" for 2 seconds
// - Then reset to "Copy"
async function copyToClipboard() {
  const textToCopy = document.getElementById('text-to-copy').value;
    const copyBtn = document.getElementById('copy-btn');
    try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = 'Copied! ✓';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy text. Please try again.');
    }
}
document.getElementById('copy-btn').addEventListener('click', copyToClipboard); // Attach event listener to copy button


// Challenge 2 — Paste from Clipboard
// When paste button is clicked:
// - Read text from clipboard
// - Display it in #paste-result div
// - Handle permission errors gracefully
async function pasteFromClipboard() {
  const pasteResult = document.getElementById('paste-result');
    try {
        const text = await navigator.clipboard.readText();
        pasteResult.textContent = `Pasted Text: ${text}`;
    } catch (err) {
        console.error('Failed to read clipboard: ', err);
        pasteResult.textContent = 'Failed to read clipboard. Please allow permission and try again.';
    }
}
document.getElementById('paste-btn').addEventListener('click', pasteFromClipboard); // Attach event listener to paste button

// Challenge 3 — Get Location and Display
// When location button is clicked:
// - Get user's current position
// - Display: "Latitude: X, Longitude: Y"
// - Show accuracy in meters
// - Create Google Maps link
// - Handle permission denied error
function getLocation() {
  const locationResult = document.getElementById('location-result');
    if (!navigator.geolocation) {
        locationResult.textContent = 'Geolocation is not supported by your browser.';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const accuracy = position.coords.accuracy;
            locationResult.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    locationResult.textContent = 'Location access denied.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationResult.textContent = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    locationResult.textContent = 'The request to get user location timed out.';
                    break;
                default:
                    locationResult.textContent = 'An unknown error occurred.';
                    break;
            }
        }
    );
}
document.getElementById('get-location-btn').addEventListener('click', getLocation); // Attach event listener to location button

// Challenge 4 — Text-to-Speech with Controls
// - Populate voice select with available voices
// - When speak button clicked, speak the text with:
//   - Selected voice
//   - Current rate slider value
//   - Current pitch slider value
// - Stop button should cancel all speech
function populateVoiceList() {
  const voiceSelect = document.getElementById('voice-select');
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}
populateVoiceList();

// Challenge 5 — Share Location Button
// Create a "Share My Location" button that:
// - Gets current location
// - Copies coordinates to clipboard as: "Lat: X, Lng: Y"
// - Shows success message
function shareLocation() {
  const locationResult = document.getElementById('location-result');
    if (!navigator.geolocation) {
        locationResult.textContent = 'Geolocation is not supported by your browser.';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const locationText = `Lat: ${latitude}, Lng: ${longitude}`;
            try {
                await navigator.clipboard.writeText(locationText);
                locationResult.textContent = 'Location copied to clipboard!';
            } catch (err) {
                console.error('Failed to copy location: ', err);
                locationResult.textContent = 'Failed to copy location. Please try again.';
            }
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    locationResult.textContent = 'Location access denied.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationResult.textContent = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    locationResult.textContent = 'The request to get user location timed out.';
                    break;
                default:
                    locationResult.textContent = 'An unknown error occurred.';
                    break;
            }
        }
    );
}
document.getElementById('share-location-btn').addEventListener('click', shareLocation); // Attach event listener to share location button

// Challenge 6 — Reading Timer
// Create a feature that:
// - Speaks the current time every 10 seconds
// - Has start/stop buttons
// - Shows remaining time until next announcement
let timerInterval;
function startReadingTimer() {
  const timerDisplay = document.getElementById('timer-display');
    timerInterval = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const utterance = new SpeechSynthesisUtterance(`The current time is ${timeString}`);
        speechSynthesis.speak(utterance);
    }, 10000);
    timerDisplay.textContent = 'Timer started. Next announcement in 10 seconds.';
}
function stopReadingTimer() {
    clearInterval(timerInterval);
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = 'Timer stopped.';
}
document.getElementById('start-timer-btn').addEventListener('click', startReadingTimer); // Attach event listener to start timer button
document.getElementById('stop-timer-btn').addEventListener('click', stopReadingTimer); // Attach event listener to stop timer button

// Challenge 7 — Location-Based Greeting
// When user clicks "Get Greeting":
// - Get their location
// - Calculate if it's morning/afternoon/evening based on timezone
// - Speak: "Good [morning/afternoon/evening]! You are at [coordinates]"
// - Display text version too
function getGreeting() {
  const greetingResult = document.getElementById('greeting-result');
    if (!navigator.geolocation) {
        greetingResult.textContent = 'Geolocation is not supported by your browser.';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const now = new Date();
            const hours = now.getHours();
            let greeting;
            if (hours < 12) {
                greeting = 'Good morning';
            } else if (hours < 18) {
                greeting = 'Good afternoon';
            } else {
                greeting = 'Good evening';
            }
            const message = `${greeting}! You are at Latitude: ${latitude}, Longitude: ${longitude}`;
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
            greetingResult.textContent = message;
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    greetingResult.textContent = 'Location access denied.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    greetingResult.textContent = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    greetingResult.textContent = 'The request to get user location timed out.';
                    break;
                default:
                    greetingResult.textContent = 'An unknown error occurred.';
                    break;
            }
        }
    );
}
document.getElementById('get-greeting-btn').addEventListener('click', getGreeting); // Attach event listener to get greeting button







// Challenge 3 — Get Location and Display
// ✅ CORRECTED: Now includes accuracy AND Google Maps link
function getLocation() {
  const locationResult = document.getElementById('location-result');
  
  if (!navigator.geolocation) {
    locationResult.textContent = 'Geolocation is not supported by your browser.';
    return;
  }
  
  locationResult.textContent = 'Getting location...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      // ✅ Display all required info + Google Maps link
      locationResult.innerHTML = `
        <p><strong>Latitude:</strong> ${latitude.toFixed(6)}</p>
        <p><strong>Longitude:</strong> ${longitude.toFixed(6)}</p>
        <p><strong>Accuracy:</strong> ${accuracy.toFixed(2)} meters</p>
        <a href="https://www.google.com/maps?q=${latitude},${longitude}" 
           target="_blank" 
           style="color: blue; text-decoration: underline;">
          📍 View on Google Maps
        </a>
      `;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationResult.textContent = '❌ Location access denied.';
          break;
        case error.POSITION_UNAVAILABLE:
          locationResult.textContent = '❌ Location information is unavailable.';
          break;
        case error.TIMEOUT:
          locationResult.textContent = '❌ The request to get user location timed out.';
          break;
        default:
          locationResult.textContent = '❌ An unknown error occurred.';
          break;
      }
    }
  );
}

document.getElementById('get-location-btn').addEventListener('click', getLocation);


// Challenge 4 — Text-to-Speech with Controls
// ✅ CORRECTED: Now includes speak/stop functionality + proper voice loading

const voiceSelect = document.getElementById('voice-select');
const speechText = document.getElementById('speech-text');
const speakBtn = document.getElementById('speak-btn');
const stopBtn = document.getElementById('stop-btn');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');

// ✅ Populate voice list when voices are loaded
function populateVoiceList() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
}

// ✅ Voices load asynchronously, so wait for the event
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
// Also call immediately in case voices are already loaded
populateVoiceList();

// ✅ SPEAK FUNCTION (This was completely missing!)
function speak() {
  const text = speechText.value.trim();
  
  if (!text) {
    alert('Please enter some text to speak');
    return;
  }
  
  // Cancel any ongoing speech first
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // ✅ Apply selected voice
  const voices = speechSynthesis.getVoices();
  const selectedVoice = voices.find(v => v.name === voiceSelect.value);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  // ✅ Apply rate and pitch from sliders
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  
  // Optional: Add event listeners for feedback
  utterance.addEventListener('start', () => {
    speakBtn.textContent = 'Speaking...';
    speakBtn.disabled = true;
  });
  
  utterance.addEventListener('end', () => {
    speakBtn.textContent = 'Speak';
    speakBtn.disabled = false;
  });
  
  utterance.addEventListener('error', (error) => {
    console.error('Speech error:', error);
    speakBtn.textContent = 'Speak';
    speakBtn.disabled = false;
  });
  
  speechSynthesis.speak(utterance);
}

// ✅ STOP FUNCTION (This was also missing!)
function stop() {
  speechSynthesis.cancel();
  speakBtn.textContent = 'Speak';
  speakBtn.disabled = false;
}

// ✅ Attach event listeners
speakBtn.addEventListener('click', speak);
stopBtn.addEventListener('click', stop);

// Challenge 6 — Reading Timer
// ✅ CORRECTED: Now shows countdown until next announcement

let timerInterval;
let countdownInterval;
let secondsRemaining = 10;

// ✅ Add these elements to your HTML first:
// <button id="start-timer-btn">Start Timer</button>
// <button id="stop-timer-btn">Stop Timer</button>
// <div id="timer-display"></div>

function startReadingTimer() {
  const timerDisplay = document.getElementById('timer-display');
  
  // Clear any existing timers
  stopReadingTimer();
  
  // Reset countdown
  secondsRemaining = 10;
  
  // Speak immediately when started
  speakCurrentTime();
  timerDisplay.textContent = 'Next announcement in 10 seconds';
  
  // ✅ Countdown timer (updates every second)
  countdownInterval = setInterval(() => {
    secondsRemaining--;
    
    if (secondsRemaining > 0) {
      timerDisplay.textContent = `Next announcement in ${secondsRemaining} second${secondsRemaining === 1 ? '' : 's'}`;
    }
  }, 1000);
  
  // ✅ Main timer (speaks every 10 seconds)
  timerInterval = setInterval(() => {
    speakCurrentTime();
    secondsRemaining = 10; // Reset countdown
  }, 10000);
}

function speakCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Format time nicely for speech
  const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
  const utterance = new SpeechSynthesisUtterance(`The current time is ${timeString}`);
  speechSynthesis.speak(utterance);
}

function stopReadingTimer() {
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
  
  const timerDisplay = document.getElementById('timer-display');
  timerDisplay.textContent = 'Timer stopped.';
  
  timerInterval = null;
  countdownInterval = null;
}

// ✅ Attach event listeners
document.getElementById('start-timer-btn').addEventListener('click', startReadingTimer);
document.getElementById('stop-timer-btn').addEventListener('click', stopReadingTimer);