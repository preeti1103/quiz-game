// Get all the elements we need from the page
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers-container");
const questionNumber = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const scoreDisplay = document.getElementById("score");
const resultText = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress");
const timerDisplay = document.getElementById("time-left");
const darkModeButton = document.getElementById("dark-mode-button");
const bestScoreDisplay = document.getElementById("best-score");
let username = localStorage.getItem('quizUsername') || null;


const quizQuestions = [
    {
        question: "What is the capital of France?",
        category: "Geography",
        answers: [
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "Japan", correct: true },
            { text: "China", correct: false },
            { text: "Thailand", correct: false },
            { text: "Vietnam", correct: false },
        ],
    },
    {
        question: "Which desert is the largest in the world?",
        answers: [
            { text: "Sahara", correct: true },
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
            { text: "Arabian", correct: false },
        ],
    },
    {
        question: "What is the smallest continent?",
        answers: [
            { text: "Australia", correct: true },
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What gas do plants absorb?",
        answers: [
            { text: "Carbon Dioxide", correct: true },
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Helium", correct: false },
        ],
    },
    {
        question: "What is the center of an atom called?",
        answers: [
            { text: "Nucleus", correct: true },
            { text: "Electron", correct: false },
            { text: "Proton", correct: false },
            { text: "Neutron", correct: false },
        ],
    },
    {
        question: "Which organ pumps blood?",
        answers: [
            { text: "Heart", correct: true },
            { text: "Lungs", correct: false },
            { text: "Brain", correct: false },
            { text: "Liver", correct: false },
        ],
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "100°C", correct: true },
            { text: "0°C", correct: false },
            { text: "50°C", correct: false },
            { text: "150°C", correct: false },
        ],
    },
    {
        question: "Which metal is liquid at room temperature?",
        answers: [
            { text: "Mercury", correct: true },
            { text: "Iron", correct: false },
            { text: "Gold", correct: false },
            { text: "Aluminum", correct: false },
        ],
    },
    {
        question: "Which blood cells fight infection?",
        answers: [
            { text: "White blood cells", correct: true },
            { text: "Red blood cells", correct: false },
            { text: "Platelets", correct: false },
            { text: "Plasma", correct: false },
        ],
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Performance Utility", correct: false },
            { text: "Control Program Unit", correct: false },
        ],
    },
    {
        question: "Which company created the iPhone?",
        answers: [
            { text: "Apple", correct: true },
            { text: "Samsung", correct: false },
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
        ],
    },
    {
        question: "What does RAM stand for?",
        answers: [
            { text: "Random Access Memory", correct: true },
            { text: "Read Access Memory", correct: false },
            { text: "Rapid Application Module", correct: false },
            { text: "Real Application Memory", correct: false },
        ],
    },
    {
        question: "What does URL stand for?",
        answers: [
            { text: "Uniform Resource Locator", correct: true },
            { text: "Universal Resource Link", correct: false },
            { text: "Uniform Reference Locator", correct: false },
            { text: "Universal Retrieval Link", correct: false },
        ],
    },
    {
        question: "What is the brain of the computer?",
        answers: [
            { text: "CPU", correct: true },
            { text: "Monitor", correct: false },
            { text: "Keyboard", correct: false },
            { text: "Mouse", correct: false },
        ],
    }
];

// Variables to keep track of the quiz
let currentQuestion = 0;
let score = 0;
let canAnswer = true;
let timer;
let time = 15;
let shuffledQuestions = [];

// When start button is clicked
startButton.onclick = function () {
    startQuiz();
};

// When restart button is clicked
restartButton.onclick = function () {
    restartQuiz();
};

// Start the quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = score;

    // Mix up the questions
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    totalQuestions.textContent = shuffledQuestions.length;

    // Show quiz screen
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

// Show a question
function showQuestion() {
    // Reset stuff
    clearInterval(timer);
    canAnswer = true;
    time = 15;
    timerDisplay.textContent = time;

    // Update progress bar
    const progress = (currentQuestion / shuffledQuestions.length) * 100;
    progressBar.style.width = progress + "%";

    // Show question number
    questionNumber.textContent = currentQuestion + 1;

    // Get the current question
    const q = shuffledQuestions[currentQuestion];
    questionText.textContent = q.question;

    // Clear old answers
    answersDiv.innerHTML = "";

    // Mix up the answers
    const mixedAnswers = [...q.answers].sort(() => Math.random() - 0.5);

    // Add answer buttons
    mixedAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");
        if (answer.correct) {
            button.dataset.correct = "true";
        } else {
            button.dataset.correct = "false";
        }
        button.onclick = selectAnswer;
        answersDiv.appendChild(button);
    });

    // Start timer
    timer = setInterval(function () {
        time--;
        timerDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// When time runs out
function timeUp() {
    canAnswer = false;

    // Show correct answer
    const buttons = answersDiv.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    // Go to next question after 1 second
    setTimeout(nextQuestion, 1000);
}

// When an answer is selected
function selectAnswer(e) {
    if (!canAnswer) return;
    canAnswer = false;

    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Show if answer was right or wrong
    const buttons = answersDiv.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    // Update score if correct
    if (isCorrect) {
        score++;
        scoreDisplay.textContent = score;
    }

    // Go to next question after 1 second
    setTimeout(nextQuestion, 1000);
}

// Go to next question or show results
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show the results screen
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    // Show score
    document.getElementById("result-score-line").textContent =
        `${score} out of ${shuffledQuestions.length}`;

    // Check and update best score
    let bestScore = localStorage.getItem('bestScore') || 0;
    if (score > bestScore) {
        localStorage.setItem('bestScore', score);
        bestScore = score;
    }
    bestScoreDisplay.textContent = bestScore;

    // Show message based on score
    const percent = (score / shuffledQuestions.length) * 100;
    if (percent === 100) {
        resultText.textContent = "Perfect! You're a genius!";
    } else if (percent >= 80) {
        resultText.textContent = "Great job! You know your stuff!";
    } else if (percent >= 60) {
        resultText.textContent = "Good effort! Keep learning!";
    } else if (percent >= 40) {
        resultText.textContent = "Not bad! Try again to improve!";
    } else {
        resultText.textContent = "Keep studying! You'll get better!";
    }

    if (!username) {
        username = prompt("Enter your name:") || "Anonymous";
        localStorage.setItem('quizUsername', username);
    }

    fetch('/api/quiz/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, score })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    // Fetch and display leaderboard
    fetch('/api/quiz/scores')
        .then(res => res.json())
        .then(scores => {
            const leaderboardList = document.getElementById('leaderboard-list');
            leaderboardList.innerHTML = ''; // Clear old
            scores.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${item.username} - ${item.score}`;
                leaderboardList.appendChild(li);
            });
        })
        .catch(err => console.error('Error fetching leaderboard:', err));

}

// Restart the quiz
function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}

// Dark mode toggle
darkModeButton.onclick = function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("quizDarkMode", "enabled");
        darkModeButton.textContent = "☀️";
    } else {
        localStorage.setItem("quizDarkMode", "disabled");
        darkModeButton.textContent = "🌙";
    }
};

// Check if dark mode was enabled before
if (localStorage.getItem("quizDarkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeButton.textContent = "☀️";
} else {
    darkModeButton.textContent = "🌙";
}