// =====================================
// LOGIN MODULE
// =====================================

export function initLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }


    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const savedStudent =
                localStorage.getItem(
                    "edutrackStudent"
                );


            if (!savedStudent) {

                alert(
                    "Please create an account first."
                );

                return;
            }


            const student =
                JSON.parse(savedStudent);


            if (
                email !== student.email ||
                password !== student.password
            ) {

                alert(
                    "Invalid email or password."
                );

                return;
            }


            alert(
                "Login successful! 🎉"
            );


            window.location.href =
                "dashboard.html";

        }
    );
}


// =====================================
// LOGIN PASSWORD SHOW / HIDE
// =====================================

export function initLoginPassword() {

    const password =
        document.getElementById(
            "loginPassword"
        );

    const toggle =
        document.getElementById(
            "loginPasswordToggle"
        );


    if (!password || !toggle) {
        return;
    }


    toggle.addEventListener(
        "click",
        function() {

            if (
                password.type === "password"
            ) {

                password.type = "text";

                toggle.textContent = "🙈";

            } else {

                password.type = "password";

                toggle.textContent = "👁";

            }

        }
    );
}