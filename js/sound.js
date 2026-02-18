// js/sound.js

const ocean = new Audio('audio/surface.mp3');
ocean.loop = true;
ocean.volume = 0;
ocean.preload = 'auto';

const surfaceUp = new Audio('audio/surface-up.mp3');
surfaceUp.volume = 0.2;
surfaceUp.preload = 'auto';

let soundEnabled = false;
let lastScrollY = window.scrollY;
let wasUnderwater = false;

/* ============================= */
/* ENABLE SOUND (USER GESTURE) */
/* ============================= */
function enableSound() {
    if (soundEnabled) return;
    soundEnabled = true;

    ocean.play().catch(() => {});
}

document.addEventListener('click', enableSound, { once: true });
document.addEventListener('touchstart', enableSound, { once: true });

/* ============================= */
/* SCROLL LOGIC */
/* ============================= */
window.addEventListener('scroll', () => {
    if (!soundEnabled) return;

    const currentScroll = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const depth = maxScroll > 0 ? currentScroll / maxScroll : 0;

    /* ===== ПОГРУЖЕНИЕ (ТВОЙ КОД, НЕ ТРОГАЕМ) ===== */
    ocean.volume = Math.min(depth * 0.6, 0.6);

    if (currentScroll > 120) {
        wasUnderwater = true;
    }

    /* ===== ВСПЛЫТИЕ ===== */
    if (
        wasUnderwater &&
        currentScroll < 10 &&
        currentScroll < lastScrollY
    ) {
        surfaceUp.currentTime = 0;
        surfaceUp.play().catch(() => {});
        wasUnderwater = false;
    }

    lastScrollY = currentScroll;
});
