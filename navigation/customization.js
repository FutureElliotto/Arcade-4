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

    localStorage.setItem('faviconSrc', src);
  }

  function changeTitle(title) {
    document.title = title;
    localStorage.setItem('pageTitle', title);
  }

  function cloakpage(title, src) {
    changeTitle(title);
    changeFavicon(src);
  }

  function changetheme(src) {
    document.body.style.backgroundImage = `url('${src}')`;
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.backgroundImage = `url('${src}')`;
    }
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.backgroundImage = `url('${src}')`;
    }
        localStorage.setItem('themeBg', src);
    }

  function changeFont(font) {
    document.body.style.fontFamily = font;
    localStorage.setItem('userFont', font);
    document.querySelectorAll('select').forEach(select => {
      select.style.fontFamily = font;
    });
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
      searchBar.style.fontFamily = font;
    }
  }

function changeTextColor(color) {
  // Remove previous style block if it exists
  const oldStyle = document.getElementById('normal-text-style');
  if (oldStyle) oldStyle.remove();

  const style = document.createElement('style');
  style.id = 'normal-text-style';
  style.innerHTML = `
    body,
    select,
    li a:not(.active),
    #searchBar:not(:focus),
    .game-title {
      color: ${color} !important;
    }
  `;
  document.head.appendChild(style);
  localStorage.setItem('textColor', color);
}


function changeSelectedTextColor(color) {
  // Remove previous dynamic style if any
  const oldStyle = document.getElementById('selected-text-style');
  if (oldStyle) oldStyle.remove();

  const style = document.createElement('style');
  style.id = 'selected-text-style';
  style.innerHTML = `
    ::selection {
      background: #333;
      color: ${color};
    }
  `;
  document.head.appendChild(style);
  localStorage.setItem('selectedTextColor', color);
}
function changeFocusTextColor(color) {
  const oldStyle = document.getElementById('focus-text-style');
  if (oldStyle) oldStyle.remove();

  const style = document.createElement('style');
  style.id = 'focus-text-style';
  style.innerHTML = `
    input:focus,
    select:focus,
    textarea:focus {
      color: ${color};
      border-color: ${color};
    }
  `;
  document.head.appendChild(style);
}
function changeActiveTextColor(color) {
  // Remove old active text color style if any
  const oldStyle = document.getElementById('active-text-style');
  if (oldStyle) oldStyle.remove();

  const style = document.createElement('style');
  style.id = 'active-text-style';
  style.innerHTML = `
    li a.active {
      color: ${color} !important;
    }
  `;
  document.head.appendChild(style);
  localStorage.setItem('activeTextColor', color);
}



  // On page load
  const savedTheme = localStorage.getItem('themeBg');
  if (savedTheme) changetheme(savedTheme);

  const savedTitle = localStorage.getItem('pageTitle');
  if (savedTitle) document.title = savedTitle;

  const savedFavicon = localStorage.getItem('faviconSrc');
  if (savedFavicon) changeFavicon(savedFavicon);

  const savedFont = localStorage.getItem('userFont');
  if (savedFont) changeFont(savedFont);

  const savedColor = localStorage.getItem('textColor');
  if (savedColor) {
    changeTextColor(savedColor);
    document.getElementById('textColorPicker1').value = savedColor;
  }

  const selectedTextColor = localStorage.getItem('selectedTextColor');
  if (selectedTextColor) {
    changeSelectedTextColor(selectedTextColor);
    changeFocusTextColor(selectedTextColor);
    document.getElementById('textColorPicker2').value = selectedTextColor;
  }