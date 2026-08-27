// ===============================
// PASSWORD SHOW / HIDE
// ===============================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";
        togglePassword.textContent = "👁";

    }

});


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const passwordValue = password.value;

    if (email === "" || passwordValue === "") {

        alert("Please enter your email and password.");
        return;

    }

    // Temporary frontend login
    // Later this will connect to Java/Spring Boot.

    window.location.href = "dashboard.html";

});
// ===============================
// COURSE SEARCH
// ===============================

const courseSearch = document.getElementById("courseSearch");
const courseGrid = document.getElementById("courseGrid");

if (courseSearch) {

    courseSearch.addEventListener("input", function () {

        const searchText =
            courseSearch.value.toLowerCase();

        const courses =
            courseGrid.querySelectorAll(".learning-card");

        courses.forEach(function(course) {

            const courseName =
                course.querySelector("h3")
                .textContent
                .toLowerCase();

            if (courseName.includes(searchText)) {

                course.style.display = "";

            } else {

                course.style.display = "none";

            }

        });

    });

}
// ===============================
// MARK LESSON COMPLETE
// ===============================

const completeLesson =
    document.getElementById("completeLesson");

if (completeLesson) {

    completeLesson.addEventListener("click", function () {

        completeLesson.classList.toggle("completed");

        if (completeLesson.classList.contains("completed")) {

            completeLesson.textContent =
                "✓ Lesson Completed";

        } else {

            completeLesson.textContent =
                "✓ Mark as Complete";

        }

    });

}
// =====================================
// ASSIGNMENT FILTER
// =====================================

const assignmentTabs =
    document.querySelectorAll(".assignment-tab");

const assignmentCards =
    document.querySelectorAll(".assignment-card");


assignmentTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        assignmentTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        const filter =
            tab.getAttribute("data-filter");

        assignmentCards.forEach(function(card) {

            const status =
                card.getAttribute("data-status");

            if (filter === "all" || status === filter) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// =====================================
// ASSIGNMENT SEARCH
// =====================================

const assignmentSearch =
    document.getElementById("assignmentSearch");

if (assignmentSearch) {

    assignmentSearch.addEventListener("input", function() {

        const search =
            assignmentSearch.value.toLowerCase();

        assignmentCards.forEach(function(card) {

            const title =
                card.querySelector("h3")
                .textContent
                .toLowerCase();

            if (title.includes(search)) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// =====================================
// SUBMISSION MODAL
// =====================================

function openSubmission(assignmentName) {

    const modal =
        document.getElementById("submissionModal");

    const selected =
        document.getElementById("selectedAssignment");

    selected.textContent = assignmentName;

    modal.classList.add("show");
}


function closeSubmission() {

    const modal =
        document.getElementById("submissionModal");

    modal.classList.remove("show");
}


function submitAssignment() {

    const file =
        document.getElementById("assignmentFile");

    if (!file.files.length) {

        alert("Please choose a file before submitting.");

        return;

    }

    alert("Assignment submitted successfully! 🎉");

    closeSubmission();

}
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


function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    selectedAnswer = null;

    document
        .getElementById("quizModal")
        .classList.add("show");

    loadQuestion();

}


function closeQuiz() {

    document
        .getElementById("quizModal")
        .classList.remove("show");

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


    options.forEach(function(button, index) {

        button.textContent =
            question.options[index];

        button.classList.remove("selected");

    });


    selectedAnswer = null;

    document.getElementById("quizMessage")
        .textContent = "";

}


function selectAnswer(button) {

    const options =
        document.querySelectorAll(
            ".answer-options button"
        );

    options.forEach(function(item) {

        item.classList.remove("selected");

    });


    button.classList.add("selected");


    selectedAnswer =
        Array.from(options).indexOf(button);

}


function nextQuestion() {

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


    document.querySelector(
        ".next-question-btn"
    ).textContent = "Close Quiz";


    document.querySelector(
        ".next-question-btn"
    ).onclick = closeQuiz;

}
// =====================================
// ANNOUNCEMENT SYSTEM
// =====================================

const announcementTabs =
    document.querySelectorAll(".announcement-tab");

const announcementItems =
    document.querySelectorAll(".announcement-item");


announcementTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        announcementTabs.forEach(function(item) {

            item.classList.remove("active");

        });

        tab.classList.add("active");


        const type =
            tab.getAttribute("data-type");


        announcementItems.forEach(function(item) {

            const itemType =
                item.getAttribute("data-type");

            const unread =
                item.classList.contains("unread");


            if (
                type === "all" ||
                itemType === type ||
                (type === "unread" && unread)
            ) {

                item.style.display = "flex";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// =====================================
// SEARCH
// =====================================

const announcementSearch =
    document.getElementById("announcementSearch");


if (announcementSearch) {

    announcementSearch.addEventListener(
        "input",
        function() {

            const search =
                announcementSearch.value.toLowerCase();


            announcementItems.forEach(function(item) {

                const title =
                    item.querySelector("h3")
                    .textContent
                    .toLowerCase();

                const description =
                    item.querySelector(
                        ".announcement-body > p"
                    )
                    .textContent
                    .toLowerCase();


                if (
                    title.includes(search) ||
                    description.includes(search)
                ) {

                    item.style.display = "flex";

                } else {

                    item.style.display = "none";

                }

            });

        }
    );

}


// =====================================
// MARK ONE AS READ
// =====================================

function markRead(button) {

    const item =
        button.closest(".announcement-item");

    item.classList.remove("unread");


    const dot =
        item.querySelector(".unread-dot");

    if (dot) {

        dot.remove();

    }


    button.outerHTML =
        `<span class="read-label">✓ Read</span>`;


    updateUnreadCount();

}


// =====================================
// MARK ALL AS READ
// =====================================

function markAllRead() {

    announcementItems.forEach(function(item) {

        item.classList.remove("unread");


        const dot =
            item.querySelector(".unread-dot");

        if (dot) {

            dot.remove();

        }


        const button =
            item.querySelector(".read-btn");

        if (button) {

            button.outerHTML =
                `<span class="read-label">✓ Read</span>`;

        }

    });


    updateUnreadCount();

}


// =====================================
// UPDATE UNREAD COUNT
// =====================================

function updateUnreadCount() {

    const unread =
        document.querySelectorAll(
            ".announcement-item.unread"
        ).length;


    const count =
        document.getElementById("unreadCount");


    if (count) {

        count.textContent =
            String(unread).padStart(2, "0");

    }

}
// =====================================
// PROFILE
// =====================================

function enableProfileEdit() {

    alert(
        "Profile editing will be connected to the Java backend later."
    );

}


function changeProfilePhoto() {

    alert(
        "Profile photo upload will be connected later."
    );

}


function addSkill() {

    const skill =
        prompt("Enter a new skill:");

    if (!skill) {
        return;
    }

    const skillsList =
        document.querySelector(".skills-list");

    const newSkill =
        document.createElement("span");

    newSkill.textContent = skill;

    skillsList.appendChild(newSkill);

}
// =====================================
// CREATE ACCOUNT
// =====================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const studentId =
            document.getElementById("studentId").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;

        }


        // Temporary frontend registration

        const student = {

            name: name,

            email: email,

            studentId: studentId

        };


        // Store temporarily in browser

        localStorage.setItem(
            "edutrackStudent",
            JSON.stringify(student)
        );


        alert(
            "Account created successfully! 🎉"
        );


        // Go to login

        window.location.href = "login.html";

    });

}
function togglePassword(inputId) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }

}