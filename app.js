// ===============================
// Recipe Data Array
// ===============================

const recipes = [
  {
    id: 1,
    title: "Creamy Alfredo Pasta",
    time: 25,
    difficulty: "easy",
    description: "A rich and creamy Italian pasta made with parmesan and butter.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    time: 20,
    difficulty: "easy",
    description: "Quick and healthy mixed vegetables tossed in soy garlic sauce.",
    category: "vegetarian"
  },
  {
    id: 3,
    title: "Chicken Biryani",
    time: 90,
    difficulty: "hard",
    description: "Aromatic basmati rice layered with spicy marinated chicken.",
    category: "curry"
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    time: 45,
    difficulty: "medium",
    description: "Soft paneer cubes cooked in a creamy tomato gravy.",
    category: "curry"
  },
  {
    id: 5,
    title: "Caesar Salad",
    time: 15,
    difficulty: "easy",
    description: "Crisp romaine lettuce with creamy dressing and croutons.",
    category: "salad"
  },
  {
    id: 6,
    title: "Beef Wellington",
    time: 120,
    difficulty: "hard",
    description: "Tender beef wrapped in puff pastry and baked to perfection.",
    category: "main-course"
  },
  {
    id: 7,
    title: "Thai Green Curry",
    time: 60,
    difficulty: "medium",
    description: "Spicy and flavorful curry made with coconut milk and herbs.",
    category: "curry"
  },
  {
    id: 8,
    title: "Chocolate Lava Cake",
    time: 35,
    difficulty: "medium",
    description: "Warm chocolate cake with a gooey molten center.",
    category: "dessert"
  }
];

// ===============================
// DOM Selection
// ===============================

const recipeContainer = document.querySelector("#recipe-container");

// ===============================
// Create Recipe Card Function
// ===============================

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// ===============================
// Render Recipes Function
// ===============================

const renderRecipes = (recipeArray) => {
  const recipeHTML = recipeArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// ===============================
// Initialize App
// ===============================

renderRecipes(recipes);
