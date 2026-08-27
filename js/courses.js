// =====================================
// COURSES
// =====================================

export function initCourses() {

    // COURSE SEARCH

    const courseSearch =
        document.getElementById("courseSearch");

    const courseGrid =
        document.getElementById("courseGrid");

    if (courseSearch && courseGrid) {

        courseSearch.addEventListener("input", function () {

            const searchText =
                courseSearch.value.toLowerCase();

            const courses =
                courseGrid.querySelectorAll(".learning-card");

            courses.forEach(function (course) {

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


    // MARK LESSON COMPLETE

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
}
