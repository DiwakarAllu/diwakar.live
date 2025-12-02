import { fetchWithFallback } from "./fetchWithFallback.js";

const educationFallback = [
    {
        institution: "VIT-AP University, Amaravati",
        years: "2021 — 2025",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        description: "VIT-AP University (Deemed to be University under VIT Group of Institutions)",
        score: "C.G.P.A - 9.01",
    },
    {
        institution: "AP Residential Jr. College, Nagarjuna Sagar",
        years: "2019 — 2021",
        degree: "Intermediate Education (Maths/Physics/Chemistry)",
        description: "Board of Intermediate Education, Andhra Pradesh (BIEAP)",
        score: "Percentage - 97.5 %",
    },
    {
        institution: "AP Residential School, Bobbili",
        years: "2018 — 2019",
        degree: "Secondary School Certificate (SSC)",
        description: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
        score: "C.G.P.A - 10",
    },
];

function renderEducation(educationList) {
    // Find the education timeline section. 
    // Based on HTML structure, it's the first .timeline-list inside .resume
    // But there are two .timeline sections (Education and Experience).
    // I need to target the one with "Education" title.

    const timelines = document.querySelectorAll(".timeline");
    let list = null;

    timelines.forEach(timeline => {
        const title = timeline.querySelector(".h3");
        if (title && title.textContent.trim() === "Education") {
            list = timeline.querySelector(".timeline-list");
        }
    });

    if (!list) return;
    list.innerHTML = "";

    educationList.forEach((edu) => {
        const li = document.createElement("li");
        li.className = "timeline-item";

        li.innerHTML = `
      <h4 class="h4 timeline-item-title">${edu.institution}</h4>
      <span>${edu.years}</span>
      <p class="timeline-text">
        ${edu.degree}<br>
        ${edu.description}
      </p>
      <p class="timeline-text">
        ${edu.score}
      </p>
    `;

        list.appendChild(li);
    });
}

export async function initEducation() {
    renderEducation(educationFallback);

    const res = await fetchWithFallback("/api/education", educationFallback);

    if (res.success && res.data.length > 0) {
        renderEducation(res.data);
    }
}
