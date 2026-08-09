document.addEventListener("DOMContentLoaded", function () {

    const productForm = document.getElementById("productForm");
    const myProducts = document.getElementById("myProducts");
    const noSellerProducts = document.getElementById("noSellerProducts");
    const productCount = document.getElementById("productCount");
    const shopWelcome = document.getElementById("shopWelcome");

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productCategory = document.getElementById("productCategory");
    const productDescription = document.getElementById("productDescription");
    const productImage = document.getElementById("productImage");

    // Seller information
    const seller = JSON.parse(localStorage.getItem("ownShopSeller") || "{}");

    if (seller.shopName && shopWelcome) {
        shopWelcome.textContent = "Welcome to " + seller.shopName;
    }

    // Get saved products
    let products = JSON.parse(localStorage.getItem("ownShopProducts") || "[]");

    function displayProducts() {

        myProducts.innerHTML = "";

        if (products.length === 0) {
            if (noSellerProducts) {
                noSellerProducts.style.display = "block";
            }

            if (productCount) {
                productCount.textContent = "0";
            }

            return;
        }

        if (noSellerProducts) {
            noSellerProducts.style.display = "none";
        }

        if (productCount) {
            productCount.textContent = products.length;
        }

        products.forEach(function (product, index) {

            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                                                                                                                                                                                                                                                                                                                        <img 
                                                                                                                                                                                                                                                                                                                                            src="${product.image || 'https://via.placeholder.com/300x200?text=OwnShop'}"
                                                                                                                                                                                                                                                                                                                                                                alt="${product.name}"
                                                                                                                                                                                                                                                                                                                                                                                    onerror="this.src='https://via.placeholder.com/300x200?text=OwnShop'"
                                                                                                                                                                                                                                                                                                                                                                                                    >

                                                                                                                                                                                                                                                                                                                                                                                                                    <div class="product-card-content">
                                                                                                                                                                                                                                                                                                                                                                                                                                        <h3>${product.name}</h3>

                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p class="product-price">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ₹${Number(product.price).toLocaleString("en-IN")}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p>${product.category}</p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <p>${product.description || ""}</p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <button 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            class="delete-product"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    data-index="${index}">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Delete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;

            myProducts.appendChild(card);
        });

        // Delete buttons
        document.querySelectorAll(".delete-product").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(this.dataset.index);

                if (confirm("Delete this product?")) {

                    products.splice(index, 1);

                    localStorage.setItem(
                        "ownShopProducts",
                        JSON.stringify(products)
                    );

                    displayProducts();
                }
            });
        });
    }

    // Add Product
    if (productForm) {

        productForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const newProduct = {
                id: Date.now(),
                name: productName.value.trim(),
                price: productPrice.value,
                category: productCategory.value,
                description: productDescription.value.trim(),
                image: productImage.value.trim(),
                seller: seller.shopName || "OwnShop Seller"
            };

            if (!newProduct.name || !newProduct.price || !newProduct.category) {
                alert("Please fill all required fields.");
                return;
            }

            products.push(newProduct);

            localStorage.setItem(
                "ownShopProducts",
                JSON.stringify(products)
            );

            alert("Product added successfully!");

            productForm.reset();

            displayProducts();

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        });
    }

    // Initial display
    displayProducts();

});
})