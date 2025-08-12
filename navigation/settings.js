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
    }

    function changeTitle(title) {
      document.title = title;
    }

    function cloakpage(title, src) {
      changeTitle(title);
      changeFavicon(src);
    }

    function changetheme(src) {
      document.body.style.backgroundImage = `url('${src}')`;
      ul.style.backgroundImage = `url('${src}')`;
    }
