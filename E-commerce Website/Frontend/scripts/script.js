// Product Data
const products = [
  { id: 1, name: "Fresh Apples", price: 2.99, image: "apples.jpg" },
  { id: 2, name: "Organic Bananas", price: 1.99, image: "bananas.jpg" },
  { id: 3, name: "Sweet Oranges", price: 3.49, image: "oranges.jpg" },
];

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartSidebar = document.getElementById("cart-sidebar");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartItemsContainer = document.querySelector(".cart-items");
const overlay = document.getElementById("overlay");

// Event Listeners
document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("checkout-btn").addEventListener("click", openCheckout);
document
  .getElementById("close-checkout")
  .addEventListener("click", closeCheckout);
document.getElementById("checkout").addEventListener("submit", handleCheckout);
overlay.addEventListener("click", () => {
  closeCart();
  closeCheckout();
});

// Initialize
renderProducts();
updateCart();

// Functions
function renderProducts() {
  const container = document.querySelector(".products");
  container.innerHTML = products
    .map(
      (product) => `
      <div class="product-card">
          <img src="images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
  `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showAddedToCartMessage(product.name);
}

function updateCart() {
  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update cart items
  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
          <h4>${item.name}</h4>
          <p>
              $${item.price.toFixed(2)} × 
              <button class="quantity-btn" onclick="updateQuantity(${
                item.id
              }, -1)">-</button>
              ${item.quantity}
              <button class="quantity-btn" onclick="updateQuantity(${
                item.id
              }, 1)">+</button>
          </p>
          <button class="remove-btn" onclick="removeFromCart(${
            item.id
          })">Remove</button>
      </div>
  `
    )
    .join("");

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    updateCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function showAddedToCartMessage(productName) {
  const message = document.createElement("div");
  message.className = "cart-message";
  message.textContent = `${productName} added to cart!`;
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

function openCart() {
  cartSidebar.style.right = "0";
  overlay.style.display = "block";
}

function closeCart() {
  cartSidebar.style.right = "-350px";
  overlay.style.display = "none";
}

function openCheckout() {
  document.getElementById("checkout-form").style.display = "block";
  overlay.style.display = "block";
}

function closeCheckout() {
  document.getElementById("checkout-form").style.display = "none";
  overlay.style.display = "none";
}

function handleCheckout(e) {
  e.preventDefault();
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  closeCheckout();
  closeCart();
}
