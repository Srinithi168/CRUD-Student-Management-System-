// =====================================
// ANNOUNCEMENT SYSTEM
// =====================================

export function initAnnouncements() {

    const announcementTabs =
        document.querySelectorAll(".announcement-tab");

    const announcementItems =
        document.querySelectorAll(".announcement-item");

    announcementTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            announcementTabs.forEach(function (item) {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            const type =
                tab.getAttribute("data-type");

            announcementItems.forEach(function (item) {

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


    // SEARCH

    const announcementSearch =
        document.getElementById("announcementSearch");

    if (announcementSearch) {

        announcementSearch.addEventListener(
            "input",
            function () {

                const search =
                    announcementSearch.value.toLowerCase();

                announcementItems.forEach(function (item) {

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
}


export function markRead(button) {

    const item =
        button.closest(".announcement-item");

    if (!item) {
        return;
    }

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


export function markAllRead() {

    const announcementItems =
        document.querySelectorAll(".announcement-item");

    announcementItems.forEach(function (item) {

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
