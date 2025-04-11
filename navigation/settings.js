function changeFavicon(title, src) {
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
    link.rel = 'icon'; // cleaner than "shortcut icon"
    link.href = src + '?v=' + new Date().getTime(); // cache-busting

    document.head.appendChild(link);
    document.title = title;
}
