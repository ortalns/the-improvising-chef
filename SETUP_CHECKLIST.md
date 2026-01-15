# ✅ Setup & Testing Checklist

## Pre-Demo Setup Checklist

### 1. Environment Setup
- [ ] Node.js installed (v20.14.0 or higher)
- [ ] npm available and working
- [ ] OpenAI API key obtained from https://platform.openai.com/api-keys
- [ ] OpenAI account has available credits

### 2. Backend Setup
- [ ] Navigate to backend folder: `cd backend`
- [ ] Dependencies installed: `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Added OpenAI API key to `.env` file:
  ```
  OPENAI_API_KEY=sk-your-key-here
  PORT=3001
  ```
- [ ] Server starts successfully: `npm run dev`
- [ ] See message: "Server is running on port 3001"
- [ ] Health check works: http://localhost:3001/health

### 3. Frontend Setup
- [ ] Open new terminal
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Dependencies installed: `npm install`
- [ ] Dev server starts: `npm run dev`
- [ ] See message with localhost URL (usually :5173)
- [ ] App opens in browser successfully

### 4. Basic Functionality Test
- [ ] App loads without errors
- [ ] Can type in ingredient input field
- [ ] Can click "Add" button
- [ ] Ingredients appear as tags
- [ ] Can remove ingredients (click X)
- [ ] "Generate Recipes" button appears when ingredients added
- [ ] Loading spinner shows during generation
- [ ] 3 recipe cards appear after generation
- [ ] Recipe images load successfully
- [ ] All recipe details visible (name, description, ingredients, instructions)

### 5. Image Upload Test (Optional)
- [ ] Can click image upload button
- [ ] Can select image file
- [ ] Loading message appears during analysis
- [ ] Ingredients detected and added to list
- [ ] Can generate recipes with detected ingredients

### 6. Error Handling Test
- [ ] Error shown when clicking "Generate" with no ingredients
- [ ] Graceful error if API key is invalid
- [ ] App doesn't crash on network errors

### 7. Responsive Design Test
- [ ] Resize browser window
- [ ] Mobile view (< 768px) looks good
- [ ] Tablet view (768-1024px) looks good
- [ ] Desktop view (> 1024px) looks good

---

## Testing Scenarios

### Scenario 1: Simple Italian Recipe
**Ingredients to add:**
1. pasta
2. tomatoes
3. garlic
4. basil
5. olive oil

**Expected Result:**
- 3 Italian-style recipes
- Recipes use most/all of these ingredients
- Images show pasta dishes
- Instructions are clear and complete

### Scenario 2: Breakfast Ingredients
**Ingredients to add:**
1. eggs
2. bread
3. cheese
4. tomatoes
5. spinach

**Expected Result:**
- 3 breakfast/brunch recipes
- Diverse recipes (not all the same)
- Images show breakfast foods
- Reasonable prep/cook times

### Scenario 3: Minimal Ingredients
**Ingredients to add:**
1. chicken
2. rice
3. onions

**Expected Result:**
- 3 complete recipes even with few ingredients
- Recipes may suggest additional common ingredients
- Still provides complete instructions
- Images match the recipes

---

## Common Issues & Solutions

### Issue: Backend won't start
**Symptoms:** Error when running `npm run dev` in backend
**Solutions:**
- [ ] Check if port 3001 is already in use
- [ ] Verify `.env` file exists and has valid API key
- [ ] Run `npm install` again
- [ ] Check Node.js version is 20.14.0+

### Issue: Frontend won't start
**Symptoms:** Error when running `npm run dev` in frontend
**Solutions:**
- [ ] Check if port 5173 is already in use
- [ ] Run `npm install` again
- [ ] Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Issue: "Failed to generate recipes"
**Symptoms:** Error message after clicking Generate Recipes
**Solutions:**
- [ ] Verify backend is running on port 3001
- [ ] Check OpenAI API key is valid
- [ ] Verify you have API credits remaining
- [ ] Check internet connection
- [ ] Look at backend terminal for error messages

### Issue: CORS errors in browser console
**Symptoms:** Network errors mentioning CORS
**Solutions:**
- [ ] Verify backend is running
- [ ] Check frontend is accessing localhost:3001
- [ ] Restart both frontend and backend

### Issue: Images not generating
**Symptoms:** Recipes appear but no images
**Solutions:**
- [ ] This is expected behavior if DALL-E fails
- [ ] Check backend logs for specific errors
- [ ] Verify API credits for DALL-E
- [ ] Images cost more than text generation

### Issue: Slow response time
**Symptoms:** Takes > 30 seconds to generate recipes
**Solutions:**
- [ ] This is normal! AI generation takes 15-25 seconds
- [ ] Check internet connection speed
- [ ] Verify OpenAI API status: https://status.openai.com

---

## Performance Benchmarks

### Expected Timings:
- Recipe generation (GPT-4): 3-5 seconds
- Image analysis (Vision): 2-3 seconds
- Image generation (DALL-E x3): 10-15 seconds
- **Total wait time: 15-25 seconds**

### API Costs (per request):
- GPT-4 recipe generation: ~$0.02-0.05
- GPT-4 Vision (optional): ~$0.01
- DALL-E 3 images (x3): ~$0.12-0.15
- **Total per generation: ~$0.15-0.20**

---

## Browser Compatibility

### Tested & Working:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers:
- [ ] iOS Safari
- [ ] Android Chrome

---

## Demo Preparation Checklist

### 1 Hour Before Demo:
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Test with one ingredient set
- [ ] Verify images are generating
- [ ] Clear browser cache
- [ ] Prepare sample ingredient lists

### 30 Minutes Before Demo:
- [ ] Take backup screenshots of successful generation
- [ ] Record backup video of full workflow
- [ ] Print/have documentation ready
- [ ] Test screen sharing if virtual demo
- [ ] Close unnecessary browser tabs

### 5 Minutes Before Demo:
- [ ] Restart both servers (fresh start)
- [ ] Open app in browser
- [ ] Have ingredient list ready to type
- [ ] Have image ready to upload (if demoing)
- [ ] Deep breath! You got this!

---

## Demo Script Quick Reference

1. **Show landing page** (5 seconds)
   - "Here's The Improvising Chef"

2. **Add ingredients** (15 seconds)
   - Type and add 4-5 ingredients
   - Show tag functionality

3. **Generate recipes** (20 seconds)
   - Click button
   - Explain what's happening while loading
   - Show the 3 results

4. **Explain features** (30 seconds)
   - Point out AI-generated images
   - Show complete instructions
   - Demonstrate responsive design

5. **Wrap up** (10 seconds)
   - Mention technologies used
   - Thank audience

**Total demo time: ~1.5 minutes**

---

## Emergency Backup Plan

### If API is down or slow:
- [ ] Have screenshots ready to show
- [ ] Have pre-recorded video
- [ ] Have sample JSON response to show

### If demo crashes:
- [ ] Have backup screenshots
- [ ] Explain the architecture instead
- [ ] Show the code and documentation

### If you forget something:
- [ ] README.md has all info
- [ ] DEVELOPMENT_PROCESS.md has details
- [ ] PRESENTATION_GUIDE.md has script

---

## Post-Demo Checklist

### Clean Up:
- [ ] Stop backend server (Ctrl+C)
- [ ] Stop frontend server (Ctrl+C)
- [ ] Close browser tabs
- [ ] Save any logs or output

### Documentation:
- [ ] Note any issues encountered
- [ ] Update documentation if needed
- [ ] Save screenshots from demo

### Follow-up:
- [ ] Answer any questions
- [ ] Share code if requested
- [ ] Thank your audience!

---

## Final Verification (Right Before Demo)

Run through this quick checklist:

```bash
# Backend check
cd backend
npm run dev
# Should see: "Server is running on port 3001"

# Frontend check (new terminal)
cd frontend
npm run dev
# Should see: Local: http://localhost:5173

# Browser check
# Visit: http://localhost:5173
# Should see: The Improvising Chef app

# Quick test
# 1. Add "chicken"
# 2. Add "rice"
# 3. Click "Generate Recipes"
# 4. Wait ~20 seconds
# 5. See 3 recipes with images
```

If all of the above works: **YOU'RE READY! 🚀**

---

**Remember:**
- The app works great!
- You know your project well!
- 15-25 second wait time is normal!
- Have fun and be confident!

**Good luck! 🎉**
