// genius.js
document.addEventListener('DOMContentLoaded', () => {
    const geniusContainer = document.getElementById('genius-container');
    const startGeniusButton = document.getElementById('start-genius-button');

    const lanches = ['Hamburger', 'Cheeseburger', 'Big Mac', 'Fiesta', 'Quarteirão', 'Cheddar', 'Tasty', 'Brabo Bacon'];
    let sequence = [];
    let playerSequence = [];
    let level = 0;

    startGeniusButton.addEventListener('click', startGenius);

    function startGenius() {
        startGeniusButton.style.display = 'none';
        level = 0;
        sequence = [];
        playerSequence = [];
        nextLevel();
    }

    function nextLevel() {
        playerSequence = [];
        level++;
        const nextLanche = lanches[Math.floor(Math.random() * lanches.length)];
        sequence.push(nextLanche);
        showSequence();
    }

    function showSequence() {
        let index = 0;
        const interval = setInterval(() => {
            highlightLanche(sequence[index]);
            index++;
            if (index >= sequence.length) {
                clearInterval(interval);
                enablePlayerInput();
            }
        }, 1000);
    }

    function highlightLanche(lanche) {
        const lancheButton = document.getElementById(lanche);
        lancheButton.classList.add('active');
        setTimeout(() => {
            lancheButton.classList.remove('active');
        }, 500);
    }

    function enablePlayerInput() {
        const lancheButtons = geniusContainer.querySelectorAll('.btn-lanche');
        lancheButtons.forEach(button => {
            button.addEventListener('click', handlePlayerInput);
        });
    }

    function disablePlayerInput() {
        const lancheButtons = geniusContainer.querySelectorAll('.btn-lanche');
        lancheButtons.forEach(button => {
            button.removeEventListener('click', handlePlayerInput);
        });
    }

    function handlePlayerInput(e) {
        const selectedLanche = e.target.id;
        playerSequence.push(selectedLanche);
        highlightLanche(selectedLanche);

        if (!checkPlayerInput()) {
            gameOver();
            return;
        }

        if (playerSequence.length === sequence.length) {
            disablePlayerInput();
            setTimeout(nextLevel, 1000);
        }
    }

    function checkPlayerInput() {
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] !== sequence[i]) {
                return false;
            }
        }
        return true;
    }

    function gameOver() {
        alert(`Game Over! Você alcançou o nível ${level}`);
        startGeniusButton.style.display = 'block';
        window.location.href = `/game_over?score=${level}&game=Genius`;
    }

    lanches.forEach(lanche => {
        const button = document.createElement('button');
        button.id = lanche;
        button.textContent = lanche;
        button.className = 'btn btn-light btn-lanche m-2';
        geniusContainer.appendChild(button);
    });
});
