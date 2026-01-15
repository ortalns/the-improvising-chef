const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateRecipes(ingredients) {
  const prompt = `You are a professional chef. Given the following ingredients: ${ingredients.join(', ')},
  create exactly 3 complete, practical recipes. Each recipe should use as many of the provided ingredients as possible.

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
