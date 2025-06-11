document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO CARROSSEL DE FOTOS (se existir no HTML) ---
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
    if (themeSwitch) {
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
        themeSwitch.addEventListener('change', switchTheme);
    }

    // --- LÓGICA DA CARTA ANIMADA (se existir no HTML) ---
    const letterSection = document.querySelector('.letter-section');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    
    if (letterSection && envelope && letter) {
        envelope.addEventListener('click', () => {
            if (!letterSection.classList.contains('show-letter')) {
                letterSection.classList.add('show-letter');
            }
        });

        letter.addEventListener('dblclick', () => {
            letterSection.classList.remove('show-letter');
        });
    }

    // --- LÓGICA DO CONTADOR DE TEMPO JUNTOS (CORRIGIDO) ---
    const countdownContainer = document.getElementById('countdown-container');
    if (countdownContainer) {
        const startDate = new Date('2023-05-25T00:00:00');

        const yearsEl = document.getElementById('years');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        function updateCountdown() {
            const now = new Date();
            const diff = now - startDate;

            const msInMinute = 1000 * 60;
            const msInHour = msInMinute * 60;
            const msInDay = msInHour * 24;
            const msInYear = msInDay * 365.25;

            const years = Math.floor(diff / msInYear);
            const days = Math.floor((diff % msInYear) / msInDay);
            const hours = Math.floor((diff % msInDay) / msInHour);
            const minutes = Math.floor((diff % msInHour) / msInMinute);
            const seconds = Math.floor((diff % msInMinute) / 1000);

            if (yearsEl) {
                yearsEl.innerHTML = String(years);
            }
            daysEl.innerHTML = String(days);
            hoursEl.innerHTML = String(hours).padStart(2, '0');
            minutesEl.innerHTML = String(minutes).padStart(2, '0');
            secondsEl.innerHTML = String(seconds).padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // --- LÓGICA DO QUIZ INTERATIVO ---
    function resetQuizState(quizQuestion) {
        const resultParagraph = quizQuestion.querySelector('.quiz-result');
        const allOptions = quizQuestion.querySelectorAll('input[type="radio"]');
        const allLabels = quizQuestion.querySelectorAll('.option-container label');
        const submitButton = quizQuestion.querySelector('.submit-btn');
        const retryButton = quizQuestion.querySelector('.retry-btn');

        resultParagraph.textContent = '';
        allLabels.forEach(label => {
            label.classList.remove('correct', 'incorrect');
        });

        allOptions.forEach(input => {
            input.checked = false;
            input.disabled = false;
        });

        submitButton.style.display = 'block';
        retryButton.style.display = 'none';
        submitButton.disabled = false;
    }

    document.querySelectorAll('.submit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const submitButton = event.target;
            const quizQuestion = submitButton.closest('.quiz-question');
            const resultParagraph = quizQuestion.querySelector('.quiz-result');
            const retryButton = quizQuestion.querySelector('.retry-btn');
            const selectedOption = quizQuestion.querySelector('input[type="radio"]:checked');

            if (!selectedOption) {
                resultParagraph.textContent = 'Por favor, selecione uma resposta!';
                resultParagraph.style.color = '#f44336';
                return;
            }

            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            const selectedLabel = quizQuestion.querySelector(`label[for="${selectedOption.id}"]`);

            if (isCorrect) {
                resultParagraph.textContent = 'Resposta Correta! ❤️';
                resultParagraph.style.color = '#4CAF50';
                selectedLabel.classList.add('correct');
                
                quizQuestion.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.disabled = true;
                });
                submitButton.disabled = true;
                submitButton.style.display = 'block';
                retryButton.style.display = 'none';

            } else {
                resultParagraph.textContent = 'Incorreto... Tente de novo! 😉';
                resultParagraph.style.color = '#f44336';
                selectedLabel.classList.add('incorrect');

                submitButton.style.display = 'none';
                retryButton.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.retry-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const quizQuestion = event.target.closest('.quiz-question');
            resetQuizState(quizQuestion);
        });
    });
});