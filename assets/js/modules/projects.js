import { fetchWithFallback } from "./fetchWithFallback.js";

const projectsFallback = [
    {
        image: "./assets/images/image_tt2.png",
        title: "Tasy Treat Express",
        category: "Full-Stack",
        liveLink: "https://prezi.com/view/cIiSn0JAZuczMYCRpCTK/",
        techStack:
            "Java, MySQL, Spring Boot, HTML, CSS, JavaScript, Thymeleaf, Spring Security, Spring Data JPA, Spring MVC",
    },
    {
        image: "./assets/images/image_qr.png",
        title: "QRSync App",
        category: "Full-Stack",
        liveLink: "https://i.ibb.co/kV4J0wgf/qrsync-gif.gif",
        techStack: "Android SDK, Firebase Realtime DB, Firebase Auth, Java, XML",
    },
    {
        image: "./assets/images/image_etb.png",
        title: "Exam Travel Buddy",
        category: "Frontend",
        liveLink: "https://exam-travel-buddy.netlify.app/",
        techStack: "React.js, Tailwind CSS, Node.js, Express, MongoDB",
    },
    {
        image: "./assets/images/image_md.png",
        title: "MyMemoir - Personal Journal App",
        category: "Full-Stack",
        liveLink: "https://i.ibb.co/fwB81gG/MyMemoir.gif",
        techStack: "Android SDK, Jetpack Compose, SQLite, Java",
    },
    {
        image: "./assets/images/image_ss.png",
        title: "Scribe-Support App",
        category: "Full-Stack",
        liveLink: "https://i.ibb.co/hR48nt9r/scribe-support-gif.gif",
        techStack: "Android SDK, Firebase, Java, Google STT API",
    },
    {
        image: "./assets/images/image_pv.png",
        title: "Plant-Vitality App",
        category: "Full-Stack",
        liveLink: "https://i.ibb.co/n4yMP0S/Plant-Vitality.gif",
        techStack: "Android SDK, Python, Jetpack Compose, ML",
    },
];

function renderProjects(projects, append = false) {
    const list = document.querySelector(".project-list");
    if (!list) return;

    if (!append) {
        list.innerHTML = "";
    }

    projects.forEach((proj) => {
        const li = document.createElement("li");
        li.className = "project-item active";
        li.setAttribute("data-filter-item", "");
        li.setAttribute("data-category", proj.category.toLowerCase());

        li.innerHTML = `
      <a href="${proj.liveLink}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Unavailable';">
        </figure>

        <h3 class="project-title">${proj.title}</h3>

        <p class="project-category" style="color: hsl(35,100%,68%); font-weight: bold;">
          Tech Stack
        </p>
        <h5 class="project-title">${proj.techStack}</h5>
        <p class="project-category">${proj.category} Application</p>
      </a>
    `;
        list.appendChild(li);
    });

    initFilters();
}

function initFilters() {
    const filterButtons = document.querySelectorAll("[data-filter-btn]");
    const selectItems = document.querySelectorAll("[data-select-item]");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const category = btn.textContent.trim().toLowerCase();

            document
                .querySelectorAll("[data-filter-btn]")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            document.querySelectorAll("[data-filter-item]").forEach((item) => {
                const itemCategory = item.dataset.category;
                if (category === "all" || itemCategory === category) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        });
    });

    // Handle dropdown (select-box) clicks too
    selectItems.forEach((item) => {
        item.addEventListener("click", () => {
            const value = item.textContent.trim();
            const selectValue = document.querySelector("[data-selecct-value]");
            if (selectValue) selectValue.textContent = value;

            const btnToClick = Array.from(filterButtons).find(
                (b) => b.textContent.trim() === value
            );
            if (btnToClick) btnToClick.click();
        });
    });
}

export async function initProjects() {
    renderProjects(projectsFallback);

    const res = await fetchWithFallback(
        "https://api.npoint.io/a3e44c313c31388216dd/",
        []
    );

    if (res.success && res.data.length > 0) {
        // Append new projects, avoiding duplicates based on title
        const existingTitles = new Set(projectsFallback.map((p) => p.title));
        const newProjects = res.data.filter((p) => !existingTitles.has(p.title));

        if (newProjects.length > 0) {
            renderProjects(newProjects, true);
        }
    }
}
