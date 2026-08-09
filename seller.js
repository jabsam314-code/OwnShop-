const category = document.getElementById("category");
const gstStatus = document.getElementById("gstStatus");

const gstBox = document.getElementById("gstBox");
const fssaiBox = document.getElementById("fssaiBox");

const gstin = document.getElementById("gstin");
const fssai = document.getElementById("fssai");

gstBox.style.display = "none";
fssaiBox.style.display = "none";

category.addEventListener("change", function () {
    if (this.value === "food") {
        fssaiBox.style.display = "block";
        fssai.required = true;
    } else {
        fssaiBox.style.display = "none";
        fssai.required = false;
        fssai.value = "";
    }
});

gstStatus.addEventListener("change", function () {
    if (this.value === "registered") {
        gstBox.style.display = "block";
        gstin.required = true;
    } else {
        gstBox.style.display = "none";
        gstin.required = false;
        gstin.value = "";
    }
});

document.getElementById("sellerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const seller = {
        ownerName: document.getElementById("ownerName").value,
        mobile: document.getElementById("mobile").value,
        shopName: document.getElementById("shopName").value,
        category: category.value,
        address: document.getElementById("address").value,
        gstStatus: gstStatus.value,
        gstin: gstin.value,
        fssai: fssai.value
    };

    localStorage.setItem("ownshopSeller", JSON.stringify(seller));

    document.getElementById("sellerMessage").innerHTML =
        "<p style='color:#159447;font-weight:bold;margin-top:20px;'>Seller registration saved successfully.</p>";

    this.reset();

    gstBox.style.display = "none";
    fssaiBox.style.display = "none";
});
