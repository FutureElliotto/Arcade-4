function changeFavicon(src) {
    // Create a new <link> element for the favicon
    var link = document.createElement('link');
    var oldLink = document.getElementById('dynamic-favicon');
    
    // Set up the new favicon link element
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;

    // If there's an existing favicon, remove it
    if (oldLink) {
        try {
            document.head.removeChild(oldLink);
        } catch (error) {
            console.warn('Failed to remove old favicon:', error);
        }
    }

    // Append the new favicon to the <head> section
    document.head.appendChild(link);
}
