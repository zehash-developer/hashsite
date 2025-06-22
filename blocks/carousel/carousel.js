// ========== DECORATE ==========
export default function decorate(block) {
  block.classList.add("carousel");
  if (!block.id) {
    block.id = `carousel-${Math.random().toString(36).substr(2, 8)}`;
  }

  const slides = extractSlideData(block);
  block.innerHTML = "";

  const navItems = createNavInputs(slides.length, block.id);
  navItems.forEach((nav) => block.appendChild(nav));

  const track = initializeTrack(slides, block.id);
  block.appendChild(track);

  injectSlideTransitionStyles(slides.length, block.id);
}

// ========== DATA EXTRACTION ==========
function extractSlideData(block) {
  return Array.from(block.querySelectorAll(":scope > div")).map((slide) => {
    const titleEl = slide.querySelector("h1");
    const bodyEl = slide.querySelector("p:not(.button-container)");
    const picEl = slide.querySelector("picture") || slide.querySelector("img");
    const linkEl = slide.querySelector("a");

    return {
      title: titleEl?.textContent.trim() || "",
      titleId: titleEl?.id || "",
      body: bodyEl?.textContent.trim() || "",
      imgSrc:
        picEl?.tagName === "PICTURE"
          ? picEl.querySelector("img")?.getAttribute("src")
          : picEl?.getAttribute("src"),
      link: linkEl,
    };
  });
}

// ========== INITIALIZE ==========
function initializeTrack(slides, blockId) {
  const track = document.createElement("div");
  track.className = "carousel__inner";

  slides.forEach(({ title, titleId, body, imgSrc, link }, index) => {
    const slug = titleId || title.toLowerCase().replace(/\s+/g, "-");

    const contents = document.createElement("div");
    contents.className = "carousel__contents";
    if (imgSrc) contents.style.backgroundImage = `url('${imgSrc}')`;

    const textGroup = document.createElement("div");
    textGroup.className = "carousel__txtgroup";

    const caption = document.createElement("h2");
    caption.className = "carousel__caption";
    caption.textContent = title || slug;

    const txt = document.createElement("p");
    txt.className = "carousel__txt";
    txt.textContent = body;

    textGroup.appendChild(caption);
    textGroup.appendChild(txt);

    if (link) {
      link.className = "carousel__link";
      textGroup.appendChild(link);
    }

    contents.appendChild(textGroup);
    track.appendChild(contents);
  });

  return track;
}

// ========== NAV ==========
function createNavInputs(slideCount, blockId) {
  return Array.from({ length: slideCount }, (_, i) => {
    const nav = document.createElement("input");
    nav.type = "radio";
    nav.name = "carousel";
    nav.className = "carousel__nav";
    nav.title = `slide${i + 1}`;
    if (i === 0) nav.checked = true;
    return nav;
  });
}

// ========== ANIMATION (STYLES INJECTION) ==========
function injectSlideTransitionStyles(slideCount, blockId) {
  const scope = `#${blockId}`;
  const totalPct = slideCount * 100;

  let css = `${scope} .carousel__inner { width: ${totalPct}%; }`;

  for (let i = 0; i < slideCount; i++) {
    css += `
${scope} .carousel__nav:checked:nth-of-type(${i + 1}) ~ .carousel__inner {
  left: -${100 * i}%;
}`;
  }

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}
