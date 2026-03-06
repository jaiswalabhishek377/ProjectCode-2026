PC49 — Clipboard API, Geolocation & Web Speech
These are 3 powerful browser APIs that make your apps feel native! Let's unlock clipboard access, location tracking, and text-to-speech! 💪

1. Clipboard API — Copy to Clipboard
The Modern Way (Async)
javascript// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy:', error);
  }
}

// Usage
copyToClipboard('Hello World!');
Read from Clipboard
javascriptasync function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted:', text);
    return text;
  } catch (error) {
    console.error('Failed to read clipboard:', error);
  }
}

// Usage
const clipboardContent = await pasteFromClipboard();
Permissions
javascript// Check clipboard permission
async function checkClipboardPermission() {
  try {
    const result = await navigator.permissions.query({ name: 'clipboard-read' });
    console.log('Clipboard permission:', result.state);
    // "granted", "denied", or "prompt"
  } catch (error) {
    console.error('Permissions API not supported');
  }
}
Real-World Pattern — Copy Button
javascriptconst copyBtn = document.querySelector('#copy-btn');
const codeBlock = document.querySelector('#code');

copyBtn.addEventListener('click', async () => {
  const code = codeBlock.textContent;
  
  try {
    await navigator.clipboard.writeText(code);
    
    // Show feedback
    copyBtn.textContent = 'Copied! ✓';
    copyBtn.classList.add('success');
    
    // Reset after 2 seconds
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('success');
    }, 2000);
    
  } catch (error) {
    copyBtn.textContent = 'Failed!';
    copyBtn.classList.add('error');
  }
});
Old Way (Fallback for Older Browsers)
javascriptfunction copyToClipboardOld(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const success = document.execCommand('copy');
    console.log(success ? 'Copied!' : 'Failed!');
  } catch (error) {
    console.error('Copy failed:', error);
  } finally {
    document.body.removeChild(textarea);
  }
}

// Usage
copyToClipboardOld('Hello World!');

2. Geolocation API — Get User's Location
Get Current Position (One-Time)
javascriptfunction getLocation() {
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      
      console.log(`Lat: ${latitude}, Lng: ${longitude}`);
      console.log(`Accuracy: ${accuracy} meters`);
      
      // Other available properties:
      console.log('Altitude:', position.coords.altitude);
      console.log('Heading:', position.coords.heading);
      console.log('Speed:', position.coords.speed);
    },
    
    // Error callback
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.error('User denied location');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error('Location unavailable');
          break;
        case error.TIMEOUT:
          console.error('Request timeout');
          break;
      }
    },
    
    // Options
    {
      enableHighAccuracy: true,  // Use GPS if available
      timeout: 5000,             // Wait max 5 seconds
      maximumAge: 0              // Don't use cached position
    }
  );
}

// Usage
getLocation();
Watch Position (Continuous Tracking)
javascriptlet watchId;

function startTracking() {
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log('Position updated:');
      console.log(`Lat: ${position.coords.latitude}`);
      console.log(`Lng: ${position.coords.longitude}`);
      
      // Update map or UI
      updateMapMarker(position.coords);
    },
    (error) => {
      console.error('Tracking error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function stopTracking() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    console.log('Tracking stopped');
  }
}

// Usage
startTracking();
// Later: stopTracking();
Real-World Pattern — Show User Location on Map
javascriptasync function showMyLocation() {
  const statusDiv = document.querySelector('#status');
  const mapDiv = document.querySelector('#map');
  
  if (!navigator.geolocation) {
    statusDiv.textContent = 'Geolocation not supported';
    return;
  }
  
  statusDiv.textContent = 'Getting location...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      statusDiv.textContent = 'Location found!';
      
      // Display coordinates
      mapDiv.innerHTML = `
        <p>Latitude: ${latitude.toFixed(4)}</p>
        <p>Longitude: ${longitude.toFixed(4)}</p>
        <a href="https://www.google.com/maps?q=${latitude},${longitude}" 
           target="_blank">
          View on Google Maps
        </a>
      `;
    },
    (error) => {
      statusDiv.textContent = `Error: ${error.message}`;
    }
  );
}

// Usage
document.querySelector('#locate-btn').addEventListener('click', showMyLocation);
Calculate Distance Between Two Points
javascriptfunction calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // in kilometers
}

// Usage
const userLat = 40.7128;
const userLon = -74.0060;
const storeLat = 40.7580;
const storeLon = -73.9855;

const distance = calculateDistance(userLat, userLon, storeLat, storeLon);
console.log(`Distance: ${distance.toFixed(2)} km`);

3. Web Speech API — Text to Speech
Basic Speech Synthesis
javascriptfunction speak(text) {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Usage
speak('Hello World!');
speak('This is amazing!');
Customize Voice Properties
javascriptfunction speakCustom(text, options = {}) {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set properties
  utterance.rate = options.rate || 1;       // 0.1 to 10 (1 = normal)
  utterance.pitch = options.pitch || 1;     // 0 to 2 (1 = normal)
  utterance.volume = options.volume || 1;   // 0 to 1
  utterance.lang = options.lang || 'en-US'; // Language
  
  speechSynthesis.speak(utterance);
}

// Usage
speakCustom('This is fast!', { rate: 2 });
speakCustom('This is slow...', { rate: 0.5 });
speakCustom('This is high pitched!', { pitch: 2 });
speakCustom('Bonjour!', { lang: 'fr-FR' });
List Available Voices
javascriptfunction listVoices() {
  const voices = speechSynthesis.getVoices();
  
  voices.forEach((voice, index) => {
    console.log(`${index + 1}. ${voice.name}`);
    console.log(`   Language: ${voice.lang}`);
    console.log(`   Default: ${voice.default}`);
    console.log('---');
  });
  
  return voices;
}

// ⚠️ Voices load asynchronously!
speechSynthesis.addEventListener('voiceschanged', () => {
  const voices = listVoices();
  console.log(`Found ${voices.length} voices`);
});
Use Specific Voice
javascriptfunction speakWithVoice(text, voiceName) {
  const voices = speechSynthesis.getVoices();
  const selectedVoice = voices.find(voice => voice.name === voiceName);
  
  if (!selectedVoice) {
    console.error('Voice not found');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  
  speechSynthesis.speak(utterance);
}

// Usage
speakWithVoice('Hello!', 'Google US English');
Control Playback
javascriptfunction controlSpeech() {
  const utterance = new SpeechSynthesisUtterance('This is a long sentence that will be spoken.');
  
  // Events
  utterance.addEventListener('start', () => {
    console.log('Speech started');
  });
  
  utterance.addEventListener('end', () => {
    console.log('Speech finished');
  });
  
  utterance.addEventListener('pause', () => {
    console.log('Speech paused');
  });
  
  utterance.addEventListener('resume', () => {
    console.log('Speech resumed');
  });
  
  utterance.addEventListener('error', (error) => {
    console.error('Speech error:', error);
  });
  
  // Start speaking
  speechSynthesis.speak(utterance);
}

// Control methods
speechSynthesis.pause();   // Pause
speechSynthesis.resume();  // Resume
speechSynthesis.cancel();  // Stop all
Real-World Pattern — Text-to-Speech Widget
javascriptconst textInput = document.querySelector('#text');
const speakBtn = document.querySelector('#speak-btn');
const pauseBtn = document.querySelector('#pause-btn');
const stopBtn = document.querySelector('#stop-btn');
const rateInput = document.querySelector('#rate');
const pitchInput = document.querySelector('#pitch');
const voiceSelect = document.querySelector('#voice-select');

// Populate voice dropdown
function populateVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Speak button
speakBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  
  if (!text) {
    alert('Please enter some text');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply settings
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  
  // Set selected voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(v => v.name === voiceSelect.value);
  
  speechSynthesis.speak(utterance);
});

// Pause button
pauseBtn.addEventListener('click', () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  } else {
    speechSynthesis.resume();
  }
});

// Stop button
stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
});