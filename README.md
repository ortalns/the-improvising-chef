# 🍳 The Improvising Chef

An AI-powered web application that transforms your available ingredients into delicious recipes with beautiful dish images.

## 📋 Problem Statement

**The Problem:** You have a few ingredients in the fridge but no idea what to make. You're hungry and don't have the energy to search through countless recipe websites.

**The Solution:** A simple web interface where you enter (or photograph) your available ingredients, and the system generates 3 complete recipes with:
- Detailed preparation instructions
- AI-generated images of the final dishes (using DALL-E 3)
- Cooking times and serving sizes
- Step-by-step instructions

## ✨ Features

- **Text Input**: Manually add ingredients one by one
- **Image Recognition**: Upload a photo of your ingredients and AI will identify them
- **Recipe Generation**: Get 3 diverse, complete recipes using your ingredients
- **Dish Visualization**: See beautiful AI-generated images of what each dish will look like
- **Detailed Instructions**: Step-by-step cooking instructions for each recipe
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend
- **React** (with Vite) - Modern UI framework
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling and animations
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **Multer** - File upload handling
- **OpenAI API** - AI services integration

### AI Services
- **GPT-4** - Recipe generation with structured JSON output
- **GPT-4 Vision** - Ingredient recognition from photos
- **DALL-E 3** - Dish image generation

## 📁 Project Structure

```
the-improvising-chef/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IngredientInput.jsx     # Input interface
│   │   │   ├── IngredientInput.css
│   │   │   ├── RecipeDisplay.jsx        # Recipe cards display
│   │   │   └── RecipeDisplay.css
│   │   ├── services/
│   │   │   └── api.js                   # API client
│   │   ├── App.jsx                      # Main app component
│   │   └── App.css                      # Global styles
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── recipeRoutes.js              # API endpoints
│   ├── services/
│   │   └── openaiService.js             # OpenAI integration
│   ├── server.js                        # Express server
│   ├── .env.example                     # Environment variables template
│   └── package.json
├── docs/
│   └── DEVELOPMENT_PROCESS.md           # Development documentation
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v20.14.0 or higher)
- npm (v10.7.0 or higher)
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 💡 Usage

1. **Open the application** in your browser (usually `http://localhost:5173`)

2. **Add ingredients** using one of two methods:
   - Type ingredient names and click "Add"
   - Upload a photo of your ingredients (AI will detect them)

3. **Click "Generate Recipes"** and wait while the AI:
   - Creates 3 unique recipes using your ingredients
   - Generates beautiful images for each dish

4. **Browse your recipes** with:
   - Dish images
   - Ingredient lists
   - Step-by-step instructions
   - Prep and cook times

## 🎯 Key AI Prompts Used

### Recipe Generation Prompt
```
You are a professional chef. Given the following ingredients: [user ingredients],
create exactly 3 complete, practical recipes. Each recipe should use as many of
the provided ingredients as possible.

Return the response as a JSON array with exactly 3 recipe objects...
```

### Image Generation Prompt
```
A professional, appetizing photo of [recipe name]. The dish should look delicious
and well-plated, shot from a top-down angle on a clean white plate. High-quality
food photography style, natural lighting.
```

### Ingredient Recognition Prompt
```
Identify all food ingredients visible in this image. List them as a simple
comma-separated list. Only include ingredients, not dishes or prepared foods.
```

## 🔄 Development Process

The project was developed using AI assistance (Claude Code) following these iterations:

### Version 1: Initial Setup
- Created React frontend with Vite
- Set up Express backend
- Integrated OpenAI API

### Version 2: Core Features
- Implemented ingredient input (text)
- Added recipe generation with GPT-4
- Created recipe display component

### Version 3: Enhanced Features
- Added image upload capability
- Integrated GPT-4 Vision for ingredient recognition
- Implemented DALL-E 3 for dish images

### Version 4: UI/UX Polish
- Improved responsive design
- Added loading states and error handling
- Enhanced visual design with gradients and animations

For detailed development documentation, see [DEVELOPMENT_PROCESS.md](docs/DEVELOPMENT_PROCESS.md)

## 🎨 UI Highlights

- **Clean, modern interface** with gradient purple background
- **Visual feedback** with loading spinners and error messages
- **Responsive design** that works on all screen sizes
- **Image-first approach** showcasing AI-generated dish photos
- **Intuitive workflow** from ingredients to finished recipes

## 📊 API Endpoints

### POST `/api/recipes/generate`
Generate recipes from ingredients
- **Body**: `{ "ingredients": ["ingredient1", "ingredient2", ...] }`
- **Response**: Array of 3 recipes with images

### POST `/api/recipes/analyze-image`
Analyze uploaded image to detect ingredients
- **Body**: FormData with image file
- **Response**: `{ "ingredients": ["ingredient1", "ingredient2", ...] }`

## 🔐 Security Notes

- API keys are stored in environment variables
- Image uploads are processed in memory (not stored on disk)
- CORS is configured for local development

## 🚀 Future Enhancements

- Save favorite recipes
- Dietary restriction filters (vegan, gluten-free, etc.)
- Calorie and nutrition information
- Share recipes via social media
- Recipe ratings and reviews
- Multi-language support

## 📝 License

This project was created for educational purposes as part of an AI-based software development course.

## 🙏 Acknowledgments

- Built with AI assistance using Claude Code
- Powered by OpenAI's GPT-4 and DALL-E 3
- Created as a demonstration of AI-assisted development

---

**Created by:** [Your Name]
**Date:** December 2025
**AI Tool Used:** Claude Code (Anthropic)
