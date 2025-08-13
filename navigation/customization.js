function changeFavicon(src) {
  const oldLink = document.getElementById('dynamic-favicon');
  if (oldLink && oldLink.parentNode === document.head) {
    try {
      document.head.removeChild(oldLink);
    } catch (error) {
      console.warn('Failed to remove old favicon:', error);
    }
  }

  const link = document.createElement('link');
  link.id = 'dynamic-favicon';
  link.rel = 'icon';
  link.href = src + '?v=' + new Date().getTime(); // prevent caching
  document.head.appendChild(link);

  // Save favicon to localStorage
  localStorage.setItem('faviconSrc', src);
}

function changeTitle(title) {
  document.title = title;
  // Save title to localStorage
  localStorage.setItem('pageTitle', title);
}

function cloakpage(title, src) {
  changeTitle(title);
  changeFavicon(src);
}
function changetheme(src) {
  // Set background image on <body>
  document.body.style.backgroundImage = `url('${src}')`;

  // Set background image on .navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.backgroundImage = `url('${src}')`;
  }

  localStorage.setItem('themeBg', src);
}

window.addEventListener('load', () => {
  // Restore background theme
  const savedTheme = localStorage.getItem('themeBg');
  if (savedTheme) {
    changetheme(savedTheme);
  }

  // Restore page title
  const savedTitle = localStorage.getItem('pageTitle');
  if (savedTitle) {
    document.title = savedTitle;
  }

  // Restore favicon
  const savedFavicon = localStorage.getItem('faviconSrc');
  if (savedFavicon) {
    changeFavicon(savedFavicon);
  }
});

