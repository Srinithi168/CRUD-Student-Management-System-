// =============================
// Mobile Navigation
// =============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("show");

});

}

// =============================
// Sticky Navbar
// =============================

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){

navbar.classList.add("sticky");

}
else{

navbar.classList.remove("sticky");

}

});

// =============================
// Scroll To Top Button
// =============================

const scrollBtn=document.createElement("button");

scrollBtn.innerHTML="⬆";

scrollBtn.classList.add("scroll-top");

document.body.appendChild(scrollBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

scrollBtn.style.display="block";

}else{

scrollBtn.style.display="none";

}

});

scrollBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// =============================
// Search Function
// =============================

const searchInput=document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const cards=document.querySelectorAll(".course-card");

cards.forEach(card=>{

const title=card.innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// =============================
// Newsletter
// =============================

const newsletter=document.querySelector(".newsletter button");

if(newsletter){

newsletter.onclick=function(){

alert("Thank you for subscribing to LearnHub!");

};

}

// =============================
// Contact Form
// =============================

const contactForm=document.querySelector(".contact-right form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Message sent successfully!");

});

}

// =============================
// Login Button
// =============================

const login=document.querySelector(".login-btn-main");

if(login){

login.addEventListener("click",()=>{

alert("Login Successful!");

});

}

// =============================
// Register Button
// =============================

const register=document.querySelector(".register-btn-main");

if(register){

register.addEventListener("click",()=>{

alert("Account Created Successfully!");

});

}