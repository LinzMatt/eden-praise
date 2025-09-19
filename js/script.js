 // Mobile Navigation Toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('nav ul');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                // Fermer aussi le player audio si ouvert
                fullPlayer.classList.remove('full-player-visible');
            });
            
            // Fermer le menu si on clique ailleurs
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav') && !e.target.closest('.nav-toggle') && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            });
        }
      
        // Carousel functionality
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.carousel-indicator');
            const prevBtn = document.getElementById('prev-slide');
            const nextBtn = document.getElementById('next-slide');
            let currentSlide = 0;
            let slideInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
            
            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                indicators[currentSlide].classList.add('active');
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            // Event listeners for controls
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    showSlide(index);
                    slideInterval = setInterval(nextSlide, 5000);
                });
            });
            
            // Music player functionality
            const globalPlayPauseBtn = document.getElementById('play-pause-btn');
            const fullPlayPauseBtn = document.getElementById('full-play-pause-btn');
            const openPlayerBtn = document.getElementById('open-player-btn');
            const closePlayerBtn = document.getElementById('close-player-btn');
            const fullPlayer = document.getElementById('full-player');
            const progress = document.getElementById('progress');
            const progressContainer = document.getElementById('progress-container');
            const currentTimeEl = document.getElementById('current-time');
            const durationEl = document.getElementById('duration');
            const musicModal = document.getElementById('music-modal');
            const closeMusicModal = document.getElementById('close-music-modal');
            const seeMoreButtons = document.querySelectorAll('.see-more-btn');
            const playButtons = document.querySelectorAll('.play-btn');
            
            let isPlaying = false;
            let currentAudio = null;
            
            // Sample music data
            const musicData = {
                'hope-rising': {
                    title: 'Hope Rising',
                    info: 'Single • 2023',
                    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                    lyrics: `In the darkness, when all hope seems lost
There's a light that shines at any cost
A whisper of love, a promise so true
My hope is rising, I'm renewed

(Chorus)
Hope rising, like the morning sun
My battles fought, the victory won
Your grace abounds, Your love surrounds
My hope is found in You alone`
                },
                'world-of-hope': {
                    title: 'World of Hope',
                    info: 'Album • 2022',
                    cover: 'https://images.unsplash.com/photo-1511370235399-1802c6d5e5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                    lyrics: `Walking through valleys, climbing up hills
Your promise remains, Your love fulfills
In a world that's broken, searching for light
You are the hope that shines so bright

(Chorus)
In this world of hope, we find our way
Guided by Your love, day by day
Through storms and trials, we'll never fear
For we know that You are always near`
                }
                // More music data would be added here
            };
            
            // Play/Pause functionality
            function togglePlayPause() {
                if (currentAudio) {
                    if (isPlaying) {
                        currentAudio.pause();
                        globalPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                        fullPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    } else {
                        currentAudio.play();
                        globalPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        fullPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                    isPlaying = !isPlaying;
                }
            }
            
            // Open music modal
            seeMoreButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const musicId = this.getAttribute('data-music-modal');
                    const music = musicData[musicId];
                    
                    if (music) {
                        document.getElementById('modal-title').textContent = music.title;
                        document.getElementById('modal-info').textContent = music.info;
                        document.getElementById('modal-cover').src = music.cover;
                        document.getElementById('modal-lyrics').textContent = music.lyrics;
                        
                        const audioElement = document.getElementById('modal-audio');
                        audioElement.src = music.audio;
                        
                        musicModal.classList.add('visible');
                    }
                });
            });
            
            // Play music from card
            playButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const musicId = this.getAttribute('data-music');
                    const music = musicData[musicId];
                    
                    if (music) {
                        // If we have an existing audio, pause it
                        if (currentAudio) {
                            currentAudio.pause();
                        }
                        
                        // Create new audio element or reuse existing
                        if (!currentAudio) {
                            currentAudio = new Audio(music.audio);
                            
                            // Update time and progress
                            currentAudio.addEventListener('timeupdate', updateProgress);
                            currentAudio.addEventListener('ended', () => {
                                isPlaying = false;
                                globalPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                                fullPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                            });
                        } else {
                            currentAudio.src = music.audio;
                        }
                        
                        // Update UI
                        document.getElementById('current-track').textContent = music.title + ' - Eden Praise';
                        document.getElementById('full-current-track').textContent = music.title + ' - Eden Praise';
                        
                        // Play the audio
                        currentAudio.play();
                        isPlaying = true;
                        globalPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        fullPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                });
            });
            
            // Update progress bar
            function updateProgress() {
                if (currentAudio) {
                    const { currentTime, duration } = currentAudio;
                    const progressPercent = (currentTime / duration) * 100;
                    progress.style.width = `${progressPercent}%`;
                    
                    // Update time displays
                    const currentMinutes = Math.floor(currentTime / 60);
                    const currentSeconds = Math.floor(currentTime % 60);
                    const durationMinutes = Math.floor(duration / 60);
                    const durationSeconds = Math.floor(duration % 60);
                    
                    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
                    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
                }
            }
            
            // Set progress when clicking on progress bar
            progressContainer.addEventListener('click', function(e) {
                if (currentAudio) {
                    const width = this.clientWidth;
                    const clickX = e.offsetX;
                    const duration = currentAudio.duration;
                    
                    currentAudio.currentTime = (clickX / width) * duration;
                }
            });
            
            // Open/close full player
            openPlayerBtn.addEventListener('click', function() {
                fullPlayer.classList.add('full-player-visible');
            });
            
            closePlayerBtn.addEventListener('click', function() {
                fullPlayer.classList.remove('full-player-visible');
            });
            
            // Close music modal
            closeMusicModal.addEventListener('click', function() {
                musicModal.classList.remove('visible');
            });
            
            // Event listeners for player controls
            globalPlayPauseBtn.addEventListener('click', togglePlayPause);
            fullPlayPauseBtn.addEventListener('click', togglePlayPause);
            
            // Initialize
            document.getElementById('current-track').textContent = 'Select a song to play';
            document.getElementById('full-current-track').textContent = 'Select a song to play';
        });
        
            // Comment form submission
            const commentForm = document.querySelector('.comment-form');
            
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Comment would be submitted to database in a full implementation');
                commentForm.reset();
        });