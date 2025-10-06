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
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAudio();
        this.showSection('home');
        
        // Ensure modal is hidden on startup
        this.hideModal();
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
                { text: "Learn More About NASA's Earth Science", action: () => this.showNasaInfo() }
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
                                <div class="chart-bar healthy" style="height: 75px;">2018</div>
                                <div class="chart-bar healthy" style="height: 72px;">2019</div>
                                <div class="chart-bar moderate" style="height: 68px;">2020</div>
                                <div class="chart-bar moderate" style="height: 61px;">2021</div>
                                <div class="chart-bar poor" style="height: 45px;">2022</div>
                                <div class="chart-bar poor" style="height: 38px;">2023</div>
                            </div>
                            <p class="chart-note">Declining NDVI values indicate vegetation loss</p>
                        </div>
                    </div>
                `;
                break;
            case 'aster':
                header.textContent = 'CLUE 2: A.S.T. (ASTER) - HIGH-RES BEFORE/AFTER SCAR';
                content.innerHTML = `
                    <div class="clue-content">
                        <div class="aster-comparison">
                            <h3>ASTER True Color Imagery (2020 vs 2023)</h3>
                            <div class="comparison-slider">
                                <div class="before-after">
                                    <div class="before">2020 - Dense Forest</div>
                                    <div class="after">2023 - Deforestation</div>
                                </div>
                                <p class="comparison-note">Systematic clearing patterns visible</p>
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
                            <h3>MISR Smoke Plume 3-Day Movement</h3>
                            <div class="plume-visualization">
                                <div class="plume-particle"></div>
                                <div class="plume-particle"></div>
                                <div class="plume-particle"></div>
                            </div>
                            <p class="plume-note">Aerosol plumes affecting 500,000+ people</p>
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
        
        message.textContent = data.message;
        choices.innerHTML = '';
        
        if (data.choices && data.choices.length > 0) {
            data.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.hideModal();
                    setTimeout(() => {
                        if (choice.action) choice.action();
                    }, 300);
                });
                choices.appendChild(btn);
            });
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        const modal = document.getElementById('mobile-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = '';
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
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileTerraTracker();
});
