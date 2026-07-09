// Case-study modal: opens on project card click, populates content per project.

const projectData = {
  festconnect: {
    title: "Fest Connect",
    problem:
      "College fests had no dedicated tech infrastructure. Organisers were managing check-ins with paper lists, tracking with spreadsheets, and losing money on untracked brand sponsorships. There was no platform built for the specific operational chaos of a live college event.",
    solution:
      "I built Fest Connect solo from scratch — Flutter attendee app, organiser app, and backend — and led development of a web-based admin dashboard alongside it. I set up the entire AWS infrastructure, then migrated it to Azure, building CI/CD pipelines for Flutter, React, and Node.js along the way. I added a Grafana and Prometheus observability stack with priority-tiered Slack alerting, built a Redis-backed ad engine with idempotency and fraud prevention for brand sponsors, shipped a real-time judging platform for live event scoring, and introduced TDD across the codebase achieving 90%+ unit test coverage.",
    impact:
      "Fest Connect went from zero to production-ready in 3 months and is now used by 5,000+ students across 3 colleges — MAMC Delhi, CCET Chandigarh, and MNNIT Allahabad.",
    media: [
      { type: "video", src: "assets/images/fc/festconnect-vid-1.mp4" },
      { type: "image", src: "assets/images/fc/festconnect-img-2.jpg" },
      { type: "video", src: "assets/images/fc/festconnect-vid-2.mp4" },
      { type: "image", src: "assets/images/fc/festconnect-img-3.jpg" },
      { type: "video", src: "assets/images/fc/festconnect-vid-3.mp4" },
      { type: "image", src: "assets/images/fc/festconnect-img-4.jpg" },
      { type: "video", src: "assets/images/fc/festconnect-vid-4.mp4" },
      { type: "image", src: "assets/images/fc/festconnect-img-5.jpg" },
    ],
  },
  "scanning-app": {
    title: "FC Organiser",
    problem:
      "At MAMC Delhi, check-in for 1,000 students was done manually with printed lists. It took 3 hours, created massive queues, and was completely dependent on internet connectivity in a venue that couldn't guarantee it.",
    solution:
      "I built an offline-first Flutter scanning app in one week. All scan data persisted locally via Hive and synced back to the server when connectivity was restored, so check-in continued without interruption regardless of network state.",
    impact:
      "Deployed at MAMC Delhi's live fest. Check-in time for 1,000 students dropped from 3 hours to 1 hour on the first deployment.",
    media: [
      { type: "image", src: "assets/images/fc_org/scanning-img-3.jpg" },
      { type: "video", src: "assets/images/fc_org/scanning-vid-1.mp4" },
      { type: "image", src: "assets/images/fc_org/scanning-img-2.jpg" },
      { type: "video", src: "assets/images/fc_org/scanning-vid-2.mp4" },
    ],
  },
  "ones-need": {
    title: "Ones Need",
    problem:
      "Ones Need started as a single-supplier Android app for water delivery — restricted to one location, no subscription automation, and no way to scale to new suppliers or cities.",
    solution:
      "I migrated the entire codebase from Android to Flutter and redesigned the product from scratch. As the sole Flutter developer, I built three apps: the consumer app, a delivery rider app, and a supplier onboarding app with offline-first persistent caching. I led the architectural overhaul from single-supplier to a Blinkit-style multi-supplier marketplace with location-based order routing, defined all API contracts and business rules, and coordinated the backend team through full implementation. I also architected a wallet-based auto-debit subscription system — designed the backend logic, wrote the business rules, and implemented it in the app — which increased subscription orders by 50%. CI/CD via Fastlane and GitHub Actions across all three apps.",
    impact:
      "Ones Need now handles 500+ daily orders and serves 3,000+ families across Delhi-NCR and Greater Noida.",
    media: [
      { type: "image", src: "assets/images/on/onesneed-img-1.jpg" },
      { type: "video", src: "assets/images/on/onesneed-vid-1.mp4" },
      { type: "image", src: "assets/images/on/onesneed-img-2.jpg" },
      { type: "image", src: "assets/images/on/onesneed-img-3.jpg" },
      { type: "image", src: "assets/images/on/onesneed-img-4.jpg" },
      { type: "image", src: "assets/images/on/onesneed-img-5.jpg" },
      { type: "image", src: "assets/images/on/onesneed-img-6.jpg" },
      { type: "image", src: "assets/images/on/onesneed-img-7.jpg" },
    ],
  },
};

function renderMedia(item) {
  if (item.type === "video") {
    return `<video src="${item.src}" muted loop autoplay playsinline controls></video>`;
  }
  return `<img src="${item.src}" alt="" loading="lazy" />`;
}

export function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const contentEl = document.getElementById("project-modal-content");
  if (!modal || !contentEl) return;

  const cards = document.querySelectorAll(".project-card");
  const closeTriggers = modal.querySelectorAll("[data-modal-close]");

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    contentEl.innerHTML = `
      <h3 class="case-study__title">${data.title}</h3>
      <div class="case-study__media">
        ${data.media.map(renderMedia).join("")}
      </div>
      <div class="case-study__block">
        <h4>Problem</h4>
        <p>${data.problem}</p>
      </div>
      <div class="case-study__block">
        <h4>What I did</h4>
        <p>${data.solution}</p>
      </div>
      <div class="case-study__block">
        <h4>Impact</h4>
        <p>${data.impact}</p>
      </div>
    `;

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // pause any playing videos so they don't keep running in the background
    contentEl.querySelectorAll("video").forEach((v) => v.pause());
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.project);
    });
  });

  closeTriggers.forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
}
