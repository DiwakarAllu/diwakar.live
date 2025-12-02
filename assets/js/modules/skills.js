import { fetchWithFallback } from "./fetchWithFallback.js";

const skillsFallback = [
    {
        title: "Java, Python, JavaScript (ES6+), SQL",
        value: 90,
    },
    {
        title: "Spring Boot, Node.js, Flask, REST APIs",
        value: 85,
    },
    {
        title: "System Design, Microservices Architecture",
        value: 80,
    },
    {
        title: "Flutter, Dart, Android (Java)",
        value: 90,
    },
    {
        title: "MySQL, PostgreSQL, MongoDB, Firebase",
        value: 85,
    },
    {
        title: "Docker, CI/CD, API Testing, Tomcat",
        value: 75,
    },
    {
        title: "React.js, Tailwind CSS, HTML/CSS, Bootstrap",
        value: 70,
    },
    {
        title: "Cloud Platforms (AWS Basics, Firebase)",
        value: 65,
    },
];

function renderSkills(skills) {
    const list = document.querySelector(".skills-list");
    if (!list) return;
    list.innerHTML = "";

    // Render first 4 skills
    const visibleSkills = skills.slice(0, 4);
    visibleSkills.forEach((skill) => {
        const li = createSkillItem(skill);
        list.appendChild(li);
    });

    // Render remaining skills in a hidden div
    const hiddenSkills = skills.slice(4);
    if (hiddenSkills.length > 0) {
        const moreSkillsDiv = document.createElement("div");
        moreSkillsDiv.id = "more-skills";
        moreSkillsDiv.style.display = "none";

        hiddenSkills.forEach((skill) => {
            const li = createSkillItem(skill);
            moreSkillsDiv.appendChild(li);
        });

        list.appendChild(moreSkillsDiv);
    }
}

function createSkillItem(skill) {
    const li = document.createElement("li");
    li.className = "skills-item";
    li.innerHTML = `
      <div class="title-wrapper">
        <h5 class="h5">${skill.title}</h5>
        <data value="${skill.value}">${skill.value}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${skill.value}%;"></div>
      </div>
    `;
    return li;
}

export async function initSkills() {
    renderSkills(skillsFallback);

    const res = await fetchWithFallback("/api/skills", []);

    if (res.success && res.data.length > 0) {
        // Merge skills, avoiding duplicates based on title
        const mergedSkills = [...skillsFallback];
        const existingTitles = new Set(mergedSkills.map((s) => s.title));

        res.data.forEach((newSkill) => {
            if (!existingTitles.has(newSkill.title)) {
                mergedSkills.push(newSkill);
            }
        });

        renderSkills(mergedSkills);
    }
}
