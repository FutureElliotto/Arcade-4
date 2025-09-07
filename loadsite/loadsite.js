                // Change the iframe content when a link is clicked
                function changeIframeContent(page) {
                    document.getElementById('Game').src = page;
                    updateActiveLink(page);
                    const contentContainer = document.getElementById('content-container');
                    contentContainer.style.display = 'none'; // Hide content-container
                }

                // Load the Blob content and update the iframe
                function loadBlobContent(url) {
                    loadPageContent(url, function(content) {
                        var blob = new Blob([content], {type: 'text/html'});
                        var iframe = document.getElementById('Game');
                        iframe.src = URL.createObjectURL(blob);
                        updateActiveLink(url);
                        const contentContainer = document.getElementById('content-container');
                        contentContainer.style.display = 'none'; // Hide content-container
                        document.getElementById("Game").style.display = "block"; // Show the iframe
                    });
                }

function loadPageContent(url, callback) {
    const xhttp = new XMLHttpRequest();

    // Show spinner
    document.getElementById('spinner').style.display = 'flex';

    const urlWithNoCache = url + (url.includes('?') ? '&' : '?') + 'nocache=' + new Date().getTime();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            // Hide spinner after request completes
            document.getElementById('spinner').style.display = 'none';

            if (this.status === 200) {
                callback(this.responseText);
            } else {
                console.error('Failed to load:', url);
            }
        }
    };

    xhttp.open("GET", urlWithNoCache, true);
    xhttp.send();
}



// Function to trigger fullscreen mode for the iframe or content-container
function triggerFullscreen() {
    const contentContainer = document.querySelector('.content-container');
    const iframe = document.getElementById('Game');
    
    // Check if the content container is visible
    const isContentVisible = contentContainer && contentContainer.offsetWidth > 0 && contentContainer.offsetHeight > 0;

    // If content-container is visible, make it fullscreen
    if (isContentVisible) {
        if (contentContainer.requestFullscreen) {
            contentContainer.requestFullscreen();
        } else if (contentContainer.mozRequestFullScreen) { // Firefox
            contentContainer.mozRequestFullScreen();
        } else if (contentContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
            contentContainer.webkitRequestFullscreen();
        } else if (contentContainer.msRequestFullscreen) { // IE/Edge
            contentContainer.msRequestFullscreen();
        }
    }
    // If content-container is hidden, make the iframe fullscreen
    else if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
            iframe.msRequestFullscreen();
        }
    }
}


                // Function to change page content and update the active link
                function changePageContent(url) {
                    loadPageContent(url, function(content) {
                        document.getElementById('content-container').innerHTML = content;
                          const iframe = document.getElementById("Game");
                          iframe.src = "about:blank";
                    });
                    updateActiveLink(url);
                    const iframe = document.getElementById("Game");
                    iframe.style.display = "none"; // Hide the iframe
                    const contentContainer = document.getElementById('content-container');
                    contentContainer.style.display = 'block'; // Show content-container
                }

                // Function to append external JavaScript files
                function appendScript(url) {
                    // Check if script is already present
                    if (document.querySelector(`script[src="${url}"]`)) {
                        console.log(`Script already loaded: ${url}`);
                        return;
                    }

                    const script = document.createElement('script');
                    script.src = url;
                    script.type = 'text/javascript';
                    script.onload = () => {
                        console.log(`Script loaded from ${url}`);
                    };
                    script.onerror = () => {
                        console.error(`Failed to load script from ${url}`);
                    };
                    document.body.appendChild(script);
                }


                // Update active link based on URL
                function updateActiveLink(url) {
                    document.querySelectorAll('ul li a').forEach(link => {
                        link.classList.remove('active');
                    });

                    const activeLink = document.querySelector(\`a[onclick*="\${url}"]\`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                        document.getElementById("Game").style.display = "block"; // Show the iframe
                    }

                }
loadBlobContent('https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@49367e7/navigation/home.html');
appendScript('https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@1e4c3f0/navigation/customization.js');
if (localStorage.getItem("yourItem") == null) {
    localStorage.setItem('faviconSrc', 'https://cdn.jsdelivr.net/gh/FutureElliotto/arcade-4-images/favicon/logo.png');
}
