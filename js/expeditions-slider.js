(function () {

    if (window.innerWidth <= 900) return;

    const track = document.querySelector('.expeditions-track');
    if (!track) return;

    track.style.display = 'flex'; // 🔥 гарантируем flex

    const cards = Array.from(track.children);

    // 🔁 клонируем карточки
    cards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    let pos = 0;
    const speed = 0.6;
    const width = track.scrollWidth / 2;
    let paused = false;

    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);

    function animate() {
        if (!paused) {
            pos -= speed;
            if (Math.abs(pos) >= width) pos = 0;
            track.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(animate);
    }

    animate();

})();