// js/sound.js

const ocean = new Audio('audio/surface.mp3');
ocean.loop = true;
ocean.volume = 0;

// autoplay policy fix
let soundEnabled = false;

function enableSound() {
    if (soundEnabled) return;
    soundEnabled = true;

    ocean.play().catch(() => {});
}

document.addEventListener('click', enableSound, { once: true });
document.addEventListener('touchstart', enableSound, { once: true });

window.addEventListener('scroll', () => {
    if (!soundEnabled) return;

    const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    ocean.volume = Math.min(depth * 0.6, 0.6);
});

// ===== ВСПЛЫТИЕ =====

const surfaceUp = new Audio('audio/surface-up.mp3');
surfaceUp.volume = 0.9;

let lastScrollY = 0;
let wasUnderwater = false;

window.addEventListener('scroll', () => {
    if (!soundEnabled) return;

    const currentScroll = window.scrollY;

    // фиксируем, что человек реально нырнул
    if (currentScroll > 100) {
        wasUnderwater = true;
    }

    // если СКРОЛЛ ВВЕРХ и дошли до верха
    if (
        wasUnderwater &&
        currentScroll < 10 &&
        currentScroll < lastScrollY
    ) {
        surfaceUp.currentTime = 0;
        surfaceUp.play();

        wasUnderwater = false;
    }

    lastScrollY = currentScroll;
});
