import { useState } from 'react';
import { generateRecipes, analyzeImage } from '../services/api';
import './IngredientInput.css';

function IngredientInput({ onRecipesGenerated, onError, onLoadingChange }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [imageAnalyzing, setImageAnalyzing] = useState(false);

  const handleAddIngredient = () => {
    const trimmed = currentInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageAnalyzing(true);
    try {
      const detectedIngredients = await analyzeImage(file);
      const uniqueIngredients = [...new Set([...ingredients, ...detectedIngredients])];
      setIngredients(uniqueIngredients);
    } catch (error) {
      onError('Failed to analyze image. Please try again or enter ingredients manually.');
    } finally {
      setImageAnalyzing(false);
      e.target.value = '';
    }
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      onError('Please add at least one ingredient');
      return;
    }

    onLoadingChange(true);
    try {
      const data = await generateRecipes(ingredients);
      onRecipesGenerated(data.recipes);
    } catch (error) {
      onError('Failed to generate recipes. Please try again.');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="ingredient-input-container">
      <div className="input-section">
        <h2>What ingredients do you have?</h2>

        <div className="input-group">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an ingredient (e.g., chicken, tomatoes)"
            className="ingredient-text-input"
          />
          <button onClick={handleAddIngredient} className="add-button">
            Add
          </button>
        </div>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <div className="image-upload-section">
          <label htmlFor="image-upload" className="upload-label">
            📸 Upload a photo of your ingredients
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-input"
          />
          {imageAnalyzing && <p className="analyzing-text">Analyzing image...</p>}
        </div>
      </div>

      {ingredients.length > 0 && (
        <div className="ingredients-list">
          <h3>Your ingredients:</h3>
          <div className="ingredient-tags">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="remove-tag-button"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {ingredients.length > 0 && (
        <button onClick={handleGenerateRecipes} className="generate-button">
          Generate Recipes 🍽️
        </button>
      )}
    </div>
  );
}

export default IngredientInput;
