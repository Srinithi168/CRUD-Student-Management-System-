// =====================================
// ASSIGNMENTS
// =====================================

export function initAssignments() {

    // ASSIGNMENT FILTER

    const assignmentTabs =
        document.querySelectorAll(".assignment-tab");

    const assignmentCards =
        document.querySelectorAll(".assignment-card");

    assignmentTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            assignmentTabs.forEach(function (item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const filter =
                tab.getAttribute("data-filter");

            assignmentCards.forEach(function (card) {

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


    // ASSIGNMENT SEARCH

    const assignmentSearch =
        document.getElementById("assignmentSearch");

    if (assignmentSearch) {

        assignmentSearch.addEventListener("input", function () {

            const search =
                assignmentSearch.value.toLowerCase();

            assignmentCards.forEach(function (card) {

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
}


// =====================================
// SUBMISSION MODAL
// =====================================

export function openSubmission(assignmentName) {

    const modal =
        document.getElementById("submissionModal");

    const selected =
        document.getElementById("selectedAssignment");

    if (!modal || !selected) {
        return;
    }

    selected.textContent = assignmentName;

    modal.classList.add("show");
}


export function closeSubmission() {

    const modal =
        document.getElementById("submissionModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");
}


export function submitAssignment() {

    const file =
        document.getElementById("assignmentFile");

    if (!file || !file.files.length) {

        alert("Please choose a file before submitting.");
        return;

    }

    alert("Assignment submitted successfully! 🎉");

    closeSubmission();
}
