const grid = document.getElementById("itemsGrid");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("itemDialog");
const modalContent = document.getElementById("modalContent");
const closeDialog = document.getElementById("closeDialog");
const themeToggle = document.getElementById("themeToggle");

let activeCategory = "All";

function money(value) { return `$${value}`; }
function emailLink(item) {
  const subject = encodeURIComponent(`Moving Sale Inquiry: ${item.title}`);
  const body = encodeURIComponent(`Hi, I am interested in ${item.title}. Is it still available?`);
  return `mailto:your-email@example.com?subject=${subject}&body=${body}`;
}

function updateStats() {
  document.getElementById("totalCount").textContent = SALE_ITEMS.length;
  document.getElementById("availableCount").textContent = SALE_ITEMS.filter(i => i.status === "Available").length;
  document.getElementById("soldCount").textContent = SALE_ITEMS.filter(i => i.status === "Sold").length;
}

function renderFilters() {
  const categories = ["All", ...new Set(SALE_ITEMS.map(item => item.category))];
  filters.innerHTML = categories.map(category => `
    <button class="filter-btn ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>
  `).join("");

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderItems();
    });
  });
}

function getFilteredItems() {
  const query = searchInput.value.trim().toLowerCase();
  let items = SALE_ITEMS.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const text = `${item.title} ${item.category} ${item.condition} ${item.description}`.toLowerCase();
    return categoryMatch && text.includes(query);
  });

  if (sortSelect.value === "priceLow") items.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "priceHigh") items.sort((a, b) => b.price - a.price);
  if (sortSelect.value === "available") items.sort((a, b) => a.status.localeCompare(b.status));
  return items;
}

function renderItems() {
  const items = getFilteredItems();
  emptyState.classList.toggle("hidden", items.length !== 0);
  grid.innerHTML = items.map(item => `
    <article class="card ${item.status === "Sold" ? "sold" : ""}">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <div class="badge-row">
          <span class="badge ${item.status === "Available" ? "available" : "sold-badge"}">${item.status}</span>
          <span class="badge">${item.category}</span>
          <span class="badge">${item.condition}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="price-row"><span class="price">${money(item.price)}</span><span class="original">${money(item.originalPrice)}</span></div>
        <div class="card-actions">
          <button class="outline" type="button" onclick="openItem(${item.id})">Details</button>
          <a href="${emailLink(item)}">Message</a>
        </div>
      </div>
    </article>
  `).join("");
}

function openItem(id) {
  const item = SALE_ITEMS.find(entry => entry.id === id);
  modalContent.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="modal-body">
      <div class="badge-row">
        <span class="badge ${item.status === "Available" ? "available" : "sold-badge"}">${item.status}</span>
        <span class="badge">${item.category}</span>
        <span class="badge">${item.condition}</span>
      </div>
      <h2>${item.title}</h2>
      <div class="price-row"><span class="price">${money(item.price)}</span><span class="original">${money(item.originalPrice)}</span></div>
      <p>${item.description}</p>
      <p><strong>Pickup:</strong> ${item.pickup}</p>
      <div class="card-actions">
        <a href="${emailLink(item)}">Message about this item</a>
        ${item.reference ? `<a class="outline" target="_blank" href="${item.reference}">Reference</a>` : ""}
      </div>
    </div>
  `;
  dialog.showModal();
}
window.openItem = openItem;

closeDialog.addEventListener("click", () => dialog.close());
searchInput.addEventListener("input", renderItems);
sortSelect.addEventListener("change", renderItems);
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  themeToggle.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
});

updateStats();
renderFilters();
renderItems();
