// =====================================
// COURSES MODULE (JSON DATA INTEGRATION)
// =====================================

import { loadCoursesData, getCoursesDataSync } from "./coursesData.js";

/**
 * Creates the HTML for a single course card matching EduTrack design
 */
function createCourseCardHTML(course) {
  const isCompleted = course.isCompleted || course.status === "completed";
  const completedClass = isCompleted ? "completed-course" : "";
  const progressCompletedClass = isCompleted ? "completed" : "";
  const actionCompletedClass = isCompleted ? "completed-action" : "";
  const actionText = course.courseAction?.text || (isCompleted ? "✓ Course Completed" : "Continue Learning →");
  const actionLink = course.courseAction?.link || "course-details.html";
  const instructorName = typeof course.instructor === "object" ? course.instructor.name : course.instructor;
  const instructorAvatar = (typeof course.instructor === "object" && course.instructor.avatar) ? course.instructor.avatar : "👨‍🏫";

  return `
    <article class="learning-card ${completedClass}" data-id="${course.id}" data-status="${course.status}" data-category="${course.category.toLowerCase()}">
      <div class="learning-image ${course.bgClass || 'python-bg'}">
        <span>${course.code || 'EDU'}</span>
        <small>${course.category}</small>
      </div>
      <div class="learning-content">
        <span class="course-tag">${course.category}</span>
        <h3>${course.title}</h3>
        <p class="instructor">${instructorAvatar} ${instructorName}</p>
        <div class="course-meta">
          <span>📖 ${course.modulesCount} Modules</span>
          <span>⏱️ ${course.learningTime || (course.totalHours + ' Hours')}</span>
        </div>
        <div class="learning-progress">
          <div class="progress-info">
            <span>${course.progressPercent}% Complete</span>
            <span>${course.completedModules}/${course.modulesCount}</span>
          </div>
          <div class="progress-bar">
            <div class="progress ${progressCompletedClass}" style="width: ${course.progressPercent}%"></div>
          </div>
        </div>
        <a href="${actionLink}" class="course-action ${actionCompletedClass}">
          ${actionText}
        </a>
      </div>
    </article>
  `;
}

/**
 * Renders course cards into the courseGrid container
 */
export function renderCourses(courses, container) {
  if (!container || !courses || courses.length === 0) return;
  container.innerHTML = courses.map(course => createCourseCardHTML(course)).join("");
}

/**
 * Updates the course statistics display from JSON data
 */
function updateCourseStats(data) {
  const courses = data.courses || [];
  const total = courses.length;
  const inProgress = courses.filter(c => c.status === "in-progress" || !c.isCompleted).length;
  const completed = courses.filter(c => c.isCompleted || c.status === "completed").length;
  const totalHours = data.system?.student?.learningHours || "42h";

  const statsSection = document.querySelector(".course-stats");
  if (!statsSection) return;

  const statBoxes = statsSection.querySelectorAll("div > div");
  if (statBoxes.length >= 4) {
    const totalEl = statBoxes[0].querySelector("strong");
    if (totalEl) totalEl.textContent = total;

    const inProgressEl = statBoxes[1].querySelector("strong");
    if (inProgressEl) inProgressEl.textContent = inProgress;

    const completedEl = statBoxes[2].querySelector("strong");
    if (completedEl) completedEl.textContent = completed;

    const timeEl = statBoxes[3].querySelector("strong");
    if (timeEl) timeEl.textContent = totalHours;
  }
}

/**
 * Filters the displayed course cards by search query and category/tab filter
 */
function applyFilters(searchText = "", statusFilter = "all") {
  const courseGrid = document.getElementById("courseGrid");
  if (!courseGrid) return;

  const cards = courseGrid.querySelectorAll(".learning-card");
  const query = searchText.toLowerCase().trim();

  cards.forEach(card => {
    const courseTitle = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const courseTag = card.querySelector(".course-tag")?.textContent.toLowerCase() || "";
    const instructor = card.querySelector(".instructor")?.textContent.toLowerCase() || "";
    const cardStatus = card.getAttribute("data-status") || "";
    const isCompleted = card.classList.contains("completed-course") || cardStatus === "completed";

    // Text match
    const matchesText = !query || courseTitle.includes(query) || courseTag.includes(query) || instructor.includes(query);

    // Status filter match
    let matchesStatus = true;
    if (statusFilter === "in-progress") {
      matchesStatus = !isCompleted;
    } else if (statusFilter === "completed") {
      matchesStatus = isCompleted;
    }

    if (matchesText && matchesStatus) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

/**
 * Main initialization function for courses page
 */
export async function initCourses() {
  const courseSearch = document.getElementById("courseSearch");
  const courseGrid = document.getElementById("courseGrid");

  let currentStatusFilter = "all";
  let currentSearchQuery = "";

  if (courseGrid) {
    try {
      const data = await loadCoursesData();
      if (data && data.courses && data.courses.length > 0) {
        renderCourses(data.courses, courseGrid);
        updateCourseStats(data);
      }
    } catch (err) {
      console.warn("Could not load dynamic courses from JSON, keeping existing HTML cards:", err);
    }

    // Connect Search Input
    if (courseSearch) {
      courseSearch.addEventListener("input", function () {
        currentSearchQuery = courseSearch.value;
        applyFilters(currentSearchQuery, currentStatusFilter);
      });
    }

    // Connect Filter Tabs
    const filterButtons = document.querySelectorAll(".course-filters .filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const btnText = btn.textContent.trim().toLowerCase();
        if (btnText.includes("progress")) {
          currentStatusFilter = "in-progress";
        } else if (btnText.includes("completed")) {
          currentStatusFilter = "completed";
        } else {
          currentStatusFilter = "all";
        }

        applyFilters(currentSearchQuery, currentStatusFilter);
      });
    });
  }

  // MARK LESSON COMPLETE (course-details.html)
  const completeLesson = document.getElementById("completeLesson");
  if (completeLesson) {
    completeLesson.addEventListener("click", function () {
      completeLesson.classList.toggle("completed");
      if (completeLesson.classList.contains("completed")) {
        completeLesson.textContent = "✓ Lesson Completed";
      } else {
        completeLesson.textContent = "✓ Mark as Complete";
      }
    });
  }
}

// Auto-run if page contains course elements
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("courseGrid") || document.getElementById("courseSearch")) {
        initCourses();
      }
    });
  } else {
    if (document.getElementById("courseGrid") || document.getElementById("courseSearch")) {
      initCourses();
    }
  }
}
