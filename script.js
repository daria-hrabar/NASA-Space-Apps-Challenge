// MODIS API Configuration
const MODIS_CONFIG = {
    baseUrl: 'https://modis.ornl.gov/rst/api/v1',
    product: 'MOD13Q1', // Vegetation Indices product
    location: {
        latitude: -3.4653,  // Amazon Basin coordinates
        longitude: -62.2159,
        name: 'Amazon Basin, Brazil'
    },
    timeRange: {
        start: 'A2018001', // 2018
        end: 'A2025365'    // 2025
    },
    area: {
        kmAboveBelow: 3,
        kmLeftRight: 3
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
        content: "[ANIMATION PLACEHOLDER] <br> MISR Smoke Plume 3-Day Movement",
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
            { text: "I need more information first", correct: false, feedback: "I understand your caution, but time is critical in environmental investigations. The evidence we need is time-sensitive and could disappear. Let's start with what we have and build from there." }
        ],
        showProgress: false
    },
    clue_selection: {
        message: "Great! Our Terra instruments detected three anomalies. Look at the data panel above - which instrument should we examine first to understand the deforestation pattern?",
        choices: [
            { text: "MODIS - Long-term vegetation data", correct: true, nextState: 'modis_analysis' },
            { text: "ASTER - High-resolution imagery", correct: false, feedback: "ASTER is excellent for detailed analysis! However, in environmental investigations, we typically start with the broader perspective. MODIS gives us the long-term vegetation trends that help us understand the overall pattern before diving into specifics." },
            { text: "MISR - Aerosol tracking", correct: false, feedback: "MISR is crucial for understanding atmospheric impacts! But first, we need to establish what's happening to the vegetation itself. Let's start with MODIS to see the vegetation changes, then we can examine how those changes affect the atmosphere." }
        ],
        showProgress: true
    },
    modis_analysis: {
        message: "Perfect! Let me show you the MODIS data. Click on the MODIS clue above to examine the interactive visualization with animations and detailed analysis. What does this data indicate about forest health?",
        choices: [
            { text: "The forest is recovering", correct: false, feedback: "I can see why you might think that! However, if you look closely at the NDVI values, they're actually decreasing over time. In NDVI data, higher values indicate healthier, denser vegetation. The declining trend suggests the opposite of recovery - it shows vegetation loss." },
            { text: "The forest is losing vegetation", correct: true, nextState: 'aster_choice' },
            { text: "The data is inconclusive", correct: false, feedback: "I understand the data can seem complex! But the NDVI trend is actually quite clear - it's a standardized measure where decreasing values consistently indicate vegetation loss. The pattern shows a steady decline, which is a clear signal of environmental change." }
        ],
        showProgress: true
    },
    aster_choice: {
        message: "Exactly! Now click on the ASTER clue above to examine the high-resolution imagery. Use the image slider to compare 2020 vs 2023 and see the specific damage patterns.",
        choices: [
            { text: "Yes, let's see the detailed imagery", correct: true, nextState: 'aster_analysis' },
            { text: "Let's check MISR for smoke patterns", correct: false, feedback: "MISR is definitely important for understanding atmospheric effects! But in environmental forensics, we need to establish the 'ground truth' first. ASTER will show us exactly what happened to the forest surface, which helps us understand what might be causing the atmospheric changes we'd see in MISR data." }
        ],
        showProgress: true
    },
    aster_analysis: {
        message: "Now examine the ASTER imagery above - click on the ASTER clue to see the interactive before/after comparison with the image slider. Look at the geometric clearing patterns and systematic deforestation. What damage pattern do you observe?",
        choices: [
            { text: "Natural forest fires", correct: false, feedback: "That's a good observation about fire patterns! However, if you examine the imagery more closely, you'll notice the clearing patterns are very geometric and systematic - this suggests human activity rather than natural fire spread, which typically follows more organic, irregular boundaries." },
            { text: "Systematic deforestation", correct: true, nextState: 'misr_choice' },
            { text: "Seasonal changes", correct: false, feedback: "Seasonal changes are definitely important to consider! But the ASTER imagery shows permanent, structural changes to the landscape rather than temporary seasonal variations. The patterns indicate long-term, systematic alteration of the forest structure." }
        ],
        showProgress: true
    },
    misr_choice: {
        message: "Correct! Now click on the MISR clue above to examine the aerosol data. Look at the smoke plume patterns to see how this deforestation affects air quality.",
        choices: [
            { text: "Yes, check the smoke and aerosol patterns", correct: true, nextState: 'misr_analysis' },
            { text: "We have enough evidence", correct: false, feedback: "I appreciate your confidence in the evidence we've gathered! However, environmental investigations require a complete picture. MISR data will show us how this deforestation affects air quality and atmospheric conditions - this is crucial for understanding the full environmental impact on communities." }
        ],
        showProgress: true
    },
    misr_analysis: {
        message: "Now examine the MISR data above - click on the MISR clue to see the interactive aerosol visualization. Look at the smoke plume patterns and their extent to understand the environmental impact. What does this tell us about the consequences?",
        choices: [
            { text: "No significant impact", correct: false, feedback: "I can understand why the scale might not be immediately obvious! But the MISR data actually shows massive aerosol plumes that extend far beyond the immediate deforestation area. These plumes represent significant air quality degradation that affects thousands of people in surrounding communities." },
            { text: "Major air quality impact on communities", correct: true, nextState: 'verdict_choice' },
            { text: "Only local effects", correct: false, feedback: "That's a reasonable assumption about local impacts! However, aerosol plumes from deforestation can actually travel hundreds of kilometers downwind, affecting air quality in many communities far from the original source. The MISR data shows these widespread atmospheric effects." }
        ],
        showProgress: true
    },
    verdict_choice: {
        message: "Excellent work! You've examined all the data - MODIS vegetation trends, ASTER imagery, and MISR aerosol patterns. Based on this evidence, what's your verdict on the cause?",
        choices: [
            { text: "Natural climate change", correct: false, feedback: "Climate change is definitely a factor in environmental changes! However, the evidence we've gathered shows systematic, geometric patterns of deforestation that are characteristic of human activity rather than natural climate-driven changes. The systematic nature of the clearing suggests deliberate human intervention." },
            { text: "Human-caused deforestation and fires", correct: true, nextState: 'mission_complete' },
            { text: "Unknown causes", correct: false, feedback: "I understand the complexity can make it seem unclear! But the evidence we've collected actually tells a clear story: the systematic patterns in ASTER imagery, combined with the NDVI decline in MODIS data and the aerosol plumes in MISR data, all point to human-caused deforestation with significant environmental consequences." }
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
        message: "The good news is that we can take action! There are proven solutions to combat deforestation and protect our planet's future.",
        dataDisplay: "solutions",
        choices: [
            { text: "View Mission Summary", correct: true, nextState: 'mission_summary' },
            { text: "Start New Investigation", correct: true, nextState: 'intro' }
        ],
        showProgress: false
    },
    mission_summary: {
        message: "Excellent detective work! You've successfully completed your environmental investigation. However, the findings reveal a critical environmental crisis that demands immediate attention.",
        dataDisplay: "summary",
        choices: [
            { text: "Start New Investigation", correct: true, nextState: 'intro' },
            { text: "View Team Credits", correct: true, nextState: 'team_credits' }
        ],
        showProgress: false
    },
    team_credits: {
        message: "This investigation was made possible by our amazing team of Earth scientists and developers. Thank you for helping protect our planet!",
        dataDisplay: "team",
        choices: [
            { text: "Start New Investigation", correct: true, nextState: 'intro' },
            { text: "Learn More About NASA", correct: true, nextState: 'nasa_info' }
        ],
        showProgress: false
    },
    nasa_info: {
        message: "NASA's Earth Science Division uses satellite data to monitor our planet's health. Your investigation skills mirror those of real NASA scientists!",
        dataDisplay: "nasa",
        choices: [
            { text: "Start New Investigation", correct: true, nextState: 'intro' },
            { text: "Visit NASA Earth Data", correct: true, nextState: 'external_nasa' }
        ],
        showProgress: false
    },
    external_nasa: {
        message: "Ready to explore real NASA Earth data? This will open NASA's official Earth data portal where you can access the same tools used by scientists worldwide!",
        choices: [
            { text: "Visit NASA Earth Data Portal", correct: true, nextState: 'mission_complete' },
            { text: "Start New Investigation", correct: true, nextState: 'intro' }
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
});

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
    alertMessage("CASE FILE OPENED. Awaiting initial data reports from MODIS.");
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
        // Stop forest sound when going to Case File
        if (forestAmbientSound) {
            forestAmbientSound.pause();
            forestAmbientSound.currentTime = 0;
            console.log('Forest sound stopped in dashboard section');
        }
        // Start investigation sound if not already playing
        if (!investigationSound || investigationSound.paused) {
            startInvestigationSound();
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
    const { kmAboveBelow, kmLeftRight } = MODIS_CONFIG.area;
    const startDate = `A${year}001`;
    const endDate = `A${year}365`;
    
    const apiUrl = `${MODIS_CONFIG.baseUrl}/${MODIS_CONFIG.product}/subset?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&kmAboveBelow=${kmAboveBelow}&kmLeftRight=${kmLeftRight}`;
    
    try {
        console.log(`Fetching MODIS data for ${year}...`);
        
        // Add CORS mode and headers to handle cross-origin requests
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('MODIS API Error (likely CORS):', error);
        // Return null to trigger fallback to demo data
        return null;
    }
}

async function processNDVIData() {
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const ndviData = [];
    
    // Try to fetch data for first year to check if API is accessible
    const testData = await fetchMODISData(2018);
    if (!testData) {
        console.log('MODIS API not accessible, using demo data');
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
            alertMessage(`MODIS Data Loaded: ${ndviData.length} data points from ${MODIS_CONFIG.location.name}`);
        } else {
            throw new Error('No NDVI data received');
        }
    } catch (error) {
        console.error('MODIS Visualization Error:', error);
        
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Show error message
        alertMessage('MODIS API not accessible (CORS restriction). Using demo data...');
        
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
                <h3>NDVI Time Series - ${MODIS_CONFIG.location.name} (Demo Data)</h3>
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
    }
}

// ---------------- Helper Functions ----------------
function hideAllVisualizations() {
    // Hide all visualization containers
    const modisVisualization = document.getElementById('modis-visualization');
    const asterVisualization = document.getElementById('aster-visualization');
    const dataContentPlaceholder = document.getElementById('data-content-placeholder');
    
    if (modisVisualization) modisVisualization.classList.add('hidden');
    if (asterVisualization) asterVisualization.classList.add('hidden');
    if (dataContentPlaceholder) dataContentPlaceholder.classList.add('hidden');
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
        
        alertMessage('ASTER True Color Imagery Loaded');
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
    
    // 1. Update the active button state
    clueButtons.forEach(btn => btn.classList.remove('active'));
    if (clickedButton) {
        clickedButton.classList.add('active');
    } else {
        // If called without a button (e.g., initial load), find and activate it
        const modisButton = document.getElementById(`clue-${clueKey}`);
        if (modisButton) modisButton.classList.add('active');
    }

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
        }
        loadMODISVisualization();
    } else if (clueKey === 'aster') {
        // Hide other visualizations and show ASTER
        hideAllVisualizations();
        const asterVisualization = document.getElementById('aster-visualization');
        if (asterVisualization) {
            asterVisualization.classList.remove('hidden');
        }
        loadASTERVisualization();
    } else {
        // For other clues (MISR), show data placeholder
        hideAllVisualizations();
        if (dataContentPlaceholder) {
            dataContentPlaceholder.classList.remove('hidden');
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
    alertMessage(`Loading ${clueKey.toUpperCase()} Data...`);
    
    // Load MODIS visualization if this is the MODIS clue
    if (clueKey === 'modis') {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            loadMODISVisualization();
        }, 500);
    }
}

// ---------------- NDVI Animation Functions ----------------
function playNDVIAnimation() {
    const satelliteImage = document.getElementById('satellite-image');
    if (!satelliteImage) {
        alertMessage('No MODIS imagery available for animation');
        return;
    }
    
    alertMessage('Playing MODIS Time-lapse Animation...');
    
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
            alertMessage('Animation Complete - Deforestation Pattern Revealed');
        }
    }, 1000);
}

function resetMODISView() {
    alertMessage('Resetting MODIS view to 2018...');
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
            astronautModal.style.backdropFilter = 'blur(10px)';
        } else {
            // Desktop positioning for data examination scenarios
            const dataExaminationStates = ['modis_analysis', 'aster_analysis', 'misr_analysis'];
            if (dataExaminationStates.includes(currentGameState)) {
                // Position popup to not block data
                astronautModal.style.position = 'fixed';
                astronautModal.style.top = '20px';
                astronautModal.style.right = '20px';
                astronautModal.style.bottom = 'auto';
                astronautModal.style.left = 'auto';
                astronautModal.style.width = '400px';
                astronautModal.style.maxWidth = '400px';
                astronautModal.style.background = 'rgba(0, 0, 0, 0.1)';
                astronautModal.style.backdropFilter = 'none';
            } else {
                // Reset to default positioning
                astronautModal.style.position = '';
                astronautModal.style.top = '';
                astronautModal.style.right = '';
                astronautModal.style.bottom = '';
                astronautModal.style.left = '';
                astronautModal.style.width = '';
                astronautModal.style.maxWidth = '';
                astronautModal.style.background = '';
                astronautModal.style.backdropFilter = '';
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
    }
}

function toggleAstronautModal() {
    if (!astronautModal) return;
    
    const collapseBtn = document.getElementById('collapse-btn');
    const floatingBtn = document.getElementById('floating-astronaut-btn');
    
    if (astronautModal.classList.contains('collapsed')) {
        // Expand
        astronautModal.classList.remove('collapsed');
        if (collapseBtn) collapseBtn.textContent = '−';
        if (floatingBtn) floatingBtn.classList.add('hidden');
        
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
        if (floatingBtn) floatingBtn.classList.remove('hidden');
        
        // On mobile, make it a small floating button
        if (isMobile) {
            astronautModal.style.position = 'fixed';
            astronautModal.style.top = 'auto';
            astronautModal.style.left = 'auto';
            astronautModal.style.right = '15px';
            astronautModal.style.bottom = '15px';
            astronautModal.style.width = '70px';
            astronautModal.style.height = '70px';
            astronautModal.style.borderRadius = '50%';
            astronautModal.style.background = '#ff4444';
            astronautModal.style.display = 'flex';
            astronautModal.style.alignItems = 'center';
            astronautModal.style.justifyContent = 'center';
            astronautModal.style.border = '4px solid white';
            astronautModal.style.boxShadow = '0 6px 25px rgba(255, 68, 68, 0.7)';
            astronautModal.style.backdropFilter = 'none';
        }
    }
}

function expandAstronautModal() {
    if (!astronautModal) return;
    
    const collapseBtn = document.getElementById('collapse-btn');
    const floatingBtn = document.getElementById('floating-astronaut-btn');
    
    astronautModal.classList.remove('collapsed');
    if (collapseBtn) collapseBtn.textContent = '−';
    if (floatingBtn) floatingBtn.classList.add('hidden');
}

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
        // Correct choice - advance game
        gameDecisions.push(choice);
        gameProgress += 12.5; // Each correct decision adds ~12.5% progress
        
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
        }, 1000);
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
