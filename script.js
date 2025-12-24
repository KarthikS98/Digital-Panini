// JavaScript file for Digital Pāṇini
// Interactive functionality for Sandhi Playground and Pronunciation Helper

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the Apply Sandhi button
    const applySandhiButton = document.getElementById('apply-sandhi');
    
    // Check if button exists (only on sandhi.html page)
    if (applySandhiButton) {
        applySandhiButton.addEventListener('click', applySandhi);
    }

    // Initialize Pronunciation Helper (only on learn.html page)
    const soundButtons = document.querySelectorAll('.sound-btn');
    if (soundButtons.length > 0) {
        soundButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sound = this.getAttribute('data-sound');
                displayPronunciation(sound);
            });
        });
    }
});

// Vowel Sandhi rules mapping with Pāṇini sūtras
const vowelSandhiRules = [
    { 
        ending: 'a', 
        starting: 'i', 
        result: 'e', 
        name: 'a + i → e',
        sutra: 'इको यण् अचि (iko yaṇ aci)',
        sutraRef: 'Aṣṭādhyāyī 6.1.77',
        meaning: 'When "a" meets "i", they combine to form "e" through guna substitution'
    },
    { 
        ending: 'a', 
        starting: 'u', 
        result: 'o', 
        name: 'a + u → o',
        sutra: 'इको यण् अचि (iko yaṇ aci)',
        sutraRef: 'Aṣṭādhyāyī 6.1.77',
        meaning: 'When "a" meets "u", they combine to form "o" through guna substitution'
    },
    { 
        ending: 'a', 
        starting: 'a', 
        result: 'ā', 
        name: 'a + a → ā',
        sutra: 'अकः सवर्णे दीर्घः (akaḥ savarṇe dīrghaḥ)',
        sutraRef: 'Aṣṭādhyāyī 6.1.101',
        meaning: 'When two similar short vowels meet, they combine into a single long vowel'
    },
    { 
        ending: 'ā', 
        starting: 'i', 
        result: 'ai', 
        name: 'ā + i → ai',
        sutra: 'वृद्धिरेचि (vṛddhireci)',
        sutraRef: 'Aṣṭādhyāyī 6.1.88',
        meaning: 'When "ā" meets "i", they combine to form "ai" through vriddhi substitution'
    },
    { 
        ending: 'ā', 
        starting: 'u', 
        result: 'au', 
        name: 'ā + u → au',
        sutra: 'वृद्धिरेचि (vṛddhireci)',
        sutraRef: 'Aṣṭādhyāyī 6.1.88',
        meaning: 'When "ā" meets "u", they combine to form "au" through vriddhi substitution'
    },
    { 
        ending: 'i', 
        starting: 'i', 
        result: 'ī', 
        name: 'i + i → ī',
        sutra: 'अकः सवर्णे दीर्घः (akaḥ savarṇe dīrghaḥ)',
        sutraRef: 'Aṣṭādhyāyī 6.1.101',
        meaning: 'When two similar short vowels meet, they combine into a single long vowel'
    },
    { 
        ending: 'u', 
        starting: 'u', 
        result: 'ū', 
        name: 'u + u → ū',
        sutra: 'अकः सवर्णे दीर्घः (akaḥ savarṇe dīrghaḥ)',
        sutraRef: 'Aṣṭādhyāyī 6.1.101',
        meaning: 'When two similar short vowels meet, they combine into a single long vowel'
    }
];

function applySandhi() {
    // Get input values
    const firstWord = document.getElementById('first-word').value.trim();
    const secondWord = document.getElementById('second-word').value.trim();
    const resultDiv = document.getElementById('sandhi-result');
    
    // Check if inputs are not empty
    if (!firstWord || !secondWord) {
        resultDiv.innerHTML = '<span style="color: #e53e3e;">Please enter both words.</span>';
        return;
    }
    
    // Get the last character of first word and first character of second word
    const lastChar = firstWord.charAt(firstWord.length - 1);
    const firstChar = secondWord.charAt(0);
    
    // Check each vowel Sandhi rule
    let ruleApplied = false;
    
    for (let rule of vowelSandhiRules) {
        if (lastChar === rule.ending && firstChar === rule.starting) {
            // Apply the rule
            const firstPart = firstWord.slice(0, -1);  // Remove last character
            const secondPart = secondWord.slice(1);     // Remove first character
            const combinedWord = firstPart + rule.result + secondPart;
            
            // Display result
            const sutraNumber = rule.sutraRef.match(/\d+\.\d+\.\d+/);
            const sutraPath = sutraNumber ? sutraNumber[0].replace(/\./g, '/') : '';
            
            resultDiv.innerHTML = `
                <div style="font-size: 1.3rem; color: #654321; font-weight: 700; margin-bottom: 15px;">
                    ${combinedWord}
                </div>
                <div class="rule-explanation">
                    ✓ Applied Rule: ${rule.name} (Vowel Sandhi)
                </div>
                <div class="sutra-reference">
                    <h4>Pāṇini Sūtra: ${rule.sutra}</h4>
                    <div class="sutra-text">${rule.sutraRef}</div>
                    <p>${rule.meaning}</p>
                    ${sutraPath ? `<a href="ashtadhyayi-detailed.html?sutra=${sutraPath}&from=sandhi" class="learn-more-link">Learn more about this sūtra →</a>` : ''}
                </div>
            `;
            
            ruleApplied = true;
            break; // Stop checking after first matching rule
        }
    }
    
    // If no rule was applied
    if (!ruleApplied) {
        resultDiv.innerHTML = `
            <div style="color: #8B4513; line-height: 1.6;">
                No vowel Sandhi rule applies to these words. <br>
                <small style="font-size: 0.85rem; color: #654321; margin-top: 8px; display: block;">
                    Supported rules: a+i→e, a+u→o, a+a→ā, ā+i→ai, ā+u→au, i+i→ī, u+u→ū
                </small>
            </div>
        `;
    }
}

// ========================================
// CAMB.AI TTS INTEGRATION
// ========================================

const CAMB_API_KEY = 'f23eefb6-652b-4a91-9d4b-c21604487595';
const CAMB_API_BASE = 'https://client.camb.ai/apis';
const HINDI_LANGUAGE_ID = 81; // Hindi (India) - closest to Sanskrit

// Cache for voice discovery
let cambVoiceCache = null;

// Discover best available voice from CAMB.AI
async function discoverHindiVoice() {
    if (cambVoiceCache) {
        return cambVoiceCache;
    }

    try {
        const response = await fetch(`${CAMB_API_BASE}/list-voices`, {
            method: 'GET',
            headers: {
                'x-api-key': CAMB_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch voices: ${response.status}`);
        }

        const voices = await response.json();
        console.log(`Found ${voices.length} total voices`);

        if (voices.length === 0) {
            throw new Error('No voices available');
        }

        // Log available voices for debugging
        console.log('Available voices:', voices.map(v => `${v.voice_name} (ID: ${v.id}, Lang: ${v.language}, Age: ${v.age})`));

        // Try to find Hindi voices first (language ID 81)
        let selectedVoice = voices.find(v => v.language === HINDI_LANGUAGE_ID);
        let voiceType = 'Hindi';

        // If no Hindi, try Indian English (language ID 38)
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.language === 38);
            voiceType = 'Indian English';
        }

        // If still none, just use the first available voice
        if (!selectedVoice) {
            selectedVoice = voices[0];
            voiceType = `${selectedVoice.voice_name} (available voice)`;
            console.warn('No Hindi or Indian English voices found. Using first available voice.');
        }

        cambVoiceCache = selectedVoice;
        console.log(`Selected ${voiceType} voice:`, selectedVoice.voice_name, `(ID: ${selectedVoice.id}, Lang: ${selectedVoice.language}, Age: ${selectedVoice.age || 'N/A'})`);
        return selectedVoice;

    } catch (error) {
        console.error('Error discovering voice:', error);
        throw error;
    }
}

// Generate TTS using CAMB.AI
async function generateCambAISpeech(devanagariText) {
    try {
        // Step 1: Discover voice
        const voice = await discoverHindiVoice();

        // Step 2: Submit TTS request
        const ttsPayload = {
            text: devanagariText,
            voice_id: voice.id,
            language: HINDI_LANGUAGE_ID,
            gender: voice.gender || 1,
            age: voice.age || 30
        };

        console.log('Submitting TTS request:', ttsPayload);

        const submitResponse = await fetch(`${CAMB_API_BASE}/tts`, {
            method: 'POST',
            headers: {
                'x-api-key': CAMB_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ttsPayload)
        });

        if (!submitResponse.ok) {
            const errorText = await submitResponse.text();
            throw new Error(`TTS submission failed: ${submitResponse.status} - ${errorText}`);
        }

        const submitData = await submitResponse.json();
        const taskId = submitData.task_id;
        console.log('TTS task created:', taskId);

        // Step 3: Poll for completion
        const audioUrl = await pollTTSStatus(taskId);
        return audioUrl;

    } catch (error) {
        console.error('Error generating CAMB.AI speech:', error);
        throw error;
    }
}

// Poll TTS task status
async function pollTTSStatus(taskId, maxAttempts = 30) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const statusResponse = await fetch(`${CAMB_API_BASE}/tts/${taskId}`, {
                method: 'GET',
                headers: {
                    'x-api-key': CAMB_API_KEY
                }
            });

            if (!statusResponse.ok) {
                throw new Error(`Status check failed: ${statusResponse.status}`);
            }

            const statusData = await statusResponse.json();
            console.log(`Poll attempt ${attempt + 1}: Status = ${statusData.status}`);

            if (statusData.status === 'SUCCESS') {
                const runId = statusData.run_id;
                console.log('TTS completed! Run ID:', runId);
                
                // Return the download URL
                const audioUrl = `${CAMB_API_BASE}/tts-result/${runId}`;
                return audioUrl;
            } else if (statusData.status === 'FAILED') {
                throw new Error('TTS generation failed');
            }

            // Wait 2 seconds before next poll
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.error(`Polling error on attempt ${attempt + 1}:`, error);
            if (attempt === maxAttempts - 1) throw error;
        }
    }

    throw new Error('TTS generation timed out');
}

// Play CAMB.AI generated audio
async function playCambAIAudio(devanagariText, buttonElement) {
    const originalButtonText = buttonElement.innerHTML;
    
    try {
        // Update button to show loading
        buttonElement.disabled = true;
        buttonElement.innerHTML = '⏳ Generating speech...';

        // Generate audio
        const audioUrl = await generateCambAISpeech(devanagariText);

        // Update button
        buttonElement.innerHTML = '▶️ Playing...';

        // Create and play audio
        const audio = new Audio();
        audio.src = audioUrl;
        
        // Add headers for authentication
        const audioBlob = await fetch(audioUrl, {
            headers: {
                'x-api-key': CAMB_API_KEY
            }
        }).then(r => r.blob());
        
        const blobUrl = URL.createObjectURL(audioBlob);
        audio.src = blobUrl;

        audio.onended = () => {
            buttonElement.innerHTML = originalButtonText;
            buttonElement.disabled = false;
            URL.revokeObjectURL(blobUrl);
        };

        audio.onerror = (error) => {
            console.error('Audio playback error:', error);
            buttonElement.innerHTML = originalButtonText;
            buttonElement.disabled = false;
            alert('Error playing audio. Please try again.');
        };

        await audio.play();

    } catch (error) {
        console.error('Error in CAMB.AI audio generation:', error);
        buttonElement.innerHTML = originalButtonText;
        buttonElement.disabled = false;
        
        // Provide user feedback
        const audioNote = document.querySelector('.audio-note');
        if (audioNote) {
            audioNote.innerHTML = `❌ Error generating speech: ${error.message}. Using browser fallback...`;
            audioNote.style.color = '#e53e3e';
        }
        
        // Fallback to browser speech
        speakSound(devanagariText, devanagariText);
    }
}

// ========================================
// BROWSER SPEECH SYNTHESIS (FALLBACK)
// ========================================

// Pronunciation data for Sanskrit sounds
const pronunciationData = {
    'ta': {
        devanagari: 'त',
        transliteration: 'ta',
        articulation: 'Dental',
        tip: 'Touch the tip of your tongue to the back of your upper front teeth, like the "t" in "thin".',
        audioText: 'त'
    },
    'ṭa': {
        devanagari: 'ट',
        transliteration: 'ṭa',
        articulation: 'Retroflex',
        tip: 'Curl your tongue back and touch the roof of your mouth (hard palate). This creates a deeper, more resonant sound.',
        audioText: 'ट'
    },
    'da': {
        devanagari: 'द',
        transliteration: 'da',
        articulation: 'Dental',
        tip: 'Touch the tip of your tongue to the back of your upper front teeth, like the "d" in "they".',
        audioText: 'द'
    },
    'ḍa': {
        devanagari: 'ड',
        transliteration: 'ḍa',
        articulation: 'Retroflex',
        tip: 'Curl your tongue back and touch the roof of your mouth. Similar to ṭa but with a voiced sound.',
        audioText: 'ड'
    },
    'sa': {
        devanagari: 'स',
        transliteration: 'sa',
        articulation: 'Dental',
        tip: 'Place your tongue near your upper front teeth, like the "s" in "sun". Air flows through a narrow gap.',
        audioText: 'स'
    },
    'śa': {
        devanagari: 'श',
        transliteration: 'śa',
        articulation: 'Palatal',
        tip: 'Raise the middle of your tongue toward the hard palate (roof of mouth), like the "sh" in "shape".',
        audioText: 'श'
    },
    'ṣa': {
        devanagari: 'ष',
        transliteration: 'ṣa',
        articulation: 'Retroflex',
        tip: 'Curl your tongue back toward the roof of your mouth. Similar to श but with a retroflex position.',
        audioText: 'ष'
    },
    'na': {
        devanagari: 'न',
        transliteration: 'na',
        articulation: 'Dental',
        tip: 'Touch the tip of your tongue to the back of your upper front teeth, like the "n" in "nose".',
        audioText: 'न'
    },
    'ṇa': {
        devanagari: 'ण',
        transliteration: 'ṇa',
        articulation: 'Retroflex',
        tip: 'Curl your tongue back and touch the roof of your mouth. The nasal sound resonates deeper.',
        audioText: 'ण'
    }
};

// Display pronunciation information
function displayPronunciation(sound) {
    const data = pronunciationData[sound];
    const displayDiv = document.getElementById('pronunciation-display');
    
    if (!data) {
        displayDiv.innerHTML = '<p>Sound data not found.</p>';
        return;
    }
    
    displayDiv.innerHTML = `
        <div class="pronunciation-card">
            <div class="sound-header">
                <div class="sound-char">${data.devanagari}</div>
                <div class="sound-trans">${data.transliteration}</div>
            </div>
            
            <div class="pronunciation-details">
                <div class="detail-row">
                    <span class="detail-label">Place of Articulation:</span>
                    <span class="detail-value">${data.articulation}</span>
                </div>
                
                <div class="detail-row tip-section">
                    <span class="detail-label">Pronunciation Tip:</span>
                    <p class="tip-text">${data.tip}</p>
                </div>
            </div>
            
            <div class="audio-controls">
                <button class="audio-btn primary-audio" id="camb-audio-btn" onclick="handleCambAudioClick('${data.audioText}', this)">
                    🎯 Hear Accurate Pronunciation (API)
                </button>
                <button class="audio-btn secondary-audio" onclick="speakSound('${data.audioText}', '${data.transliteration}')">
                    🔊 Browser Pronunciation (Fallback)
                </button>
            </div>
            <p class="audio-note" id="audio-feedback">
                Click the API button for accurate Hindi/Sanskrit pronunciation using professional TTS.
            </p>
        </div>
    `;
}

// Handle CAMB.AI audio button click
function handleCambAudioClick(devanagariText, buttonElement) {
    playCambAIAudio(devanagariText, buttonElement);
}

// Use Web Speech API to approximate pronunciation
let voicesLoaded = false;
let availableVoices = [];

// Load voices when available
if ('speechSynthesis' in window) {
    // Initial load
    availableVoices = window.speechSynthesis.getVoices();
    
    // Voices load asynchronously, so we need to listen for the event
    window.speechSynthesis.onvoiceschanged = function() {
        availableVoices = window.speechSynthesis.getVoices();
        voicesLoaded = true;
        console.log('Voices loaded:', availableVoices.length);
    };
}

function speakSound(audioText, transliteration) {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
        alert('Sorry, your browser does not support speech synthesis.');
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Get available voices if not already loaded
    if (!voicesLoaded || availableVoices.length === 0) {
        availableVoices = window.speechSynthesis.getVoices();
    }
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(audioText);
    
    // Try to find the best voice
    let selectedVoice = null;
    let voiceType = 'default';
    
    // Priority 1: Hindi voice
    selectedVoice = availableVoices.find(voice => 
        voice.lang.startsWith('hi') || voice.lang === 'hi-IN'
    );
    if (selectedVoice) voiceType = 'Hindi';
    
    // Priority 2: Indian English voice
    if (!selectedVoice) {
        selectedVoice = availableVoices.find(voice => 
            voice.lang === 'en-IN'
        );
        if (selectedVoice) voiceType = 'Indian English';
    }
    
    // Priority 3: Any voice with 'Hindi' in name
    if (!selectedVoice) {
        selectedVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('hindi')
        );
        if (selectedVoice) voiceType = 'Hindi (by name)';
    }
    
    // Priority 4: Any non-English voice (might handle Devanagari better)
    if (!selectedVoice) {
        selectedVoice = availableVoices.find(voice => 
            !voice.lang.startsWith('en')
        );
        if (selectedVoice) voiceType = 'Other language';
    }
    
    // Set voice if found
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Using ${voiceType} voice:`, selectedVoice.name, selectedVoice.lang);
    } else {
        console.log('Using default browser voice. Available voices:', availableVoices.map(v => `${v.name} (${v.lang})`).join(', '));
    }
    
    // Set speech parameters
    utterance.lang = selectedVoice ? selectedVoice.lang : 'hi-IN';
    utterance.rate = 0.6; // Slower speed for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Show user feedback about voice being used
    const audioNote = document.querySelector('.audio-note');
    if (audioNote) {
        if (voiceType === 'Hindi') {
            audioNote.innerHTML = `🎯 Using ${selectedVoice.name} for pronunciation.`;
            audioNote.style.color = '#48bb78';
        } else if (voiceType === 'Indian English') {
            audioNote.innerHTML = `⚠️ Using ${selectedVoice.name} (Indian English approximation).`;
            audioNote.style.color = '#ed8936';
        } else {
            audioNote.innerHTML = `ℹ️ Using default voice. For better pronunciation, install Hindi language support in your OS.`;
            audioNote.style.color = '#718096';
        }
    }
    
    // Error handling
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event.error);
        if (event.error === 'not-allowed') {
            alert('Speech synthesis blocked. Please allow audio playback in your browser.');
        } else if (event.error === 'network') {
            alert('Network error. Check your internet connection.');
        }
    };
    
    utterance.onend = function() {
        console.log('Speech finished');
    };
    
    // Speak with a small delay to ensure proper initialization
    setTimeout(() => {
        window.speechSynthesis.speak(utterance);
    }, 100);
}

// ========================================
// FLIP CARD FUNCTIONALITY
// ========================================

let flippedCount = 0;
const totalCards = 48;

function flipCard(card) {
    card.classList.toggle('flipped');
    
    // Track progress
    if (card.classList.contains('flipped')) {
        flippedCount++;
    } else {
        flippedCount--;
    }
    
    // Update progress tracker
    updateProgress();
}

function updateProgress() {
    const cardsFlippedElement = document.getElementById('cards-flipped');
    if (cardsFlippedElement) {
        cardsFlippedElement.textContent = flippedCount;
    }
}

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});
/* ========================================
   CHAPTER HUB & PROGRESS TRACKING
   ======================================== */

// Initialize progress data
function loadProgress() {
    const saved = localStorage.getItem('paniniProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        chapter1: 'unlocked',
        chapter2: 'locked',
        chapter3: 'locked',
        chapter4: 'locked',
        overallProgress: 0
    };
}

function saveProgress(data) {
    localStorage.setItem('paniniProgress', JSON.stringify(data));
}

function updateHubUI() {
    const progress = loadProgress();
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    const overallPercentage = document.getElementById('overall-percentage');
    const chaptersCompleted = document.getElementById('chapters-completed');
    
    if (progressFill) {
        progressFill.style.width = progress.overallProgress + '%';
    }
    if (overallPercentage) {
        overallPercentage.textContent = progress.overallProgress + '%';
    }
    if (chaptersCompleted) {
        let completed = 0;
        for (let i = 1; i <= 4; i++) {
            if (progress['chapter' + i] === 'completed') completed++;
        }
        chaptersCompleted.textContent = completed;
    }
    
    // Update chapter cards
    for (let i = 1; i <= 4; i++) {
        const card = document.getElementById('chapter-' + i);
        if (card) {
            const status = progress['chapter' + i];
            card.className = 'chapter-card';
            
            if (status === 'locked') {
                card.classList.add('locked');
                card.querySelector('.chapter-status').textContent = '🔒 Locked';
            } else if (status === 'completed') {
                card.classList.add('completed');
                card.querySelector('.chapter-status').textContent = '✓ Completed';
            } else {
                card.querySelector('.chapter-status').textContent = '▶ Start';
            }
        }
    }
    
    // Show celebration if all completed
    const allCompleted = ['chapter1', 'chapter2', 'chapter3', 'chapter4']
        .every(ch => progress[ch] === 'completed');
    
    const celebration = document.getElementById('celebration');
    if (celebration && allCompleted) {
        celebration.style.display = 'block';
        triggerConfetti();
    }
}

function navigateToChapter(n) {
    const progress = loadProgress();
    const status = progress['chapter' + n];
    
    if (status === 'locked') {
        alert('🔒 Complete the previous chapter to unlock this one!');
        return;
    }
    
    window.location.href = `chapter${n}-${getChapterSlug(n)}.html`;
}

function getChapterSlug(n) {
    const slugs = {
        1: 'meet-panini',
        2: 'ashtadhyayi',
        3: 'modern-impact',
        4: 'famous-sutras'
    };
    return slugs[n] || '';
}

/* ========================================
   STORY MODE NAVIGATION
   ======================================== */

let currentSlide = 1;
let totalSlides = 0;

function initStoryMode() {
    // Support both .story-slide and .slide classes
    const slides = document.querySelectorAll('.story-slide, .slide');
    totalSlides = slides.length;
    
    if (totalSlides > 0) {
        // Update total slides display
        const totalSpan = document.getElementById('total-slides');
        if (totalSpan) totalSpan.textContent = totalSlides;
        
        showSlide(1);
        renderProgressDots();
        
        // Initialize background audio
        initializeBackgroundAudio();
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

function stopAllMedia() {
    // Pause all videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    // Pause all audio EXCEPT background ambient music
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        const isBackgroundMusic = audio.id === 'ambient-music' || audio.id === 'tech-ambient';
        if (!isBackgroundMusic) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// Background Audio Management System
let backgroundAudio = null;
let originalBackgroundVolume = 0.15; // Low background volume (15%)
let duckingVolume = 0.03; // Very low when other audio plays (3%)

function initializeBackgroundAudio() {
    // Find background audio element
    backgroundAudio = document.getElementById('ambient-music') || document.getElementById('tech-ambient');
    
    if (backgroundAudio) {
        // Set initial volume to low
        backgroundAudio.volume = originalBackgroundVolume;
        
        // Try to auto-play
        backgroundAudio.play().catch(e => {
            console.log('Background audio autoplay blocked - user interaction required');
            // Add one-time click listener to start audio
            document.body.addEventListener('click', function startAudio() {
                backgroundAudio.play();
                document.body.removeEventListener('click', startAudio);
            }, { once: true });
        });
        
        // Setup audio ducking for all interactive audio elements
        setupAudioDucking();
    }
}

function setupAudioDucking() {
    // Get all audio elements that are NOT background music
    const interactiveAudios = document.querySelectorAll('audio:not(#ambient-music):not(#tech-ambient)');
    
    interactiveAudios.forEach(audio => {
        // When interactive audio starts playing
        audio.addEventListener('play', function() {
            if (backgroundAudio && !backgroundAudio.paused) {
                // Duck (lower) background audio volume
                fadeVolume(backgroundAudio, backgroundAudio.volume, duckingVolume, 300);
            }
        });
        
        // When interactive audio ends
        audio.addEventListener('ended', function() {
            if (backgroundAudio && !backgroundAudio.paused) {
                // Restore background audio volume
                fadeVolume(backgroundAudio, backgroundAudio.volume, originalBackgroundVolume, 500);
            }
        });
        
        // When interactive audio is paused
        audio.addEventListener('pause', function() {
            if (backgroundAudio && !backgroundAudio.paused) {
                // Restore background audio volume
                fadeVolume(backgroundAudio, backgroundAudio.volume, originalBackgroundVolume, 500);
            }
        });
    });
}

function fadeVolume(audio, startVolume, endVolume, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    const volumeChange = (endVolume - startVolume) / steps;
    let currentStep = 0;
    
    const fade = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(0, Math.min(1, startVolume + (volumeChange * currentStep)));
        
        if (currentStep >= steps) {
            clearInterval(fade);
            audio.volume = endVolume;
        }
    }, stepTime);
}

function playSlideMedia(slideNumber) {
    // Play videos in the current slide
    const currentSlide = document.getElementById(`slide-${slideNumber}`);
    if (currentSlide) {
        const videos = currentSlide.querySelectorAll('video');
        videos.forEach(video => {
            video.currentTime = 0;
            video.play().catch(e => console.log('Video autoplay may be blocked'));
        });
    }
}

function showSlide(n) {
    // Support both .story-slide and .slide classes
    const slides = document.querySelectorAll('.story-slide, .slide');
    
    if (slides.length === 0) return;
    
    const totalSlides = slides.length;
    
    if (n > totalSlides) n = totalSlides;
    if (n < 1) n = 1;
    
    // Stop all media before switching
    stopAllMedia();
    
    currentSlide = n;
    
    slides.forEach((slide, index) => {
        if (index + 1 === n) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Scroll to top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Play media in new slide
    playSlideMedia(n);
    
    updateSlideCounter();
    updateProgressDots();
    updateNavButtons();
}

function nextSlide() {
    const slides = document.querySelectorAll('.story-slide, .slide');
    const totalSlides = slides.length;
    
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

function updateSlideCounter() {
    const currentSpan = document.getElementById('current-slide');
    const totalSpan = document.getElementById('total-slides');
    
    if (currentSpan) currentSpan.textContent = currentSlide;
    if (totalSpan) totalSpan.textContent = totalSlides;
}

function renderProgressDots() {
    const container = document.querySelector('.progress-dots');
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'progress-dot';
        if (i === currentSlide) dot.classList.add('active');
        container.appendChild(dot);
    }
}

function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slides = document.querySelectorAll('.story-slide, .slide');
    const totalSlides = slides.length;
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        // On last slide, change button text and behavior
        if (currentSlide === totalSlides) {
            // Check which chapter we're on
            const isChapter1 = document.title.includes('Chapter 1');
            const isChapter2 = document.title.includes('Chapter 2');
            const isChapter3 = document.title.includes('Chapter 3');
            const isChapter4 = document.title.includes('Chapter 4');
            
            if (isChapter1) {
                nextBtn.textContent = 'Complete & Go to Chapter 2 →';
                nextBtn.onclick = function() { completeChapter(1); };
            } else if (isChapter2) {
                nextBtn.textContent = 'Complete & Go to Chapter 3 →';
                nextBtn.onclick = function() { completeChapter(2); };
            } else if (isChapter3) {
                nextBtn.textContent = 'Complete & Go to Chapter 4 →';
                nextBtn.onclick = function() { completeChapter(3); };
            } else if (isChapter4) {
                nextBtn.textContent = 'Complete Learning Journey 🎉';
                nextBtn.onclick = function() { completeChapter(4); };
            }
            nextBtn.disabled = false;
        } else {
            nextBtn.textContent = 'Next →';
            nextBtn.onclick = nextSlide;
            nextBtn.disabled = false;
        }
    }
}

function completeChapter(n) {
    const progress = loadProgress();
    
    // Mark current chapter as completed
    progress['chapter' + n] = 'completed';
    
    // Unlock next chapter
    if (n < 4) {
        progress['chapter' + (n + 1)] = 'unlocked';
    }
    
    // Update overall progress
    let completed = 0;
    for (let i = 1; i <= 4; i++) {
        if (progress['chapter' + i] === 'completed') completed++;
    }
    progress.overallProgress = (completed / 4) * 100;
    
    saveProgress(progress);
    
    // Show success message
    alert('🎉 Chapter ' + n + ' completed! ' + (n < 4 ? 'Next chapter unlocked!' : 'All chapters completed!'));
    
    // Redirect to hub
    window.location.href = 'panini.html';
}

/* ========================================
   CONFETTI ANIMATION
   ======================================== */

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#667eea', '#764ba2', '#48bb78', '#f6ad55', '#fc8181'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
            
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            
            if (p.y > canvas.height) {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hub page initialization
    if (document.querySelector('.hub-container')) {
        updateHubUI();
        
        // Add click handlers to chapter cards
        for (let i = 1; i <= 4; i++) {
            const card = document.getElementById('chapter-' + i);
            if (card) {
                card.addEventListener('click', () => navigateToChapter(i));
            }
        }
    }
    
    // Story mode initialization - support both .story-mode and .story-container
    if (document.querySelector('.story-mode, .story-container')) {
        initStoryMode();
    }
});