const express = require('express');
const multer = require('multer');
const { generateRecipes, generateDishImage, analyzeImageForIngredients } = require('../services/openaiService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/generate', async (req, res) => {
  try {
    const { ingredients, dietaryFilters, difficultyLevel, cookingTime } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one ingredient' });
    }

    const recipes = await generateRecipes(ingredients, dietaryFilters || {}, difficultyLevel || 'any', cookingTime || 'any');

    // Skip image generation due to billing limits
    // Add placeholder or no images
    const recipesWithImages = recipes.map(recipe => ({
      ...recipe,
      imageUrl: null // Images disabled - would cost ~$0.12 per generation
    }));

    res.json({ recipes: recipesWithImages });
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({
      error: 'Failed to generate recipes',
      details: error.message
    });
  }
});

router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const ingredients = await analyzeImageForIngredients(req.file.buffer);

    res.json({ ingredients });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      error: 'Failed to analyze image',
      details: error.message
    });
  }
});

module.exports = router;
