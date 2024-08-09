// quiz.js
document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const startQuizButton = document.getElementById('start-quiz-button');

    const questions = [
        { question: 'Qual é a capital da França?', answers: ['Paris', 'Londres', 'Roma', 'Berlim'], correct: 'Paris' },
        { question: 'Qual é o maior planeta do nosso sistema solar?', answers: ['Terra', 'Júpiter', 'Saturno', 'Marte'], correct: 'Júpiter' },
        { question: 'Qual é a fórmula química da água?', answers: ['H2O', 'CO2', 'NaCl', 'O2'], correct: 'H2O' },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startQuizButton.addEventListener('click', startQuiz);

    function startQuiz() {
        startQuizButton.style.display = 'none';
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${question.question}</h5>
                    <div class="list-group">
                        ${question.answers.map(answer => `<button class="list-group-item list-group-item-action">${answer}</button>`).join('')}
                    </div>
                </div>
            </div>
        `;

        const answerButtons = quizContainer.querySelectorAll('.list-group-item');
        answerButtons.forEach(button => {
            button.addEventListener('click', selectAnswer);
        });
    }

    function selectAnswer(e) {
        const selectedAnswer = e.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].correct;

        if (selectedAnswer === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Quiz Terminado</h5>
                    <p class="card-text">Sua pontuação: ${score} de ${questions.length}</p>
                    <button class="btn btn-primary" id="restart-quiz-button">Restart Quiz</button>
                </div>
            </div>
        `;

        const restartQuizButton = document.getElementById('restart-quiz-button');
        restartQuizButton.addEventListener('click', startQuiz);
    }
});
