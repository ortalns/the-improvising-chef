# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed (v20.14.0+)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup in 5 Minutes

### 1. Clone/Download the Project
```bash
cd "The Improvising Chef"
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here
# PORT=3001

# Start the backend server
npm run dev
```

You should see: `Server is running on port 3001`

### 3. Frontend Setup (New Terminal)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see: `Local: http://localhost:5173`

### 4. Open the App
Open your browser to: http://localhost:5173

## Test the App

### Option 1: Text Input
1. Type "chicken" and click Add
2. Type "tomatoes" and click Add
3. Type "rice" and click Add
4. Click "Generate Recipes"
5. Wait 15-20 seconds for AI to create recipes with images

### Option 2: Image Upload
1. Click "Upload a photo of your ingredients"
2. Select a photo of food ingredients
3. Wait for AI to detect ingredients
4. Click "Generate Recipes"

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify your OpenAI API key in `.env`
- Make sure you ran `npm install` in the backend folder

### Frontend won't start
- Check if port 5173 is already in use
- Make sure you ran `npm install` in the frontend folder

### "Failed to generate recipes"
- Verify your OpenAI API key is valid
- Check if you have API credits remaining
- Make sure the backend is running on port 3001

### CORS errors
- Make sure both frontend and backend are running
- Backend should be on port 3001
- Frontend should be on port 5173

## API Costs (OpenAI)

Approximate costs per recipe generation:
- GPT-4 recipe generation: ~$0.02-0.05
- DALL-E 3 images (x3): ~$0.12-0.15
- **Total per request: ~$0.15-0.20**

## Demo Tips

For the best demo experience:
1. Use common ingredients (chicken, beef, pasta, vegetables)
2. Provide 3-5 ingredients for best results
3. Be patient - AI generation takes 15-25 seconds
4. Try both text input and image upload methods
5. Show the mobile responsive design

## Example Ingredient Combinations

**Italian:**
- pasta, tomatoes, garlic, basil, olive oil

**Asian:**
- chicken, soy sauce, ginger, rice, vegetables

**Breakfast:**
- eggs, bread, cheese, tomatoes, spinach

**Dessert:**
- flour, sugar, eggs, butter, chocolate

---

Need help? Check the full [README.md](README.md) or [DEVELOPMENT_PROCESS.md](docs/DEVELOPMENT_PROCESS.md)
