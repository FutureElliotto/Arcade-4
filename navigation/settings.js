function changeFavicon(src, title) {
    // Find the existing favicon link element (if any)
    var oldLink = document.getElementById('dynamic-favicon');
    
    // If there's an existing favicon, remove it
    if (oldLink) {
        try {
            document.head.removeChild(oldLink);
        } catch (error) {
            console.warn('Failed to remove old favicon:', error);
        }
    }

    // Create a new <link> element for the favicon
    var link = document.createElement('link');
    link.id = 'dynamic-favicon'; // Set the ID to target it later
    link.rel = 'shortcut icon';
    link.href = src;  // Set the new favicon source

    // Append the new favicon to the <head> section
    document.head.appendChild(link);

    // Update the page title
    document.title = title; // This will update the page title to match the selected option
}
