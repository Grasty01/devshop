document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector(".hamburger");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", function () {
    var opened = nav.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", opened ? "true" : "false");
  });

  // Fermer le menu au clic en dehors
  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("nav-open")) return;
    if (e.target === btn || nav.contains(e.target)) return;
    nav.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  });
});
