// Form Validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validations = {
    name: {
        validate: (value) => value.trim().length > 0,
        message: 'Name is required'
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Valid email is required'
    },
    password: {
        validate: (value) => value.length >= 6,
        message: 'Password must be at least 6 characters'
    },
    message: {
        validate: (value) => value.trim().length > 0,
        message: 'Message is required'
    }
};

// Validate individual field
function validateField(fieldName, value) {
    const validation = validations[fieldName];
    if (!validation) return true;
    return validation.validate(value);
}

// Show error for a field
function showError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    const validation = validations[fieldName];
    
    field.classList.add('error');
    errorElement.textContent = validation.message;
    errorElement.classList.add('show');
}

// Hide error for a field
function hideError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    field.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Real-time validation on input
nameInput.addEventListener('blur', () => {
    if (validateField('name', nameInput.value)) {
        hideError('name');
    } else {
        showError('name');
    }
});

emailInput.addEventListener('blur', () => {
    if (validateField('email', emailInput.value)) {
        hideError('email');
    } else {
        showError('email');
    }
});

passwordInput.addEventListener('blur', () => {
    if (validateField('password', passwordInput.value)) {
        hideError('password');
    } else {
        showError('password');
    }
});

messageInput.addEventListener('blur', () => {
    if (validateField('message', messageInput.value)) {
        hideError('message');
    } else {
        showError('message');
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    Object.keys(validations).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(fieldName, field.value)) {
            showError(fieldName);
            isValid = false;
        } else {
            hideError(fieldName);
        }
    });
    
    // If all fields are valid, show success message
    if (isValid) {
        successMessage.textContent = 'Form submitted successfully!';
        successMessage.classList.add('show');
        form.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});

// Password toggle
const eyeicon = document.getElementById('eye');
eyeicon.onclick = function() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeicon.src="eye-open.png";
    } else {
        passwordInput.type = "password";
        eyeicon.src="eye-close.png";
    }
}

// Dark mode toggle
const bgchange = document.getElementById('bg-change');
bgchange.onclick = function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        bgchange.src = "sun.png";
    } else {
        bgchange.src = "moon.png";
    }
}

// Countdown timer
const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

var countDownDate= new Date("May 16, 2026 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if(distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);
