// script.js - Handles product management and transactions

// Load products from localStorage
function loadProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Add new product
function addProduct() {
  let name = document.getElementById("product-name").value;
  let price = parseFloat(document.getElementById("product-price").value);
  if (name && price > 0) {
    let products = loadProducts();
    products.push({ name, price });
    saveProducts(products);
    alert("Product added successfully!");
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    displayProducts();
  }
}

// Display products in product management page
function displayProducts() {
  let products = loadProducts();
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    let row = `<tr>
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td><button onclick="deleteProduct(${index})">Delete</button></td>
                   </tr>`;
    productList.innerHTML += row;
  });
}

// Delete product
function deleteProduct(index) {
  let products = loadProducts();
  products.splice(index, 1);
  saveProducts(products);
  displayProducts();
}

// Load products into transaction page dropdown
function loadProductsForTransaction() {
  let products = loadProducts();
  let productSelect = document.getElementById("product-select");
  productSelect.innerHTML = "";
  products.forEach((product, index) => {
    let option = `<option value='${index}'>${
      product.name
    } - $${product.price.toFixed(2)}</option>`;
    productSelect.innerHTML += option;
  });
}

// Add product to cart in transaction page
let cart = [];
function addToCart() {
  let productIndex = document.getElementById("product-select").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  if (productIndex !== "" && quantity > 0) {
    let products = loadProducts();
    let product = products[productIndex];
    cart.push({ name: product.name, price: product.price, quantity });
    updateCart();
  }
}

// Update cart display
function updateCart() {
  let cartBody = document.getElementById("cart-body");
  cartBody.innerHTML = "";
  cart.forEach((item, index) => {
    let row = `<tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${index})">Remove</button></td>
                   </tr>`;
    cartBody.innerHTML += row;
  });
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Process payment
function processPayment() {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let tax = total * 0.07;
  let grandTotal = total + tax;
  let cashReceived = parseFloat(document.getElementById("cash-received").value);
  let change = cashReceived - grandTotal;
  if (cashReceived >= grandTotal) {
    document.getElementById(
      "receipt-details"
    ).innerHTML = `Subtotal: $${total.toFixed(2)}<br>
            Tax (7%): $${tax.toFixed(2)}<br>
            Grand Total: $${grandTotal.toFixed(2)}<br>
            Cash Received: $${cashReceived.toFixed(2)}<br>
            Change: $${change.toFixed(2)}`;
  } else {
    alert("Insufficient cash received.");
  }
}

// Initialize pages
if (document.getElementById("product-list")) {
  displayProducts();
}
if (document.getElementById("product-select")) {
  loadProductsForTransaction();
}
