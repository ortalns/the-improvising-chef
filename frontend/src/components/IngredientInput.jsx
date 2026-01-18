import { useState } from 'react';
import { generateRecipes, analyzeImage } from '../services/api';
import './IngredientInput.css';

function IngredientInput({ onRecipesGenerated, onError, onLoadingChange }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [imageAnalyzing, setImageAnalyzing] = useState(false);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
  });
  const [difficultyLevel, setDifficultyLevel] = useState('any');
  const [cookingTime, setCookingTime] = useState('any');
  const [isListening, setIsListening] = useState(false);

  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSupported = !!SpeechRecognition;

  const handleVoiceInput = () => {
    if (!speechSupported) {
      onError('Voice input is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();

      // Parse ingredients from speech (handles "chicken, rice, and tomatoes" or "add chicken rice tomatoes")
      const cleanedText = transcript
        .replace(/^(add|i have|i've got|there is|there are)\s*/i, '')
        .replace(/\s+and\s+/g, ', ')
        .replace(/\s+/g, ', ');

      const spokenIngredients = cleanedText
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      if (spokenIngredients.length > 0) {
        const uniqueIngredients = [...new Set([...ingredients, ...spokenIngredients])];
        setIngredients(uniqueIngredients);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        onError('No speech detected. Please try again.');
      } else {
        onError('Voice recognition error. Please try again.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleDietaryChange = (filter) => {
    setDietaryFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

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
      const data = await generateRecipes(ingredients, dietaryFilters, difficultyLevel, cookingTime);
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

        <div className="alternative-inputs">
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

          {speechSupported && (
            <div className="voice-input-section">
              <button
                onClick={handleVoiceInput}
                className={`voice-button ${isListening ? 'listening' : ''}`}
                disabled={isListening}
              >
                {isListening ? '🎤 Listening...' : '🎙️ Voice Input'}
              </button>
              <p className="voice-hint">Say: "chicken, rice, and tomatoes"</p>
            </div>
          )}
        </div>

        <div className="dietary-filters-section">
          <h3>Dietary Preferences (optional)</h3>
          <div className="dietary-checkboxes">
            <label className="dietary-checkbox">
              <input
                type="checkbox"
                checked={dietaryFilters.vegetarian}
                onChange={() => handleDietaryChange('vegetarian')}
              />
              <span>🥬 Vegetarian</span>
            </label>
            <label className="dietary-checkbox">
              <input
                type="checkbox"
                checked={dietaryFilters.vegan}
                onChange={() => handleDietaryChange('vegan')}
              />
              <span>🌱 Vegan</span>
            </label>
            <label className="dietary-checkbox">
              <input
                type="checkbox"
                checked={dietaryFilters.glutenFree}
                onChange={() => handleDietaryChange('glutenFree')}
              />
              <span>🌾 Gluten-Free</span>
            </label>
            <label className="dietary-checkbox">
              <input
                type="checkbox"
                checked={dietaryFilters.dairyFree}
                onChange={() => handleDietaryChange('dairyFree')}
              />
              <span>🥛 Dairy-Free</span>
            </label>
          </div>
        </div>

        <div className="difficulty-section">
          <h3>Difficulty Level (optional)</h3>
          <div className="difficulty-options">
            <label className={`difficulty-option ${difficultyLevel === 'any' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="difficulty"
                value="any"
                checked={difficultyLevel === 'any'}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              />
              <span>🍳 Any Level</span>
            </label>
            <label className={`difficulty-option ${difficultyLevel === 'beginner' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="difficulty"
                value="beginner"
                checked={difficultyLevel === 'beginner'}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              />
              <span>👶 Beginner</span>
            </label>
            <label className={`difficulty-option ${difficultyLevel === 'intermediate' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="difficulty"
                value="intermediate"
                checked={difficultyLevel === 'intermediate'}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              />
              <span>👨‍🍳 Intermediate</span>
            </label>
            <label className={`difficulty-option ${difficultyLevel === 'advanced' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="difficulty"
                value="advanced"
                checked={difficultyLevel === 'advanced'}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              />
              <span>⭐ Advanced</span>
            </label>
          </div>
        </div>

        <div className="cooking-time-section">
          <h3>Cooking Time (optional)</h3>
          <div className="cooking-time-options">
            <label className={`cooking-time-option ${cookingTime === 'any' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="cookingTime"
                value="any"
                checked={cookingTime === 'any'}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <span>🕐 Any Time</span>
            </label>
            <label className={`cooking-time-option ${cookingTime === 'quick' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="cookingTime"
                value="quick"
                checked={cookingTime === 'quick'}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <span>⚡ Quick (&lt;30 min)</span>
            </label>
            <label className={`cooking-time-option ${cookingTime === 'medium' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="cookingTime"
                value="medium"
                checked={cookingTime === 'medium'}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <span>⏱️ Medium (30-60 min)</span>
            </label>
            <label className={`cooking-time-option ${cookingTime === 'elaborate' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="cookingTime"
                value="elaborate"
                checked={cookingTime === 'elaborate'}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <span>🍲 Elaborate (60+ min)</span>
            </label>
          </div>
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
