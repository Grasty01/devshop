/**
 * Logique panier (ajout, quantité, total, localStorage) :
 * contient toute la logique métier du panier.
 */

window.Cart = (function () {
  var getCart = function () {
    return window.State.state.cart;
  };

  function findIndex(id) {
    return getCart().findIndex(function (it) {
      return String(it.id) === String(id);
    });
  }

  function add(product) {
    var idx = findIndex(product.id);
    if (idx === -1) {
      getCart().push({ id: product.id, product: product, qty: 1 });
    } else {
      getCart()[idx].qty += 1;
    }
    window.State.saveCart();
    triggerUpdate();
  }

  function remove(id) {
    var idx = findIndex(id);
    if (idx > -1) {
      getCart().splice(idx, 1);
    }
    window.State.saveCart();
    triggerUpdate();
  }

  function changeQty(id, qty) {
    var idx = findIndex(id);
    if (idx > -1) {
      getCart()[idx].qty = Math.max(1, parseInt(qty, 10) || 1);
    }
    window.State.saveCart();
    triggerUpdate();
  }

  function clear() {
    window.State.state.cart = [];
    window.State.saveCart();
    triggerUpdate();
  }

  function total() {
    return getCart().reduce(function (acc, it) {
      return acc + it.qty * (it.product.price || 0);
    }, 0);
  }

  function count() {
    return getCart().reduce(function (acc, it) {
      return acc + it.qty;
    }, 0);
  }

  function triggerUpdate() {
    var ev = new CustomEvent("cart:updated", { detail: { cart: getCart() } });
    document.dispatchEvent(ev);
  }

  return {
    add: add,
    remove: remove,
    changeQty: changeQty,
    clear: clear,
    total: total,
    count: count,
  };
})();
