// cart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const buyNowBtn = document.getElementById("buy-now");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const price = parseInt(item.price.replace("₹", ""));
      total += price * (item.quantity || 1);

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: ${item.price}</p>
        <p>Quantity: 
          <button class="qty-btn" data-index="${index}" data-action="minus">-</button>
          <span>${item.quantity || 1}</span>
          <button class="qty-btn" data-index="${index}" data-action="plus">+</button>
        </p>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <hr>
      `;
      cartItemsContainer.appendChild(div);
    });

    totalElement.textContent = `₹${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("qty-btn")) {
      const action = e.target.dataset.action;
      if (action === "plus") {
        cart[index].quantity = (cart[index].quantity || 1) + 1;
      } else if (action === "minus" && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
      renderCart();
    }

    if (e.target.classList.contains("remove-btn")) {
      cart.splice(index, 1);
      renderCart();
    }
  });

  buyNowBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase! 🌿");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  });

  renderCart();
});