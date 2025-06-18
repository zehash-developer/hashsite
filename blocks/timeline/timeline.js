import './scrollreveal.min.js';

function initTimeReveal() {
  const sr = window.ScrollReveal();
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    document
      .querySelectorAll('.timeline-content.js--fadeInLeft')
      .forEach((el) => el.classList.replace('js--fadeInLeft', 'js--fadeInRight'));

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });
  } else {
    sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });
    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });
  }

  // extra calls if you truly want them
  sr.reveal('.js--fadeInLeft', {
    /* … */
  });
  sr.reveal('.js--fadeInRight', {
    /* … */
  });
}

export default async function decorate(block) {
  const originalItems = Array.from(block.children);
  console.log('This is the block');
  console.log(block);
  block.textContent = '';

  originalItems.forEach((wrapper, idx) => {
    const inner = wrapper.querySelector('div');
    const title = inner.querySelector('h2').textContent;
    const text = inner.querySelector('p').innerHTML;

    const item = document.createElement('div');
    item.className = 'timeline-item';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'timeline-img';
    item.append(imgDiv);

    const contentDiv = document.createElement('div');
    const fadeClass = idx % 2 === 0 ? 'Left' : 'Right';
    contentDiv.className = `timeline-content js--fadeIn${fadeClass}`;

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const textElement = document.createElement('p');
    textElement.innerHTML = text;

    contentDiv.append(titleElement, textElement);

    item.append(contentDiv);
    block.append(item);
  });

  initTimeReveal();
}
