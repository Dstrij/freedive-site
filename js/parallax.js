(() => {

    const bg = document.getElementById('parallax-bg');
    if (!bg) return;

    function update() {

        const scroll = window.scrollY;

        /* двигаем сам фон */
        bg.style.backgroundPosition = `center ${scroll * -0.25}px`;

        requestAnimationFrame(update);
    }

    update();

})();