/* Génère les cartes produit dans le DOM */
window.RenderProducts = (function () {
  var containerSelector = ".catalogue-container";

  function formatPrice(p) {
    return (Math.round(p * 100) / 100).toFixed(2).replace(".", ",");
  }

  function render(list) {
    var container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = "";
    if (!list || list.length === 0) {
      container.innerHTML = "<p>Aucun produit trouvé.</p>";
      return;
    }

    var frag = document.createDocumentFragment();
    list.forEach(function (p) {
      var article = document.createElement("article");

      var header = document.createElement("div");
      header.className = "article-header";
      header.innerHTML =
        '<span class="article-badge">SKU-' +
        (p.id || "") +
        "</span>" +
        '<span class="article-badge green">Stock</span>';

      var imgWrap = document.createElement("div");
      imgWrap.className = "article-image";
      var img = document.createElement("img");
      img.src = p.image || "";
      img.alt = p.title || "";
      imgWrap.appendChild(img);

      var desc = document.createElement("div");
      desc.className = "article-description";
      desc.innerHTML =
        '<span class="article-description-badge main-badge">' +
        (p.category || "") +
        "</span>" +
        ('<h2 class="article-title">' + (p.title || "") + "</h2>") +
        '<div class="article-footer"><p class="article-price">' +
        formatPrice(p.price) +
        ' <span class="price-device">€</span></p>' +
        '<button type="button" class="article-btn" data-id="' +
        p.id +
        '">Ajouter</button></div>';

      article.appendChild(header);
      article.appendChild(imgWrap);
      article.appendChild(desc);

      frag.appendChild(article);
    });

    container.appendChild(frag);

    // Attacher gestionnaires ajouter au panier
    container.querySelectorAll(".article-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var id = btn.getAttribute("data-id");
        var product = window.State.state.products.find(function (p) {
          return String(p.id) === String(id);
        });
        if (product) window.Cart.add(product);
      });
    });
  }

  return { render: render };
})();
