import { fetchWithFallback } from "./fetchWithFallback.js";

const blogsFallback = [
  {
    liveLink:
      "https://medium.com/@diwakar.allu.3435/how-does-the-internet-actually-work-107f65ed3a70",
    image: "./assets/images/image_ib.png",
    title: "How Does the Internet Actually Work?",
    category: "Medium",
    date: "Nov 28, 2024",
    description:
      "https://medium.com/@diwakar.allu.3435/how-does-the-internet-actually-work-107f65ed3a70",
  },
  {
    liveLink:
      "https://medium.com/@diwakar.allu.3435/how-do-websites-actually-work-73eed25996f0",
    image: "./assets/images/image_wb.png",
    title: "How Do Websites Actually Work?",
    category: "Medium",
    date: "Nov 28, 2024",
    description:
      "https://medium.com/@diwakar.allu.3435/how-do-websites-actually-work-73eed25996f0",
  },
  {
    liveLink:
      "https://medium.com/@diwakar.allu.3435/understanding-oop-a-guide-to-mastering-object-oriented-programming-concepts-aa62a543d3ee",
    image: "./assets/images/image_oops.png",
    title:
      "Understanding OOP: A Guide to Mastering Object-Oriented Programming Concepts",
    category: "Medium",
    date: "Nov 28, 2024",
    description:
      "https://medium.com/@diwakar.allu.3435/understanding-oop-a-guide-to-mastering-object-oriented-programming-concepts-aa62a543d3ee",
  },
  {
    liveLink: "https://diwakarscodingcorner.blogspot.com/",
    image: "./assets/images/image_kj.png",
    title: "Kickstart Your Java Journey: A Comprehensive Beginner’s Guide",
    category: "Blogger",
    date: "Aug 24, 2024",
    description: "https://diwakarscodingcorner.blogspot.com/",
  },
  // {
  //     liveLink:
  //         "https://complete-boot-flow-from-power-to-os.blogspot.com/2025/04/complete-boot-flow-from-power-to-os.html",
  //     image: "./assets/images/image_ob.png",
  //     title: "COMPLETE BOOT FLOW – From Power to OS",
  //     category: "Blogger",
  //     date: "April 22, 2025",
  //     description:
  //         "https://complete-boot-flow-from-power-to-os.blogspot.com/2025/04/complete-boot-flow-from-power-to-os.html",
  // },
];

function renderBlogs(blogs) {
  const list = document.querySelector(".blog-posts-list");
  if (!list) return;
  list.innerHTML = "";

  blogs.forEach((blog) => {
    const li = document.createElement("li");
    li.className = "blog-post-item";

    li.innerHTML = `
      <a href="${blog.liveLink}" target="_blank" rel="noopener noreferrer">
        <figure class="blog-banner-box">
          <img src="${blog.image}" alt="${
      blog.title
    }" loading="lazy" onerror="this.onerror=null; this.src='./assets/images/blog_.png';">
        </figure>

        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${blog.category}</p>
            <span class="dot"></span>
            <time datetime="">${blog.date || "N/A"}</time>
          </div>

          <h3 class="h3 blog-item-title">${blog.title}</h3>

          <p class="blog-text">
            ${blog.description || "Click to explore this blog in detail."}
          </p>
        </div>
      </a>
    `;

    list.appendChild(li);
  });
}

export async function initBlogs() {
  renderBlogs(blogsFallback);

  const res = await fetchWithFallback(
    "https://api.npoint.io/9d2d6cb4c9ff5f640261-i",
    []
  );

  if (res.success && res.data.length > 0) {
    // Replace or append based on ID match (using title as ID proxy if ID missing)
    const mergedBlogs = [...blogsFallback];
    const existingMap = new Map(mergedBlogs.map((b) => [b.id || b.title, b]));

    res.data.forEach((newBlog) => {
      const id = newBlog.id || newBlog.title;
      if (existingMap.has(id)) {
        // Replace
        const index = mergedBlogs.findIndex((b) => (b.id || b.title) === id);
        if (index !== -1) {
          mergedBlogs[index] = newBlog;
        }
      } else {
        // Append
        mergedBlogs.push(newBlog);
      }
    });

    renderBlogs(mergedBlogs);
  }
}
