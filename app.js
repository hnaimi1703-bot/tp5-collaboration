const plats = [
    {
        id: 1,
        nom: "Pizza Margherita",
        categorie: "Pizza",
        prix: 45,
        description: "Sauce tomate, mozzarella et basilic frais.",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        nom: "Burger Cheese",
        categorie: "Burger",
        prix: 40,
        description: "Steak haché, cheddar et sauce maison.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        nom: "Tacos Poulet",
        categorie: "Tacos",
        prix: 35,
        description: "Poulet mariné et sauce fromagère.",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        nom: "Pâtes Bolognaise",
        categorie: "Pâtes",
        prix: 50,
        description: "Pâtes, sauce tomate et viande.",
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        nom: "Salade César",
        categorie: "Salade",
        prix: 30,
        description: "Salade fraîche, poulet et parmesan.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        nom: "Sushi",
        categorie: "Sushi",
        prix: 60,
        description: "Riz et ingrédients frais.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        nom: "Tajine Marocain",
        categorie: "Marocain",
        prix: 55,
        description: "Poulet, olives, citron confit et épices.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        nom: "Gâteau au chocolat",
        categorie: "Dessert",
        prix: 25,
        description: "Un dessert gourmand au chocolat.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        nom: "Poulet rôti",
        categorie: "Poulet",
        prix: 65,
        description: "Poulet rôti aux épices et herbes.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        nom: "Jus d'orange",
        categorie: "Boisson",
        prix: 15,
        description: "Jus d'orange frais et naturel.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80"
    }
];

const menu = document.getElementById("menuPlats");
const searchInput = document.getElementById("searchInput");

// Ajouts de Hiba
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");

function afficherPlats(liste) {
    menu.innerHTML = "";

    if (liste.length === 0) {
        menu.innerHTML = "<p>Aucun plat trouvé.</p>";
        return;
    }

    liste.forEach(function (plat) {
        const carte = document.createElement("article");
        carte.className = "plat-card";

        carte.innerHTML = `
            <div class="plat-image">
                <img src="${plat.image}" alt="${plat.nom}" loading="lazy">
            </div>

            <div class="plat-info">
                <span class="badge">${plat.categorie}</span>
                <h3>${plat.nom}</h3>
                <p class="description">${plat.description}</p>

                <div class="plat-bottom">
                    <span class="prix">${plat.prix} DH</span>
                    <button type="button" class="ajouter-btn">
                        Ajouter +
                    </button>
                </div>
            </div>
        `;

        carte.querySelector(".ajouter-btn").addEventListener("click", function () {
            alert(plat.nom + " ajouté à votre sélection !");
        });

        const image = carte.querySelector("img");

        image.addEventListener("error", function () {
            image.style.display = "none";
            image.parentElement.textContent = plat.nom;
        });

        menu.appendChild(carte);
    });
}

// Recherche, filtrage et tri
function rechercherPlats() {
    const recherche = searchInput.value.toLowerCase().trim();
    const categorie = categoryFilter.value;
    const tri = sortPrice.value;

    let resultats = plats.filter(function (plat) {
        const correspondRecherche =
            plat.nom.toLowerCase().includes(recherche) ||
            plat.categorie.toLowerCase().includes(recherche);

        const correspondCategorie =
            categorie === "all" || plat.categorie === categorie;

        return correspondRecherche && correspondCategorie;
    });

    if (tri === "asc") {
        resultats.sort(function (a, b) {
            return a.prix - b.prix;
        });
    } else if (tri === "desc") {
        resultats.sort(function (a, b) {
            return b.prix - a.prix;
        });
    }

    afficherPlats(resultats);
}

searchInput.addEventListener("input", rechercherPlats);
categoryFilter.addEventListener("change", rechercherPlats);
sortPrice.addEventListener("change", rechercherPlats);

afficherPlats(plats);
