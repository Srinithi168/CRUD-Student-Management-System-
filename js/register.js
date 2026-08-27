// =====================================
// REGISTER MODULE
// =====================================

export function initRegister() {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("fullName")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const studentId =
                document.getElementById("studentId")
                    .value
                    .trim();

            const password =
                document.getElementById("password")
                    .value;

            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;


            if (password !== confirmPassword) {

                alert("Passwords do not match!");

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters!"
                );

                return;
            }


            const student = {

                name: name,
                email: email,
                studentId: studentId,
                password: password

            };


            localStorage.setItem(
                "edutrackStudent",
                JSON.stringify(student)
            );


            alert(
                "Account created successfully! 🎉"
            );


            window.location.href =
                "login.html";

        }
    );
}