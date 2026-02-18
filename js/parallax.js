(() => {
    const bg = document.getElementById('parallax-bg');
    if (!bg) return;

    let current = 0;
    let target = 0;

    function update() {
        target = window.scrollY;
        current += (target - current) * 0.08;

        bg.style.height = document.body.scrollHeight + 'px';
        bg.style.transform = `translateY(${current * -0.25}px)`;

        requestAnimationFrame(update);
    }

    update();
})();
