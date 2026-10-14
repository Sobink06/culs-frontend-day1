let catalog = [];

const listEl = document.getElementById("herbs-list");
const countEl = document.getElementById("herb-count");
const searchInput = document.getElementById("herb-search");
const herbsSection = document.getElementById("herbs");
const detailSection = document.getElementById("herb-detail");
const detailContent = document.getElementById("herb-detail-content");

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
}

function renderHerbs(herbs) {
  listEl.innerHTML = "";

  if (countEl) {
    countEl.textContent = `${herbs.length} herbs available.`;
  }

  if (herbs.length === 0) {
    listEl.innerHTML = `<li style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--soil);">No matching herbs found.</li>`;
    return;
  }

  herbs.forEach(herb => {
    const slug = herb.id || slugify(herb.name);
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3><a href="#${slug}" class="herb-card-link">${herb.name}</a></h3>
      <p class="botanical"><em>${herb.botanical || ""}</em></p>
      <p>${herb.uses || ""}</p>
      <span class="tag">${herb.cycle || ""}</span>
    `;
    listEl.appendChild(li);
  });
}

async function fetchCatalog() {
  try {
    const response = await fetch("data/herbs.json");
    if (!response.ok) throw new Error("Could not load herbs catalog.");
    catalog = await response.json();
    renderHerbs(catalog);
  } catch (error) {
    if (countEl) countEl.textContent = "Unable to connect to server data.";
    console.error(error);
  }
}

async function loadHerbDetail(slug) {
  herbsSection.hidden = true;
  detailSection.hidden = false;
  detailContent.innerHTML = "<p>Loading herb details...</p>";

  try {
    const response = await fetch(`data/${slug}.json`);
    if (!response.ok) {
      throw new Error(`Data sheet for herb "${slug}" is not currently available.`);
    }
    const herb = await response.json();

    detailContent.innerHTML = `
      <h1>${herb.name}</h1>
      <p><em>${herb.botanical || ""}</em> &bull; <strong>${herb.cycle || ""}</strong></p>

      <section style="margin-top: 1.5rem;">
        <h2>About</h2>
        <p>${herb.description || "No general description recorded."}</p>
      </section>

      <section style="margin-top: 1rem;">
        <h2>Kitchen & Household Uses</h2>
        <p>${herb.uses || "No culinary instructions available."}</p>
      </section>

      <section style="margin-top: 1rem;">
        <h2>Growing Tips</h2>
        <p>${herb.tips || "No cultivation guidelines provided."}</p>
      </section>
    `;
    detailSection.focus();
  } catch (err) {
    detailContent.innerHTML = `
      <div style="padding: 1.5rem; background: #ffebee; border: 1px solid #ef5350; border-radius: 8px;">
        <h2>Herb Information Unavailable</h2>
        <p>${err.message}</p>
        <p><a href="#herbs">&larr; Return to main herb garden</a></p>
      </div>
    `;
    detailSection.focus();
  }
}

function handleRouting() {
  const hash = window.location.hash.replace("#", "").trim();

  if (!hash || hash === "herbs" || hash === "visiting" || hash === "about") {
    detailSection.hidden = true;
    herbsSection.hidden = false;
  } else {
    loadHerbDetail(hash);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const term = event.target.value.toLowerCase().trim();
    const filtered = catalog.filter(item => {
      const name = (item.name || "").toLowerCase();
      const uses = (item.uses || "").toLowerCase();
      const cycle = (item.cycle || "").toLowerCase();
      const botanical = (item.botanical || "").toLowerCase();
      return name.includes(term) || uses.includes(term) || cycle.includes(term) || botanical.includes(term);
    });
    renderHerbs(filtered);
  });
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", async () => {
  await fetchCatalog();
  handleRouting();
});