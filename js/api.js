/*
 Utilise fetch native pour récupérer la liste des produits
*/

async function fetchProducts() {
  var url = "https://fakestoreapi.com/products";
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erreur réseau: " + res.status);
    }
    var data = await res.json();
    return data;
  } catch (err) {
    // remonter l'erreur
    throw err;
  }
}

window.API = { fetchProducts: fetchProducts };
