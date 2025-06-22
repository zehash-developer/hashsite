import "./scrollreveal.min.js";

// ========== ANIMATION ==========
function animateTimeline() {
  const sr = window.ScrollReveal();
  const isMobile = window.innerWidth < 768;

  // Swap direction for mobile
  if (isMobile) {
    document
      .querySelectorAll(".timeline-content.js--fadeInLeft")
      .forEach((el) =>
        el.classList.replace("js--fadeInLeft", "js--fadeInRight")
      );
  }

  // Reveal animations
  sr.reveal(".js--fadeInLeft", {
    origin: "left",
    distance: "300px",
    easing: "ease-in-out",
    duration: 800,
  });

  sr.reveal(".js--fadeInRight", {
    origin: "right",
    distance: "300px",
    easing: "ease-in-out",
    duration: 800,
  });
}

// ========== INITIALIZE ==========
function initializeTimelineItem({ title, text }, idx) {
  const item = document.createElement("div");
  item.className = "timeline-item";

  const imgDiv = document.createElement("div");
  imgDiv.className = "timeline-img";

  const contentDiv = document.createElement("div");
  const fadeClass = idx % 2 === 0 ? "Left" : "Right";
  contentDiv.className = `timeline-content js--fadeIn${fadeClass}`;

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;

  const textEl = document.createElement("p");
  textEl.innerHTML = text;

  contentDiv.append(titleEl, textEl);
  item.append(imgDiv, contentDiv);

  return item;
}

// ========== DECORATE ==========
export default function decorate(block) {
  const items = Array.from(block.children).map((wrapper) => {
    const inner = wrapper.querySelector("div");
    return {
      title: inner.querySelector("h2")?.textContent || "",
      text: inner.querySelector("p")?.innerHTML || "",
    };
  });

  block.textContent = ""; // Clear original content

  items.forEach((item, idx) => {
    const timelineItem = initializeTimelineItem(item, idx);
    block.appendChild(timelineItem);
  });

  animateTimeline();
}
