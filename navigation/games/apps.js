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
    renderAppsPage();
  } catch (error) {
    console.error("Failed to load apps data:", error);
  }
}

function renderAppsPage() {
  const container = document.getElementById("appsContainer");
  container.innerHTML = "";

  const start = (currentAppsPage - 1) * appsPerPage;
  const end = start + appsPerPage;
  const appsToDisplay = filteredApps.slice(start, end);

  if (appsToDisplay.length === 0) {
    container.innerHTML = "<p>No apps found.</p>";
    document.getElementById("appsPagination").innerHTML = "";
    return;
  }

  appsToDisplay.forEach((app) => {
    const appItem = document.createElement("div");
    appItem.className = "game-button";

    const isFavorite = appFavorites.includes(app.title);
    const star = isFavorite ? "⭐" : "☆";

    // Build onclick dynamically
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

    appItem.innerHTML = `
      <button onclick="${onclickCall}" aria-label="${app.title}">
        <img src="${app.image}" alt="${app.title}" loading="lazy">
      </button>
      <p class="game-title">
        ${app.title}
        <span class="favorite-icon" onclick="toggleAppFavorite('${app.title}')">${star}</span>
      </p>
    `;

    container.appendChild(appItem);
  });

  renderAppsPagination();
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

// ✅ Correct initialization
fetchApps();
