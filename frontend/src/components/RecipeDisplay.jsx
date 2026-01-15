import './RecipeDisplay.css';

function RecipeDisplay({ recipes }) {
  return (
    <div className="recipe-display-container">
      <h2 className="recipes-title">Your Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            {recipe.imageUrl && (
              <div className="recipe-image-container">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="recipe-image"
                />
              </div>
            )}

            <div className="recipe-content">
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>

              <div className="recipe-meta">
                <span className="meta-item">⏱️ Prep: {recipe.prepTime} min</span>
                <span className="meta-item">🔥 Cook: {recipe.cookTime} min</span>
                <span className="meta-item">🍽️ Servings: {recipe.servings}</span>
              </div>

              <div className="recipe-section">
                <h4>Ingredients:</h4>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-section">
                <h4>Instructions:</h4>
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeDisplay;
