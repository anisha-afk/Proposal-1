// DOM Elements
const initialScreen = document.getElementById('initial-screen');
const proposalScreen = document.getElementById('proposal-screen');
const yesScreen = document.getElementById('yes-screen');
const noScreen = document.getElementById('no-screen');

const startBtn = document.getElementById('start-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const tryAgainBtn = document.getElementById('try-again-btn');

const backgroundMusic = document.getElementById('background-music');

// Screen transition function
function showScreen(screenToShow) {
    // Hide all screens
    const screens = [initialScreen, proposalScreen, yesScreen, noScreen];
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    screenToShow.classList.add('active');
}

// Add click event listeners
startBtn.addEventListener('click', () => {
    showScreen(proposalScreen);
    playBackgroundMusic();
    createFloatingHearts();
});

yesBtn.addEventListener('click', () => {
    showScreen(yesScreen);
    playCelebrationMusic();
    createFireworks();
    createHeartsRain();
});

noBtn.addEventListener('click', () => {
    // Make the "No" button move away when hovered
    const moveButton = () => {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);
        noBtn.style.position = 'absolute';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    };
    
    // Move button on hover
    noBtn.addEventListener('mouseenter', moveButton);
    
    // After a few attempts, show the sad screen
    let attempts = 0;
    noBtn.addEventListener('click', () => {
        attempts++;
        if (attempts >= 3) {
            showScreen(noScreen);
        } else {
            moveButton();
        }
    });
});

tryAgainBtn.addEventListener('click', () => {
    showScreen(proposalScreen);
    createFloatingHearts();
});

// Background music function
function playBackgroundMusic() {
    try {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play().catch(e => {
            console.log('Audio autoplay blocked:', e);
        });
    } catch (error) {
        console.log('Audio not available:', error);
    }
}

// Celebration music function
function playCelebrationMusic() {
    try {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(e => {
            console.log('Audio autoplay blocked:', e);
        });
    } catch (error) {
        console.log('Audio not available:', error);
    }
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }, 1000);
}

// Create fireworks animation
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    if (!fireworksContainer) return;
    
    setInterval(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.background = ['#ff6b6b', '#f368e0', '#ff9ff3', '#ee5a24', '#ff6b6b'][Math.floor(Math.random() * 5)];
        
        fireworksContainer.appendChild(firework);
        
        // Remove firework after animation
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 2000);
    }, 500);
}

// Create hearts rain animation
function createHeartsRain() {
    const heartsRainContainer = document.querySelector('.hearts-rain');
    if (!heartsRainContainer) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        heartsRainContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }, 300);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle effect to the title
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('mouseenter', () => {
            title.style.transform = 'scale(1.1)';
            title.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.transform = 'scale(1)';
        });
    }
    
    // Add pulse effect to the start button
    if (startBtn) {
        startBtn.addEventListener('mouseenter', () => {
            startBtn.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        startBtn.addEventListener('mouseleave', () => {
            startBtn.style.animation = '';
        });
    }
    
    // Add special effect to the YES button
    if (yesBtn) {
        yesBtn.addEventListener('mouseenter', () => {
            yesBtn.style.transform = 'scale(1.1) rotate(5deg)';
            yesBtn.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.8)';
        });
        
        yesBtn.addEventListener('mouseleave', () => {
            yesBtn.style.transform = 'scale(1) rotate(0deg)';
            yesBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
        });
    }
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add confetti effect for celebration
function createConfetti() {
    const colors = ['#ff6b6b', '#f368e0', '#ff9ff3', '#ee5a24', '#667eea'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Trigger confetti when YES is clicked
yesBtn.addEventListener('click', () => {
    setTimeout(createConfetti, 500);
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && proposalScreen.classList.contains('active')) {
        yesBtn.click();
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', (e) => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
});

// Initialize the proposal
console.log('💕 Love Proposal for Inayat loaded! 💕'); 