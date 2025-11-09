'use strict';

(function() {
    // --- Constants ---
    const ANIMATION_INTERVAL = 1500; // in milliseconds
    const MAX_INPUT_LENGTH = 500;
    const FONTS = [
        'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Georgia', 'Times New Roman', 'Courier New'
    ];
    const COLORS_LIGHT = ['#D98880', '#C39BD3', '#7FB3D5', '#76D7C4', '#F7DC6F', '#E59866'];
    const COLORS_DARK = ['#AEB6BF', '#AED6F1', '#A9DFBF', '#FAD7A0', '#EDBB99', '#D2B4DE'];

    const PREDEFINED_PHRASES = [
        { phrase: 'A smell of petroleum prevails throughout.', source: 'F. Scott Fitzgerald, The Great Gatsby' },
        { phrase: 'All happy families are alike; each unhappy family is unhappy in its own way.', source: 'Leo Tolstoy, Anna Karenina' },
        { phrase: 'It was a bright cold day in April, and the clocks were striking thirteen.', source: 'George Orwell, 1984' },
        { phrase: 'The sky above the port was the color of television, tuned to a dead channel.', source: 'William Gibson, Neuromancer' },
        { phrase: 'Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.', source: 'Gabriel García Márquez, One Hundred Years of Solitude' }
    ];

    // --- DOM Elements ---
    const initialScreen = document.getElementById('initial-screen');
    const mainAnimation = document.getElementById('main-animation');
    const phraseInput = document.getElementById('phrase-input');
    const goButton = document.getElementById('go-button');
    const phraseList = document.getElementById('phrase-list');
    const themeToggle = document.getElementById('theme-toggle');

    let animationIntervalId = null;

    // --- Functions ---

    /**
     * Initializes the application.
     */
    function init() {
        populatePredefinedPhrases();
        setupEventListeners();
        setRandomPhrase();
    }

    /**
     * Populates the list of predefined phrases.
     */
    function populatePredefinedPhrases() {
        PREDEFINED_PHRASES.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `"${item.phrase.substring(0, 30)}..."`;
            li.title = `${item.phrase} - ${item.source}`;
            li.addEventListener('click', () => {
                phraseInput.value = item.phrase;
            });
            phraseList.appendChild(li);
        });
    }
    
    /**
     * Sets a random predefined phrase in the input field.
     */
    function setRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * PREDEFINED_PHRASES.length);
        phraseInput.value = PREDEFINED_PHRASES[randomIndex].phrase;
    }

    /**
     * Sets up all the event listeners.
     */
    function setupEventListeners() {
        goButton.addEventListener('click', startAnimation);
        phraseInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                startAnimation();
            }
        });
        themeToggle.addEventListener('click', toggleTheme);
    }

    /**
     * Starts the main letter animation.
     */
    function startAnimation() {
        const phrase = phraseInput.value.trim();
        if (phrase.length === 0 || phrase.length > MAX_INPUT_LENGTH) {
            alert(`Please enter a phrase between 1 and ${MAX_INPUT_LENGTH} characters.`);
            return;
        }

        initialScreen.classList.add('hidden');
        mainAnimation.classList.remove('hidden');

        let letterIndex = 0;
        const displayNextLetter = () => {
            if (letterIndex >= phrase.length) {
                letterIndex = 0; // Loop back to the beginning
            }
            if(phrase[letterIndex].trim() !== ''){
                createAndAnimateLetter(phrase[letterIndex]);
            }
            letterIndex++;
        };
        
        displayNextLetter();
        animationIntervalId = setInterval(displayNextLetter, ANIMATION_INTERVAL);
    }

    /**
     * Creates and animates a single letter.
     * @param {string} char The character to animate.
     */
    function createAndAnimateLetter(char) {
        const letter = document.createElement('div');
        letter.className = 'letter';
        letter.textContent = char;

        const isDarkMode = document.body.classList.contains('dark-theme');
        const colors = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

        letter.style.fontFamily = FONTS[Math.floor(Math.random() * FONTS.length)];
        letter.style.color = colors[Math.floor(Math.random() * colors.length)];
        letter.style.fontSize = `${Math.random() * 8 + 2}rem`;
        letter.style.fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
        letter.style.left = `${Math.random() * 90}vw`;
        letter.style.top = `${Math.random() * 90}vh`;
        letter.style.transform = `rotate(${Math.random() * 90 - 45}deg) scale(${Math.random() * 0.5 + 0.8})`;

        mainAnimation.appendChild(letter);
        
        setTimeout(() => {
            letter.style.transform += ` scale(1.2)`;
            letter.style.opacity = '0';
        }, ANIMATION_INTERVAL / 2);

        setTimeout(() => {
            mainAnimation.removeChild(letter);
        }, ANIMATION_INTERVAL);
    }

    /**
     * Toggles between light and dark themes.
     */
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }

    // --- Start the application ---
    init();

})();
