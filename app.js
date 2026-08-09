// OwnShop - Homepage JavaScript

const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 499,
        category: "fashion",
        seller: "OwnShop Seller",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 1299,
        category: "electronics",
        seller: "Tech Store",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Modern Backpack",
        price: 899,
        category: "fashion",
        seller: "Urban Store",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 1999,
        category: "electronics",
        seller: "Digital World",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    }
];


// Load featured products
function loadFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
                                                                                                                                                                                                                                                                                                <a href="product.html?id=${product.id}">
                                                                                                                                                                                                                                                                                                                <img
                                                                                                                                                                                                                                                                                                                                    src="${product.image}"
                                                                                                                                                                                                                                                                                                                                                        alt="${product.name}"
                                                                                                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                                                                                                    </a>

                                                                                                                                                                                                                                                                                                                                                                                                <div class="product-info">

                                                                                                                                                                                                                                                                                                                                                                                                                <h3>
                                                                                                                                                                                                                                                                                                                                                                                                                                    ${product.name}
                                                                                                                                                                                                                                                                                                                                                                                                                                                    </h3>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class="product-price">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ₹${product.price.toLocaleString("en-IN")}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Sold by ${product.seller}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `;

        container.appendChild(productCard);
    });
}


// Search products
function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const query =
        searchInput.value.trim();

    if (query === "") {
        alert("Please enter a product name.");
        return;
    }

    window.location.href =
        `products.html?search=${encodeURIComponent(query)}`;
}


// Cart count
function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("ownshop_cart") || "[]"
        );

    const count =
        cart.reduce(
            (total, item) =>
                total + (item.quantity || 1),
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}
// Initialize homepage
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadFeaturedProducts();

        updateCartCount();

    }
);
// ========================================
// PRODUCTS PAGE
// ========================================

let selectedCategory = "all";

function loadProductsPage() {

    const container =
        document.getElementById("productsContainer");

    if (!container) {
        return;
    }

    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    const search =
        params.get("search");

    if (category) {
        selectedCategory = category;
    }

    const searchInput =
        document.getElementById("productSearch");

    if (search && searchInput) {
        searchInput.value = search;
    }

    filterProducts();
}


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts() {

    const container =
        document.getElementById("productsContainer");

    if (!container) {
        return;
    }

    const searchInput =
        document.getElementById("productSearch");

    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    const filtered =
        products.filter(product => {

            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const searchMatch =
                searchText === "" ||
                product.name
                    .toLowerCase()
                    .includes(searchText);

            return categoryMatch && searchMatch;
        });

    container.innerHTML = "";

    const noProducts =
        document.getElementById("noProducts");

    if (filtered.length === 0) {

        if (noProducts) {
            noProducts.style.display = "block";
        }

        return;

    }

    if (noProducts) {
        noProducts.style.display = "none";
    }

    filtered.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <a href="product.html?id=${product.id}">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <img
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                src="${product.image}"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    alt="${product.name}"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </a>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <div class="product-info">

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <h3>${product.name}</h3>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <div class="product-price">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ₹${product.price.toLocaleString("en-IN")}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Sold by ${product.seller}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        `;

        container.appendChild(card);
    });
}


// ========================================
// CATEGORY FILTER
// ========================================

function filterCategory(category) {

    selectedCategory = category;

    document
        .querySelectorAll(".filter-button")
        .forEach(button => {
            button.classList.remove("active");
        });

    filterProducts();
}


// ========================================
// INITIALIZE PRODUCTS PAGE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProductsPage();

    }
);