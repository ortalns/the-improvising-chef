import { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecipesGenerated = (generatedRecipes) => {
    setRecipes(generatedRecipes);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setRecipes([]);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🍳 The Improvising Chef</h1>
        <p className="app-subtitle">
          Transform your ingredients into delicious recipes
        </p>
      </header>

      <main className="app-main">
        <IngredientInput
          onRecipesGenerated={handleRecipesGenerated}
          onError={handleError}
          onLoadingChange={handleLoadingChange}
        />

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Creating amazing recipes for you...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        )}

        {recipes.length > 0 && !loading && (
          <RecipeDisplay recipes={recipes} />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by OpenAI GPT-4 & DALL-E 3</p>
      </footer>
    </div>
  );
}

export default App;
