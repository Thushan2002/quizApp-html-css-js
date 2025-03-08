const questionArray = [
    {
        id: 1,
        question: "Which method is used to convert a JSON string into a JavaScript object?",
        answers: [
            { correct: true, answer: "JSON.parse()" },
            { correct: false, answer: "JSON.stringify()" },
            { correct: false, answer: "JSON.objectify()" },
            { correct: false, answer: "JSON.convert()" },
        ],
    },
    {
        id: 2,
        question: "Which operator is used to compare both value and type in JavaScript?",
        answers: [
            { correct: true, answer: "===" },
            { correct: false, answer: "==" },
            { correct: false, answer: "=" },
            { correct: false, answer: "!==" },
        ],
    },
    {
        id: 3,
        question: "Which of the following is a correct way to declare a JavaScript variable?",
        answers: [
            { correct: true, answer: "let x = 5;" },
            { correct: false, answer: "var x == 5;" },
            { correct: false, answer: "const x : 5;" },
            { correct: false, answer: "int x = 5;" },
        ],
    },
    {
        id: 4,
        question: "Which method can be used to find the length of a string in JavaScript?",
        answers: [
            { correct: false, answer: "getSize()" },
            { correct: false, answer: "count()" },
            { correct: true, answer: "length" },
            { correct: false, answer: "sizeOf()" },
        ],
    },
    {
        id: 5,
        question: "How can you add a comment in JavaScript?",
        answers: [
            { correct: true, answer: "// This is a comment" },
            { correct: false, answer: "<!-- This is a comment -->" },
            { correct: false, answer: "/* This is a comment */" },
            { correct: false, answer: "## This is a comment" },
        ],
    },
    {
        id: 6,
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { correct: false, answer: "String" },
            { correct: false, answer: "Number" },
            { correct: true, answer: "Character" },
            { correct: false, answer: "Boolean" },
        ],
    },
    {
        id: 7,
        question: "What is the correct syntax to create a function in JavaScript?",
        answers: [
            { correct: true, answer: "function myFunction() {}" },
            { correct: false, answer: "func myFunction() {}" },
            { correct: false, answer: "def myFunction() {}" },
            { correct: false, answer: "myFunction function() {}" },
        ],
    }
];

const questionElement = document.getElementById("question");
const answersContainer = document.querySelector(".answer");
const submitButton = document.querySelector(".submit");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

const displayQuestion = () => {
    const { question, answers } = questionArray[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}) ${question}`; // Add question number
    answersContainer.innerHTML = '';
    selectedAnswerIndex = null;


    answers.forEach(({ answer, correct }, index) => {
        const answerElement = document.createElement('li');
        answerElement.textContent = answer;
        answerElement.className = 'answer-button';
        answerElement.addEventListener('click', () => selectAnswer(correct, index));
        answersContainer.appendChild(answerElement);
    });
};


const selectAnswer = (isCorrect, index) => {
    const answerButtons = answersContainer.querySelectorAll('.answer-button');

    answerButtons.forEach((button, i) => {
        if (i === index) {
            button.style.backgroundColor = isCorrect ? 'green' : 'red';
        }
        // Disable clicking on all answers
        button.style.pointerEvents = 'none';
    });

    // Highlight the correct answer
    answerButtons.forEach((button, i) => {
        if (questionArray[currentQuestionIndex].answers[i].correct) {
            button.style.backgroundColor = 'green';
        }
    });

    selectedAnswerIndex = index;
    if (isCorrect) score++;
};

const showFinalScore = () => {
    questionElement.textContent = `Quiz Finished! Your score: ${score} out of ${questionArray.length}`;
    answersContainer.innerHTML = '';
    submitButton.style.display = 'none';
};

submitButton.addEventListener('click', () => {
    if (selectedAnswerIndex !== null) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionArray.length) {
            displayQuestion();
        } else {
            showFinalScore();
        }
    } else {
        alert('Please select an answer before submitting.');
    }
});

// Initial display of the first question
displayQuestion();
