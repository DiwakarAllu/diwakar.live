import { initTestimonials } from "./modules/testimonials.js";
import { initWorkedWith } from "./modules/workedWith.js";
import { initEducation } from "./modules/education.js";
import { initExperience } from "./modules/experience.js";
import { initSkills } from "./modules/skills.js";
import { initProjects } from "./modules/projects.js";
import { initAccreditation } from "./modules/accreditation.js";
import { initBlogs } from "./modules/blogs.js";

"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

let isDownloaded = localStorage.getItem("resumeDownloaded") === "true";

// Disable the download section if already downloaded
function checkDownloadStatus() {
  const downloadSection = document.getElementById("downloadSection");
  if (isDownloaded && downloadSection) {
    downloadSection.classList.add("disabled");
  }
}

function downloadPDF() {
  // the "already downloaded" 
  if (isDownloaded) {
    document.getElementById("customAlert").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    return;
  }
  const pdfUrl =
    "https://drive.google.com/uc?export=download&id=1jE8Nh-OhH36yedD9qGeNXmKgF7c3gF7x";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Mark as downloaded in localStorage
  localStorage.setItem("resumeDownloaded", "true");
  isDownloaded = true;

  checkDownloadStatus();
}

function closeAlert() {
  const customAlert = document.getElementById("customAlert");
  const overlay = document.getElementById("overlay");
  if (customAlert) customAlert.style.display = "none";
  if (overlay) overlay.style.display = "none";
}

// Attach global functions to window
window.downloadPDF = downloadPDF;
window.closeAlert = closeAlert;
window.sendMail = function (event) {
  event.preventDefault(); // Prevent default form submission

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create the mailto link
  const mailtoLink = `mailto:diwakar.allu.3435@gmail.com?subject=New Inquiry from ${fullname} &body=This is ${encodeURIComponent(
    fullname
  )}%0D%0A%0D%0A ${encodeURIComponent(message)}`;

  // Open the default email client
  window.location.href = mailtoLink;
};

window.toggleSkills = function () {
  const moreSkills = document.getElementById("more-skills");
  const button = document.getElementById("show-more-btn");

  if (moreSkills.style.display === "none") {
    moreSkills.style.display = "block";
    button.textContent = "Show less ▲";
  } else {
    moreSkills.style.display = "none";
    button.textContent = "Show more ▼";
  }
};

// Security and Utility Event Listeners
document.addEventListener("copy", (event) => {
  // Allow copy in form
  if (!event.target.closest(".contact-form")) {
    event.preventDefault();
  }
});

document.addEventListener("paste", (event) => {
  // Allow paste in form
  if (!event.target.closest(".contact-form")) {
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener("keydown", function (event) {
  if (
    event.ctrlKey &&
    (event.key === "s" || event.key === "u" || event.key === "p")
  ) {
    event.preventDefault();
  }
  if (event.key === "F12") {
    event.preventDefault();
  }
  if (
    event.metaKey &&
    (event.key === "s" || event.key === "p" || event.key === "u")
  ) {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", (event) => event.preventDefault());

// Initialize Modules
document.addEventListener("DOMContentLoaded", () => {
  checkDownloadStatus();

  initTestimonials();
  initWorkedWith();
  initEducation();
  initExperience();
  initSkills();
  initProjects();
  initAccreditation();
  initBlogs();
});
