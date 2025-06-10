document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO CARROSSEL DE FOTOS ---
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
        const carouselImages = carouselSlide.querySelectorAll('img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let counter = 0;

        function updateSlidePosition() {
            if (carouselImages.length > 0) {
                const size = carouselImages[0].clientWidth;
                carouselSlide.style.transform = `translateX(${-size * counter}px)`;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                counter = (counter + 1) % carouselImages.length;
                updateSlidePosition();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                counter = (counter - 1 + carouselImages.length) % carouselImages.length;
                updateSlidePosition();
            });
        }
        window.addEventListener('resize', updateSlidePosition);
        updateSlidePosition();
    }

    // --- LÓGICA DO MODO ESCURO ---
    const themeSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        const theme = e.target.checked ? 'dark-mode' : 'light-mode';
        document.body.classList.toggle('dark-mode', e.target.checked);
        localStorage.setItem('theme', theme);
    }
    if (themeSwitch) {
        themeSwitch.addEventListener('change', switchTheme);
    }

    // --- LÓGICA DA CARTA ANIMADA (ATUALIZADA) ---
    const letterSection = document.querySelector('.letter-section');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    
    if (letterSection && envelope && letter) {
        // Clicar no ENVELOPE para ABRIR a carta
        envelope.addEventListener('click', () => {
            if (!letterSection.classList.contains('show-letter')) {
                letterSection.classList.add('show-letter');
            }
        });

        // Dar DUPLO CLIQUE na CARTA para FECHAR
        letter.addEventListener('dblclick', () => {
            letterSection.classList.remove('show-letter');
        });
    }
});