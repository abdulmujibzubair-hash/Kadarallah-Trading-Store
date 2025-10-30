// ===== CART FUNCTIONALITY =====

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== Add to Cart Buttons =====
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    addToCart(name, price);
  });
});

// ===== Add Item Function =====
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// ===== Display Cart Items =====
const cartTable = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartTable) {
  renderCart();
}

function renderCart() {
  cartTable.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
      </td>
      <td>${itemTotal.toLocaleString()}</td>
      <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });

  cartTotal.textContent = total.toLocaleString();
  localStorage.setItem("cart", JSON.stringify(cart));
  addCartListeners();
}

// ===== Update Quantity / Remove Items =====
function addCartListeners() {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  const removeButtons = document.querySelectorAll(".remove-btn");

  quantityInputs.forEach(input => {
    input.addEventListener("change", e => {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      cart[index].quantity = newQty > 0 ? newQty : 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  removeButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// ===== Checkout =====
const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for shopping with Kadarallah Trading Store!");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  });
}


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Add to wishlist (on product page)
document.querySelectorAll(".wishlist-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));

    const existingItem = wishlist.find(item => item.name === name);

    if (existingItem) {
      alert(`${name} is already in your wishlist ❤️`);
    } else {
      wishlist.push({ name, price });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${name} added to wishlist ❤️`);
    }
  });
});

// Display wishlist (on wishlist.html)
document.addEventListener("DOMContentLoaded", () => {
  const wishlistBody = document.getElementById("wishlist-body");
  if (!wishlistBody) return; // stop if not on wishlist page

  console.log("Wishlist data found:", wishlist); // just for debugging

  wishlistBody.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Your wishlist is empty 💔</td></tr>`;
    return;
  }

  wishlist.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}</td>
      <td><button class="remove-wish" data-index="${index}">Remove</button></td>
    `;
    wishlistBody.appendChild(row);
  });

  // Remove item
  document.querySelectorAll(".remove-wish").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      location.reload();
    });
  });
});


