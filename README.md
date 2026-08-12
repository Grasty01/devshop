# DevShop

Vitrine e-commerce en Single Page Application (SPA) construite en JavaScript. L'application récupère des produits depuis une API publique, les affiche dynamiquement, permet de les filtrer et gère un panier d'achat interactif — le tout sur une seule page.

Projet réalisé dans le cadre du module JS S10 — Akieni Academy.

## Aperçu

![Aperçu de DevShop](./screenshot.png)

## Fonctionnalités

### Fondamentaux

- Récupération des produits via `fetch()` et `async/await`
- Génération dynamique des cartes produits en JavaScript (image, titre, prix, catégorie)
- Indicateur de chargement pendant l'appel réseau et message d'erreur en cas d'échec (`try/catch`)
- Interface responsive avec CSS Grid (grille de produits) et Flexbox (navigation, panier)

### Interactivité

- Filtrage des produits par catégorie (`Array.filter()`)
- Barre de recherche en temps réel (événement `input` + `String.includes()`)
- Ajout au panier avec compteur mis à jour dans la barre de navigation

### Bonus

- Tiroir panier (off-canvas) avec résumé des articles, modification des quantités et suppression
- Persistance du panier via `localStorage`

## Stack technique

- HTML5 / CSS3 (Grid, Flexbox)
- JavaScript (ES6+, vanilla, aucun framework)
- [FakeStore API](https://fakestoreapi.com/) — API publique gratuite, sans clé d'authentification

## Installation

Aucune dépendance ni build requis.

```bash
git clone https://github.com/Grace01/devshop.git
cd devshop
```

Ouvrir `index.html` dans le navigateur, ou lancer un serveur local :

```bash
npx serve .
```

## Structure du projet

```
devshop/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── api.js
│   └── cart.js
└── README.md
```

## Auteur

Grâsty — Akieni Academy
