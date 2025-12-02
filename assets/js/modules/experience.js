import { fetchWithFallback } from "./fetchWithFallback.js";

const experienceFallback = [
    {
        title: "Java Full Stack Developer Intern",
        company: "Infosys Springboard",
        years: "February 2025 — April 2025",
        description: [
            "Contributed to full-stack development of a scalable food delivery web application using <strong>Spring Boot</strong>, <strong>Thymeleaf</strong>, and <strong>MySQL</strong>.",
            "Designed and implemented <strong>15+</strong> RESTful APIs for <strong>User</strong>, <strong>Restaurant</strong>, and <strong>Order</strong> modules, ensuring seamless frontend-backend integration.",
            "Served as <strong>Scrum Master</strong> and <strong>Backend Lead</strong>, leading Agile ceremonies and ensuring on-time sprint execution with <strong>0 major bugs</strong> during QA testing.",
        ],
    },
    {
        title: "Freelance Full Stack App Developer",
        company: "MAGNIITY.COM",
        years: "March 2025 — May 2025",
        description: [
            "Developed <strong>QRSync</strong>, a mobile app to manage IoT-enabled rat trap devices using <strong>Firebase Realtime Database</strong> and <strong>ZXing</strong> for QR code-based device registration.",
            "Implemented <strong>role-based access control</strong> with Firebase Authentication, preventing unauthorized access and significantly enhancing app security.",
            "Reduced cloud storage costs by <strong>~40%</strong> using <strong>Android WorkManager</strong> to schedule stale log cleanup after one year.",
        ],
    },
    {
        title: "AIML Project Intern",
        company: "Intrain Tech | SkillCepha",
        years: "October 2023 — November 2023",
        description: [
            "Developed a Flask web application that achieved <strong>93.5% accuracy</strong> in predicting telecom churn, improving forecast reliability.",
            "Evaluated and compared 10 machine learning models, selecting the top performer which increased prediction accuracy by <strong>15%</strong>.",
            "Created 10+ interactive visualizations using Plotly and Tableau, enhancing stakeholder understanding of model performance.",
            "Authored comprehensive documentation to facilitate clear communication of analysis and results with stakeholders.",
        ],
    },
    {
        title: "Data Analytics Externship",
        company: "SmartBridge | SmartInternz",
        years: "August 2023 — November 2023",
        description: [
            "Led a team analyzing global CO₂ emissions, leveraging IBM Cognos and Tableau to generate insights guiding policy recommendations.",
            "Managed project timelines and deliverables using Agile methodologies, completing the project <strong>10% ahead of schedule</strong>.",
            "Conducted data cleaning on datasets exceeding 1 million entries, boosting analysis accuracy by <strong>25%</strong>.",
            "Delivered final presentation to senior management, highlighting key findings and actionable insights influencing strategic decisions.",
        ],
    },
];

function renderExperience(experienceList) {
    const timelines = document.querySelectorAll(".timeline");
    let list = null;

    timelines.forEach((timeline) => {
        const title = timeline.querySelector(".h3");
        if (title && title.textContent.trim() === "Experience") {
            list = timeline.querySelector(".timeline-list");
        }
    });

    if (!list) return;
    list.innerHTML = "";

    experienceList.forEach((exp) => {
        const li = document.createElement("li");
        li.className = "timeline-item";

        const descItems = exp.description
            .map((item) => `<li class="timeline-text2">${item}</li>`)
            .join("");

        li.innerHTML = `
      <h4 class="h4 timeline-item-title">${exp.title}</h4>
      <span>${exp.company}</span>
      <span>${exp.years}</span>
      <ul>
        ${descItems}
      </ul>
    `;

        list.appendChild(li);
    });
}

export async function initExperience() {
    renderExperience(experienceFallback);

    const res = await fetchWithFallback("/api/experience", experienceFallback);

    if (res.success && res.data.length > 0) {
        renderExperience(res.data);
    }
}
