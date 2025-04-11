function changeFavicon(src) {
    // Get the current favicon link element by id
    const oldLink = document.getElementById('dynamic-favicon');

    // If the favicon exists, remove it
    if (oldLink && oldLink.parentNode === document.head) {
        try {
            document.head.removeChild(oldLink);
        } catch (error) {
            console.warn('Failed to remove old favicon:', error);
        }
    }

    // Create a new <link> element for the new favicon
    const link = document.createElement('link');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';  // "icon" is more commonly used
    link.href = src + '?v=' + new Date().getTime(); // Cache-busting query string

    // Append the new favicon to the head section
    document.head.appendChild(link);
}


function changeTitle(title) { // Corrected function name
    // Change the document title
    document.title = title;
}

function cloakpage(title, src) {
    changeTitle(title); 
    changeFavicon(src);
}
