const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, icon: "🎧" },
  { id: 2, name: "Smart Watch", price: 2499, icon: "⌚" },
  { id: 3, name: "Running Shoes", price: 1999, icon: "👟" },
  { id: 4, name: "Travel Backpack", price: 1299, icon: "🎒" },
  { id: 5, name: "Sunglasses", price: 799, icon: "🕶️" },
  { id: 6, name: "Smartphone", price: 14999, icon: "📱" }
];

let cart = [];

const productList = document.getElementById("productList");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

function renderProducts() {
  productList.innerHTML = products.map(product => `
    <div class="card">
      <div class="product-img">${product.icon}</div>
      <h3>${product.name}</h3>
      <div class="price">₹${product.price}</div>
      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(product => product.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;

  document.getElementById("cartItems").innerHTML =
    cart.length > 0
      ? cart.map((item, index) => `
          <div class="cart-item">
            <div>
              <strong>${item.icon} ${item.name}</strong>
              <br>
              ₹${item.price}
            </div>

            <button class="remove" onclick="removeItem(${index})">
              Remove
            </button>
          </div>
        `).join("")
      : "<p>Your cart is empty.</p>";

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  document.getElementById("total").textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("cartBtn").onclick = () => {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
};

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

document.getElementById("closeCart").onclick = closeCart;
overlay.onclick = closeCart;

document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Order placed successfully! Thank you for shopping!");
    cart = [];
    updateCart();
    closeCart();
  }
};

renderProducts();
