// ========================================================
// EDUTRACK COURSE CHATBOT (EDUBOT)
// ========================================================
// An intelligent conversational assistant strictly bounded
// to 10 specific course-related questions and their answers.

import {
  loadCoursesData,
  getCoursesDataSync,
  getEnrolledCourses,
  getCourseById
} from "./coursesData.js";

let isSoundEnabled = true;

// Web Audio API notification chime
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Ignore audio restrictions
  }
}

// ========================================================
// 10 DEFINED COURSE QUESTIONS & ANSWERS (STRICT BOUNDARY)
// ========================================================

export const COURSE_QUESTIONS_10 = [
  {
    id: 1,
    badge: "Q1",
    shortTitle: "Q1: Enrolled Courses",
    question: "What courses am I currently enrolled in?",
    keywords: [
      "enrolled", "my courses", "what courses", "courses am i", "all courses",
      "list courses", "current courses", "courses do i have", "show courses",
      "enrolled courses", "which courses", "q1", "1"
    ],
    getAnswer: (enrolledCourses) => ({
      text: `<span class="edubot-boundary-tag">Question 1 of 10</span>
      <br><strong>What courses am I currently enrolled in?</strong>
      <br><br>You are currently enrolled in <strong>4 core courses</strong>:
      <ul class="edubot-list">
        <li><strong>Python Programming:</strong> 75% complete (6/8 Modules • 12 Hours) ⏳ In Progress</li>
        <li><strong>Full Stack Web Development:</strong> 50% complete (5/10 Modules • 20 Hours) ⏳ In Progress</li>
        <li><strong>Database Management Systems:</strong> 60% complete (5/9 Modules • 15 Hours) ⏳ In Progress</li>
        <li><strong>Introduction to Artificial Intelligence:</strong> 100% complete (6/6 Modules • 10 Hours) ✅ Completed</li>
      </ul>
      Total logged learning time: <strong>42 Hours</strong> across 33 curriculum modules.`,
      followups: [
        "What is the syllabus for Python Programming?",
        "Which courses are currently in progress?",
        "Which course have I completed?"
      ]
    })
  },
  {
    id: 2,
    badge: "Q2",
    shortTitle: "Q2: Python Syllabus",
    question: "What is the syllabus and modules covered in Python Programming?",
    keywords: [
      "python syllabus", "python modules", "python topics", "what is covered in python",
      "learn in python", "python programming syllabus", "python curriculum", "python content",
      "python outline", "module in python", "q2", "2"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const python = getCourseById("python-programming");
      return {
        text: `<span class="edubot-boundary-tag">Question 2 of 10</span>
        <br><strong>What is the syllabus and modules covered in Python Programming?</strong>
        <br><br><strong>Instructor:</strong> Dr. Arun Kumar | <strong>Duration:</strong> 12 Hours (8 Modules):
        <ul class="edubot-list">
          <li><strong>Module 1:</strong> Introduction to Python & Setup (1.5h) — ✅ Completed</li>
          <li><strong>Module 2:</strong> Variables, Data Types & Operators (1.5h) — ✅ Completed</li>
          <li><strong>Module 3:</strong> Control Flow & Loops (1.5h) — ✅ Completed</li>
          <li><strong>Module 4:</strong> Functions & Scope (1.5h) — ✅ Completed</li>
          <li><strong>Module 5:</strong> Data Structures in Depth (2.0h) — ✅ Completed</li>
          <li><strong>Module 6:</strong> Object-Oriented Programming (OOP) (2.0h) — ✅ Completed</li>
          <li><strong>Module 7:</strong> File Handling & Exception Management (1.0h) — ▶️ In Progress</li>
          <li><strong>Module 8:</strong> Capstone Project & Assessment (1.0h) — 🔒 Up Next</li>
        </ul>`,
        card: python,
        followups: [
          "Which course is recommended for beginners?",
          "What are the prerequisites for AI?",
          "What courses am I currently enrolled in?"
        ]
      };
    }
  },
  {
    id: 3,
    badge: "Q3",
    shortTitle: "Q3: AI Prerequisites",
    question: "What are the prerequisites for Introduction to Artificial Intelligence?",
    keywords: [
      "ai prerequisites", "prerequisites for ai", "artificial intelligence prerequisites",
      "do i need math", "ai eligibility", "prior knowledge for ai", "requirements for ai",
      "math for ai", "prerequisite for artificial intelligence", "q3", "3"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const ai = getCourseById("artificial-intelligence");
      return {
        text: `<span class="edubot-boundary-tag">Question 3 of 10</span>
        <br><strong>What are the prerequisites for Introduction to Artificial Intelligence?</strong>
        <br><br><strong>Prerequisites & Requirements:</strong>
        <ul class="edubot-list">
          <li><strong>Mathematics:</strong> High-school mathematics (basic linear algebra and elementary probability).</li>
          <li><strong>Programming:</strong> Introductory Python programming (variables, loops, and simple functions).</li>
          <li><strong>No Prior AI/ML Experience:</strong> The course starts with basic agent architecture and heuristic search before advancing to neural networks.</li>
        </ul>
        <strong>Difficulty Level:</strong> Beginner to Advanced | <strong>Rating:</strong> ⭐ 4.9 / 5.0`,
        card: ai,
        followups: [
          "Which course have I completed?",
          "What is the syllabus for Python Programming?",
          "Are the courses free and do they include verified certificates?"
        ]
      };
    }
  },
  {
    id: 4,
    badge: "Q4",
    shortTitle: "Q4: Web Dev Duration",
    question: "What is the duration, hours, and schedule for Full Stack Web Development?",
    keywords: [
      "web dev duration", "web development hours", "schedule for web dev",
      "how long is web development", "web dev schedule", "web development timing",
      "full stack duration", "web dev hours", "duration for web dev", "q4", "4"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const web = getCourseById("web-development");
      return {
        text: `<span class="edubot-boundary-tag">Question 4 of 10</span>
        <br><strong>What is the duration, hours, and schedule for Full Stack Web Development?</strong>
        <br><br><strong>Instructor:</strong> Prof. Priya Sharma
        <ul class="edubot-list">
          <li><strong>Total Duration:</strong> 20 Hours across 10 structured modules.</li>
          <li><strong>Learning Pace:</strong> Self-paced with 24/7 access to online exercises.</li>
          <li><strong>Live Sessions:</strong> Weekly live coding & mentor labs every <strong>Thursday at 5:00 PM</strong>.</li>
          <li><strong>Your Progress:</strong> 50% completed (5 of 10 modules completed).</li>
        </ul>`,
        card: web,
        followups: [
          "Who are the instructors for my courses?",
          "Which courses are currently in progress?",
          "What topics are taught in DBMS?"
        ]
      };
    }
  },
  {
    id: 5,
    badge: "Q5",
    shortTitle: "Q5: Instructors",
    question: "Who are the instructors for my courses and what are their office hours?",
    keywords: [
      "instructor", "instructors", "teachers", "professors", "faculty",
      "office hours", "who teaches", "arun kumar", "priya sharma", "karthik raj",
      "meena krishnan", "office hour", "teacher hours", "q5", "5"
    ],
    getAnswer: () => ({
      text: `<span class="edubot-boundary-tag">Question 5 of 10</span>
      <br><strong>Who are the instructors for my courses and what are their office hours?</strong>
      <ul class="edubot-list">
        <li><strong>Dr. Arun Kumar</strong> (Python Programming)
          <br><small style="color:#64748b;">Senior Python Architect • Email: <code>arunkumar@edutrack.edu</code> • Office Hours: <strong>Tuesdays 4:00 PM - 6:00 PM</strong></small>
        </li>
        <li><strong>Prof. Priya Sharma</strong> (Full Stack Web Development)
          <br><small style="color:#64748b;">Lead Full Stack Architect • Email: <code>priyasharma@edutrack.edu</code> • Office Hours: <strong>Thursdays 5:00 PM - 7:00 PM</strong></small>
        </li>
        <li><strong>Prof. Karthik Raj</strong> (Database Management Systems)
          <br><small style="color:#64748b;">Data Engineering Consultant • Email: <code>karthikraj@edutrack.edu</code> • Office Hours: <strong>Wednesdays 3:30 PM - 5:30 PM</strong></small>
        </li>
        <li><strong>Dr. Meena Krishnan</strong> (Introduction to Artificial Intelligence)
          <br><small style="color:#64748b;">AI Research Director • Email: <code>meenakrishnan@edutrack.edu</code> • Office Hours: <strong>Fridays 3:00 PM - 5:00 PM</strong></small>
        </li>
      </ul>`,
      followups: [
        "What courses am I currently enrolled in?",
        "What topics are taught in DBMS?",
        "Are the courses free and do they include verified certificates?"
      ]
    })
  },
  {
    id: 6,
    badge: "Q6",
    shortTitle: "Q6: DBMS Topics",
    question: "What topics and syllabus are taught in Database Management Systems (DBMS)?",
    keywords: [
      "dbms syllabus", "database syllabus", "dbms topics", "database management syllabus",
      "sql syllabus", "what is covered in dbms", "dbms modules", "database topics",
      "dbms content", "learn in dbms", "q6", "6"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const db = getCourseById("database-management");
      return {
        text: `<span class="edubot-boundary-tag">Question 6 of 10</span>
        <br><strong>What topics and syllabus are taught in Database Management Systems (DBMS)?</strong>
        <br><br><strong>Instructor:</strong> Prof. Karthik Raj | <strong>Duration:</strong> 15 Hours (9 Modules):
        <ul class="edubot-list">
          <li><strong>Module 1:</strong> Introduction to DBMS & Relational Model (1.5h) — ✅ Completed</li>
          <li><strong>Module 2:</strong> Entity-Relationship (ER) Modeling (1.5h) — ✅ Completed</li>
          <li><strong>Module 3:</strong> SQL Fundamentals (DDL, DML, DCL) (1.5h) — ✅ Completed</li>
          <li><strong>Module 4:</strong> Advanced SQL Queries & Joins (2.0h) — ✅ Completed</li>
          <li><strong>Module 5:</strong> Database Normalization (1NF to BCNF) (2.0h) — ✅ Completed</li>
          <li><strong>Module 6:</strong> Indexing & Query Optimization (1.5h) — ▶️ In Progress</li>
          <li><strong>Module 7:</strong> Transactions & ACID Properties (1.5h) — 🔒 Up Next</li>
          <li><strong>Module 8:</strong> Concurrency Control & Recovery (1.5h) — 🔒 Up Next</li>
          <li><strong>Module 9:</strong> NoSQL Databases (MongoDB) (2.0h) — 🔒 Up Next</li>
        </ul>`,
        card: db,
        followups: [
          "Which courses are currently in progress?",
          "Who are the instructors for my courses?",
          "What are the prerequisites for AI?"
        ]
      };
    }
  },
  {
    id: 7,
    badge: "Q7",
    shortTitle: "Q7: Certificate",
    question: "Which course have I completed and how do I download my certificate?",
    keywords: [
      "completed course", "which course is completed", "certificate", "download certificate",
      "claim certificate", "ai certificate", "certificate id", "finished course",
      "which course is finished", "get certificate", "my certificate", "q7", "7"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const ai = getCourseById("artificial-intelligence");
      return {
        text: `<span class="edubot-boundary-tag">Question 7 of 10</span>
        <br><strong>Which course have I completed and how do I download my certificate?</strong>
        <br><br>You have completed 1 course: <strong>Introduction to Artificial Intelligence</strong> (100% complete • 6/6 modules done).
        <ul class="edubot-list">
          <li><strong>Certificate Status:</strong> ✅ Verified & Issued</li>
          <li><strong>Certificate ID:</strong> <code>EDU-AI-2026-884</code></li>
          <li><strong>Issue Date:</strong> August 2026</li>
        </ul>
        <strong>How to download:</strong> Navigate to your <strong>Profile → Certificate</strong> section from the sidebar, or click your profile badge to access the downloadable PDF.`,
        card: ai,
        followups: [
          "Which courses are currently in progress?",
          "What courses am I currently enrolled in?",
          "Are the courses free and do they include verified certificates?"
        ]
      };
    }
  },
  {
    id: 8,
    badge: "Q8",
    shortTitle: "Q8: In-Progress",
    question: "Which courses are currently in progress and how many modules are left?",
    keywords: [
      "in progress", "active courses", "ongoing courses", "unfinished courses",
      "modules left", "remaining modules", "progress status", "how many modules left",
      "what is in progress", "courses in progress", "q8", "8"
    ],
    getAnswer: () => ({
      text: `<span class="edubot-boundary-tag">Question 8 of 10</span>
      <br><strong>Which courses are currently in progress and how many modules are left?</strong>
      <br><br>You currently have <strong>3 courses in progress</strong>:
      <ul class="edubot-list">
        <li><strong>Python Programming:</strong> 75% complete (6/8 done • <strong>2 modules remaining:</strong> File Handling & Capstone Project).</li>
        <li><strong>Database Management Systems:</strong> 60% complete (5/9 done • <strong>4 modules remaining:</strong> Indexing, Transactions, Concurrency, NoSQL).</li>
        <li><strong>Full Stack Web Development:</strong> 50% complete (5/10 done • <strong>5 modules remaining:</strong> Component Architecture, Node.js/Express, REST APIs, Auth, Capstone).</li>
      </ul>`,
      followups: [
        "What is the syllabus for Python Programming?",
        "What is the duration for Full Stack Web Development?",
        "What topics are taught in DBMS?"
      ]
    })
  },
  {
    id: 9,
    badge: "Q9",
    shortTitle: "Q9: Beginner Advice",
    question: "Which course is recommended for beginners with no coding experience?",
    keywords: [
      "beginner", "recommend", "start with", "where should i start", "first course",
      "new to programming", "no coding experience", "easiest course", "beginner recommendation",
      "best course for beginner", "recommendation for beginner", "q9", "9"
    ],
    getAnswer: (enrolledCourses, getCourseById) => {
      const python = getCourseById("python-programming");
      return {
        text: `<span class="edubot-boundary-tag">Question 9 of 10</span>
        <br><strong>Which course is recommended for beginners with no coding experience?</strong>
        <br><br><strong>Python Programming</strong> is the #1 recommended course for beginners:
        <ul class="edubot-list">
          <li><strong>Why Python?</strong> Clean, English-like syntax without complicated syntax overhead.</li>
          <li><strong>Zero Prerequisites:</strong> Built specifically for beginners with no prior coding background.</li>
          <li><strong>Your Status:</strong> You are already <strong>75% done</strong> with Python Programming! Finish the remaining 2 modules to earn your verified certificate.</li>
        </ul>`,
        card: python,
        followups: [
          "What is the syllabus for Python Programming?",
          "What is the duration for Full Stack Web Development?",
          "What courses am I currently enrolled in?"
        ]
      };
    }
  },
  {
    id: 10,
    badge: "Q10",
    shortTitle: "Q10: Course Fees",
    question: "Are the courses free and do they include verified certificates?",
    keywords: [
      "free", "fees", "cost", "price", "tuition", "charge", "payment",
      "how much", "verified certificate free", "is it free", "are courses free",
      "course cost", "fee for course", "q10", "10"
    ],
    getAnswer: () => ({
      text: `<span class="edubot-boundary-tag">Question 10 of 10</span>
      <br><strong>Are the courses free and do they include verified certificates?</strong>
      <br><br><strong>Yes, 100% Free:</strong> All 4 courses in your EduTrack student portal (Python, Web Development, DBMS, and AI) are completely free under your student enrollment!
      <ul class="edubot-list">
        <li><strong>Tuition:</strong> $0 / Free of charge</li>
        <li><strong>Exams & Quizzes:</strong> Free with automated evaluations</li>
        <li><strong>Verified Certificates:</strong> Free digital credentials issued upon 100% completion</li>
      </ul>`,
      followups: [
        "What courses am I currently enrolled in?",
        "Which course have I completed?",
        "Who are the instructors for my courses?"
      ]
    })
  }
];

/**
 * Builds HTML menu for the 10 supported questions
 */
function render10QuestionMenu() {
  return `
    <div class="edubot-question-menu">
      ${COURSE_QUESTIONS_10.map(q => `
        <button class="edubot-question-btn" data-query="${q.question}">
          <span class="edubot-q-num">${q.badge}</span>
          <span>${q.question}</span>
        </button>
      `).join("")}
    </div>
  `;
}

/**
 * Matches a query strictly against the 10 defined course questions
 */
function matchQuestion(query) {
  const text = query.toLowerCase().trim();

  // 1. Direct question text or ID/number match
  for (const item of COURSE_QUESTIONS_10) {
    if (text === item.question.toLowerCase() || text === item.badge.toLowerCase() || text === `question ${item.id}` || text === `${item.id}`) {
      return item;
    }
  }

  // 2. Score match based on keywords
  let bestMatch = null;
  let highestScore = 0;

  for (const item of COURSE_QUESTIONS_10) {
    let score = 0;

    for (const kw of item.keywords) {
      if (text.includes(kw)) {
        // Longer keyword matches carry higher weight
        score += kw.length * 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Require a minimum match threshold (score >= 6) to avoid false positives
  if (highestScore >= 6) {
    return bestMatch;
  }

  return null;
}

/**
 * Main Answer Engine with Strict 10-Question Boundary
 */
function generateBotAnswer(userMessage) {
  const rawText = userMessage.trim();
  const text = rawText.toLowerCase();
  const enrolledCourses = getEnrolledCourses();

  // GREETINGS: Welcome and explicitly show the 10 questions boundary
  if (/^(hi|hello|hey|hola|greetings|good\s*(morning|afternoon|evening)|sup)\b/.test(text)) {
    return {
      text: `Hello! 👋 I'm <strong>EduBot</strong>, your course assistant.<br><br>
      I am strictly configured with a boundary to answer <strong>only the 10 course-related questions</strong> below.<br><br>
      Click any question to view its verified answer:
      ${render10QuestionMenu()}`,
      followups: [
        "What courses am I currently enrolled in?",
        "What is the syllabus for Python Programming?",
        "Which course have I completed?"
      ]
    };
  }

  // REQUEST FOR THE 10 QUESTIONS LIST / HELP / MENU
  if (
    text === "help" || text.includes("10 questions") || text.includes("questions") ||
    text.includes("menu") || text.includes("boundary") || text.includes("what can you answer")
  ) {
    return {
      text: `📋 <strong>EduBot 10-Question Directory</strong>
      <br><br>Here are the <strong>10 specific questions</strong> I am authorized to answer:
      ${render10QuestionMenu()}`,
      followups: [
        "What courses am I currently enrolled in?",
        "Who are the instructors for my courses?",
        "Are the courses free and do they include verified certificates?"
      ]
    };
  }

  // THANK YOU
  if (text.includes("thank") || text.includes("thanks") || text.includes("awesome")) {
    return {
      text: `You're very welcome! 😊 Feel free to ask any of the other <strong>10 supported course questions</strong> whenever you need help.`,
      followups: [
        "What courses am I currently enrolled in?",
        "Which courses are currently in progress?",
        "Which course is recommended for beginners?"
      ]
    };
  }

  // MATCH AGAINST THE 10 QUESTIONS
  const matched = matchQuestion(userMessage);

  if (matched) {
    const response = matched.getAnswer(enrolledCourses, getCourseById);
    return response;
  }

  // OUT OF BOUNDARY / OUT OF SCOPE
  return {
    text: `
      <div class="edubot-scope-warning">
        ⚠️ <strong>Boundary Notice: Question Out of Scope</strong>
        <br>I am restricted to answering <strong>only the 10 predefined course questions</strong> below. Your inquiry (<em>"${escapeHTML(rawText)}"</em>) is not related to any of the 10 allowed topics.
      </div>
      Please select or ask one of the <strong>10 supported course questions</strong> below:
      ${render10QuestionMenu()}
    `,
    followups: [
      "What courses am I currently enrolled in?",
      "What is the syllabus for Python Programming?",
      "What are the prerequisites for AI?"
    ]
  };
}

/**
 * Creates Rich Course Preview Card HTML inside chat bubble
 */
function createCardHTML(course) {
  if (!course) return "";
  const isCompleted = course.isCompleted || course.status === "completed";
  const instructorName = typeof course.instructor === "object" ? course.instructor.name : course.instructor;
  const btnClass = isCompleted ? "edubot-card-btn completed" : "edubot-card-btn";
  const btnText = isCompleted ? "✓ View Completed Course" : "Continue Learning →";

  return `
    <div class="edubot-course-card">
      <div class="edubot-card-head ${course.bgClass || 'default-bg'}">
        <span class="edubot-card-code">${course.code || 'EDU'}</span>
        <span class="edubot-card-tag">${course.category}</span>
      </div>
      <div class="edubot-card-body">
        <h4>${course.title}</h4>
        <div class="edubot-card-instructor">👨‍🏫 ${instructorName}</div>
        <div class="edubot-card-stats">
          <span>📖 ${course.modulesCount} Modules</span>
          <span>⏱️ ${course.learningTime || course.totalHours + ' Hours'}</span>
          <span>⭐ ${course.rating || '4.9'}</span>
        </div>
        <div class="edubot-card-progress-wrap">
          <div class="edubot-card-progress-label">
            <span>${course.progressPercent}% Complete</span>
            <span>${course.completedModules}/${course.modulesCount}</span>
          </div>
          <div class="edubot-card-progress-track">
            <div class="edubot-card-progress-fill ${isCompleted ? 'completed' : ''}" style="width: ${course.progressPercent}%;"></div>
          </div>
        </div>
        <a href="${course.courseAction?.link || 'course-details.html'}" class="${btnClass}">
          ${btnText}
        </a>
      </div>
    </div>
  `;
}

/**
 * Builds the EduBot DOM elements with the 10-Question Quick Bar
 */
function buildChatbotDOM() {
  // Floating launcher
  const launcher = document.createElement("button");
  launcher.id = "edubotLauncher";
  launcher.className = "edubot-launcher";
  launcher.setAttribute("aria-label", "Open EduBot Course Assistant");
  launcher.innerHTML = `
    <div class="edubot-launcher-icon">
      💬
      <span class="edubot-online-badge"></span>
    </div>
    <span class="edubot-launcher-text">Ask EduBot (10 Q&A)</span>
  `;

  // Quick Chips for all 10 Questions
  const chipsHTML = COURSE_QUESTIONS_10.map(q => 
    `<button class="edubot-chip" data-query="${q.question}">${q.shortTitle}</button>`
  ).join("");

  // Chat window
  const windowEl = document.createElement("div");
  windowEl.id = "edubotWindow";
  windowEl.className = "edubot-window";
  windowEl.innerHTML = `
    <!-- HEADER -->
    <div class="edubot-header">
      <div class="edubot-header-info">
        <div class="edubot-avatar-wrap">
          🤖
          <span class="edubot-status-dot"></span>
        </div>
        <div class="edubot-header-text">
          <h3>EduBot <span class="edubot-header-badge">10 Q&A Boundary</span></h3>
          <p>Answers strictly for 10 course questions</p>
        </div>
      </div>
      <div class="edubot-header-actions">
        <button id="edubotSoundBtn" class="edubot-action-btn" title="Toggle Sound">🔔</button>
        <button id="edubotExpandBtn" class="edubot-action-btn" title="Expand Window">⤢</button>
        <button id="edubotClearBtn" class="edubot-action-btn" title="Reset Chat">🧹</button>
        <button id="edubotCloseBtn" class="edubot-action-btn" title="Close Chat">✕</button>
      </div>
    </div>

    <!-- QUICK PROMPT CHIPS (10 QUESTIONS) -->
    <div class="edubot-quick-prompts" id="edubotQuickPrompts" title="Scroll horizontally for all 10 questions">
      ${chipsHTML}
    </div>

    <!-- MESSAGES AREA -->
    <div class="edubot-messages" id="edubotMessages"></div>

    <!-- INPUT AREA -->
    <div class="edubot-input-area">
      <input 
        type="text" 
        id="edubotInput" 
        class="edubot-input" 
        placeholder="Ask one of the 10 course questions..." 
        autocomplete="off"
      >
      <button id="edubotSendBtn" class="edubot-send-btn" title="Send Question">➤</button>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(windowEl);
}

/**
 * Appends a message to the chat view
 */
function appendMessage(sender, content, cardData = null, followups = []) {
  const messagesContainer = document.getElementById("edubotMessages");
  if (!messagesContainer) return;

  const msgEl = document.createElement("div");
  msgEl.className = `edubot-msg ${sender}`;

  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const avatar = sender === "user" ? "👤" : "🤖";

  let bodyHtml = `
    <div class="edubot-msg-avatar">${avatar}</div>
    <div class="edubot-msg-body">
      <div class="edubot-msg-bubble">
        ${content}
        ${cardData ? createCardHTML(cardData) : ""}
        ${followups && followups.length > 0 ? `
          <div class="edubot-followups">
            ${followups.map(f => `<button class="edubot-followup-btn" data-query="${f}">${f}</button>`).join("")}
          </div>
        ` : ""}
      </div>
      <div class="edubot-msg-time">${timeStr}</div>
    </div>
  `;

  msgEl.innerHTML = bodyHtml;
  messagesContainer.appendChild(msgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  if (sender === "bot" && isSoundEnabled) {
    playNotificationChime();
  }
}

/**
 * Shows temporary typing animation
 */
function showTypingIndicator() {
  const messagesContainer = document.getElementById("edubotMessages");
  if (!messagesContainer) return null;

  const typingEl = document.createElement("div");
  typingEl.id = "edubotTyping";
  typingEl.className = "edubot-msg bot";
  typingEl.innerHTML = `
    <div class="edubot-msg-avatar">🤖</div>
    <div class="edubot-typing">
      <div class="edubot-typing-dot"></div>
      <div class="edubot-typing-dot"></div>
      <div class="edubot-typing-dot"></div>
    </div>
  `;

  messagesContainer.appendChild(typingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return typingEl;
}

function removeTypingIndicator() {
  const typingEl = document.getElementById("edubotTyping");
  if (typingEl) {
    typingEl.remove();
  }
}

/**
 * Handles sending a message
 */
export function handleSendMessage(customText = null) {
  const input = document.getElementById("edubotInput");
  const query = customText !== null ? customText : (input ? input.value.trim() : "");

  if (!query) return;

  if (input && customText === null) {
    input.value = "";
  }

  // Display user query
  appendMessage("user", escapeHTML(query));

  // Show typing indicator
  showTypingIndicator();

  // Natural pacing delay
  setTimeout(() => {
    removeTypingIndicator();
    const answer = generateBotAnswer(query);
    appendMessage("bot", answer.text, answer.card || null, answer.followups || []);
  }, 400);
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Main Chatbot Initialization
 */
export async function initChatbot() {
  // Pre-load course JSON data in memory
  try {
    await loadCoursesData();
  } catch (e) {
    console.warn("EduBot: Using fallback course data:", e);
  }

  // Check if DOM elements already exist
  if (!document.getElementById("edubotLauncher")) {
    buildChatbotDOM();
  }

  const launcher = document.getElementById("edubotLauncher");
  const windowEl = document.getElementById("edubotWindow");
  const closeBtn = document.getElementById("edubotCloseBtn");
  const expandBtn = document.getElementById("edubotExpandBtn");
  const clearBtn = document.getElementById("edubotClearBtn");
  const soundBtn = document.getElementById("edubotSoundBtn");
  const sendBtn = document.getElementById("edubotSendBtn");
  const input = document.getElementById("edubotInput");
  const messagesContainer = document.getElementById("edubotMessages");
  const quickPrompts = document.getElementById("edubotQuickPrompts");

  if (!launcher || !windowEl) return;

  // Toggle open / close
  function toggleChatbot(forceState = null) {
    const shouldOpen = forceState !== null ? forceState : !windowEl.classList.contains("edubot-open");
    if (shouldOpen) {
      windowEl.classList.add("edubot-open");
      if (input) setTimeout(() => input.focus(), 250);
    } else {
      windowEl.classList.remove("edubot-open");
    }
  }

  launcher.addEventListener("click", () => toggleChatbot());
  closeBtn?.addEventListener("click", () => toggleChatbot(false));

  // Expand / shrink
  expandBtn?.addEventListener("click", () => {
    windowEl.classList.toggle("edubot-expanded");
    expandBtn.textContent = windowEl.classList.contains("edubot-expanded") ? "⤡" : "⤢";
  });

  // Sound toggle
  soundBtn?.addEventListener("click", () => {
    isSoundEnabled = !isSoundEnabled;
    soundBtn.textContent = isSoundEnabled ? "🔔" : "🔕";
    soundBtn.title = isSoundEnabled ? "Sound Enabled" : "Sound Muted";
  });

  // Clear chat
  clearBtn?.addEventListener("click", () => {
    if (messagesContainer) {
      messagesContainer.innerHTML = "";
      sendInitialGreeting();
    }
  });

  // Send input
  sendBtn?.addEventListener("click", () => handleSendMessage());
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Quick prompt chips click (10 questions bar)
  quickPrompts?.addEventListener("click", (e) => {
    const chip = e.target.closest(".edubot-chip");
    if (chip) {
      const q = chip.getAttribute("data-query");
      if (q) handleSendMessage(q);
    }
  });

  // Follow-up chips & 10-Question Menu click (delegated inside messages)
  messagesContainer?.addEventListener("click", (e) => {
    const btn = e.target.closest(".edubot-followup-btn, .edubot-question-btn");
    if (btn) {
      const q = btn.getAttribute("data-query");
      if (q) handleSendMessage(q);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && windowEl.classList.contains("edubot-open")) {
      toggleChatbot(false);
    }
  });

  // Hook any external "Ask EduBot" buttons on the page
  document.querySelectorAll(".open-edubot-btn, .ask-edubot-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleChatbot(true);
      const query = btn.getAttribute("data-query");
      if (query) {
        setTimeout(() => handleSendMessage(query), 300);
      }
    });
  });

  // Initial welcome message introducing the 10-Question Boundary
  function sendInitialGreeting() {
    const studentName = getCoursesDataSync().system?.student?.name || "Student";
    const welcomeText = `Hello ${studentName}! 👋 I'm <strong>EduBot</strong>, your course assistant.<br><br>
    I am specifically set up with a boundary to answer <strong>only the 10 course questions</strong> below.<br><br>
    Click any question to see its verified answer, or choose from the top bar:
    ${render10QuestionMenu()}`;

    appendMessage("bot", welcomeText, null, [
      "What courses am I currently enrolled in?",
      "What is the syllabus for Python Programming?",
      "What are the prerequisites for AI?",
      "Which course have I completed?"
    ]);
  }

  if (messagesContainer && messagesContainer.children.length === 0) {
    sendInitialGreeting();
  }

  // Expose global controller
  window.EduBot = {
    open: () => toggleChatbot(true),
    close: () => toggleChatbot(false),
    ask: (q) => {
      toggleChatbot(true);
      handleSendMessage(q);
    },
    get10Questions: () => COURSE_QUESTIONS_10
  };
}

// Auto-initialize when DOM ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initChatbot());
  } else {
    initChatbot();
  }
}
