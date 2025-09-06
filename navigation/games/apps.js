let appsData = [];
let currentPage = 1;
const itemsPerPage = 24;
let filteredGames = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchGames() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@f50fae4/navigation/games/apps.json"
    );
    appsData = await response.json();
    filteredGames = [...appsData];
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
    const isFavorite = favorites.includes(game.title);
    const star = isFavorite ? "⭐" : "☆";

    // Generate the dynamic onclick call string for functions
    let dynamicFunctions = "";
    if (Array.isArray(game.functions)) {
      dynamicFunctions = game.functions
        .map((fnObj) => {
          if (fnObj && typeof fnObj.name === "string") {
            const params = (fnObj.params || [])
              .map((p) => (typeof p === "string" ? `'${p.replace(/'/g, "\\'")}'` : p))
              .join(",");
            return `try{window['${fnObj.name}'](${params})}catch(e){console.error(e)}`;
          }
          return "";
        })
        .filter(Boolean)
        .join(";");
    }

    // Build HTML for each game
    const gameItem = document.createElement("div");
    gameItem.className = "game-button";
    gameItem.innerHTML = `
      <button aria-label="${game.title}" onclick="${dynamicFunctions}">
        <img src="${game.image}" alt="${game.title}" loading="lazy">
      </button>
      <p class="game-title">
        ${game.title}
        <span class="favorite-icon" data-title="${game.title}" onclick="toggleFavorite('${game.title}')">
          ${star}
        </span>
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

  filteredGames = appsData.filter((game) => {
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
    pagination.innerHTML += `
      <button class="${i === currentPage ? "active-page" : ""}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changePage(page) {
  currentPage = page;
  renderPage();
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

/* === FUNCTIONS YOU CAN CALL DYNAMICALLY === */
function handleGameClick(url, mode) {
  console.log(`🎮 Opening ${url} in mode ${mode}`);
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
