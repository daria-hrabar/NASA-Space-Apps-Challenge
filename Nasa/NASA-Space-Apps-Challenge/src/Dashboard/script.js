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

	// Initialize dataset-specific map/layer when a dataset clue is selected
	try {
		handleClueDataset(clueKey);
	} catch (e) {
		console.warn('Dataset init error:', e);
	}

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

// ---------------- Multi-dataset (GIBS) Integration ----------------
// Global state for the map and active dataset
let gisMap = null;
let activeLayer = null;
let activeDataset = null; // 'modis'|'misr'|'aster'|'mopitt'
let playInterval = null;

function formatGibsDate(year, month = 1, day = 1) {
	const mm = String(month).padStart(2, '0');
	const dd = String(day).padStart(2, '0');
	return `${year}-${mm}-${dd}`;
}

function productForClue(clueKey) {
	// Map our clue keys to NASA GIBS product identifiers (best-effort)
	switch (clueKey) {
		case 'modis':
			return 'MODIS_Terra_CorrectedReflectance_TrueColor';
		case 'misr':
			// MISR aerosol/optical depth product (use a visible-sounding product if needed)
			return 'MISR_Aerosol_Optical_Depth';
		case 'aster':
			// ASTER true color or similar high-resolution product
			return 'ASTER_GED_L3_Topography_Shaded_Relief';
		case 'mopitt':
			// MOPITT CO column or L3 product
			return 'MOPITT_CO_Column';
		default:
			return null;
	}
}

function createGibsLayer(product, dateStr) {
	return L.tileLayer(
		`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${product}/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
		{ attribution: 'NASA EOSDIS GIBS', tileSize: 256, minZoom: 1, maxZoom: 9 }
	);
}

function ensureMap() {
	if (gisMap) return gisMap;
	const container = document.getElementById('map') || document.getElementById('modis-map');
	if (!container) {
		// Map container not present in this page - nothing to initialize
		return null;
	}
	gisMap = L.map(container).setView([-3, -60], 4);
	return gisMap;
}

function setActiveDataset(clueKey, year = 2021) {
	const product = productForClue(clueKey);
	if (!product) return;
	const map = ensureMap();
	if (!map) return;
	const dateStr = formatGibsDate(year, 1, 1);
	const layer = createGibsLayer(product, dateStr);
	layer.addTo(map);
	if (activeLayer) map.removeLayer(activeLayer);
	activeLayer = layer;
	activeDataset = clueKey;
}

function updateActiveDatasetYear(year) {
	if (!activeDataset) return;
	setActiveDataset(activeDataset, year);
}

function startPlay() {
	if (playInterval) return;
	const slider = document.getElementById('time-slider');
	if (!slider) return;
	playInterval = setInterval(() => {
		let val = Number(slider.value);
		if (isNaN(val)) val = 0;
		// support both percent 0-100 or direct years 2018-2024
		let year = null;
		if (val >= 0 && val <= 100) {
			year = 2018 + Math.round((val / 100) * (2024 - 2018));
		} else {
			year = Math.round(val);
		}
		const next = year >= 2024 ? 2018 : year + 1;
		// set slider accordingly
		if (Number(slider.max) > 100) {
			slider.value = String(next);
		} else {
			const pct = ((next - 2018) / (2024 - 2018)) * 100;
			slider.value = String(pct);
		}
		slider.dispatchEvent(new Event('input'));
	}, 900);
}

function stopPlay() {
	if (!playInterval) return;
	clearInterval(playInterval);
	playInterval = null;
}

// Called by loadClue to initialize the appropriate dataset view
function handleClueDataset(clueKey) {
	const product = productForClue(clueKey);
	if (!product) return; // no dataset mapped
	// If controls are hidden for this clue, still initialize a static layer
	const initialYear = (clueData[clueKey] && clueData[clueKey].year && clueData[clueKey].year !== 'N/A')
		? Number(clueData[clueKey].year) : 2021;
	setActiveDataset(clueKey, initialYear);
}

