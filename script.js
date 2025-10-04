// Data structure for dynamically loading clue content
const clueData = {
    'modis': {
        header: "CLUE 1: M.O. (MODIS) - LONG-TERM NDVI DECLINE",
        content: "[INTERACTIVE MAP/GLOBE SIMULATION] <br> MODIS NDVI Time Series (2018-2023)",
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
    'mopitt': {
        header: "CLUE 4: M.O.P. (MOPITT): The Toxicologist - CARBON MONOXIDE SIGNATURE",
        content: "[DATA VISUALIZATION] <br> MOPITT CO Emissions Over Region",
        year: '2023',
        showControls: true
    }
};

// DOM Element Variables (Declared globally, assigned in DOMContentLoaded)
let heroSection;
let dashboardSection;
let verdictSection;
let mainDataViewHeader;
let dataContentPlaceholder;
let sliderValueDisplay;
let clueButtons;


// Initial setup to ensure only the hero is shown and to assign all DOM variables safely
document.addEventListener('DOMContentLoaded', () => {
    // Assign all DOM elements now that the DOM is fully loaded
    heroSection = document.getElementById('hero');
    dashboardSection = document.getElementById('case-dashboard');
    verdictSection = document.getElementById('verdict-page');
    mainDataViewHeader = document.getElementById('data-view-header');
    dataContentPlaceholder = document.getElementById('data-content-placeholder');
    clueButtons = document.querySelectorAll('.clue-button');
    sliderValueDisplay = document.getElementById('slider-value');
    
    // Initial section visibility setup
    if (heroSection && dashboardSection && verdictSection) {
        heroSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
        verdictSection.classList.add('hidden');
    } else {
        console.error("Critical: Initial sections (hero, dashboard, verdict) not found.");
    }
    
    // Attach event listener to the slider (guaranteed to exist now)
    const timeSlider = document.getElementById('time-slider');
    if (timeSlider) {
        timeSlider.addEventListener('input', updateSliderValue);
    }
});

// ---------------- Section Switching ----------------
function startInvestigation() {
    // Use smooth scrolling to the top of the body/page content
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    
    // Change background to investigation mode
    document.body.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0ic3BhY2VHcmFkaWVudCIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiLz4KPHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiMwMDAwNDAiLz4KPHN0b3Agb2Zmc2V0PSI3MCUiIHN0b3AtY29sb3I9IiMwMDAwODAiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSJ1cmwoI3NwYWNlR3JhZGllbnQpIi8+CjwhLS0gU3RhcnMgLS0+CjxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjMwMCIgeT0iMTUwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjUwMCIgeT0iODAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iNzAwIiB5PSIyMDAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iOTAwIiB5PSIxMjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iMTEwMCIgeT0iMTgwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmZmZmIi8+CjwhLS0gRWFydGggLS0+CjxyZWN0IGN4PSI2MDAiIGN5PSI0MDAiIHI9IjgwIiBmaWxsPSIjMDA0MDAwIi8+CjxyZWN0IGN4PSI2MDAiIGN5PSI0MDAiIHI9IjcwIiBmaWxsPSIjMDA2MDAwIi8+CjxyZWN0IGN4PSI2MDAiIGN5PSI0MDAiIHI9IjYwIiBmaWxsPSIjMDA4MDAwIi8+CjwhLS0gU2F0ZWxsaXRlcyAtLT4KPHJlY3QgeD0iNDAwIiB5PSIyMDAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmMDAiLz4KPHJlY3QgeD0iODAwIiB5PSIzMDAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmMDAiLz4KPHJlY3QgeD0iNTAwIiB5PSI1MDAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmZmMDAiLz4KPC9zdmc+')";
    
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
    } else if (sectionId === 'dashboard') {
        dashboardSection.classList.remove('hidden');
        // Ensure the MODIS clue is loaded and active when entering the dashboard
        loadClue('modis', document.getElementById('clue-modis')); 
    } else if (sectionId === 'verdict') {
        verdictSection.classList.remove('hidden');
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
    dataContentPlaceholder.innerHTML = data.content;

    // 3. Update the slider display based on the clue type
    if (timeSliderControl && buttonGroupControl) {
        if (data.showControls) {
            timeSliderControl.style.display = 'flex';
            buttonGroupControl.style.display = 'flex';
            
            // Only update slider value if controls are shown and display variable exists
            if (data.year !== 'N/A' && sliderValueDisplay) {
                sliderValueDisplay.textContent = data.year;
            }

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
}

// ---------------- UI Control Functions ----------------
function updateSliderValue(event) {
    // Simple placeholder logic to map slider position (0-100) to years (2018-2024)
    const value = event.target.value;
    const startYear = 2018;
    const endYear = 2024;
    const currentYear = startYear + Math.round((value / 100) * (endYear - startYear));
    
    if (sliderValueDisplay) {
        sliderValueDisplay.textContent = currentYear;
    }
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
