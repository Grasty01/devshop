/* Génère le contenu du tiroir panier */
window.RenderCart = (function () {
  var drawer = document.getElementById("cart-drawer");
  var itemsWrap = function () {
    return document.getElementById("cart-items");
  };
  var totalEl = function () {
    return document.getElementById("cart-total");
  };

  function render() {
    var cart = window.State.state.cart || [];
    var wrap = itemsWrap();
    if (!wrap) return;
    wrap.innerHTML = "";
    if (!cart.length) {
      wrap.innerHTML = "<p>Le panier est vide.</p>";
      if (totalEl()) totalEl().textContent = "0.00";
      return;
    }

    cart.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<div class="cart-item-left"><img src="' +
        (item.product.image || "") +
        '" alt=""/></div>' +
        '<div class="cart-item-body"><strong>' +
        item.product.title +
        "</strong>" +
        '<div class="cart-item-controls">' +
        '<input type="number" min="1" value="' +
        item.qty +
        '" data-id="' +
        item.id +
        '" class="cart-qty" />' +
        '<button class="cart-remove" data-id="' +
        item.id +
        '">Supprimer</button>' +
        "</div></div>" +
        '<div class="cart-item-right">' +
        ((item.product.price || 0).toFixed(2).replace(".", ",") + " €") +
        "</div>";

      wrap.appendChild(row);
    });

    if (totalEl())
      totalEl().textContent = window.Cart.total().toFixed(2).replace(".", ",");

    // Attacher les contrôles
    wrap.querySelectorAll(".cart-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.Cart.remove(btn.getAttribute("data-id"));
      });
    });

    wrap.querySelectorAll(".cart-qty").forEach(function (input) {
      input.addEventListener("change", function (e) {
        var val = parseInt(e.target.value, 10) || 1;
        window.Cart.changeQty(e.target.getAttribute("data-id"), val);
      });
    });
  }

  return { render: render };
})();
