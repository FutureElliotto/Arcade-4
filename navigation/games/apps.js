let appsData = [];
let currentAppsPage = 1;
const appsPerPage = 24;
let filteredApps = [];
let appFavorites = JSON.parse(localStorage.getItem("appFavorites")) || [];

async function fetchApps() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@f50fae4/navigation/games/apps.json"
    );
    appsData = await response.json();
    filteredApps = [...appsData];
    renderPage();
  } catch (error) {
    console.error("Failed to load games data:", error);
  }
}

function renderPage() {
  const container = document.getElementById("appsContainer");
  container.innerHTML = "";

  const start = (currentAppsPage - 1) * appsPerPage; // Use currentAppsPage
  const end = start + appsPerPage;
  const gamesToDisplay = filteredApps.slice(start, end);

  if (gamesToDisplay.length === 0) {
    container.innerHTML = "<p>No apps found.</p>";
    document.getElementById("paginationControls").innerHTML = "";
    return;
  }

  gamesToDisplay.forEach((game) => {
    const gameItem = document.createElement("div");
    gameItem.className = "game-button";

    const isFavorite = appFavorites.includes(game.title); // Use appFavorites
    const star = isFavorite ? "⭐" : "☆";

    // Build the onclick attribute dynamically
    let onclickCall = "";
    if (Array.isArray(game.functions)) {
      // Multiple custom functions from JSON
      onclickCall = game.functions
        .map((fn) => {
          const params = fn.params.map((p) => `'${p}'`).join(",");
          return `${fn.name}(${params})`;
        })
        .join(";");
    } else {
      // Fallback: default behavior
      onclickCall = `handleGameClick('${game.url}', '${game.mode}')`;
    }

    // Create button and title with favorite toggle
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

function applyAppsFilter() {
  const searchTerm = document.getElementById("appsSearch").value.toLowerCase();
  const selectedCategory = document.getElementById("appsCategory").value;
  const showFavorites = document.getElementById("appsShowFavorites").checked;

  filteredApps = appsData.filter((app) => {
    const matchSearch = app.title.toLowerCase().includes(searchTerm);
    const matchCategory =
      selectedCategory === "All" ||
      (Array.isArray(app.category) && app.category.includes(selectedCategory)) ||
      app.category === selectedCategory;
    const matchFavorite = !showFavorites || appFavorites.includes(app.title);
    return matchSearch && matchCategory && matchFavorite;
  });

  currentAppsPage = 1;
  renderAppsPage();
}

function renderAppsPagination() {
  const totalPages = Math.ceil(filteredApps.length / appsPerPage);
  const pagination = document.getElementById("appsPagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentAppsPage) btn.classList.add("active-page");
    btn.onclick = () => {
      currentAppsPage = i;
      renderAppsPage();
    };
    pagination.appendChild(btn);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleAppFavorite(title) {
  if (appFavorites.includes(title)) {
    appFavorites = appFavorites.filter((fav) => fav !== title);
  } else {
    appFavorites.push(title);
  }
  localStorage.setItem("appFavorites", JSON.stringify(appFavorites));
  renderAppsPage();
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

window.onload = fetchApps;
