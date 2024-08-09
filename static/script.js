// script.js
window.onload = function() {
    const lanches = [
        { name: 'Hamburger', ingredients: ['Pão', 'Carne', 'Alface', 'Tomate', 'Queijo'] },
        { name: 'Cheeseburger', ingredients: ['Pão', 'Carne', 'Queijo', 'Tomate', 'Alface'] },
        { name: 'Hot Dog', ingredients: ['Pão', 'Salsicha', 'Mostarda', 'Ketchup', 'Maionese'] },
    ];

    const allIngredients = ['Pão', 'Carne', 'Alface', 'Tomate', 'Queijo', 'Salsicha', 'Mostarda', 'Ketchup', 'Maionese'];

    let points = 0;
    let currentLanche = null;
    let clickedIngredients = [];
    const speedIncreaseFactor = 1.0; // Ajuste este fator para definir a taxa de aumento de velocidade

    const image = document.getElementById('moving-image');
    const container = document.getElementById('container');
    const buttonsContainer = document.getElementById('buttons-container');
    const selectedNameDiv = document.getElementById('selected-name');
    const serveButton = document.getElementById('serve-button');
    const startButton = document.getElementById('start-button');
    let speed = 2;
    let currentPosition = -image.offsetWidth;
    let animationFrame;

    startButton.addEventListener('click', function() {
        startGame();
    });

    serveButton.addEventListener('click', function() {
        checkWin();
    });

    function startGame() {
        currentPosition = -image.offsetWidth;
        image.style.left = currentPosition + 'px';
        image.style.display = 'block';
        currentLanche = lanches[Math.floor(Math.random() * lanches.length)];
        selectedNameDiv.innerText = currentLanche.name;
        clickedIngredients = [];
        serveButton.style.display = 'block';
        setupButtons();
        cancelAnimationFrame(animationFrame);
        moveImage();
    }

    function setupButtons() {
        buttonsContainer.innerHTML = '';
        for (let ingredient of allIngredients) {
            let button = document.createElement('button');
            button.className = 'game-button btn btn-light';
            button.innerText = ingredient;
            button.onclick = function() {
                if (clickedIngredients.includes(ingredient)) {
                    clickedIngredients = clickedIngredients.filter(item => item !== ingredient);
                    button.classList.remove('clicked');
                } else {
                    clickedIngredients.push(ingredient);
                    button.classList.add('clicked');
                }
            };
            buttonsContainer.appendChild(button);
        }
    }

    function checkWin() {
        let isCorrect = clickedIngredients.every(ingredient => currentLanche.ingredients.includes(ingredient)) &&
                        currentLanche.ingredients.length === clickedIngredients.length;
        if (isCorrect) {
            points++;
            alert('Você acertou! Pontos: ' + points);
            speed *= speedIncreaseFactor; // Aumenta a velocidade progressivamente
            startGame();
        } else {
            gameOver();
        }
    }

    function moveImage() {
        currentPosition += speed;
        if (currentPosition >= container.offsetWidth) {
            gameOver();
        } else {
            image.style.left = currentPosition + 'px';
            animationFrame = requestAnimationFrame(moveImage);
        }
    }

    function gameOver() {
        alert('Você perdeu! Pontuação final: ' + points);
        window.location.href = `/game_over?score=${points}&game=Speed%20Burger`;
        points = 0;
        speed = 2; // Reseta a velocidade ao valor inicial
        image.style.display = 'none';
    }
};
