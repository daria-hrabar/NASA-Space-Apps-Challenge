// Mobile-Optimized JavaScript - Clean and Simple

class MobileTerraTracker {
    constructor() {
        this.currentSection = 'home';
        this.currentGameState = 'intro';
        this.gameProgress = 0;
        this.isMuted = false;
        this.volume = 0.3;
        this.forestSound = null;
        this.investigationSound = null;
        this.modalTimeout = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAudio();
        this.showSection('home');
        
        // Ensure modal is hidden on startup and prevent any frozen states
        setTimeout(() => {
            this.hideModal();
            // Clear any existing modal content
            const modal = document.getElementById('mobile-modal');
            if (modal) {
                modal.classList.remove('active');
            }
            document.body.style.overflow = '';
        }, 100);
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('menu-btn').addEventListener('click', () => this.toggleNav());
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Investigation
        document.getElementById('start-investigation').addEventListener('click', () => this.startInvestigation());
        document.querySelectorAll('.clue-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.loadClue(e.target.dataset.clue));
        });
        document.getElementById('resume-investigation').addEventListener('click', () => this.showCurrentModal());

        // Team actions
        document.getElementById('nasa-info-btn').addEventListener('click', () => this.showNasaInfo());
        document.getElementById('back-home-btn').addEventListener('click', () => this.showSection('home'));

        // Modal
        document.getElementById('close-modal').addEventListener('click', () => this.hideModal());
        document.getElementById('mobile-modal').addEventListener('click', (e) => {
            if (e.target.id === 'mobile-modal') this.hideModal();
        });

        // Volume
        document.getElementById('volume-btn').addEventListener('click', () => this.toggleVolumeControl());
        document.getElementById('volume-slider').addEventListener('input', (e) => this.setVolume(e.target.value));

        // Floating Astronaut
        document.getElementById('floating-astronaut').addEventListener('click', () => this.showCurrentModal());
    }

    initializeAudio() {
        try {
            this.forestSound = new Audio('forest-ambient.mp3');
            this.forestSound.loop = true;
            this.forestSound.volume = this.volume;
            
            this.investigationSound = new Audio('investigation-ambient.mp3');
            this.investigationSound.loop = true;
            this.investigationSound.volume = this.volume;
        } catch (error) {
            console.log('Audio initialization failed:', error);
        }
    }

    toggleNav() {
        const nav = document.getElementById('mobile-nav');
        nav.classList.toggle('active');
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.mobile-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
        
        this.currentSection = section;
        this.toggleNav();

        // Handle section-specific logic
        if (section === 'investigation' && this.currentGameState === 'intro') {
            this.startGame();
        }
    }

    startInvestigation() {
        this.switchSection('investigation');
        this.startGame();
    }

    startGame() {
        this.currentGameState = 'intro';
        this.gameProgress = 0;
        this.updateProgress();
        this.updateResumeButton();
        
        // Play investigation sound
        if (this.investigationSound) {
            this.investigationSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Stop forest sound
        if (this.forestSound) {
            this.forestSound.pause();
        }

        // Small delay to ensure UI is ready
        setTimeout(() => {
            this.showModal({
                message: "Welcome, Earth Detective! I'm Commander Terra. We've detected unusual activity in the Amazon Basin. Ready to investigate?",
                choices: [
                    { text: "Yes, let's investigate!", action: () => this.showClueSelection() },
                    { text: "I need more information first", action: () => this.showFeedback("Time is critical in environmental investigations. Let's start with what we have and build from there.") }
                ]
            });
        }, 500);
    }

    showClueSelection() {
        this.currentGameState = 'clue_selection';
        this.gameProgress = 12.5;
        this.updateProgress();
        this.updateResumeButton();
        
        this.showModal({
            message: "Great! Our Terra instruments detected three anomalies. Which instrument should we examine first to understand the deforestation pattern?",
            choices: [
                { text: "MODIS - Long-term vegetation data", action: () => this.startMODISAnalysis() },
                { text: "ASTER - High-resolution imagery", action: () => this.showFeedback("ASTER is great for details! But we need the big picture first. MODIS shows long-term trends that help us understand the overall pattern.") },
                { text: "MISR - Aerosol tracking", action: () => this.showFeedback("MISR is important for atmospheric effects! But first, let's see what's happening to the vegetation itself with MODIS.") }
            ]
        });
    }

    startMODISAnalysis() {
        this.currentGameState = 'modis_analysis';
        this.gameProgress = 25;
        this.updateProgress();
        this.updateResumeButton();
        
        // Auto-load MODIS clue
        this.loadClue('modis');
        
        this.showModal({
            message: "Perfect! Now examine the MODIS data. What does this show about forest health?",
            choices: [
                { text: "The forest is recovering", action: () => this.showFeedback("The NDVI values are actually decreasing over time. Higher values indicate healthier vegetation, so the declining trend shows vegetation loss.") },
                { text: "The forest is losing vegetation", action: () => this.startASTERAnalysis() },
                { text: "The data is inconclusive", action: () => this.showFeedback("The NDVI trend is actually quite clear - decreasing values consistently indicate vegetation loss. The pattern shows a steady decline.") }
            ]
        });
    }

    startASTERAnalysis() {
        this.currentGameState = 'aster_analysis';
        this.gameProgress = 50;
        this.updateProgress();
        this.updateResumeButton();
        
        // Auto-load ASTER clue
        this.loadClue('aster');
        
        this.showModal({
            message: "Now examine the ASTER imagery to see the before/after comparison. Look at the clearing patterns. What do you observe?",
            choices: [
                { text: "Natural forest fires", action: () => this.showFeedback("The clearing patterns are very geometric and systematic - this suggests human activity rather than natural fire spread, which typically follows more organic, irregular boundaries.") },
                { text: "Systematic deforestation", action: () => this.startMISRAnalysis() },
                { text: "Seasonal changes", action: () => this.showFeedback("The ASTER imagery shows permanent, structural changes to the landscape rather than temporary seasonal variations. The patterns indicate long-term, systematic alteration of the forest structure.") }
            ]
        });
    }

    startMISRAnalysis() {
        this.currentGameState = 'misr_analysis';
        this.gameProgress = 75;
        this.updateProgress();
        this.updateResumeButton();
        
        // Auto-load MISR clue
        this.loadClue('misr');
        
        this.showModal({
            message: "Now examine the MISR data to see the aerosol visualization. Look at the smoke plume patterns. What does this tell us about the consequences?",
            choices: [
                { text: "No significant impact", action: () => this.showFeedback("The MISR data shows massive aerosol plumes that extend far beyond the immediate deforestation area. These plumes represent significant air quality degradation that affects thousands of people in surrounding communities.") },
                { text: "Major air quality impact on communities", action: () => this.showVerdict() },
                { text: "Only local effects", action: () => this.showFeedback("Aerosol plumes from deforestation can travel hundreds of kilometers downwind, affecting air quality in many communities far from the original source. The MISR data shows these widespread atmospheric effects.") }
            ]
        });
    }

    showVerdict() {
        this.currentGameState = 'verdict';
        this.gameProgress = 87.5;
        this.updateProgress();
        this.updateResumeButton();
        
        this.showModal({
            message: "Excellent work! You've examined all the data - MODIS vegetation trends, ASTER imagery, and MISR aerosol patterns. Based on this evidence, what's your verdict on the cause?",
            choices: [
                { text: "Natural climate change", action: () => this.showFeedback("The evidence shows systematic, geometric patterns of deforestation that are characteristic of human activity rather than natural climate-driven changes. The systematic nature of the clearing suggests deliberate human intervention.") },
                { text: "Human-caused deforestation and fires", action: () => this.showMissionComplete() },
                { text: "Unknown causes", action: () => this.showFeedback("The evidence tells a clear story: the systematic patterns in ASTER imagery, combined with the NDVI decline in MODIS data and the aerosol plumes in MISR data, all point to human-caused deforestation with significant environmental consequences.") }
            ]
        });
    }

    showMissionComplete() {
        this.currentGameState = 'mission_complete';
        this.gameProgress = 100;
        this.updateProgress();
        this.updateResumeButton();
        
        this.showModal({
            message: "🎉 Outstanding work, Detective! You've successfully identified human-caused deforestation in the Amazon Basin. Your investigation revealed systematic destruction of forest ecosystems and its impact on air quality for over 500,000 people. This is a critical environmental crisis that demands immediate attention.",
            choices: [
                { text: "Learn What This Means & How to Take Action", action: () => this.showSolutions() },
                { text: "Learn More About NASA's Earth Science", action: () => this.showNasaInfo() }
            ]
        });
    }

    showSolutions() {
        this.showModal({
            message: "🌍 What This Means: Your investigation revealed systematic deforestation affecting over 500,000 people. This isn't just about trees - it's accelerating climate change, destroying biodiversity, and threatening human health.\n\n🚀 How to Take Action: Support sustainable agriculture and reforestation projects, advocate for stronger environmental policies, reduce your carbon footprint, educate others about deforestation impacts, and support organizations fighting deforestation. Every action counts in protecting our planet!",
            choices: [
                { text: "View Mission Summary", action: () => this.showMissionSummary() },
                { text: "Learn More About NASA's Earth Science", action: () => this.showNasaInfo() }
            ]
        });
    }

    showMissionSummary() {
        this.showModal({
            message: "🎯 Mission Summary: You successfully identified human-caused deforestation in the Amazon Basin using NASA satellite data. Your investigation revealed a 15% NDVI decline from MODIS data, clear before/after deforestation patterns in ASTER imagery, and aerosol plumes affecting 500,000+ people from MISR data. This demonstrates the power of satellite data in environmental monitoring and the urgent need for action.",
            choices: [
                { text: "Learn More About NASA's Earth Science", action: () => this.showNasaInfo() },
                { text: "Back to Home", action: () => this.showSection('home') }
            ]
        });
    }

    showTeamCredits() {
        this.showModal({
            message: "This investigation was made possible by our amazing team of Earth scientists and developers. Thank you for helping protect our planet!",
            choices: [
                { text: "Learn More About NASA", action: () => this.showNasaInfo() },
                { text: "Back to Home", action: () => this.showSection('home') }
            ]
        });
    }

    showNasaInfo() {
        this.showModal({
            message: "🌍 NASA's Earth Science Division uses satellite data to monitor our planet's health. Your investigation skills mirror those of real NASA scientists!\n\n🛰️ Where to Find NASA Data: Access the NASA Earth Data Portal (earthdata.nasa.gov), MODIS data (modis.gsfc.nasa.gov), ASTER data (asterweb.jpl.nasa.gov), MISR data (misr.jpl.nasa.gov), and real-time Earth observations (worldview.earthdata.nasa.gov). These tools are used by scientists worldwide to monitor deforestation, climate change, and environmental health!",
            choices: [
                { text: "Back to Main Menu", action: () => this.showSection('home') }
            ]
        });
    }

    loadClue(clueType) {
        // Update clue buttons
        document.querySelectorAll('.clue-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${clueType}-clue`).classList.add('active');
        
        // Update data display
        const header = document.getElementById('data-header');
        const content = document.getElementById('data-content');
        
        switch (clueType) {
            case 'modis':
                header.textContent = 'CLUE 1: M.O. (MODIS) - LONG-TERM NDVI DECLINE';
                content.innerHTML = `
                    <div class="clue-content">
                        <div class="ndvi-chart">
                            <h3>NDVI Time Series - Amazon Basin</h3>
                            <div class="chart-bars">
                                <div class="chart-bar healthy" style="height: 87px;" data-ndvi="0.75" title="Year: 2018, NDVI: 0.750">2018</div>
                                <div class="chart-bar healthy" style="height: 86px;" data-ndvi="0.72" title="Year: 2019, NDVI: 0.720">2019</div>
                                <div class="chart-bar healthy" style="height: 84px;" data-ndvi="0.68" title="Year: 2020, NDVI: 0.680">2020</div>
                                <div class="chart-bar moderate" style="height: 80px;" data-ndvi="0.61" title="Year: 2021, NDVI: 0.610">2021</div>
                                <div class="chart-bar moderate" style="height: 72px;" data-ndvi="0.45" title="Year: 2022, NDVI: 0.450">2022</div>
                                <div class="chart-bar moderate" style="height: 69px;" data-ndvi="0.38" title="Year: 2023, NDVI: 0.380">2023</div>
                                <div class="chart-bar poor" style="height: 66px;" data-ndvi="0.32" title="Year: 2024, NDVI: 0.320">2024</div>
                                <div class="chart-bar poor" style="height: 64px;" data-ndvi="0.28" title="Year: 2025, NDVI: 0.280">2025</div>
                            </div>
                            <div class="chart-legend">
                                <span class="legend-healthy">● Healthy Vegetation (NDVI > 0.5)</span>
                                <span class="legend-moderate">● Moderate Vegetation (NDVI 0.3-0.5)</span>
                                <span class="legend-poor">● Poor Vegetation (NDVI < 0.3)</span>
                            </div>
                            <p class="chart-note">63% decline in vegetation health over 7 years (0.75 → 0.28)</p>
                        </div>
                    </div>
                `;
                break;
            case 'aster':
                header.textContent = 'CLUE 2: A.S.T. (ASTER) - HIGH-RES BEFORE/AFTER SCAR';
                content.innerHTML = `
                    <div class="clue-content">
                        <div class="aster-comparison">
                            <h3>ASTER True Color Imagery - Amazon Basin</h3>
                            
                            <!-- Before/After Satellite Images -->
                            <div class="satellite-images">
                                <div class="image-container">
                                    <h4>2001 - Before Deforestation</h4>
                                    <div class="image-with-overlay">
                                        <img src="matogrosso_ast_2001213_lrg.jpg" alt="ASTER 2001" class="satellite-image">
                                        <div class="forest-overlay healthy-forest">
                                            <div class="overlay-label">Healthy Forest</div>
                                        </div>
                                    </div>
                                    <p class="image-caption">Dense forest coverage - 95% forest cover</p>
                                </div>
                                <div class="image-container">
                                    <h4>2006 - After Deforestation</h4>
                                    <div class="image-with-overlay">
                                        <img src="matogrosso_ast_2006227_lrg.jpg" alt="ASTER 2006" class="satellite-image">
                                        <div class="forest-overlay deforested-area">
                                            <div class="overlay-label">Deforested Area</div>
                                        </div>
                                    </div>
                                    <p class="image-caption">Systematic clearing patterns - 60% forest cover</p>
                                </div>
                            </div>
                            
                            <!-- Color-coded Visualization -->
                            <div class="aster-visualization">
                                <h4>Land Cover Analysis</h4>
                                <div class="forest-visualization">
                                    <div class="forest-area">
                                        <div class="forest-pattern healthy"></div>
                                        <div class="deforestation-patches"></div>
                                    </div>
                                    <div class="visualization-info">
                                        <div class="forest-coverage">Forest Cover: 60%</div>
                                        <div class="deforestation-rate">Deforestation: 35% increase</div>
                                        <div class="description">Clearings tripled in size over 5 years</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="imagery-legend">
                                <div class="legend-item">
                                    <div class="legend-color healthy"></div>
                                    <span>Healthy Forest (Red/Infrared areas)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color degraded"></div>
                                    <span>Degraded Forest (Blue/Gray areas)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color deforested"></div>
                                    <span>Deforested Area (Gray/White areas)</span>
                                </div>
                            </div>
                            
                            <!-- Scientific Findings -->
                            <div class="scientific-findings">
                                <h4>Scientific Findings</h4>
                                <ul>
                                    <li>Croplands cleared were <strong>twice</strong> as large as pasture areas</li>
                                    <li>Bare land raises temperatures more than croplands or pasture</li>
                                    <li>These changes contribute to habitat loss and climate impacts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'misr':
                header.textContent = 'CLUE 3: M.I.S.R. (MISR) - AEROSOL/SMOKE PLUME TRACKING';
                content.innerHTML = `
                    <div class="clue-content">
                        <div class="misr-animation">
                            <h3>MISR Aerosol Data - Amazon Basin</h3>
                            <div class="satellite-images">
                                <div class="image-container">
                                    <h4>Landsat 7 - 2001</h4>
                                    <img src="yurimaguas_ls7_2001181_lrg.jpg" alt="Landsat 2001" class="satellite-image">
                                    <p class="image-caption">Historical baseline</p>
                                </div>
                                <div class="image-container">
                                    <h4>Landsat 8 - 2019</h4>
                                    <img src="yurimaguas_oli_2019191_lrg.jpg" alt="Landsat 2019" class="satellite-image">
                                    <p class="image-caption">Recent aerosol impact</p>
                                </div>
                            </div>
                            <div class="plume-visualization">
                                <h4>Smoke Plume Movement</h4>
                                <div class="plume-particles">
                                    <div class="plume-particle"></div>
                                    <div class="plume-particle"></div>
                                    <div class="plume-particle"></div>
                                </div>
                                <p class="plume-note">Aerosol plumes affecting 500,000+ people</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
        
        this.showAlert(`📡 Loading ${clueType.toUpperCase()} data...`);
    }

    showModal(data) {
        const modal = document.getElementById('mobile-modal');
        const message = document.getElementById('modal-message');
        const choices = document.getElementById('modal-choices');
        
        if (!modal || !message || !choices) {
            console.error('Modal elements not found');
            return;
        }
        
        // Clear any existing content and reset modal state
        message.textContent = '';
        choices.innerHTML = '';
        modal.classList.remove('active');
        
        // Set message content
        message.textContent = data.message;
        
        // Add choices with proper error handling
        if (data.choices && data.choices.length > 0) {
            data.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.hideModal();
                    setTimeout(() => {
                        try {
                            if (choice.action && typeof choice.action === 'function') {
                                choice.action();
                            }
                        } catch (error) {
                            console.error('Error executing choice action:', error);
                            this.showAlert('Something went wrong. Please try again.');
                        }
                    }, 300);
                });
                choices.appendChild(btn);
            });
        }
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Hide floating astronaut when modal is open
            this.hideFloatingAstronaut();
            
            // Safety timeout to prevent frozen modals
            this.modalTimeout = setTimeout(() => {
                console.log('Modal safety timeout triggered');
                this.hideModal();
            }, 30000); // 30 second timeout
        }, 50);
    }

    hideModal() {
        // Clear any existing timeout
        if (this.modalTimeout) {
            clearTimeout(this.modalTimeout);
            this.modalTimeout = null;
        }
        
        const modal = document.getElementById('mobile-modal');
        if (modal) {
            modal.classList.remove('active');
            // Don't clear content immediately - let it fade out first
            setTimeout(() => {
                const message = document.getElementById('modal-message');
                const choices = document.getElementById('modal-choices');
                if (message) message.textContent = '';
                if (choices) choices.innerHTML = '';
            }, 300);
        }
        document.body.style.overflow = '';
        
        // Show floating astronaut when modal is closed (if game is in progress)
        if (this.currentGameState !== 'intro' && this.currentGameState !== 'mission_complete') {
            setTimeout(() => {
                this.showFloatingAstronaut();
            }, 500);
        }
    }

    showFeedback(message) {
        this.showAlert(message);
        // Show modal again after a delay
        setTimeout(() => {
            this.showModal({
                message: "Let's try again. Look carefully at the data and make your best assessment.",
                choices: this.getCurrentChoices()
            });
        }, 2000);
    }

    getCurrentChoices() {
        // Return appropriate choices based on current game state
        switch (this.currentGameState) {
            case 'modis_analysis':
                return [
                    { text: "The forest is recovering", action: () => this.showFeedback("The NDVI values are actually decreasing over time. Higher values indicate healthier vegetation, so the declining trend shows vegetation loss.") },
                    { text: "The forest is losing vegetation", action: () => this.startASTERAnalysis() },
                    { text: "The data is inconclusive", action: () => this.showFeedback("The NDVI trend is actually quite clear - decreasing values consistently indicate vegetation loss. The pattern shows a steady decline.") }
                ];
            // Add other cases as needed
            default:
                return [];
        }
    }

    showAlert(message) {
        const alert = document.getElementById('mobile-alert');
        const alertText = document.getElementById('alert-text');
        
        alertText.textContent = message;
        alert.classList.add('show');
        
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) progressFill.style.width = `${this.gameProgress}%`;
        if (progressText) progressText.textContent = `${Math.round(this.gameProgress)}%`;
    }

    showSection(section) {
        this.currentSection = section;
        document.querySelectorAll('.mobile-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // If switching to investigation and game is in progress, show current modal
        if (section === 'investigation' && this.currentGameState !== 'intro') {
            this.showCurrentModal();
        }
    }

    toggleVolumeControl() {
        const volumeControl = document.getElementById('volume-control');
        volumeControl.classList.toggle('active');
    }

    setVolume(value) {
        this.volume = parseFloat(value);
        if (this.forestSound) this.forestSound.volume = this.volume;
        if (this.investigationSound) this.investigationSound.volume = this.volume;
        
        // Update volume button
        const volumeBtn = document.getElementById('volume-btn');
        if (this.volume === 0) {
            volumeBtn.textContent = '🔇';
        } else if (this.volume <= 0.3) {
            volumeBtn.textContent = '🔈';
        } else if (this.volume <= 0.7) {
            volumeBtn.textContent = '🔉';
        } else {
            volumeBtn.textContent = '🔊';
        }
    }

    updateResumeButton() {
        const resumeBtn = document.getElementById('resume-investigation');
        if (resumeBtn) {
            // Show resume button if game is in progress (not intro or complete)
            const shouldShow = this.currentGameState !== 'intro' && this.currentGameState !== 'mission_complete';
            resumeBtn.style.display = shouldShow ? 'block' : 'none';
        }
        
        // Also update floating astronaut visibility
        if (this.currentGameState !== 'intro' && this.currentGameState !== 'mission_complete') {
            this.showFloatingAstronaut();
        } else {
            this.hideFloatingAstronaut();
        }
    }

    showFloatingAstronaut() {
        const astronaut = document.getElementById('floating-astronaut');
        if (astronaut) {
            astronaut.style.display = 'block';
        }
    }

    hideFloatingAstronaut() {
        const astronaut = document.getElementById('floating-astronaut');
        if (astronaut) {
            astronaut.style.display = 'none';
        }
    }

    showCurrentModal() {
        // Show the appropriate modal based on current game state
        switch (this.currentGameState) {
            case 'clue_selection':
                this.showClueSelection();
                break;
            case 'modis_analysis':
                this.showModal({
                    message: "Perfect! Now examine the MODIS data. What does this show about forest health?",
                    choices: [
                        { text: "The forest is recovering", action: () => this.showFeedback("The NDVI values are actually decreasing over time. Higher values indicate healthier vegetation, so the declining trend shows vegetation loss.") },
                        { text: "The forest is losing vegetation", action: () => this.startASTERAnalysis() },
                        { text: "The data is inconclusive", action: () => this.showFeedback("The NDVI trend is actually quite clear - decreasing values consistently indicate vegetation loss. The pattern shows a steady decline.") }
                    ]
                });
                break;
            case 'aster_analysis':
                this.showModal({
                    message: "Now examine the ASTER imagery to see the before/after comparison. Look at the clearing patterns. What do you observe?",
                    choices: [
                        { text: "Natural forest fires", action: () => this.showFeedback("The clearing patterns are very geometric and systematic - this suggests human activity rather than natural fire spread, which typically follows more organic, irregular boundaries.") },
                        { text: "Systematic deforestation", action: () => this.startMISRAnalysis() },
                        { text: "Seasonal changes", action: () => this.showFeedback("The ASTER imagery shows permanent, structural changes to the landscape rather than temporary seasonal variations. The patterns indicate long-term, systematic alteration of the forest structure.") }
                    ]
                });
                break;
            case 'misr_analysis':
                this.showModal({
                    message: "Now examine the MISR data to see the aerosol visualization. Look at the smoke plume patterns. What does this tell us about the consequences?",
                    choices: [
                        { text: "No significant impact", action: () => this.showFeedback("The MISR data shows massive aerosol plumes that extend far beyond the immediate deforestation area. These plumes represent significant air quality degradation that affects thousands of people in surrounding communities.") },
                        { text: "Major air quality impact on communities", action: () => this.showVerdict() },
                        { text: "Only local effects", action: () => this.showFeedback("Aerosol plumes from deforestation can travel hundreds of kilometers downwind, affecting air quality in many communities far from the original source. The MISR data shows these widespread atmospheric effects.") }
                    ]
                });
                break;
            case 'verdict':
                this.showModal({
                    message: "Excellent work! You've examined all the data - MODIS vegetation trends, ASTER imagery, and MISR aerosol patterns. Based on this evidence, what's your verdict on the cause?",
                    choices: [
                        { text: "Natural climate change", action: () => this.showFeedback("The evidence shows systematic, geometric patterns of deforestation that are characteristic of human activity rather than natural climate-driven changes. The systematic nature of the clearing suggests deliberate human intervention.") },
                        { text: "Human-caused deforestation and fires", action: () => this.showMissionComplete() },
                        { text: "Unknown causes", action: () => this.showFeedback("The evidence tells a clear story: the systematic patterns in ASTER imagery, combined with the NDVI decline in MODIS data and the aerosol plumes in MISR data, all point to human-caused deforestation with significant environmental consequences.") }
                    ]
                });
                break;
            case 'mission_complete':
                this.showMissionComplete();
                break;
            default:
                // If no specific state, show the intro modal
                this.showModal({
                    message: "Welcome, Earth Detective! I'm Commander Terra. We've detected unusual activity in the Amazon Basin. Ready to investigate?",
                    choices: [
                        { text: "Yes, let's investigate!", action: () => this.showClueSelection() },
                        { text: "I need more information first", action: () => this.showFeedback("Time is critical in environmental investigations. Let's start with what we have and build from there.") }
                    ]
                });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileTerraTracker();
});
