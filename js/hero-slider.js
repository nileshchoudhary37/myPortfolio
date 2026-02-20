document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll('.hero-slide');
  const prev = document.querySelector('.hero-prev');
  const next = document.querySelector('.hero-next');
  const dotsContainer = document.querySelector('.hero-dots');

  let current = 0;
  const total = slides.length;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.hero-dots span');

  function stopVideos(index) {
    const videos = slides[index].querySelectorAll('video');
    videos.forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
  }

  function playVideos(index) {
    const videos = slides[index].querySelectorAll('video');
    videos.forEach(v => v.play());

    // When BOTH videos end → move next
    let endedCount = 0;
    videos.forEach(v => {
      v.onended = () => {
        endedCount++;
        if (endedCount === videos.length) {
          showSlide(index + 1);
        }
      };
    });
  }

  function showSlide(index) {

    stopVideos(current);
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    playVideos(current);
  }

  next.addEventListener('click', () => showSlide(current + 1));
  prev.addEventListener('click', () => showSlide(current - 1));

  playVideos(0); // start first pair
});