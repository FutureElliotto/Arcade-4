let gamesData = [];
let currentPage = 1;
const itemsPerPage = 25;
let filteredGames = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchGames() {
  try {
    const response = await fetch("https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@827e8c1/navigation/games/games.json");
    gamesData = await response.json();
    filteredGames = [...gamesData];
    renderPage();
  } catch (error) {
    console.error("Failed to load games data:", error);
  }
}

function renderPage() {
  const container = document.getElementById("gameButtons");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const gamesToDisplay = filteredGames.slice(start, end);

  if (gamesToDisplay.length === 0) {
    container.innerHTML = "<p>No games found.</p>";
    document.getElementById("paginationControls").innerHTML = "";
    return;
  }

  gamesToDisplay.forEach((game) => {
    const gameItem = document.createElement("div");
    gameItem.className = "game-button";

    const isFavorite = favorites.includes(game.title);
    const star = isFavorite ? "⭐" : "☆";

    gameItem.innerHTML = `
      <button onclick="handleGameClick('${game.url}', '${game.mode}')" aria-label="${game.title}">
        <img src="${game.image}" alt="${game.title}">
      </button>
      <p class="game-title">
        ${game.title}
        <span class="favorite-icon" onclick="toggleFavorite('${game.title}')">${star}</span>
      </p>
    `;

    container.appendChild(gameItem);
  });

  renderPaginationControls();
}

function applyFilters() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const selectedCategory = document.getElementById("categorySelect").value;
  const showFavorites = document.getElementById("showFavorites").checked;

  filteredGames = gamesData.filter((game) => {
    const matchSearch = game.title.toLowerCase().includes(searchTerm);
    const matchCategory =
      selectedCategory === "All" ||
      (Array.isArray(game.category) && game.category.includes(selectedCategory)) ||
      game.category === selectedCategory;
    const matchFavorite = !showFavorites || favorites.includes(game.title);
    return matchSearch && matchCategory && matchFavorite;
  });

  currentPage = 1;
  renderPage();
}

function renderPaginationControls() {
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const pagination = document.getElementById("paginationControls");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.classList.add("active-page");
    }
    btn.onclick = () => {
      currentPage = i;
      renderPage();
    };
    pagination.appendChild(btn);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function toggleFavorite(title) {
  if (favorites.includes(title)) {
    favorites = favorites.filter((fav) => fav !== title);
  } else {
    favorites.push(title);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderPage();
}

function handleGameClick(url, mode) {
  if (mode === "A") {
    loadBlobContent(url);
  } else if (mode === "B") {
    changePageContent(url);
  } else {
    console.warn("Unknown mode, defaulting to Blob");
    loadBlobContent(url);
  }
}

window.onload = fetchGames;
