/* Filtrage par catégorie + recherche */
window.Filters = (function () {
  function init() {
    var buttons = document.querySelectorAll(".filter-button .filter-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var text = btn.textContent.trim().toLowerCase();
        var key = mapLabelToKey(text);
        window.State.state.activeFilter = key;
        // mettre à jour la classe active
        buttons.forEach(function (b) {
          b.classList.remove("filter-btn-actif");
        });
        btn.classList.add("filter-btn-actif");
        window.State.applyFilters();
        document.dispatchEvent(new CustomEvent("products:updated"));
      });
    });

    var search = document.getElementById("product-search");
    if (search) {
      search.addEventListener("input", function (e) {
        window.State.state.query = e.target.value;
        window.State.applyFilters();
        document.dispatchEvent(new CustomEvent("products:updated"));
      });
    }
  }

  function mapLabelToKey(label) {
    if (label.indexOf("électron") !== -1 || label.indexOf("electron") !== -1)
      return "electronics";
    if (
      label.indexOf("vêt") !== -1 ||
      label.indexOf("vet") !== -1 ||
      label.indexOf("vêtements") !== -1
    )
      return "men's clothing|women's clothing";
    if (label.indexOf("access") !== -1) return "jewelery";
    if (label.indexOf("tout") !== -1 || label === "") return "all";
    return label;
  }

  return { init: init };
})();
