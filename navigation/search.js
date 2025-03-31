function searchGames() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let gameItems = document.querySelectorAll('.game-item');
    
    gameItems.forEach(function(item) {
        let title = item.querySelector('.game-title').textContent.toLowerCase();
        if (title.indexOf(input) > -1) {
            item.style.display = 'block'; // Show the game if it matches the search
        } else {
            item.style.display = 'none'; // Hide the game if it doesn't match
        }
    });
}
