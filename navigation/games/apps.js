let appsData = [];
let currentPage = 1;
const itemsPerPage = 24;
let filteredApps = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// === Fetch JSON ===
async function fetchApps() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/FutureElliotto/Arcade-4@f50fae4/navigation/games/apps.json"
    );
    appsData = await response.json();
    filteredApps = [...appsData];
    renderAppsPage();
  } catch (error) {
    console.error("Failed to load apps data:", error);
  }
}

// === Render Page ===
function renderAppsPage() {
  const container = document.getElementById("gameButtons");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const appsToDisplay = filteredApps.slice(start, end);

  if (appsToDisplay.length === 0) {
    container.innerHTML = "<p>No apps found.</p>";
    document.getElementById("paginationControls").innerHTML = "";
    return;
  }

  appsToDisplay.forEach((app) => {
    const appItem = document.createElement("div");
    appItem.className = "game-button";

    const isFavorite = favorites.includes(app.title);
    const star = isFavorite ? "⭐" : "☆";

    // === Handle Dynamic Functions ===
    let onclickCall = "";
    if (Array.isArray(app.functions)) {
      onclickCall = app.functions
        .map((fn) => {
          const params = fn.params.map((p) => `'${p}'`).join(",");
          return `${fn.name}(${params})`;
        })
        .join(";");
    } else {
      onclickCall = `handleGameClick('${app.url}', '${app.mode}')`;
    }

    // === Build Button + Title ===
    appItem.innerHTML = `
      <button onclick="${onclickCall}" aria-label="${app.title}">
        <img src="${app.image}" alt="${app.title}" loading="lazy">
      </button>
      <p class="game-title">
        ${app.title}
        <span class="favorite-icon" onclick="toggleFavorite('${app.title}')">${star}</span>
      </p>
    `;

    container.appendChild(appItem);
  });

  renderPaginationControls();
}

// === Apply Filters ===
function applyFiltersApps() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const selectedCategory = document.getElementById("categorySelect").value;
  const showFavorites = document.getElementById("showFavorites").checked;

  filteredApps = appsData.filter((app) => {
    const matchSearch = app.title.toLowerCase().includes(searchTerm);
    const matchCategory =
      selectedCategory === "All" ||
      (Array.isArray(app.category) && app.category.includes(selectedCategory)) ||
      app.category === selectedCategory;
    const matchFavorite = !showFavorites || favorites.includes(app.title);
    return matchSearch && matchCategory && matchFavorite;
  });

  currentPage = 1;
  renderAppsPage();
}

// === Render Pagination ===
function renderPaginationControls() {
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
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
      renderAppsPage();
    };
    pagination.appendChild(btn);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// === Toggle Favorites ===
function toggleFavorite(title) {
  if (favorites.includes(title)) {
    favorites = favorites.filter((fav) => fav !== title);
  } else {
    favorites.push(title);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderAppsPage();
}

function handleAppClick(url, mode) {
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
