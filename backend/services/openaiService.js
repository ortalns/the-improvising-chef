const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipes(ingredients, dietaryFilters = {}, difficultyLevel = 'any', cookingTime = 'any') {
  // Build dietary restrictions string
  const restrictions = [];
  if (dietaryFilters.vegetarian) restrictions.push('vegetarian (no meat or fish)');
  if (dietaryFilters.vegan) restrictions.push('vegan (no animal products at all)');
  if (dietaryFilters.glutenFree) restrictions.push('gluten-free (no wheat, barley, rye)');
  if (dietaryFilters.dairyFree) restrictions.push('dairy-free (no milk, cheese, butter, cream)');

  const dietaryText = restrictions.length > 0
    ? `\n\nIMPORTANT DIETARY RESTRICTIONS: All recipes MUST be ${restrictions.join(' AND ')}. Do not include any ingredients that violate these restrictions.`
    : '';

  // Build difficulty level text
  let difficultyText = '';
  if (difficultyLevel === 'beginner') {
    difficultyText = '\n\nDIFFICULTY LEVEL: Beginner-friendly recipes only. Use simple techniques, minimal steps, common equipment, and short cooking times. Avoid complex methods like sous vide, flambéing, or advanced knife skills.';
  } else if (difficultyLevel === 'intermediate') {
    difficultyText = '\n\nDIFFICULTY LEVEL: Intermediate recipes. Can include moderate techniques, multiple components, and some timing coordination. Suitable for home cooks with some experience.';
  } else if (difficultyLevel === 'advanced') {
    difficultyText = '\n\nDIFFICULTY LEVEL: Advanced/challenging recipes. Can include complex techniques, multiple components, precise timing, and professional methods. For experienced cooks looking for a challenge.';
  }

  // Build cooking time text
  let cookingTimeText = '';
  if (cookingTime === 'quick') {
    cookingTimeText = '\n\nTIME CONSTRAINT: Quick recipes only! Total time (prep + cooking) must be under 30 minutes. Focus on fast, simple dishes.';
  } else if (cookingTime === 'medium') {
    cookingTimeText = '\n\nTIME CONSTRAINT: Medium-time recipes. Total time (prep + cooking) should be between 30-60 minutes.';
  } else if (cookingTime === 'elaborate') {
    cookingTimeText = '\n\nTIME CONSTRAINT: Elaborate recipes welcome. Total time (prep + cooking) can be 60 minutes or more. Feel free to suggest dishes that require slow cooking, marinating, or multiple stages.';
  }

  const prompt = `You are a professional chef. Given the following ingredients: ${ingredients.join(', ')},
  create exactly 3 complete, practical recipes. Each recipe should use as many of the provided ingredients as possible.${dietaryText}${difficultyText}${cookingTimeText}

  Return the response as a JSON array with exactly 3 recipe objects. Each object should have this structure:
  {
    "name": "Recipe name",
    "description": "Brief description (1-2 sentences)",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2", "step 3"],
    "prepTime": "preparation time in minutes",
    "cookTime": "cooking time in minutes",
    "servings": number
  }

  Make sure the recipes are diverse (e.g., one main dish, one side/salad, one dessert/snack if possible).
  Return ONLY the JSON array, no additional text.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful chef assistant that generates recipes in JSON format."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });

  let response = completion.choices[0].message.content;

  // Remove markdown code blocks if present
  response = response.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

  const recipes = JSON.parse(response);
  return recipes;
}

async function generateDishImage(recipeName) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `A professional, appetizing photo of ${recipeName}. The dish should look delicious and well-plated, shot from a top-down angle on a clean white plate. High-quality food photography style, natural lighting.`,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });

  return response.data[0].url;
}

async function analyzeImageForIngredients(imageBuffer) {
  const base64Image = imageBuffer.toString('base64');

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify all food ingredients visible in this image. List them as a simple comma-separated list. Only include ingredients, not dishes or prepared foods."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 300,
  });

  const ingredientsText = response.choices[0].message.content;
  const ingredients = ingredientsText
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return ingredients;
}

module.exports = {
  generateRecipes,
  generateDishImage,
  analyzeImageForIngredients,
};
