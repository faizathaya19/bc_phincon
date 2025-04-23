const movieContainer = document.getElementById('movie-container');
const movieTemplate = document.getElementById('movie-template');

const movieUrls = [
  "https://images4.alphacoders.com/552/552468.jpg",
  "https://mrwallpaper.com/images/high/jakarta-sunset-cityscape-9f8mf8vbd6q4cgr9.webp",
  "https://mrwallpaper.com/images/high/jakarta-modern-tunnel-g3rcz85upf1od7oz.webp",
  "https://mrwallpaper.com/images/high/jakarta-boat-ride-m1ajv1gvwy59rjmv.webp",
];

// ⏩ Duplicate the array for infinite scroll illusion
const repeatedUrls = [...movieUrls, ...movieUrls, ...movieUrls];

repeatedUrls.forEach(url => {
  const clone = movieTemplate.content.cloneNode(true);
  const img = clone.querySelector('.movie-img');
  img.src = url;
  movieContainer.appendChild(clone);
});

let scrollSpeed = 0.5;

function autoScroll() {
  movieContainer.scrollLeft += scrollSpeed;

  // Reset ke awal kalau udah lebih dari setengah isi kontainer
  if (movieContainer.scrollLeft >= movieContainer.scrollWidth / 2) {
    movieContainer.scrollLeft = 0;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();
