// DOM Elements
const defaultThemeBtn = document.getElementById('defaultTheme');
const darkThemeBtn = document.getElementById('darkTheme');
const greenThemeBtn = document.getElementById('greenTheme');
const purpleThemeBtn = document.getElementById('purpleTheme');
const transitionSpeedSlider = document.getElementById('transitionSpeed');
const notification = document.getElementById('notification');
const cards = document.querySelectorAll('.card');

// User preferences object
let userPreferences = {
    theme: 'default',
    transitionSpeed: 3
};

// Load saved preferences from localStorage
function loadPreferences() {
    const savedPreferences = localStorage.getItem('themePreferences');
    
    if (savedPreferences) {
        try {
            userPreferences = JSON.parse(savedPreferences);
            applyPreferences();
            showNotification('Preferences loaded!');
        } catch (error) {
            console.error('Error parsing saved preferences:', error);
        }
    }
}

// Save preferences to localStorage
function savePreferences() {
    localStorage.setItem('themePreferences', JSON.stringify(userPreferences));
    showNotification('Preferences saved!');
}

// Apply current preferences to the page
function applyPreferences() {
    // Apply theme
    document.body.className = '';
    if (userPreferences.theme !== 'default') {
        document.body.classList.add(`${userPreferences.theme}-theme`);
    }
    
    // Apply transition speed
    const speed = userPreferences.transitionSpeed / 10;
    document.documentElement.style.setProperty('--transition-speed', `${speed}s`);
    
    // Update slider position
    transitionSpeedSlider.value = userPreferences.transitionSpeed;
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add animation to an element
function addAnimation(element, animationClass) {
    element.classList.add(animationClass);
    
    // Remove animation class after it completes to allow it to be triggered again
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    }, { once: true });
}

// Event Listeners
defaultThemeBtn.addEventListener('click', () => {
    userPreferences.theme = 'default';
    applyPreferences();
    savePreferences();
    addAnimation(defaultThemeBtn, 'pulse');
});

darkThemeBtn.addEventListener('click', () => {
    userPreferences.theme = 'dark';
    applyPreferences();
    savePreferences();
    addAnimation(darkThemeBtn, 'pulse');
});

greenThemeBtn.addEventListener('click', () => {
    userPreferences.theme = 'green';
    applyPreferences();
    savePreferences();
    addAnimation(greenThemeBtn, 'pulse');
});

purpleThemeBtn.addEventListener('click', () => {
    userPreferences.theme = 'purple';
    applyPreferences();
    savePreferences();
    addAnimation(purpleThemeBtn, 'pulse');
});

transitionSpeedSlider.addEventListener('input', () => {
    userPreferences.transitionSpeed = parseInt(transitionSpeedSlider.value);
    applyPreferences();
});

transitionSpeedSlider.addEventListener('change', () => {
    savePreferences();
});

// Add card click animations
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Find the card image and apply spin animation
        const cardImage = card.querySelector('.card-image');
        addAnimation(cardImage, 'spin');
    });
});

// Initialize the page with saved preferences
document.addEventListener('DOMContentLoaded', loadPreferences);