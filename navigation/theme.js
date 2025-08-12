function changetheme(src) {
  // Set background image on <body>
  document.body.style.backgroundImage = `url('${src}')`;

  // Set background image on .navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.backgroundImage = `url('${src}')`;
  }

  // Optional: Save to localStorage
  localStorage.setItem('themeBg', src);
}

// On page load, restore last used theme
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('themeBg');
  if (savedTheme) {
    changetheme(savedTheme);
  }
});
