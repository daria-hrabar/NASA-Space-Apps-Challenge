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
let verdictSection;
let mainDataViewHeader;
let dataContentPlaceholder;
// sliderValueDisplay removed - using modis-slider-value instead
let clueButtons;

// Audio variables
let forestAmbientSound;
let investigationSound;
let isMuted = false;
let currentVolume = 0.3;


// Initial setup to ensure only the hero is shown and to assign all DOM variables safely
document.addEventListener('DOMContentLoaded', () => {
    // Assign all DOM elements now that the DOM is fully loaded
    heroSection = document.getElementById('hero');
    dashboardSection = document.getElementById('case-dashboard');
    verdictSection = document.getElementById('verdict-page');
    mainDataViewHeader = document.getElementById('data-view-header');
    dataContentPlaceholder = document.getElementById('data-content-placeholder');
    clueButtons = document.querySelectorAll('.clue-button');
    // sliderValueDisplay removed - using modis-slider-value instead
    
    // Initial section visibility setup
    if (heroSection && dashboardSection && verdictSection) {
        heroSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
        verdictSection.classList.add('hidden');
    } else {
        console.error("Critical: Initial sections (hero, dashboard, verdict) not found.");
    }
    
    // Note: Time slider is now handled by MODIS-specific slider
    
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
    
    // Stop the forest ambient sound
    if (forestAmbientSound) {
        forestAmbientSound.pause();
        forestAmbientSound.currentTime = 0;
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
    if (!heroSection || !dashboardSection || !verdictSection) {
        console.error("ShowSection Error: Section references are not initialized.");
        return;
    }
    
    // Hide all sections
    heroSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    verdictSection.classList.add('hidden');

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
        }
        // Start investigation sound if not already playing
        if (!investigationSound || investigationSound.paused) {
            startInvestigationSound();
        }
        // Ensure the MODIS clue is loaded and active when entering the dashboard
        loadClue('modis', document.getElementById('clue-modis')); 
    } else if (sectionId === 'verdict') {
        verdictSection.classList.remove('hidden');
        // Stop forest sound when going to Verdict
        if (forestAmbientSound) {
            forestAmbientSound.pause();
            forestAmbientSound.currentTime = 0;
        }
        // Start investigation sound if not already playing
        if (!investigationSound || investigationSound.paused) {
            startInvestigationSound();
        }
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
    
    // For MODIS, don't replace content since it's now in HTML
    if (clueKey !== 'modis') {
        // Hide MODIS visualization and show data placeholder
        const modisVisualization = document.getElementById('modis-visualization');
        if (modisVisualization) {
            modisVisualization.classList.add('hidden');
        }
        if (dataContentPlaceholder) {
            dataContentPlaceholder.classList.remove('hidden');
            dataContentPlaceholder.innerHTML = data.content;
        }
    } else {
        // Hide data placeholder and show MODIS visualization
        if (dataContentPlaceholder) {
            dataContentPlaceholder.classList.add('hidden');
        }
        const modisVisualization = document.getElementById('modis-visualization');
        if (modisVisualization) {
            modisVisualization.classList.remove('hidden');
        }
        
        // Initialize MODIS visualization when MODIS clue is selected
        loadMODISVisualization();
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
