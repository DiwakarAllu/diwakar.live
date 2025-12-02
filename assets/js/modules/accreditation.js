import { fetchWithFallback } from "./fetchWithFallback.js";

const accreditationFallback = [
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_oc.png",
        title:
            "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
        issued_org: "Oracle",
        issued_date: "July 29, 2024",
        credential_url:
            "https://catalog-education.oracle.com/ords/certview/sharebadge?id=229BDBECABBD8D03183002D96E088329F10C5B8CBEBFB4D97C7BA5B93002A5D8",
    },
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_is.png",
        title: "AI and ML for Geodata Analysis",
        issued_org: "IIRS and ISRO",
        issued_date: "Sep 09, 2024",
        credential_url: "https://certificate.iirs.gov.in/",
    },
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_ij.png",
        title: "Java Foundation Certification",
        issued_org: "Infosys Springboard",
        issued_date: "Aug 20, 2024",
        credential_url: "https://verify.onwingspan.com/",
    },
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_sd.png",
        title: "Data Analytics",
        issued_org: "SmartInternz",
        issued_date: "Dec 13, 2023",
        credential_url:
            "https://smartinternz.com/guided_projects/certificates/cb59b747f88a35e0d452377f60f7c25f",
    },
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_aws.png",
        title: "AWS Academy Cloud Architecting",
        issued_org: "Amazon Web Services (AWS)",
        issued_date: "Oct 12, 2023",
        credential_url:
            "https://www.credly.com/badges/a03b8127-6ed7-4593-8848-0e505aefc717/linked_in_profile",
    },
    {
        link: "https://www.linkedin.com/in/alludiwakar3435/details/certifications/",
        image: "./assets/images/image_ml.png",
        title: "Certified in Machine Learning",
        issued_org: ":Simplilearn",
        issued_date: "July 29, 2023",
        credential_url: "https://simpli-web.app.link/e/BFcT0F7xGLb",
    },
];

function renderAccreditations(accreditations) {
    const list = document.querySelector(".accredit-posts-list");
    if (!list) return;
    list.innerHTML = "";

    accreditations.forEach((item) => {
        const li = document.createElement("li");
        li.className = "accredit-post-item";

        li.innerHTML = `
      <a href="${item.credential_url}" target="_blank" rel="noopener noreferrer">
        <figure class="accredit-banner-box">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </figure>

        <div class="accredit-content">
          <div class="accredit-meta">
            <p class="accredit-category">${item.issued_org}</p>
            <span class="dot"></span>
            <time datetime="">${item.issued_date}</time>
          </div>

          <h3 class="h3 accredit-item-title">${item.title}</h3>

          <p class="accredit-text">
            Official credential issued by ${item.issued_org}.
          </p>
        </div>
      </a>
    `;

        list.appendChild(li);
    });
}

export async function initAccreditation() {
    renderAccreditations(accreditationFallback);

    const res = await fetchWithFallback(
        "https://api.npoint.io/d0cf762f504383059f10/",
        accreditationFallback
    );

    if (res.success && res.data.length > 0) {
        renderAccreditations(res.data);
    }
}
