let appsData = [];
let currentPage = 1;
const itemsPerPage = 24;
let filteredGames = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ✅ Fetch games from a dynamic JSON URL
async function fetchGames(jsonUrl) {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    appsData = await response.json();
    filteredGames = [...appsData];
    renderPage();
  } catch (error) {
    console.error("❌ Failed to load games data:", error);
    const container = document.getElementById("gameButtons");
    if (container) container.innerHTML = "<p>Failed to load games. Please try again.</p>";
  }
}

function renderPage() {
  const container = document.getElementById("gameButtons");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const gamesToDisplay = filteredGames.slice(start, end);

  // ✅ If no games found, reset page count to 1 and stop rendering pagination
  if (gamesToDisplay.length === 0) {
    currentPage = 1; // <-- Reset page count
    const freshGames = filteredGames.slice(0, itemsPerPage);

    if (freshGames.length === 0) {
      // ✅ Still no games at all → show message
      container.innerHTML = "<p>No games found.</p>";
      document.getElementById("paginationControls").innerHTML = "";
      return;
    }

    // ✅ If there ARE games on the first page, render them
    freshGames.forEach((game) => {
      const gameItem = document.createElement("div");
      gameItem.className = "game-button";

      const isFavorite = favorites.includes(game.title);
      const star = isFavorite ? "⭐" : "☆";

      let onclickCall = "";
      if (Array.isArray(game.functions)) {
        onclickCall = game.functions
          .map((fn) => {
            const params = fn.params.map((p) => `'${p}'`).join(",");
            return `${fn.name}(${params})`;
          })
          .join(";");
      } else {
        onclickCall = `handleGameClick('${game.url}', '${game.mode}')`;
      }

      gameItem.innerHTML = `
        <button onclick="${onclickCall}" aria-label="${game.title}">
          <img src="${game.image}" alt="${game.title}" loading="lazy">
        </button>
        <p class="game-title">
          ${game.title}
          <span class="favorite-icon" onclick="toggleFavorite('${game.title}')">${star}</span>
        </p>
      `;

      container.appendChild(gameItem);
    });

    renderPaginationControls();
    return;
  }

  // ✅ Normal rendering if games exist on the current page
  gamesToDisplay.forEach((game) => {
    const gameItem = document.createElement("div");
    gameItem.className = "game-button";

    const isFavorite = favorites.includes(game.title);
    const star = isFavorite ? "⭐" : "☆";

    let onclickCall = "";
    if (Array.isArray(game.functions)) {
      onclickCall = game.functions
        .map((fn) => {
          const params = fn.params.map((p) => `'${p}'`).join(",");
          return `${fn.name}(${params})`;
        })
        .join(";");
    } else {
      onclickCall = `handleGameClick('${game.url}', '${game.mode}')`;
    }

    gameItem.innerHTML = `
      <button onclick="${onclickCall}" aria-label="${game.title}">
        <img src="${game.image}" alt="${game.title}" loading="lazy">
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
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
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
