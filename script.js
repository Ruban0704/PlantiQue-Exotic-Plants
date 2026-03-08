// script.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-card button");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const product = {
        name: card.querySelector("h3").textContent,
        price: card.querySelector("p").textContent,
      };

      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to your cart!`);
    });
  });
});