import { fetchWithFallback } from "./fetchWithFallback.js";

const workedWithFallback = [
    {
        link: "#",
        image: "./assets/images/infosys_logo2.png",
        alt: "Infosys",
    },
    {
        link: "#",
        image: "./assets/images/magniity_logo2.png",
        alt: "Magniity",
    },
    {
        link: "https://intraintech.com/",
        image: "./assets/images/itt_logo.png",
        alt: "Intrain Tech",
    },
    {
        link: "https://www.thesmartbridge.com/",
        image: "./assets/images/SmartBridge-logo.png",
        alt: "SmartBridge",
    },
    {
        link: "https://tlssolutions.vercel.app/",
        image: "./assets/images/tlssolutions_logo.jpeg",
        alt: "TLS Solutions",
    },
];

function renderWorkedWith(clients, append = false) {
    const list = document.querySelector(".clients-list");
    if (!list) return;

    if (!append) {
        list.innerHTML = "";
    }

    clients.forEach((client) => {
        const li = document.createElement("li");
        li.className = "clients-item";

        li.innerHTML = `
      <a href="${client.link}" target="_blank" rel="noopener noreferrer">
        <img src="${client.image}" alt="${client.alt} logo">
      </a>
    `;

        list.appendChild(li);
    });
}

export async function initWorkedWith() {
    renderWorkedWith(workedWithFallback);

    // Placeholder API URL
    const res = await fetchWithFallback("/api/clients", []);

    if (res.success && res.data.length > 0) {
        // Filter out duplicates if necessary, or just append as requested
        // "Append to the static list"
        renderWorkedWith(res.data, true);
    }
}
