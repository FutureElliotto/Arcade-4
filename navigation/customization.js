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

  // Create new style for normal text + pagination + paragraphs
  const style = document.createElement('style');
  style.id = 'normal-text-style';
  style.innerHTML = `
    body,
    select,
    li a:not(.active),
    #searchBar:not(:focus),
    .game-title,
    p,
    .pagination button {
      color: ${color} !important;
    }
  `;
  document.head.appendChild(style);

  // Dynamically update outlines ONLY if they are not transparent or none
  document.querySelectorAll('*').forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const outlineColor = computedStyle.outlineColor;
    const outlineStyle = computedStyle.outlineStyle;

    // Check if outline exists and is not transparent or "none"
    if (
      outlineStyle !== 'none' &&
      outlineColor !== 'rgba(0, 0, 0, 0)' && // transparent
      outlineColor !== 'transparent'
    ) {
      el.style.outlineColor = color;
    }
  });

  // Save to localStorage for persistence
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

function resetToDefault() {
  // Clear localStorage
  localStorage.removeItem('faviconSrc');
  localStorage.removeItem('pageTitle');
  localStorage.removeItem('themeBg');
  localStorage.removeItem('userFont');
  localStorage.removeItem('textColor');
  localStorage.removeItem('selectedTextColor');
  localStorage.removeItem('activeTextColor');

  // Reset Favicon & Title
  changeFavicon('https://cdn.jsdelivr.net/gh/FutureElliotto/arcade-4-images/favicon/logo.png');
  changeTitle('Arcade 4');

  // Reset Theme
  changetheme('https://cdn.jsdelivr.net/gh/FutureElliotto/arcade-4-images/backgrounds/void_theme.png');

  // Reset Font
  changeFont('Pixelify Sans, sans-serif');

  // Reset Normal Text Color
  changeTextColor('#ffffff');
  const picker1 = document.getElementById('textColorPicker1');
  if (picker1) picker1.value = '#ffffff';

  // Reset Selected/Focus/Active Text Color
  changeSelectedTextColor('#7F00FF');
  changeFocusTextColor('#7F00FF');
  changeActiveTextColor('#7F00FF');
  const picker2 = document.getElementById('textColorPicker2');
  if (picker2) picker2.value = '#7F00FF';

  // Reset dropdown selections
  document.getElementById('cloakDropdown').selectedIndex = 0;
  document.getElementById('backgroundDropdown').selectedIndex = 0;
  document.getElementById('fontDropdown').selectedIndex = 0;
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
  const picker1 = document.getElementById('textColorPicker1');
  if (picker1) picker1.value = savedColor;
}

const selectedTextColor = localStorage.getItem('selectedTextColor');
if (selectedTextColor) {
  changeSelectedTextColor(selectedTextColor);
  changeFocusTextColor(selectedTextColor);
  changeActiveTextColor(selectedTextColor);
  const picker2 = document.getElementById('textColorPicker2');
  if (picker2) picker2.value = selectedTextColor;
}
