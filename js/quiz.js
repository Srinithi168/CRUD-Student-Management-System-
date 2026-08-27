// =====================================
// QUIZ SYSTEM
// =====================================

const quizQuestions = [

    {
        question:
            "Which of the following is used to display output in Python?",

        options: [
            "echo()",
            "print()",
            "display()",
            "output()"
        ],

        answer: 1
    },

    {
        question:
            "Which symbol is used for comments in Python?",

        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],

        answer: 2
    },

    {
        question:
            "Which data type is used to store True or False?",

        options: [
            "String",
            "Integer",
            "Boolean",
            "Float"
        ],

        answer: 2
    },

    {
        question:
            "Which keyword is used to define a function in Python?",

        options: [
            "function",
            "def",
            "func",
            "define"
        ],

        answer: 1
    },

    {
        question:
            "Which collection is ordered and changeable in Python?",

        options: [
            "Tuple",
            "Set",
            "List",
            "Dictionary"
        ],

        answer: 2
    }

];


let currentQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;


export function startQuiz() {

    const modal =
        document.getElementById("quizModal");

    if (!modal) {
        return;
    }

    currentQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;

    modal.classList.add("show");

    loadQuestion();
}


export function closeQuiz() {

    const modal =
        document.getElementById("quizModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");
}


function loadQuestion() {

    const question =
        quizQuestions[currentQuestion];

    document.getElementById("questionText")
        .textContent = question.question;

    document.getElementById("questionNumber")
        .textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    const percentage =
        Math.round(
            ((currentQuestion + 1) /
            quizQuestions.length) * 100
        );

    document.getElementById("quizPercentage")
        .textContent = percentage + "%";

    document.getElementById("quizProgress")
        .style.width = percentage + "%";

    const options =
        document.querySelectorAll(
            ".answer-options button"
        );

    options.forEach(function (button, index) {

        button.textContent =
            question.options[index];

        button.classList.remove("selected");

    });

    selectedAnswer = null;

    document.getElementById("quizMessage")
        .textContent = "";
}


export function selectAnswer(button) {

    const options =
        document.querySelectorAll(
            ".answer-options button"
        );

    options.forEach(function (item) {

        item.classList.remove("selected");

    });

    button.classList.add("selected");

    selectedAnswer =
        Array.from(options).indexOf(button);
}


export function nextQuestion() {

    if (selectedAnswer === null) {

        document.getElementById("quizMessage")
            .textContent =
            "Please select an answer.";

        return;
    }

    if (
        selectedAnswer ===
        quizQuestions[currentQuestion].answer
    ) {

        quizScore++;

    }

    currentQuestion++;

    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        showQuizResult();
        return;

    }

    loadQuestion();
}


function showQuizResult() {

    const percentage =
        Math.round(
            (quizScore /
            quizQuestions.length) * 100
        );

    document.getElementById("questionText")
        .textContent =
        "🎉 Quiz Completed!";

    document.querySelector(".answer-options")
        .innerHTML = `

            <div class="quiz-final-result">

                <strong>${percentage}%</strong>

                <p>
                    You scored ${quizScore}
                    out of ${quizQuestions.length}
                </p>

            </div>

        `;

    document.getElementById("questionNumber")
        .textContent = "Completed";

    document.getElementById("quizPercentage")
        .textContent = "100%";

    document.getElementById("quizProgress")
        .style.width = "100%";

    const nextButton =
        document.querySelector(
            ".next-question-btn"
        );

    if (nextButton) {

        nextButton.textContent = "Close Quiz";
        nextButton.onclick = closeQuiz;

    }
}
