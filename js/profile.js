// =====================================
// PROFILE
// =====================================

export function enableProfileEdit() {

    alert(
        "Profile editing will be connected to the Java backend later."
    );
}


export function changeProfilePhoto() {

    alert(
        "Profile photo upload will be connected later."
    );
}


export function addSkill() {

    const skill =
        prompt("Enter a new skill:");

    if (!skill) {
        return;
    }

    const skillsList =
        document.querySelector(".skills-list");

    if (!skillsList) {
        return;
    }

    const newSkill =
        document.createElement("span");

    newSkill.textContent = skill;

    skillsList.appendChild(newSkill);
}
