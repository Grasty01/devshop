/**
 * Point d'entrée de l'application : reste court :
 * il importe les modules et connecte les événements
 */
document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector(".main-container");

  var loader = document.createElement("div");
  loader.className = "app-loader";
  loader.textContent = "Chargement...";
  root && root.appendChild(loader);

  // Init filtres
  window.Filters.init();

  // Init événements panier
  document.addEventListener("cart:updated", function () {
    // mettre à jour le badge
    var badge = document.querySelector(".basket-badge");
    if (badge) badge.textContent = String(window.Cart.count());
    window.RenderCart.render();
  });

  // ouvrir/fermer tiroir panier
  var basketBtn = document.querySelector(".basket-button button");
  var drawer = document.getElementById("cart-drawer");
  var drawerClose = document.querySelector(".cart-close");
  if (basketBtn && drawer) {
    basketBtn.addEventListener("click", function () {
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      window.RenderCart.render();
    });
  }
  if (drawerClose)
    drawerClose.addEventListener("click", function () {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
    });

  // fermer tiroir au clic extérieur
  document.addEventListener("click", function (e) {
    if (!drawer) return;
    if (!drawer.classList.contains("open")) return;
    var target = e.target;
    var isInside =
      drawer.contains(target) || (basketBtn && basketBtn.contains(target));
    if (!isInside) {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
    }
  });

  // Récupérer les produits et afficher
  (async function load() {
    try {
      window.State.state.loading = true;
      root && loader && (loader.style.display = "block");
      var products = await window.API.fetchProducts();
      window.State.setProducts(products || []);
      document.dispatchEvent(new CustomEvent("products:updated"));
    } catch (err) {
      root && loader && (loader.textContent = "Erreur de chargement");
      console.error(err);
    } finally {
      window.State.state.loading = false;
      root && loader && root.removeChild(loader);
    }
  })();

  // Quand produits changent, rerender la liste
  document.addEventListener("products:updated", function () {
    window.RenderProducts.render(window.State.state.filtered);
  });

  // Badge principal
  var bdg = document.querySelector(".basket-badge");
  if (bdg) bdg.textContent = String(window.Cart.count());
  window.RenderCart.render();
});
