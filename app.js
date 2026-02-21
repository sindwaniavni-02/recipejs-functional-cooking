(function () {

  // ===============================
  // RECIPE DATA
  // ===============================
  const recipes = [
    { id: 1, title: "Tomato Pasta", time: 25, difficulty: "easy", description: "Fresh tomato pasta.", ingredients: "Tomato, Pasta, Garlic", category: "pasta" },
    { id: 2, title: "Paneer Butter Masala", time: 45, difficulty: "medium", description: "Creamy paneer curry.", ingredients: "Paneer, Cream, Spices", category: "curry" },
    { id: 3, title: "Chocolate Lava Cake", time: 35, difficulty: "hard", description: "Molten chocolate cake.", ingredients: "Chocolate, Flour, Butter", category: "dessert" },
    { id: 4, title: "Caesar Salad", time: 20, difficulty: "easy", description: "Crisp healthy salad.", ingredients: "Lettuce, Dressing, Croutons", category: "salad" },
    { id: 5, title: "Chicken Biryani", time: 90, difficulty: "hard", description: "Aromatic rice dish.", ingredients: "Chicken, Rice, Spices", category: "rice" },
    { id: 6, title: "Veg Stir Fry", time: 30, difficulty: "medium", description: "Quick vegetable stir fry.", ingredients: "Veggies, Soy Sauce", category: "vegetarian" },
    { id: 7, title: "Garlic Shrimp", time: 18, difficulty: "easy", description: "Butter garlic shrimp.", ingredients: "Shrimp, Garlic, Butter", category: "seafood" },
    { id: 8, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Classic baked beef.", ingredients: "Beef, Pastry, Herbs", category: "main" }
  ];

  // ===============================
  // DOM ELEMENTS
  // ===============================
  const recipeContainer = document.querySelector("#recipe-container");
  const searchInput = document.querySelector("#search-input");
  const favoritesToggle = document.querySelector("#favorites-toggle");
  const recipeCounter = document.querySelector("#recipe-counter");

  let currentRecipes = [...recipes];
  let showFavoritesOnly = false;
  let favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

  // ===============================
  // SAVE FAVORITES
  // ===============================
  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
  };

  // ===============================
  // CREATE CARD
  // ===============================
  const createRecipeCard = (recipe) => {

    const isFavorite = favoriteRecipes.includes(recipe.id);

    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <div style="display:flex; justify-content:space-between;">
          <h3>${recipe.title}</h3>
          <span class="favorite-btn ${isFavorite ? "favorite-active" : ""}" data-favorite="${recipe.id}">
            ❤️
          </span>
        </div>

        <div class="recipe-meta">
          <span>⏱️ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">
            ${recipe.difficulty}
          </span>
        </div>

        <p>${recipe.description}</p>

        <div class="expand-btn" data-expand="${recipe.id}">
          View Details
        </div>

        <div class="recipe-details" id="details-${recipe.id}">
          <strong>Ingredients:</strong> ${recipe.ingredients}
        </div>
      </div>
    `;
  };

  // ===============================
  // RENDER
  // ===============================
  const renderRecipes = (recipeArray) => {
    recipeContainer.innerHTML = recipeArray
      .map(recipe => createRecipeCard(recipe))
      .join("");

    updateCounter(recipeArray.length);
  };

  // ===============================
  // COUNTER
  // ===============================
  const updateCounter = (visibleCount) => {
    recipeCounter.textContent =
      `Showing ${visibleCount} of ${recipes.length} recipes`;
  };

  // ===============================
  // DEBOUNCE
  // ===============================
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    currentRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.ingredients.toLowerCase().includes(query)
    );

    applyFilters();
  };

  const debouncedSearch = debounce(handleSearch, 300);

  // ===============================
  // APPLY FILTERS
  // ===============================
  const applyFilters = () => {
    let filtered = [...currentRecipes];

    if (showFavoritesOnly) {
      filtered = filtered.filter(recipe =>
        favoriteRecipes.includes(recipe.id)
      );
    }

    renderRecipes(filtered);
  };

  // ===============================
  // EVENT LISTENERS
  // ===============================
  searchInput.addEventListener("input", debouncedSearch);

  favoritesToggle.addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;
    applyFilters();
  });

  recipeContainer.addEventListener("click", (event) => {

    if (event.target.dataset.favorite) {
      const id = Number(event.target.dataset.favorite);

      if (favoriteRecipes.includes(id)) {
        favoriteRecipes = favoriteRecipes.filter(favId => favId !== id);
      } else {
        favoriteRecipes.push(id);
      }

      saveFavorites();
      applyFilters();
    }

    if (event.target.dataset.expand) {
      const id = event.target.dataset.expand;
      const details = document.getElementById(`details-${id}`);
      details.classList.toggle("show");
    }

  });

  // ===============================
  // INIT
  // ===============================
  renderRecipes(recipes);

})();
