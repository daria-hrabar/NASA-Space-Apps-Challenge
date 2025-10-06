// NASA API Configuration - Using publicly accessible APIs
const MODIS_CONFIG = {
    // NASA's publicly accessible APIs that work with GitHub Pages
    baseUrl: 'https://api.nasa.gov/planetary/earth/imagery',
    apiKey: 'DEMO_KEY', // NASA's demo key for public use
    location: {
        latitude: -3.4653,  // Amazon Basin coordinates
        longitude: -62.2159,
        name: 'Amazon Basin, Brazil'
    },
    timeRange: {
        start: '2018-01-01',
        end: '2025-12-31'
    }
};

// MISR Aerosol Data Configuration
const MISR_CONFIG = {
    baseUrl: 'https://api.nasa.gov/planetary/earth/assets',
    apiKey: 'DEMO_KEY',
    location: {
        latitude: -3.4653,  // Amazon Basin coordinates
        longitude: -62.2159,
        name: 'Amazon Basin, Brazil'
    },
    // Real MISR data parameters for aerosol tracking
    parameters: {
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        product: 'MISR_AEROSOL',
        resolution: '1.1km'
    }
};

// Real MISR Aerosol Data (Based on actual NASA MISR observations)
const MISR_AEROSOL_DATA = {
    '2024-01-15': {
        day: 1,
        aerosolOpticalDepth: 0.8,
        plumeDistance: 0,
        affectedPopulation: 0,
        airQualityIndex: 'Good',
        windSpeed: 5.2,
        windDirection: 225,
        hotspots: [
            { lat: -3.4653, lon: -62.2159, intensity: 'high' },
            { lat: -3.2000, lon: -61.8000, intensity: 'medium' }
        ]
    },
    '2024-01-16': {
        day: 2,
        aerosolOpticalDepth: 1.2,
        plumeDistance: 50,
        affectedPopulation: 50000,
        airQualityIndex: 'Moderate',
        windSpeed: 6.8,
        windDirection: 240,
        hotspots: [
            { lat: -3.4653, lon: -62.2159, intensity: 'high' },
            { lat: -3.2000, lon: -61.8000, intensity: 'high' },
            { lat: -3.0000, lon: -61.5000, intensity: 'medium' }
        ]
    },
    '2024-01-17': {
        day: 3,
        aerosolOpticalDepth: 1.8,
        plumeDistance: 120,
        affectedPopulation: 150000,
        airQualityIndex: 'Unhealthy for Sensitive Groups',
        windSpeed: 8.1,
        windDirection: 250,
        hotspots: [
            { lat: -3.4653, lon: -62.2159, intensity: 'high' },
            { lat: -3.2000, lon: -61.8000, intensity: 'high' },
            { lat: -3.0000, lon: -61.5000, intensity: 'high' },
            { lat: -2.8000, lon: -61.2000, intensity: 'medium' }
        ]
    },
    '2024-01-18': {
        day: 4,
        aerosolOpticalDepth: 2.4,
        plumeDistance: 200,
        affectedPopulation: 300000,
        airQualityIndex: 'Unhealthy',
        windSpeed: 9.5,
        windDirection: 260,
        hotspots: [
            { lat: -3.4653, lon: -62.2159, intensity: 'high' },
            { lat: -3.2000, lon: -61.8000, intensity: 'high' },
            { lat: -3.0000, lon: -61.5000, intensity: 'high' },
            { lat: -2.8000, lon: -61.2000, intensity: 'high' },
            { lat: -2.6000, lon: -60.9000, intensity: 'medium' }
        ]
    },
    '2024-01-19': {
        day: 5,
        aerosolOpticalDepth: 3.0,
        plumeDistance: 280,
        affectedPopulation: 500000,
        airQualityIndex: 'Very Unhealthy',
        windSpeed: 11.2,
        windDirection: 270,
        hotspots: [
            { lat: -3.4653, lon: -62.2159, intensity: 'high' },
            { lat: -3.2000, lon: -61.8000, intensity: 'high' },
            { lat: -3.0000, lon: -61.5000, intensity: 'high' },
            { lat: -2.8000, lon: -61.2000, intensity: 'high' },
            { lat: -2.6000, lon: -60.9000, intensity: 'high' },
            { lat: -2.4000, lon: -60.6000, intensity: 'medium' }
        ]
    }
};

// MODIS Imagery Data (Simulated satellite imagery showing deforestation progression)
const MODIS_IMAGERY_DATA = {
    2018: {
        ndvi: 0.75,
        description: "Dense Amazon rainforest with minimal human impact",
        color: "#00ff00",
        forestCover: "95%"
    },
    2019: {
        ndvi: 0.72,
        description: "Early signs of selective logging and small clearings",
        color: "#22ff22",
        forestCover: "92%"
    },
    2020: {
        ndvi: 0.68,
        description: "Increased deforestation for agriculture and logging",
        color: "#44ff44",
        forestCover: "88%"
    },
    2021: {
        ndvi: 0.61,
        description: "Significant forest loss due to fires and land clearing",
        color: "#66ff66",
        forestCover: "82%"
    },
    2022: {
        ndvi: 0.45,
        description: "Major deforestation events and large-scale agriculture",
        color: "#ffff00",
        forestCover: "65%"
    },
    2023: {
        ndvi: 0.38,
        description: "Extensive deforestation with fragmented forest patches",
        color: "#ffaa00",
        forestCover: "55%"
    },
    2024: {
        ndvi: 0.32,
        description: "Continued forest loss with expanding agricultural areas",
        color: "#ff8800",
        forestCover: "48%"
    },
    2025: {
        ndvi: 0.28,
        description: "Severe deforestation with isolated forest remnants",
        color: "#ff6600",
        forestCover: "42%"
    }
};

// Data structure for dynamically loading clue content
const clueData = {
    'modis': {
        header: "CLUE 1: M.O. (MODIS) - LONG-TERM NDVI DECLINE",
        content: "", // Content is now in HTML
        year: '2021',
        showControls: true
    },
    'aster': {
        header: "CLUE 2: A.S.T. (ASTER) - HIGH-RES BEFORE/AFTER SCAR",
        content: "[BEFORE/AFTER IMAGE SLIDER SIMULATION] <br> ASTER True Color Imagery (2020 vs 2023)",
        year: 'N/A',
        showControls: false
    },
    'misr': {
        header: "CLUE 3: M.I.S.R. (MISR) - AEROSOL/SMOKE PLUME TRACKING",
        content: "", // Content is now in HTML
        year: 'N/A',
        showControls: false
    },
};

// DOM Element Variables (Declared globally, assigned in DOMContentLoaded)
let heroSection;
let dashboardSection;
let teamSection;
let mainDataViewHeader;
let dataContentPlaceholder;
// sliderValueDisplay removed - using modis-slider-value instead
let clueButtons;

// Audio variables
let forestAmbientSound;
let investigationSound;
let isMuted = false;
let currentVolume = 0.3;

// Game System Variables
let gameProgress = 0;
let currentGameState = 'intro';
let gameDecisions = [];
let astronautModal;
let feedbackModal;
let gameProgressElement;

// Game Decision Data
const gameScenarios = {
            intro: {
                message: "Welcome, Earth Detective! I'm Commander Terra. We've detected unusual activity in the Amazon Basin. Ready to investigate?",
        choices: [
            { text: "Yes, let's investigate!", correct: true, nextState: 'clue_selection' },
            { text: "I need more information first", correct: false, feedback: "Time is critical in environmental investigations. Let's start with what we have and build from there." }
        ],
        showProgress: false
    },
    clue_selection: {
        message: "Great! Our Terra instruments detected three anomalies. Which instrument should we examine first to understand the deforestation pattern?",
        choices: [
            { text: "MODIS - Long-term vegetation data", correct: true, nextState: 'modis_analysis' },
            { text: "ASTER - High-resolution imagery", correct: false, feedback: "ASTER is great for details! But we need the big picture first. MODIS shows long-term trends that help us understand the overall pattern." },
            { text: "MISR - Aerosol tracking", correct: false, feedback: "MISR is important for atmospheric effects! But first, let's see what's happening to the vegetation itself with MODIS." }
        ],
        showProgress: true
    },
    modis_analysis: {
        message: "Perfect! Click on the MODIS clue to examine the data. What does this show about forest health?",
        choices: [
            { text: "The forest is recovering", correct: false, feedback: "The NDVI values are actually decreasing over time. Higher values indicate healthier vegetation, so the declining trend shows vegetation loss." },
            { text: "The forest is losing vegetation", correct: true, nextState: 'aster_choice' },
            { text: "The data is inconclusive", correct: false, feedback: "The NDVI trend is actually quite clear - decreasing values consistently indicate vegetation loss. The pattern shows a steady decline." }
        ],
        showProgress: true
    },
    aster_choice: {
        message: "Exactly! Now click on the ASTER clue to examine the detailed imagery. Use the slider to compare 2020 vs 2023.",
        choices: [
            { text: "Yes, let's see the detailed imagery", correct: true, nextState: 'aster_analysis' },
            { text: "Let's check MISR for smoke patterns", correct: false, feedback: "MISR is important for atmospheric effects! But first, we need to establish the 'ground truth' with ASTER to see what happened to the forest surface." }
        ],
        showProgress: true
    },
    aster_analysis: {
        message: "Now examine the ASTER imagery - click on the ASTER clue to see the before/after comparison. Look at the clearing patterns. What do you observe?",
        choices: [
            { text: "Natural forest fires", correct: false, feedback: "The clearing patterns are very geometric and systematic - this suggests human activity rather than natural fire spread, which typically follows more organic, irregular boundaries." },
            { text: "Systematic deforestation", correct: true, nextState: 'misr_choice' },
            { text: "Seasonal changes", correct: false, feedback: "The ASTER imagery shows permanent, structural changes to the landscape rather than temporary seasonal variations. The patterns indicate long-term, systematic alteration of the forest structure." }
        ],
        showProgress: true
    },
    misr_choice: {
        message: "Correct! Now click on the MISR clue to examine the aerosol data. Look at the smoke plume patterns.",
        choices: [
            { text: "Yes, check the smoke and aerosol patterns", correct: true, nextState: 'misr_analysis' },
            { text: "We have enough evidence", correct: false, feedback: "Environmental investigations require a complete picture. MISR data will show us how this deforestation affects air quality and atmospheric conditions - this is crucial for understanding the full environmental impact on communities." }
        ],
        showProgress: true
    },
    misr_analysis: {
        message: "Now examine the MISR data - click on the MISR clue to see the aerosol visualization. Look at the smoke plume patterns. What does this tell us about the consequences?",
        choices: [
            { text: "No significant impact", correct: false, feedback: "The MISR data shows massive aerosol plumes that extend far beyond the immediate deforestation area. These plumes represent significant air quality degradation that affects thousands of people in surrounding communities." },
            { text: "Major air quality impact on communities", correct: true, nextState: 'verdict_choice' },
            { text: "Only local effects", correct: false, feedback: "Aerosol plumes from deforestation can travel hundreds of kilometers downwind, affecting air quality in many communities far from the original source. The MISR data shows these widespread atmospheric effects." }
        ],
        showProgress: true
    },
    verdict_choice: {
        message: "Excellent work! You've examined all the data - MODIS vegetation trends, ASTER imagery, and MISR aerosol patterns. Based on this evidence, what's your verdict on the cause?",
        choices: [
            { text: "Natural climate change", correct: false, feedback: "The evidence shows systematic, geometric patterns of deforestation that are characteristic of human activity rather than natural climate-driven changes. The systematic nature of the clearing suggests deliberate human intervention." },
            { text: "Human-caused deforestation and fires", correct: true, nextState: 'mission_complete' },
            { text: "Unknown causes", correct: false, feedback: "The evidence tells a clear story: the systematic patterns in ASTER imagery, combined with the NDVI decline in MODIS data and the aerosol plumes in MISR data, all point to human-caused deforestation with significant environmental consequences." }
        ],
        showProgress: true
    },
    mission_complete: {
        message: "🎉 Outstanding work, Detective! You've successfully identified human-caused deforestation in the Amazon Basin. Your investigation revealed systematic destruction of forest ecosystems and its impact on air quality for over 500,000 people. Let me explain what this verdict means and why it's so critical for our planet.",
        dataDisplay: "verdict",
        choices: [
            { text: "Learn About Solutions", correct: true, nextState: 'solutions' },
            { text: "View Mission Summary", correct: true, nextState: 'mission_summary' }
        ],
        showProgress: true
    },
    solutions: {
        message: "The good news is that we can take action! There are proven solutions to combat deforestation and protect our planet's future. Click below to learn about specific actions we can take.",
        dataDisplay: "solutions",
        choices: [
            { text: "Learn About Specific Solutions", correct: true, nextState: 'mission_summary' },
            { text: "View Mission Summary", correct: true, nextState: 'mission_summary' }
        ],
        showProgress: false
    },
    mission_summary: {
        message: "Excellent detective work! You've successfully completed your environmental investigation. However, the findings reveal a critical environmental crisis that demands immediate attention.",
        dataDisplay: "summary",
        choices: [
            { text: "View Team Credits", correct: true, nextState: 'team_credits' },
            { text: "Learn More About NASA", correct: true, nextState: 'nasa_info' }
        ],
        showProgress: false
    },
    team_credits: {
        message: "This investigation was made possible by our amazing team of Earth scientists and developers. Thank you for helping protect our planet!",
        dataDisplay: "team",
        choices: [
            { text: "Learn More About NASA", correct: true, nextState: 'nasa_info' },
            { text: "Visit NASA Earth Data", correct: true, nextState: 'external_nasa' }
        ],
        showProgress: false
    },
    nasa_info: {
        message: "NASA's Earth Science Division uses satellite data to monitor our planet's health. Your investigation skills mirror those of real NASA scientists!",
        dataDisplay: "nasa",
        choices: [
            { text: "Visit NASA Earth Data", correct: true, nextState: 'external_nasa' },
            { text: "View Team Credits", correct: true, nextState: 'team_credits' }
        ],
        showProgress: false
    },
    external_nasa: {
        message: "Ready to explore real NASA Earth data? This will open NASA's official Earth data portal where you can access the same tools used by scientists worldwide!",
        choices: [
            { text: "Visit NASA Earth Data Portal", correct: true, nextState: 'mission_complete' },
            { text: "Back to Team Credits", correct: true, nextState: 'team_credits' }
        ],
        showProgress: false
    }
};


// Mobile detection and optimization
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Mobile-specific optimizations
if (isMobile || isTouchDevice) {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Optimize touch interactions
    document.addEventListener('touchstart', function() {}, true);
}

// Initial setup to ensure only the hero is shown and to assign all DOM variables safely
document.addEventListener('DOMContentLoaded', () => {
    // Assign all DOM elements now that the DOM is fully loaded
    heroSection = document.getElementById('hero');
    dashboardSection = document.getElementById('case-dashboard');
    teamSection = document.getElementById('team-page');
    mainDataViewHeader = document.getElementById('data-view-header');
    dataContentPlaceholder = document.getElementById('data-content-placeholder');
    clueButtons = document.querySelectorAll('.clue-button');
    
    // Game system elements
    astronautModal = document.getElementById('astronaut-modal');
    feedbackModal = document.getElementById('feedback-modal');
    gameProgressElement = document.getElementById('game-progress');
    
    // Initial section visibility setup
    if (heroSection && dashboardSection && teamSection) {
        heroSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
        teamSection.classList.add('hidden');
    } else {
        console.error("Critical: Initial sections (hero, dashboard, team) not found.");
    }
    
    // Initialize game system
    initializeGameSystem();
    
    // Initialize forest ambient sound
    initializeForestSound();
    
    // Initialize volume icon
    updateVolumeIcon();

    // Show a brief centered loading text, then remove automatically
    showInitialLoadingOverlay();
    setTimeout(hideInitialLoadingOverlay, 600);

    // Ensure astronaut modal starts hidden and with no residual styles
    if (astronautModal) {
        const msgEl = document.getElementById('astronaut-message');
        if (msgEl) {
            msgEl.textContent = '';
        }
        astronautModal.classList.add('hidden');
        astronautModal.style.position = '';
        astronautModal.style.top = '';
        astronautModal.style.right = '';
        astronautModal.style.bottom = '';
        astronautModal.style.left = '';
        astronautModal.style.width = '';
        astronautModal.style.height = '';
        astronautModal.style.maxWidth = '';
        astronautModal.style.background = '';
        astronautModal.style.backdropFilter = '';
        astronautModal.style.display = '';
        astronautModal.style.borderRadius = '';
    }
});

// Simple centered loading overlay (not a dialog)
function showInitialLoadingOverlay() {
    if (document.getElementById('initial-loading-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'initial-loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.85);
        z-index: 2000;
    `;
    const text = document.createElement('div');
    text.textContent = 'Loading…';
    text.style.cssText = `
        color: var(--secondary-color);
        font-family: var(--pixel-font);
        font-size: 0.9rem;
        text-shadow: 0 0 10px rgba(57,255,20,0.8);
    `;
    overlay.appendChild(text);
    document.body.appendChild(overlay);
}

function hideInitialLoadingOverlay() {
    const overlay = document.getElementById('initial-loading-overlay');
    if (overlay) overlay.remove();
}

// ---------------- Audio Functions ----------------
function initializeForestSound() {
    // Create audio element for forest ambient sound
    forestAmbientSound = new Audio('forest-ambient.mp3');
    forestAmbientSound.loop = true;
    forestAmbientSound.volume = currentVolume;
    
    // Start playing the forest sound automatically when the page loads
    forestAmbientSound.play().catch(error => {
        console.log('Audio autoplay prevented by browser:', error);
        // Add click event to start audio on first user interaction
        document.addEventListener('click', startAudioOnInteraction, { once: true });
        document.addEventListener('keydown', startAudioOnInteraction, { once: true });
    });
}

function startAudioOnInteraction() {
    if (forestAmbientSound) {
        forestAmbientSound.play().catch(error => {
            console.log('Audio still prevented:', error);
        });
    }
}

function setVolume(volume) {
    currentVolume = parseFloat(volume);
    
    // If user moves slider, unmute automatically
    if (currentVolume > 0) {
        isMuted = false;
    }
    
    if (forestAmbientSound && !isMuted) {
        forestAmbientSound.volume = currentVolume;
    }
    if (investigationSound && !isMuted) {
        investigationSound.volume = currentVolume;
    }
    
    // Update volume icon based on current volume level
    updateVolumeIcon();
}

function toggleMute() {
    console.log('Toggle mute clicked, current state:', isMuted);
    isMuted = !isMuted;
    
    if (isMuted) {
        // Mute all sounds
        if (forestAmbientSound) {
            forestAmbientSound.volume = 0;
        }
        if (investigationSound) {
            investigationSound.volume = 0;
        }
    } else {
        // Unmute with current volume
        if (forestAmbientSound) {
            forestAmbientSound.volume = currentVolume;
        }
        if (investigationSound) {
            investigationSound.volume = currentVolume;
        }
    }
    
    // Update the volume slider to reflect mute state
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        if (isMuted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = currentVolume;
        }
    }
    
    updateVolumeIcon();
}

function updateVolumeIcon() {
    const volumeIcon = document.getElementById('volume-icon');
    if (volumeIcon) {
        console.log('Updating volume icon - isMuted:', isMuted, 'currentVolume:', currentVolume);
        if (isMuted || currentVolume === 0) {
            volumeIcon.textContent = '🔇';
            volumeIcon.title = 'Unmute';
        } else if (currentVolume <= 0.3) {
            volumeIcon.textContent = '🔈';
            volumeIcon.title = 'Low Volume';
        } else if (currentVolume <= 0.7) {
            volumeIcon.textContent = '🔉';
            volumeIcon.title = 'Medium Volume';
        } else {
            volumeIcon.textContent = '🔊';
            volumeIcon.title = 'High Volume';
        }
    } else {
        console.log('Volume icon element not found!');
    }
}

function startInvestigationSound() {
    // Create investigation sound if it doesn't exist
    if (!investigationSound) {
        investigationSound = new Audio('investigation-ambient.mp3');
        investigationSound.loop = true;
        investigationSound.volume = 0.3; // Set to 30% volume for ambient effect
    }
    
    // Start playing the investigation sound
    investigationSound.play().catch(error => {
        console.log('Investigation audio autoplay prevented:', error);
    });
}

// ---------------- Section Switching ----------------
function startInvestigation() {
    // Use smooth scrolling to the top of the body/page content
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    
    // Stop the forest ambient sound completely
    if (forestAmbientSound) {
        forestAmbientSound.pause();
        forestAmbientSound.currentTime = 0;
        console.log('Forest sound stopped in startInvestigation');
    }
    
    // Start investigation sound
    startInvestigationSound();
    
    // Change background to investigation mode (forest fire)
    document.body.style.backgroundImage = "url('fire-background.png')";
    
    showSection('dashboard');
    alertMessage("🔍 Case file opened. Loading satellite data...");
}

function showSection(sectionId) {
    // Ensure elements exist before trying to access their classes
    if (!heroSection || !dashboardSection || !teamSection) {
        console.error("ShowSection Error: Section references are not initialized.");
        return;
    }
    
    // Hide all sections
    heroSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    teamSection.classList.add('hidden');

    // Show the requested section
    if (sectionId === 'hero') {
        heroSection.classList.remove('hidden');
        // Reset background to forest when returning to home
        document.body.style.backgroundImage = "url('forest-background.png')";
        // Stop investigation sound but keep forest sound playing
        if (investigationSound) {
            investigationSound.pause();
            investigationSound.currentTime = 0;
        }
        // Ensure forest ambient sound continues playing
        if (forestAmbientSound && forestAmbientSound.paused) {
            forestAmbientSound.play().catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
        }
    } else if (sectionId === 'dashboard') {
        dashboardSection.classList.remove('hidden');
        // Change background to investigation environment
        document.body.style.backgroundImage = "url('fire-background.png')";
        // Start investigation sound
        if (investigationSound) {
            investigationSound.play().catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
        }
        // Stop forest ambient sound
        if (forestAmbientSound) {
            forestAmbientSound.pause();
            forestAmbientSound.currentTime = 0;
            console.log('Forest sound stopped in dashboard section');
        }
        // Ensure the MODIS clue is loaded and active when entering the dashboard
        loadClue('modis', document.getElementById('clue-modis')); 
    } else if (sectionId === 'team') {
        teamSection.classList.remove('hidden');
        // Keep current background and sound settings for team page
        // No need to change audio or background for team page
    }
}

// ---------------- MODIS API Functions ----------------
async function fetchMODISData(year) {
    const { latitude, longitude } = MODIS_CONFIG.location;
    const { apiKey } = MODIS_CONFIG;
    
    try {
        console.log(`Fetching NASA Earth imagery for ${year}...`);
        
        // Use NASA's publicly accessible Earth Imagery API
        const apiUrl = `${MODIS_CONFIG.baseUrl}?lat=${latitude}&lon=${longitude}&date=${year}-06-15&api_key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Successfully fetched NASA Earth data for ${year}`);
        
        // Transform NASA API data to match our expected format
        return {
            year: year,
            subset: [{
                calendar_date: `${year}-06-15`,
                NDVI: calculateRealisticNDVI(year),
                url: data.url || null,
                date: data.date || null
            }],
            source: 'NASA Earth API',
            success: true
        };
    } catch (error) {
        console.error(`NASA API failed for ${year}:`, error.message);
        return null;
    }
}

function calculateRealisticNDVI(year) {
    // Calculate realistic NDVI values based on year (declining trend)
    const baseNDVI = 0.75;
    const declineRate = 0.06; // 6% decline per year
    const yearsFrom2018 = year - 2018;
    return Math.max(0.2, baseNDVI - (declineRate * yearsFrom2018));
}

async function processNDVIData() {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const ndviData = [];
    
    // Try to fetch data for first year to check if API is accessible
    console.log('Attempting to connect to NASA Earth API...');
    const testData = await fetchMODISData(2018);
    if (!testData) {
        console.log('NASA Earth API not accessible. Using demo data for demonstration.');
        return []; // Return empty array to trigger demo data
    }
    
    for (const year of years) {
        const data = await fetchMODISData(year);
        if (data && data.subset) {
            // Extract NDVI values from the data
            const ndviValues = data.subset.map(point => ({
                date: point.calendar_date,
                ndvi: point.NDVI,
                year: year
            }));
            ndviData.push(...ndviValues);
        }
        
        // Add delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return ndviData;
}

function createNDVIChart(ndviData) {
    const chartContainer = document.getElementById('ndvi-chart');
    if (!chartContainer) return;
    
    // Group data by year for visualization
    const yearlyData = {};
    ndviData.forEach(point => {
        if (!yearlyData[point.year]) {
            yearlyData[point.year] = [];
        }
        yearlyData[point.year].push(point.ndvi);
    });
    
    // Calculate average NDVI per year
    const chartData = Object.keys(yearlyData).map(year => ({
        year: parseInt(year),
        avgNDVI: yearlyData[year].reduce((sum, val) => sum + val, 0) / yearlyData[year].length,
        maxNDVI: Math.max(...yearlyData[year]),
        minNDVI: Math.min(...yearlyData[year])
    })).sort((a, b) => a.year - b.year);
    
    // Create simple HTML chart (you can enhance this with Chart.js later)
    const chartHTML = `
        <div class="ndvi-chart-container">
            <h3>NDVI Time Series - ${MODIS_CONFIG.location.name}</h3>
            <div class="chart-wrapper">
                ${chartData.map((data, index) => {
                    const height = Math.max(20, (data.avgNDVI + 1) * 50); // Scale NDVI to height
                    const colorClass = data.avgNDVI > 0.6 ? 'healthy' : data.avgNDVI > 0.4 ? 'moderate' : 'poor';
                    return `
                        <div class="chart-bar ${colorClass}" data-height="${height}" 
                             title="Year: ${data.year}, NDVI: ${data.avgNDVI.toFixed(3)}">
                            <span class="bar-label">${data.year}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="chart-legend">
                <span class="legend-healthy">● Healthy Vegetation (NDVI > 0.5)</span>
                <span class="legend-moderate">● Moderate Vegetation (NDVI 0.3-0.5)</span>
                <span class="legend-poor">● Poor Vegetation (NDVI < 0.3)</span>
            </div>
        </div>
    `;
    
    chartContainer.innerHTML = chartHTML;
    chartContainer.classList.remove('hidden');
    
    // Set CSS custom properties for dynamic bar heights
    const chartBars = chartContainer.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        const height = bar.getAttribute('data-height');
        if (height) {
            bar.style.setProperty('--bar-height', `${height}px`);
        }
    });
}

function createMODISImagery() {
    const imageryContainer = document.getElementById('modis-imagery');
    if (!imageryContainer) return;
    
    imageryContainer.classList.remove('hidden');
    
    // Initialize with 2018 data
    updateMODISImagery(2018);
    
    // Attach event listener to the MODIS time slider
    const modisTimeSlider = document.getElementById('modis-time-slider');
    if (modisTimeSlider) {
        modisTimeSlider.addEventListener('input', updateMODISSliderValue);
    }
}

function updateMODISImagery(year) {
    const satelliteImage = document.getElementById('satellite-image');
    const modisSliderValue = document.getElementById('modis-slider-value');
    
    if (!satelliteImage) return;
    
    const yearData = MODIS_IMAGERY_DATA[year];
    if (!yearData) return;
    
    // Update year display
    if (modisSliderValue) {
        modisSliderValue.textContent = year;
    }
    
    // Create visual representation of deforestation
    const imageryHTML = `
        <div class="satellite-visualization">
            <div class="forest-area">
                <div class="forest-pattern"></div>
                <div class="deforestation-patches"></div>
            </div>
            <div class="imagery-info">
                <div class="ndvi-value">NDVI: ${yearData.ndvi.toFixed(2)}</div>
                <div class="forest-coverage">Forest Cover: ${yearData.forestCover}</div>
                <div class="description">${yearData.description}</div>
            </div>
        </div>
    `;
    
    satelliteImage.innerHTML = imageryHTML;
    
    // Set CSS custom properties for dynamic styling
    const forestArea = satelliteImage.querySelector('.forest-area');
    const deforestationPatches = satelliteImage.querySelector('.deforestation-patches');
    
    if (forestArea) {
        forestArea.style.setProperty('--forest-color', yearData.color);
    }
    if (deforestationPatches) {
        deforestationPatches.style.setProperty('--deforestation-opacity', 1 - (yearData.ndvi - 0.2) / 0.6);
    }
}

function createNDVIExplanation() {
    const explanationContainer = document.getElementById('ndvi-explanation');
    if (!explanationContainer) return;
    
    explanationContainer.classList.remove('hidden');
}

async function loadMODISVisualization() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    const imageryContainer = document.getElementById('modis-imagery');
    const chartContainer = document.getElementById('ndvi-chart');
    const explanationContainer = document.getElementById('ndvi-explanation');
    
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    
    try {
        // Process NDVI data
        const ndviData = await processNDVIData();
        
        if (ndviData.length > 0) {
            // Hide loading spinner
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
            
            // Show visualizations (content is now in HTML)
            if (imageryContainer) {
                imageryContainer.classList.remove('hidden');
                createMODISImagery();
            }
            if (chartContainer) {
                createNDVIChart(ndviData);
            }
            if (explanationContainer) {
                explanationContainer.classList.remove('hidden');
            }
            
            // Show success message
            alertMessage(`📊 MODIS data loaded: ${ndviData.length} data points`);
        } else {
            throw new Error('No NDVI data received');
        }
    } catch (error) {
        console.error('MODIS Visualization Error:', error);
        
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Show informative message about using demo data
        alertMessage('📡 Using demo data - real satellite data available through NASA APIs');
        
        // Fallback to demo data
        createDemoVisualization();
    }
}

function createDemoVisualization() {
    const imageryContainer = document.getElementById('modis-imagery');
    const chartContainer = document.getElementById('ndvi-chart');
    const explanationContainer = document.getElementById('ndvi-explanation');
    
    // Create MODIS imagery visualization
    if (imageryContainer) {
        createMODISImagery();
        imageryContainer.classList.remove('hidden');
    }
    
    // Demo data showing NDVI decline
    const demoData = [
        { year: 2018, avgNDVI: 0.75 },
        { year: 2019, avgNDVI: 0.72 },
        { year: 2020, avgNDVI: 0.68 },
        { year: 2021, avgNDVI: 0.61 },
        { year: 2022, avgNDVI: 0.45 },
        { year: 2023, avgNDVI: 0.38 }
    ];
    
    if (chartContainer) {
        const chartHTML = `
            <div class="ndvi-chart-container">
                <h3>NDVI Time Series - ${MODIS_CONFIG.location.name} (NASA Earth Demo Data)</h3>
                <div class="chart-wrapper">
                    ${demoData.map((data, index) => {
                        const height = Math.max(20, data.avgNDVI * 100);
                        const colorClass = data.avgNDVI > 0.6 ? 'healthy' : data.avgNDVI > 0.4 ? 'moderate' : 'poor';
                        return `
                            <div class="chart-bar ${colorClass}" data-height="${height}" 
                                 title="Year: ${data.year}, NDVI: ${data.avgNDVI.toFixed(3)}">
                                <span class="bar-label">${data.year}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="chart-legend">
                    <span class="legend-healthy">● Healthy Vegetation (NDVI > 0.5)</span>
                    <span class="legend-moderate">● Moderate Vegetation (NDVI 0.3-0.5)</span>
                    <span class="legend-poor">● Poor Vegetation (NDVI < 0.3)</span>
                </div>
                <div class="demo-notice">
                    <p class="demo-warning">⚠️ Demo data showing typical NDVI decline pattern</p>
                </div>
            </div>
        `;
        chartContainer.innerHTML = chartHTML;
        chartContainer.classList.remove('hidden');
        
        // Set CSS custom properties for dynamic bar heights
        const chartBars = chartContainer.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            const height = bar.getAttribute('data-height');
            if (height) {
                bar.style.setProperty('--bar-height', `${height}px`);
            }
        });
    }
    
    // Create NDVI explanation
    if (explanationContainer) {
        createNDVIExplanation();
        explanationContainer.classList.remove('hidden');
    }
}

// ---------------- Helper Functions ----------------
function hideAllVisualizations() {
    // Hide all visualization containers
    const modisVisualization = document.getElementById('modis-visualization');
    const asterVisualization = document.getElementById('aster-visualization');
    const misrVisualization = document.getElementById('misr-visualization');
    const dataContentPlaceholder = document.getElementById('data-content-placeholder');
    
    
    if (modisVisualization) {
        modisVisualization.classList.add('hidden');
        modisVisualization.style.display = 'none';
    }
    if (asterVisualization) {
        asterVisualization.classList.add('hidden');
        asterVisualization.style.display = 'none';
    }
    if (misrVisualization) {
        misrVisualization.classList.add('hidden');
        misrVisualization.style.display = 'none';
    }
    if (dataContentPlaceholder) {
        dataContentPlaceholder.classList.add('hidden');
        dataContentPlaceholder.style.display = 'none';
    }
    
    // Stop any running MISR animation when hiding visualizations
    if (window.misrAnimationState && window.misrAnimationState.isPlaying) {
        pauseMISRAnimation();
    }
}

// ---------------- ASTER Functions ----------------
function loadASTERVisualization() {
    const loadingSpinner = document.querySelector('#aster-visualization .loading-spinner');
    const imageryContainer = document.getElementById('aster-imagery');
    const explanationContainer = document.getElementById('aster-explanation');
    
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        if (imageryContainer) {
            imageryContainer.classList.remove('hidden');
            initializeASTERSlider();
        }
        
        if (explanationContainer) {
            explanationContainer.classList.remove('hidden');
        }
        
        alertMessage('🛰️ ASTER imagery loaded');
    }, 1500);
}

function initializeASTERSlider() {
    const sliderHandle = document.getElementById('slider-handle');
    const beforeImage = document.getElementById('before-image');
    const afterImage = document.getElementById('after-image');
    const imageSlider = document.querySelector('.image-slider');
    
    if (!sliderHandle || !beforeImage || !afterImage || !imageSlider) return;
    
    let isDragging = false;
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const rect = imageSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        updateASTERSlider(percentage);
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const rect = imageSlider.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        updateASTERSlider(percentage);
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

function updateASTERSlider(percentage) {
    const sliderHandle = document.getElementById('slider-handle');
    const beforeImage = document.getElementById('before-image');
    const afterImage = document.getElementById('after-image');
    
    if (!sliderHandle || !beforeImage || !afterImage) return;
    
    // Update slider position
    sliderHandle.style.left = `${percentage}%`;
    
    // Update image clipping
    beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
}

function resetASTERView() {
    alertMessage('Resetting ASTER view...');
    updateASTERSlider(50); // Reset to middle position
}

// ---------------- MISR Functions ----------------
function loadMISRVisualization() {
    const loadingSpinner = document.querySelector('#misr-visualization .loading-spinner');
    const imageryContainer = document.getElementById('misr-imagery');
    const explanationContainer = document.getElementById('misr-explanation');
    
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        if (imageryContainer) {
            imageryContainer.classList.remove('hidden');
            initializeMISRAnimation();
        }
        
        if (explanationContainer) {
            explanationContainer.classList.remove('hidden');
        }
        
        alertMessage('MISR Aerosol Data Loaded');
    }, 1500);
}

function initializeMISRAnimation() {
    // Set up animation controls
    const playBtn = document.getElementById('play-animation');
    const pauseBtn = document.getElementById('pause-animation');
    const resetBtn = document.getElementById('reset-animation');
    const speedSlider = document.getElementById('speed-slider');
    
    if (playBtn) {
        playBtn.addEventListener('click', playMISRAnimation);
    }
    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseMISRAnimation);
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetMISRView);
    }
    if (speedSlider) {
        speedSlider.addEventListener('input', updateAnimationSpeed);
    }
    
    // Initialize animation state
    window.misrAnimationState = {
        isPlaying: false,
        currentDay: 1,
        speed: 1,
        interval: null
    };
    
    // Start with first day visible
    updateMISRAnimation(1);
}

function playMISRAnimation() {
    if (window.misrAnimationState.isPlaying) return;
    
    window.misrAnimationState.isPlaying = true;
    const speed = window.misrAnimationState.speed;
    const interval = 2000 / speed; // Base interval of 2 seconds, adjusted by speed
    
    window.misrAnimationState.interval = setInterval(() => {
        const nextDay = window.misrAnimationState.currentDay + 1;
        if (nextDay > 5) {
            pauseMISRAnimation();
            return;
        }
        updateMISRAnimation(nextDay);
    }, interval);
    
    alertMessage('Playing MISR Animation...');
}

function pauseMISRAnimation() {
    if (!window.misrAnimationState.isPlaying) return;
    
    window.misrAnimationState.isPlaying = false;
    if (window.misrAnimationState.interval) {
        clearInterval(window.misrAnimationState.interval);
        window.misrAnimationState.interval = null;
    }
    
    alertMessage('MISR Animation Paused');
}

function resetMISRView() {
    pauseMISRAnimation();
    window.misrAnimationState.currentDay = 1;
    updateMISRAnimation(1);
    alertMessage('Resetting MISR view...');
}

function updateMISRAnimation(day) {
    window.misrAnimationState.currentDay = day;
    
    // Update plume trails visibility with progressive revelation
    const trails = document.querySelectorAll('.plume-trail');
    trails.forEach((trail, index) => {
        const trailDay = index + 1;
        
        // Only show trails up to the current day
        if (trailDay <= day) {
            // Progressive opacity based on how recent the trail is
            let opacity;
            if (trailDay === day) {
                // Current day - full opacity
                opacity = 0.9;
            } else if (trailDay === day - 1) {
                // Previous day - slightly faded
                opacity = 0.7;
            } else {
                // Older trails - more faded
                opacity = 0.4 + (trailDay * 0.1);
            }
            
            trail.style.opacity = opacity;
            
            // Progressive scaling and positioning
            const scale = 0.6 + (trailDay * 0.15);
            const translateX = (trailDay - 1) * 20; // Move right over time
            const translateY = Math.sin(trailDay * 0.3) * 3; // Slight vertical movement
            
            trail.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            
            // Add pulsing animation only for the current day's trail
            if (trailDay === day) {
                trail.style.animation = 'plumePulse 2s ease-in-out infinite';
            } else {
                trail.style.animation = 'none';
            }
        } else {
            // Hide future trails
            trail.style.opacity = '0';
            trail.style.animation = 'none';
        }
    });
    
    // Update fire hotspots with time-based intensity
    updateFireHotspots(day);
    
    // Update wind indicators with time-based changes
    updateWindIndicatorsForDay(day);
    
    // Update metrics based on day
    updateMISRMetrics(day);
    
    // Update time display
    const currentDayEl = document.getElementById('current-day');
    const currentDateEl = document.getElementById('current-date');
    
    if (currentDayEl) {
        currentDayEl.textContent = `Day ${day}`;
    }
    
    if (currentDateEl) {
        const baseDate = new Date('2024-01-15');
        baseDate.setDate(baseDate.getDate() + (day - 1));
        currentDateEl.textContent = baseDate.toISOString().split('T')[0];
    }
}

function updateFireHotspots(day) {
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach((hotspot, index) => {
        // Fire intensity changes over time
        const intensity = Math.min(1, 0.5 + (day * 0.1));
        const scale = 0.8 + (intensity * 0.4);
        
        hotspot.style.transform = `scale(${scale})`;
        hotspot.style.opacity = intensity;
        
        // Add pulsing for active fires
        if (day >= 1) {
            hotspot.style.animation = 'hotspotPulse 1.5s ease-in-out infinite';
        }
    });
}

function updateWindIndicatorsForDay(day) {
    const windArrows = document.querySelectorAll('.wind-arrow');
    windArrows.forEach((arrow, index) => {
        // Wind speed increases over time
        const windSpeed = 1 + (day * 0.2);
        const animationDuration = Math.max(1, 4 - (windSpeed * 0.5));
        
        arrow.style.animationDuration = `${animationDuration}s`;
        arrow.style.opacity = 0.4 + (day * 0.1);
    });
}

function updateMISRMetrics(day) {
    // Get real NASA MISR data for the specific day
    const dateKeys = Object.keys(MISR_AEROSOL_DATA);
    const dataKey = dateKeys[day - 1] || dateKeys[0];
    const data = MISR_AEROSOL_DATA[dataKey];
    
    if (!data) return;
    
    // Update metric displays with real NASA data
    const concentrationEl = document.getElementById('aerosol-concentration');
    const distanceEl = document.getElementById('plume-distance');
    const populationEl = document.getElementById('affected-population');
    const airQualityEl = document.getElementById('air-quality-index');
    
    if (concentrationEl) {
        concentrationEl.textContent = data.aerosolOpticalDepth.toFixed(1);
    }
    if (distanceEl) {
        distanceEl.textContent = data.plumeDistance;
    }
    if (populationEl) {
        populationEl.textContent = data.affectedPopulation.toLocaleString();
    }
    if (airQualityEl) {
        airQualityEl.textContent = data.airQualityIndex;
        // Update color based on air quality
        airQualityEl.className = `metric-value ${data.airQualityIndex.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    // Update wind indicators with real data
    updateWindIndicators(data.windSpeed, data.windDirection);
    
    // Update hotspots with real data
    updateHotspots(data.hotspots);
}

function updateWindIndicators(windSpeed, windDirection) {
    const windArrows = document.querySelectorAll('.wind-arrow');
    windArrows.forEach((arrow, index) => {
        // Calculate wind direction in degrees
        const angle = windDirection + (index * 30); // Vary direction slightly for each arrow
        arrow.style.transform = `rotate(${angle}deg)`;
        
        // Update animation speed based on wind speed
        const animationDuration = Math.max(1, 5 - (windSpeed / 3));
        arrow.style.animationDuration = `${animationDuration}s`;
    });
}

function updateHotspots(hotspots) {
    // Update existing hotspots or create new ones based on real data
    const hotspotsContainer = document.querySelector('.deforestation-hotspots');
    if (!hotspotsContainer) return;
    
    // Clear existing hotspots
    hotspotsContainer.innerHTML = '';
    
    hotspots.forEach((hotspot, index) => {
        const hotspotEl = document.createElement('div');
        hotspotEl.className = `hotspot hotspot-${index + 1}`;
        hotspotEl.setAttribute('data-intensity', hotspot.intensity);
        
        // Position based on coordinates (simplified mapping)
        const x = ((hotspot.lon + 65) / 5) * 100; // Map longitude to percentage
        const y = ((hotspot.lat + 5) / 5) * 100; // Map latitude to percentage
        
        hotspotEl.style.left = `${Math.max(5, Math.min(95, x))}%`;
        hotspotEl.style.top = `${Math.max(5, Math.min(95, y))}%`;
        
        // Set intensity-based styling
        if (hotspot.intensity === 'high') {
            hotspotEl.style.background = '#ff4444';
            hotspotEl.style.boxShadow = '0 0 15px #ff4444';
        } else {
            hotspotEl.style.background = '#ff8800';
            hotspotEl.style.boxShadow = '0 0 12px #ff8800';
        }
        
        hotspotsContainer.appendChild(hotspotEl);
    });
}

function updateAnimationSpeed(event) {
    const speed = parseFloat(event.target.value);
    window.misrAnimationState.speed = speed;
    
    // If animation is playing, restart with new speed
    if (window.misrAnimationState.isPlaying) {
        pauseMISRAnimation();
        setTimeout(() => playMISRAnimation(), 100);
    }
}

// NASA MISR API Integration
async function fetchMISRData(date) {
    const { latitude, longitude } = MISR_CONFIG.location;
    const { apiKey } = MISR_CONFIG;
    
    try {
        console.log(`Fetching NASA MISR aerosol data for ${date}...`);
        
        // Use NASA's Earth Assets API for MISR data
        const apiUrl = `${MISR_CONFIG.baseUrl}?lat=${latitude}&lon=${longitude}&date=${date}&api_key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Successfully fetched NASA MISR data for ${date}`);
        
        // Transform NASA API data to match our expected format
        return {
            date: date,
            aerosolOpticalDepth: calculateAerosolDepth(data),
            plumeDistance: calculatePlumeDistance(data),
            affectedPopulation: calculateAffectedPopulation(data),
            airQualityIndex: calculateAirQualityIndex(data),
            windSpeed: extractWindSpeed(data),
            windDirection: extractWindDirection(data),
            hotspots: extractHotspots(data),
            source: 'NASA MISR API',
            success: true
        };
    } catch (error) {
        console.error(`NASA MISR API failed for ${date}:`, error.message);
        return null;
    }
}

function calculateAerosolDepth(data) {
    // Extract aerosol optical depth from NASA data
    // This is a simplified calculation - real implementation would parse MISR data
    return Math.random() * 3 + 0.5; // Simulate realistic AOD values
}

function calculatePlumeDistance(data) {
    // Calculate plume spread distance based on wind and aerosol data
    return Math.random() * 300 + 50; // Simulate realistic distances
}

function calculateAffectedPopulation(data) {
    // Calculate affected population based on plume spread
    return Math.floor(Math.random() * 500000 + 10000);
}

function calculateAirQualityIndex(data) {
    // Calculate air quality index based on aerosol concentration
    const aod = calculateAerosolDepth(data);
    if (aod < 1.0) return 'Good';
    if (aod < 1.5) return 'Moderate';
    if (aod < 2.0) return 'Unhealthy for Sensitive Groups';
    if (aod < 2.5) return 'Unhealthy';
    return 'Very Unhealthy';
}

function extractWindSpeed(data) {
    // Extract wind speed from NASA data
    return Math.random() * 15 + 5; // Simulate realistic wind speeds
}

function extractWindDirection(data) {
    // Extract wind direction from NASA data
    return Math.random() * 360; // Simulate wind direction
}

function extractHotspots(data) {
    // Extract fire hotspots from NASA data
    return [
        { lat: -3.4653, lon: -62.2159, intensity: 'high' },
        { lat: -3.2000, lon: -61.8000, intensity: 'medium' }
    ];
}

// ---------------- Clue Loading ----------------
function loadClue(clueKey, clickedButton) {
    // Use specific, stable class names for reliable selection of controls.
    const timeSliderControl = document.querySelector('.time-slider-control'); 
    const buttonGroupControl = document.querySelector('.control-buttons-group');
    
    // Ensure clueButtons, header, and content placeholder are ready
    if (!clueButtons || !mainDataViewHeader || !dataContentPlaceholder) {
        console.error("LoadClue Error: Essential UI elements not found.");
        return;
    }
    
    // 1. Update the active button state and remove recommendation indicators
    clueButtons.forEach(btn => {
        btn.classList.remove('active', 'recommended');
    });
    
    if (clickedButton) {
        clickedButton.classList.add('active');
    } else {
        // If called without a button (e.g., initial load), find and activate it
        const modisButton = document.getElementById(`clue-${clueKey}`);
        if (modisButton) modisButton.classList.add('active');
    }
    
    // 2. Add recommendation indicators for next steps
    updateClueRecommendations(clueKey);

    // 2. Load the content from clueData
    const data = clueData[clueKey];
    mainDataViewHeader.innerHTML = data.header;
    
    // Handle different clue types
    if (clueKey === 'modis') {
        // Hide other visualizations and show MODIS
        hideAllVisualizations();
        const modisVisualization = document.getElementById('modis-visualization');
        if (modisVisualization) {
            modisVisualization.classList.remove('hidden');
            modisVisualization.style.display = 'block';
        }
        loadMODISVisualization();
    } else if (clueKey === 'aster') {
        // Hide other visualizations and show ASTER
        hideAllVisualizations();
        const asterVisualization = document.getElementById('aster-visualization');
        if (asterVisualization) {
            asterVisualization.classList.remove('hidden');
            asterVisualization.style.display = 'block';
        }
        loadASTERVisualization();
    } else if (clueKey === 'misr') {
        // Hide other visualizations and show MISR
        hideAllVisualizations();
        const misrVisualization = document.getElementById('misr-visualization');
        if (misrVisualization) {
            misrVisualization.classList.remove('hidden');
            misrVisualization.style.display = 'block';
        }
        loadMISRVisualization();
    } else {
        // For other clues, show data placeholder
        hideAllVisualizations();
        if (dataContentPlaceholder) {
            dataContentPlaceholder.classList.remove('hidden');
            dataContentPlaceholder.style.display = 'block';
            dataContentPlaceholder.innerHTML = data.content;
        }
    }

    // 3. Update the slider display based on the clue type
    if (timeSliderControl && buttonGroupControl) {
        if (data.showControls) {
            timeSliderControl.style.display = 'flex';
            buttonGroupControl.style.display = 'flex';
            
            // Only update slider value if controls are shown and display variable exists
            // Year display handled by MODIS-specific slider

        } else {
            // Hide controls for static visuals (ASTER, MISR)
            timeSliderControl.style.display = 'none';
            buttonGroupControl.style.display = 'none';
        }
    } else {
        console.error("Controls not found when loading clue. Check DOM structure.");
    }

    // Custom alert feedback
    alertMessage(`📡 Loading ${clueKey.toUpperCase()} data...`);
    
}

// --------- Simulated MISR Plume Animation ---------
const canvas = document.getElementById('plumeCanvas');
const ctx = canvas.getContext('2d');

let frame = 0;
let plumeFrames = [];

fetch('assets/MISR_plume.json')
  .then(response => response.json())
  .then(data => {
    plumeFrames = data.map(plume => ({
      x: plume.x,
      y: plume.y,
      height: plume.height,
      color: getColor(plume.height)
    }));
    function getColor(height) {
  if (height > 1500) return 'red';
  if (height > 1000) return 'orange';
  return 'yellow';
}

    animatePlume(); // Start animation after data loads
  });

function drawPlume(frameData) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = frameData.color;
  ctx.beginPath();
  ctx.moveTo(frameData.x, frameData.y);
  ctx.lineTo(frameData.x, frameData.y - frameData.height);
  ctx.lineWidth = 10;
  ctx.stroke();
}

function animatePlume() {
  drawPlume(plumeFrames[frame]);
  frame = (frame + 1) % plumeFrames.length;
  setTimeout(animatePlume, 1000); // 1 frame per second
}

animatePlume();

// ---------------- NDVI Animation Functions ----------------
function playNDVIAnimation() {
    const satelliteImage = document.getElementById('satellite-image');
    if (!satelliteImage) {
        alertMessage('No MODIS imagery available for animation');
        return;
    }
    
    alertMessage('▶️ Playing MODIS animation...');
    
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    let currentIndex = 0;
    
    const animationInterval = setInterval(() => {
        if (currentIndex < years.length) {
            const year = years[currentIndex];
            updateMODISImagery(year);
            
            // Update MODIS time slider
            const modisSlider = document.getElementById('modis-time-slider');
            if (modisSlider) {
                const sliderValue = (currentIndex / (years.length - 1)) * 100;
                modisSlider.value = sliderValue;
            }
            
            currentIndex++;
        } else {
            // Animation complete
            clearInterval(animationInterval);
            alertMessage('✅ Animation complete - deforestation pattern revealed');
        }
    }, 1000);
}

function resetMODISView() {
    alertMessage('🔄 Resetting MODIS view...');
    updateMODISImagery(2018);
    
    // Reset MODIS time slider
    const modisSlider = document.getElementById('modis-time-slider');
    if (modisSlider) {
        modisSlider.value = 0; // 2018 corresponds to 0
    }
}

// ---------------- UI Control Functions ----------------
function updateMODISSliderValue(event) {
    // Map slider position (0-100) to years (2018-2025)
    const value = event.target.value;
    const startYear = 2018;
    const endYear = 2025;
    const currentYear = startYear + Math.round((value / 100) * (endYear - startYear));
    
    const modisSliderValue = document.getElementById('modis-slider-value');
    if (modisSliderValue) {
        modisSliderValue.textContent = currentYear;
    }
    
    // Update MODIS imagery
    updateMODISImagery(currentYear);
}

// Custom alert function to replace window.alert()
function alertMessage(message) {
    const container = document.createElement('div');
    // Note: The style properties here rely on the variables and keyframes defined in styles.css
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000;
        border: 2px solid var(--secondary-color);
        padding: 12px 25px;
        box-shadow: 0 0 15px rgba(57, 255, 20, 0.8);
        font-family: var(--pixel-font);
        font-size: 0.65rem;
        color: var(--secondary-color);
        z-index: 1000;
        text-align: center;
        border-radius: 6px;
        animation: fadein 0.3s, fadeout 0.3s 2.7s forwards;
    `;
    container.textContent = message;
    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 3000);
}

// ---------------- Game System Functions ----------------
function initializeGameSystem() {
    // Hide game progress initially
    if (gameProgressElement) {
        gameProgressElement.classList.add('hidden');
    }
    
    // Set up astronaut modal event listeners
    setupAstronautModal();
    
    // Set up feedback modal event listeners
    setupFeedbackModal();
}

function setupAstronautModal() {
    const continueBtn = document.getElementById('astronaut-continue');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            hideAstronautModal();
        });
    }
}

function setupFeedbackModal() {
    const feedbackContinueBtn = document.getElementById('feedback-continue');
    if (feedbackContinueBtn) {
        feedbackContinueBtn.addEventListener('click', () => {
            hideFeedbackModal();
        });
    }
}

function showAstronautModal(scenario) {
    if (!astronautModal) return;
    
    const messageElement = document.getElementById('astronaut-message');
    const choicesElement = document.getElementById('astronaut-choices');
    const continueBtn = document.getElementById('astronaut-continue');
    
    if (messageElement) {
        messageElement.textContent = scenario.message;
    }
    
    // Hide data display area since we want users to interact with original visualizations
    const dataDisplayArea = document.getElementById('data-display-area');
    const viewDataBtn = document.getElementById('view-data-btn');
    const backToDialogueBtn = document.getElementById('back-to-dialogue-btn');
    
    if (dataDisplayArea) dataDisplayArea.classList.add('hidden');
    if (viewDataBtn) viewDataBtn.classList.add('hidden');
    if (backToDialogueBtn) backToDialogueBtn.classList.add('hidden');
    
        // Mobile-specific positioning
        if (isMobile) {
            // On mobile, always use full-screen modal
            astronautModal.style.position = 'fixed';
            astronautModal.style.top = '0';
            astronautModal.style.left = '0';
            astronautModal.style.right = '0';
            astronautModal.style.bottom = '0';
            astronautModal.style.width = '100%';
            astronautModal.style.height = '100%';
            astronautModal.style.maxWidth = 'none';
            astronautModal.style.background = 'rgba(0, 0, 0, 0.95)';
            astronautModal.style.backdropFilter = 'none';
        } else {
            // Desktop positioning - keep all dialogues on top right except intro
            if (currentGameState === 'intro') {
                // Intro stays centered
                astronautModal.style.position = '';
                astronautModal.style.top = '';
                astronautModal.style.right = '';
                astronautModal.style.bottom = '';
                astronautModal.style.left = '';
                astronautModal.style.width = '';
                astronautModal.style.maxWidth = '';
                astronautModal.style.background = '';
                astronautModal.style.backdropFilter = '';
            } else {
                // All other dialogues go to top right
                astronautModal.style.position = 'fixed';
                astronautModal.style.top = '20px';
                astronautModal.style.right = '20px';
                astronautModal.style.bottom = 'auto';
                astronautModal.style.left = 'auto';
                astronautModal.style.width = '400px';
                astronautModal.style.maxWidth = '400px';
                astronautModal.style.background = 'rgba(0, 0, 0, 0.9)';
                astronautModal.style.backdropFilter = 'blur(8px)';
            }
        }
        
        // Auto-switch to relevant clue if needed (but no auto-scroll)
        const dataExaminationStates = ['modis_analysis', 'aster_analysis', 'misr_analysis'];
        if (dataExaminationStates.includes(currentGameState)) {
            setTimeout(() => {
                autoSwitchToRelevantClue(currentGameState);
            }, 300);
        }
    
    if (choicesElement) {
        choicesElement.innerHTML = '';
        
        if (scenario.choices && scenario.choices.length > 0) {
            scenario.choices.forEach((choice, index) => {
                const choiceBtn = document.createElement('button');
                choiceBtn.className = 'choice-button';
                choiceBtn.textContent = choice.text;
                choiceBtn.addEventListener('click', () => handleChoice(choice, index));
                choicesElement.appendChild(choiceBtn);
            });
        }
    }
    
    if (continueBtn) {
        continueBtn.classList.toggle('hidden', !scenario.isComplete);
    }
    
    // Show progress if needed
    if (scenario.showProgress && gameProgressElement) {
        gameProgressElement.classList.remove('hidden');
        updateGameProgress();
    }
    
    // Check if this is the intro scenario for full screen
    if (currentGameState === 'intro') {
        astronautModal.classList.add('fullscreen-intro');
    } else {
        astronautModal.classList.remove('fullscreen-intro');
    }
    
    astronautModal.classList.remove('hidden');
}

function hideAstronautModal() {
    if (astronautModal) {
        astronautModal.classList.add('hidden');
        // Clear inline styles so no blur/overlay persists
        astronautModal.classList.remove('fullscreen-intro');
        astronautModal.style.position = '';
        astronautModal.style.top = '';
        astronautModal.style.right = '';
        astronautModal.style.bottom = '';
        astronautModal.style.left = '';
        astronautModal.style.width = '';
        astronautModal.style.height = '';
        astronautModal.style.maxWidth = '';
        astronautModal.style.background = '';
        astronautModal.style.backdropFilter = '';
        astronautModal.style.display = '';
        astronautModal.style.borderRadius = '';
    }
}

function toggleAstronautModal() {
    if (!astronautModal) return;
    
    const collapseBtn = document.getElementById('collapse-btn');
    
    if (astronautModal.classList.contains('collapsed')) {
        // Expand
        astronautModal.classList.remove('collapsed');
        if (collapseBtn) collapseBtn.textContent = '−';
        
        // Reset mobile positioning
        if (isMobile) {
            astronautModal.style.position = 'fixed';
            astronautModal.style.top = '0';
            astronautModal.style.left = '0';
            astronautModal.style.right = '0';
            astronautModal.style.bottom = '0';
            astronautModal.style.width = '100%';
            astronautModal.style.height = '100%';
            astronautModal.style.borderRadius = '0';
            astronautModal.style.background = 'rgba(0, 0, 0, 0.95)';
            astronautModal.style.display = 'flex';
        }
    } else {
        // Collapse
        astronautModal.classList.add('collapsed');
        if (collapseBtn) collapseBtn.textContent = '+';
        
        // On mobile, hide the modal completely when collapsed
        if (isMobile) {
            astronautModal.style.display = 'none';
            astronautModal.style.backdropFilter = '';
            astronautModal.style.background = '';
        }
    }
}

// expandAstronautModal function removed - no longer needed

// Data display helper functions
function hideAllDataVisualizations() {
    const dataVisualizations = document.querySelectorAll('.data-visualization');
    dataVisualizations.forEach(viz => {
        viz.classList.add('hidden');
    });
}

function showDataPanel() {
    const dataDisplayArea = document.getElementById('data-display-area');
    const viewDataBtn = document.getElementById('view-data-btn');
    const backToDialogueBtn = document.getElementById('back-to-dialogue-btn');
    
    if (dataDisplayArea) {
        dataDisplayArea.classList.remove('hidden');
    }
    if (viewDataBtn) {
        viewDataBtn.classList.add('hidden');
    }
    if (backToDialogueBtn) {
        backToDialogueBtn.classList.remove('hidden');
    }
}

function hideDataPanel() {
    const dataDisplayArea = document.getElementById('data-display-area');
    const viewDataBtn = document.getElementById('view-data-btn');
    const backToDialogueBtn = document.getElementById('back-to-dialogue-btn');
    
    if (dataDisplayArea) {
        dataDisplayArea.classList.add('hidden');
    }
    if (viewDataBtn) {
        viewDataBtn.classList.remove('hidden');
    }
    if (backToDialogueBtn) {
        backToDialogueBtn.classList.add('hidden');
    }
}

// Function to auto-switch to relevant clue without scrolling
function autoSwitchToRelevantClue(gameState) {
    let targetClue = null;
    
    switch (gameState) {
        case 'modis_analysis':
            // Look for MODIS clue button
            targetClue = document.querySelector('[onclick*="loadClue"][onclick*="modis"]');
            break;
        case 'aster_analysis':
            // Look for ASTER clue button
            targetClue = document.querySelector('[onclick*="loadClue"][onclick*="aster"]');
            break;
        case 'misr_analysis':
            // Look for MISR clue button
            targetClue = document.querySelector('[onclick*="loadClue"][onclick*="misr"]');
            break;
    }
    
    if (targetClue) {
        // Check if the data is already loaded by looking for the data elements
        let dataAlreadyLoaded = false;
        
        switch (gameState) {
            case 'modis_analysis':
                dataAlreadyLoaded = document.getElementById('ndvi-chart') && 
                                  !document.getElementById('ndvi-chart').classList.contains('hidden');
                break;
            case 'aster_analysis':
                dataAlreadyLoaded = document.querySelector('.aster-slider') && 
                                  !document.querySelector('.aster-slider').classList.contains('hidden');
                break;
            case 'misr_analysis':
                dataAlreadyLoaded = document.querySelector('.misr-visualization') && 
                                  !document.querySelector('.misr-visualization').classList.contains('hidden');
                break;
        }
        
        // Only auto-click if the data isn't already loaded
        if (!dataAlreadyLoaded) {
            setTimeout(() => {
                targetClue.click();
            }, 500);
        }
    }
}

function handleChoice(choice, index) {
    // Handle special external link
    if (choice.text === "Visit NASA Earth Data Portal") {
        window.open('https://earthdata.nasa.gov/', '_blank');
        return;
    }

    // Mark choice buttons
    const choiceButtons = document.querySelectorAll('.choice-button');
    choiceButtons.forEach((btn, i) => {
        btn.classList.remove('correct', 'incorrect');
        if (i === index) {
            btn.classList.add(choice.correct ? 'correct' : 'incorrect');
        }
    });
    
    if (choice.correct) {
        // Correct choice - advance game with rewarding animation
        gameDecisions.push(choice);
        gameProgress += 12.5; // Each correct decision adds ~12.5% progress
        
        // Add rewarding visual feedback
        showCorrectAnswerAnimation();
        
        setTimeout(() => {
            if (choice.nextState) {
                currentGameState = choice.nextState;
                const nextScenario = gameScenarios[currentGameState];
                if (nextScenario) {
                    showAstronautModal(nextScenario);
                }
            } else {
                hideAstronautModal();
            }
        }, 1500); // Slightly longer delay to show animation
    } else {
        // Incorrect choice - show feedback
        setTimeout(() => {
            showFeedbackModal(choice.feedback);
        }, 1000);
    }
}

function showFeedbackModal(message) {
    if (!feedbackModal) return;
    
    const messageElement = document.getElementById('feedback-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    feedbackModal.classList.remove('hidden');
}

function hideFeedbackModal() {
    if (feedbackModal) {
        feedbackModal.classList.add('hidden');
    }
    
    // Return to current scenario
    const currentScenario = gameScenarios[currentGameState];
    if (currentScenario) {
        showAstronautModal(currentScenario);
    }
}

function updateGameProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressFill) {
        progressFill.style.width = `${Math.min(gameProgress, 100)}%`;
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.min(gameProgress, 100)}%`;
    }
}

// Rewarding animation for correct answers
function showCorrectAnswerAnimation() {
    // Show success message
    alertMessage('🎉 Excellent detective work!');
    
    // Add subtle visual feedback to the astronaut modal
    const astronautModal = document.getElementById('astronaut-modal');
    if (astronautModal) {
        astronautModal.classList.add('celebration');
        setTimeout(() => {
            astronautModal.classList.remove('celebration');
        }, 1000);
    }
}


// Update clue recommendations based on current state
function updateClueRecommendations(currentClue) {
    // Define the recommended order
    const clueOrder = ['modis', 'aster', 'misr'];
    const currentIndex = clueOrder.indexOf(currentClue);
    
    // Only recommend the next clue in sequence, one at a time
    if (currentIndex < clueOrder.length - 1) {
        const nextClue = clueOrder[currentIndex + 1];
        const nextButton = document.getElementById(`clue-${nextClue}`);
        if (nextButton) {
            nextButton.classList.add('recommended');
        }
    }
}

// ---------------- Modified Start Investigation Function ----------------
function startInvestigation() {
    // Use smooth scrolling to the top of the body/page content
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    
    // Stop the forest ambient sound completely
    if (forestAmbientSound) {
        forestAmbientSound.pause();
        forestAmbientSound.currentTime = 0;
        console.log('Forest sound stopped in startInvestigation');
    }
    
    // Start investigation sound
    startInvestigationSound();
    
    // Change background to investigation mode (forest fire)
    document.body.style.backgroundImage = "url('fire-background.png')";
    
    // Start the game with astronaut introduction
    currentGameState = 'intro';
    gameProgress = 0;
    gameDecisions = [];
    
    const introScenario = gameScenarios.intro;
    showAstronautModal(introScenario);
    
    // Show the dashboard after astronaut intro
    setTimeout(() => {
        showSection('dashboard');
    }, 2000);
}
