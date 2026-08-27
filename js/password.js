// =====================================
// LOGIN PASSWORD SHOW / HIDE
// =====================================

export function initPasswordToggle() {

    const password = document.getElementById("password");
    const togglePassword =
        document.getElementById("togglePassword");

    if (!password || !togglePassword) {
        return;
    }

    togglePassword.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            password.type = "password";
            togglePassword.textContent = "👁";

        }

    });
}
