/**
 * Etat de l'app (produits, panier, filtres actifs) :

 */
window.State = (function () {
  var STORAGE_KEY = "devshop_cart";

  var state = {
    products: [],
    filtered: [],
    cart: [],
    loading: false,
    error: null,
    activeFilter: "all",
    query: "",
  };

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      state.cart = raw ? JSON.parse(raw) : [];
    } catch (e) {
      state.cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch (e) {}
  }

  function setProducts(list) {
    state.products = list || [];
    applyFilters();
  }

  function applyFilters() {
    var out = state.products.slice();
    if (state.activeFilter && state.activeFilter !== "all") {
      var key = state.activeFilter;
      var keys =
        typeof key === "string" && key.indexOf("|") !== -1
          ? key.split("|")
          : [key];
      keys = keys.map(function (k) {
        return (k || "").toLowerCase();
      });
      out = out.filter(function (p) {
        var cat = (p.category || "").toLowerCase();
        return keys.some(function (k) {
          return k === "all" || k === "" || cat.indexOf(k) !== -1;
        });
      });
    }
    if (state.query && state.query.length) {
      var q = state.query.toLowerCase();
      out = out.filter(function (p) {
        return (
          p.title.toLowerCase().indexOf(q) !== -1 ||
          (p.category || "").toLowerCase().indexOf(q) !== -1
        );
      });
    }
    state.filtered = out;
  }

  loadCart();

  return {
    state: state,
    setProducts: setProducts,
    applyFilters: applyFilters,
    saveCart: saveCart,
  };
})();
