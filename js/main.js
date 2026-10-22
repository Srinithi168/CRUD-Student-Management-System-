// =====================================
// MAIN JAVASCRIPT MODULE
// =====================================

import { sayHello, add } from "./functions.js";
import { initRegister } from "./register.js";
import { initLogin, initLoginPassword } from "./login.js";
import { initCourses } from "./courses.js";
import { initChatbot } from "./chatbot.js";

// Expose utilities on window for inline scripts and debugging
if (typeof window !== "undefined") {
    window.sayHello = sayHello;
    window.add = add;
}

// Initialize all features safely on page load
function initializeApplication() {
    initRegister();
    initLogin();
    initLoginPassword();
    initCourses();
    initChatbot();
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeApplication);
    } else {
        initializeApplication();
    }
}

export { sayHello, add };