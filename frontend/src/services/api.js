import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export async function generateRecipes(ingredients, dietaryFilters = {}, difficultyLevel = 'any', cookingTime = 'any') {
  const response = await axios.post(`${API_BASE_URL}/recipes/generate`, {
    ingredients,
    dietaryFilters,
    difficultyLevel,
    cookingTime,
  });
  return response.data;
}

export async function analyzeImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_BASE_URL}/recipes/analyze-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.ingredients;
}
