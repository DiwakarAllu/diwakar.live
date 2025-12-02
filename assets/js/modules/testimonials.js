import { fetchWithFallback } from "./fetchWithFallback.js";

const testimonialsFallback = [
    {
        name: "Sai Ganesh",
        role: "Software Engineer at Cognizant",
        avatar: "./assets/images/than.png",
        title: "Smart Problem Solver",
        text: "Diwakar is a smart and reliable engineer who always looks for the best way to solve a problem. He doesn’t settle for just ‘getting it done’ — he tries different approaches to find the most efficient and scalable solution. He works with full focus and finishes tasks with high quality, even under pressure. His dedication, clear thinking, and strong technical skills make him a valuable asset to any team.",
    },
    {
        name: "Thanush",
        role: "Software Engineer at Deloitte",
        avatar: "./assets/images/sai.png",
        title: "Trusted Collaborator",
        text: "I first connected Diwakar with one of my clients for an Android app project, which he developed end-to-end using Java. His delivery was solid — focused, reliable, and exactly what the client needed. Because of that great experience, I trusted him with another project — this time using Flutter — and he’s picking it up fast. His ability to learn, adapt, and take full ownership of mobile app development makes him a valuable asset and an exceptional developer who consistently delivers high-impact results.",
    },
    {
        name: "Rakshita",
        role: "Data Analyst at Barclays",
        avatar: "./assets/images/avatar-2.png",
        title: "Excellent Developer",
        text: "Diwakar is an excellent developer who consistently delivers high-quality code. His problem-solving skills are top-notch.",
    },
    {
        name: "Nikhil",
        role: "Specialist Programmer at Infosys",
        avatar: "./assets/images/avatar-1.png",
        title: "Great Team Player",
        text: "Working with Diwakar has been a pleasure. He is a great team player and always willing to help others.",
    },
    {
        name: "Anusha",
        role: "Software Engineer at Tata Consultancy",
        avatar: "./assets/images/avatar-3.png",
        title: "Highly Skilled",
        text: "Diwakar possesses a deep understanding of full-stack development and is always up-to-date with the latest technologies.",
    },
];

const avatarImages = [
    "./assets/images/avatar-2.png",
    "./assets/images/avatar-2.png",
    "./assets/images/avatar-3.png",
    "./assets/images/avatar-4.png",
    "./assets/images/avatar-5.svg",
    "./assets/images/avataaars-6.svg",
    "./assets/images/my-avatar.png",
    "./assets/images/main_avataaars-2.svg",
    "./assets/images/main_avataaars.svg",
];

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function renderTestimonials(testimonials) {
    const list = document.querySelector(".testimonials-list");
    if (!list) return;
    list.innerHTML = "";

    const shuffledAvatars = shuffle([...avatarImages]);

    testimonials.forEach((item, index) => {
        const avatar =
            item.avatar || shuffledAvatars[index % shuffledAvatars.length];

        const li = document.createElement("li");
        li.className = "testimonials-item";

        li.innerHTML = `
      <div class="content-card" data-testimonials-item>
        <figure class="testimonials-avatar-box">
          <img src="${avatar}" alt="${item.name}" width="60" data-testimonials-avatar>
        </figure>

        <h4 class="h4 testimonials-item-title" data-testimonials-title>${item.role}</h4>

        <div class="testimonials-text" data-testimonials-text>
          <p>${item.text}</p>
        </div>
         <p style="margin-top:10px; font-size: 0.9em;"><strong>${item.name}</strong> - <small>${item.title}</small></p>
      </div>
    `;

        list.appendChild(li);
    });

    attachTestimonialClickEvents();
}

function attachTestimonialClickEvents() {
    const testimonialsItem = document.querySelectorAll(
        "[data-testimonials-item]"
    );
    const modalContainer = document.querySelector("[data-modal-container]");
    const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
    const overlay = document.querySelector("[data-overlay]");

    const modalImg = document.querySelector("[data-modal-img]");
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalText = document.querySelector("[data-modal-text]");

    if (!modalContainer || !modalCloseBtn || !overlay) return;

    const testimonialsModalFunc = function () {
        modalContainer.classList.toggle("active");
        overlay.classList.toggle("active");
    };

    testimonialsItem.forEach((item) => {
        item.addEventListener("click", function () {
            modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
            modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
            modalTitle.innerHTML = this.querySelector(
                "[data-testimonials-title]"
            ).innerHTML;
            modalText.innerHTML = this.querySelector(
                "[data-testimonials-text]"
            ).innerHTML;

            testimonialsModalFunc();
        });
    });

    
    if (!modalCloseBtn.hasAttribute('data-listener-attached')) {
        modalCloseBtn.addEventListener("click", testimonialsModalFunc);
        modalCloseBtn.setAttribute('data-listener-attached', 'true');
    }

    if (!overlay.hasAttribute('data-listener-attached')) {
        overlay.addEventListener("click", testimonialsModalFunc);
        overlay.setAttribute('data-listener-attached', 'true');
    }
}

export async function initTestimonials() {
    renderTestimonials(testimonialsFallback);

    const res = await fetchWithFallback(
        "https://api.npoint.io/75d6eb3b73a5de4f9148-",
        testimonialsFallback
    );

    if (res.success && res.data.length > 0) {
        renderTestimonials(res.data);
    }
}
