# Getting Started Guide

## First Time Setup (5 minutes)

### Option 1: Docker Compose (Easiest) ✨

```bash
# 1. Clone/cd into project
cd DSAProject

# 2. Copy environment template
cp backend/.env.example backend/.env

# 3. Start everything
docker-compose up
```

**That's it!** Everything will be running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Option 2: Manual Setup (10-15 minutes)

#### Step 1: MongoDB
```bash
# Option A: Local installation
# Follow: https://docs.mongodb.com/manual/installation/
mongod

# Option B: Docker
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:6
```

#### Step 2: Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (use defaults for local dev)
npm run dev
```

#### Step 3: Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

#### Step 4: Open Browser
Navigate to `http://localhost:3000`

## Testing It Out

### Try Bubble Sort
1. Go to **Visualizer** page
2. Keep default algorithm: "Bubble Sort"
3. Keep default array: `64,34,25,12,22,11,90`
4. Click **Run Simulation**
5. Use controls to step through visualization
6. Click **Get AI Explanation** to learn about it

### Try Binary Search
1. Change algorithm to "Binary Search"
2. Change array to: `1,3,5,7,9,11,13,15`
3. Run and see how it halves search space

### Sign Up / Create Account
1. Click **Sign Up** in navbar
2. Create an account with any email/password
3. Your sessions will be saved to database

## Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh  # Should connect successfully

# If not running, start it:
mongod   # On your system, or
docker run -d -p 27017:27017 mongo:6
```

### "Port 5000 already in use"
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Port 3000 already in use"
```bash
# Same as above, just use port 3000
```

### API connection errors
- ✅ Backend running on port 5000?
- ✅ Frontend can reach `http://localhost:5000`?
- ✅ Check browser console for errors (F12)

### Docker issues
```bash
# Clean up containers
docker-compose down

# Remove volumes (resets database)
docker-compose down -v

# Rebuild images
docker-compose up --build
```

## What to Do Next

### ✅ Basics (30 minutes)
- [ ] Visualize Bubble Sort
- [ ] Try different array sizes (10, 50, 100 elements)
- [ ] Read AI explanation for Bubble Sort
- [ ] Compare Big-O complexities in complexity panel

### 📚 Learning (1-2 hours)
- [ ] Explore all sorting algorithms
- [ ] Compare sorting algorithm speeds
- [ ] Understand why Merge Sort is O(n log n)
- [ ] Try searching algorithms (Binary Search)

### 🧠 Advanced (2-4 hours)
- [ ] Study graph algorithms (DFS, BFS)
- [ ] Understand recursion with Fibonacci
- [ ] Learn Dijkstra's algorithm
- [ ] Compare different algorithms on same input

### 💻 Customization
- [ ] Add your own algorithm to simulation engine
- [ ] Customize colors in Tailwind config
- [ ] Add new data structure visualizers
- [ ] Deploy to cloud (Heroku, Vercel, AWS)

## Configuration

### Backend .env
Key settings you might want to change:

```env
# API Settings
PORT=5000
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/dsa-visualizer

# AI (optional - fallback explanations work without this)
OPENAI_API_KEY=sk-...your-key-here...

# Security (change in production!)
JWT_SECRET=change_this_in_production

# Resource limits
MAX_SIMULATION_SIZE=10000
MAX_RECURSION_DEPTH=1000
```

### Frontend Environment
Create `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Useful Commands

```bash
# Backend
npm run dev           # Development with auto-reload
npm start            # Production
npm test             # Run tests
npm run test:watch   # Tests in watch mode

# Frontend
npm run dev          # Development server
npm run build        # Create production build
npm run preview      # Preview production build

# Docker
docker-compose up           # Start all services
docker-compose down         # Stop all services
docker-compose logs -f      # View logs
docker-compose exec backend npm test  # Run tests in container
```

## Understanding the Flow

1. **User opens visualizer** → Frontend loads
2. **Selects algorithm + input** → Frontend sends to backend
3. **Backend SimulationEngine** runs deterministic algorithm
4. **Generates state array** with snapshots of each step
5. **Frontend receives states** and animates them
6. **User controls playback** with controls
7. **(Optional) AI explanation** - backend calls GPT-4 API
8. **Display results** with complexity and metrics

## Architecture Quick View

```
┌─ Frontend (React, Vite, Tailwind)
│  ├─ Pages: Home, Visualizer, Auth
│  ├─ Components: Controls, Visualizer, AI Panel
│  └─ State: Zustand stores
│
├─ Backend (Node.js, Express)
│  ├─ SimulationEngine: All algorithms
│  ├─ AIService: LLM integration
│  ├─ AuthService: JWT + MongoDB users
│  └─ API Routes: /auth, /simulate, /explain
│
└─ Database (MongoDB)
   ├─ Users: authentication
   ├─ Sessions: saved simulations
   └─ Configurations: user preferences
```

## For Teachers

### Using in Classroom
1. **Project onto screen** and walk through algorithms
2. **Pause and discuss** specific steps
3. **Have students predict** next step
4. **Show AI explanations** to reinforce concepts
5. **Compare algorithms** visually side-by-side

### Assigning to Students
1. **Have them run simulations** and take notes
2. **Ask them to predict** complexity beforehand
3. **Have them compare** different algorithms
4. **Use for assignments**: "Explain this algorithm's complexity"

### Creating Custom Demos
1. Add algorithm to `SimulationEngine.js`
2. List it in algorithm controller
3. Frontend automatically detects it
4. Ready to use!

## Getting Help

📚 **Documentation:**
- Backend: `BACKEND_SETUP.md`
- Frontend: `FRONTEND_SETUP.md`

🐛 **Common Issues:**
- Check `.env` files are set up correctly
- Verify all ports are available
- Check MongoDB is running
- Look at browser console for errors

💡 **Tips:**
- Start with Bubble Sort - simplest to understand
- Use small arrays first (5-10 elements)
- Read AI explanations alongside visualization
- Compare best/average/worst case scenarios

## Next Steps

### For Learning
→ Start with the [README.md](./README.md) for full documentation

### For Development
→ Check [BACKEND_SETUP.md](./BACKEND_SETUP.md) and [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)

### For Deployment
→ See "Deployment" section of respective setup guides

---

**Happy Learning! 🎓**

Questions? Check the FAQ in the main README or setup guides!
