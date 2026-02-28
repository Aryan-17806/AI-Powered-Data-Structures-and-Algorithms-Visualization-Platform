# Frontend Setup Guide

## Quick Start

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to `http://localhost:3000`

## Configuration

The frontend uses environment variables for API configuration. Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **D3.js** - Data visualization
- **React Router** - Routing

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── AlgorithmControls.jsx
│   │   ├── PlaybackControls.jsx
│   │   ├── ComplexityPanel.jsx
│   │   ├── ArrayVisualizer.jsx
│   │   └── ExplanationPanel.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── VisualizerPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── context/
│   │   ├── authStore.js
│   │   └── visualizationStore.js
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Styling

The project uses **Tailwind CSS** with custom theme extensions. Modify `tailwind.config.js` to customize styles.

## State Management

Uses **Zustand** for lightweight state management:
- `authStore.js` - Authentication state (login, signup, user info)
- `visualizationStore.js` - Algorithm visualization state

No Redux or Context API bloat - just simple, effective state management.

## Component Guide

### AlgorithmControls
- Select algorithm
- Input array
- Run simulation

### ArrayVisualizer
- Displays array as vertical bars
- Highlights active elements
- Shows min/max values
- Real-time height transitions

### PlaybackControls
- Step through states
- Adjust animation speed
- Reset to beginning
- Current step indicator

### ComplexityPanel
- Shows time complexity (best, average, worst)
- Shows space complexity
- Provides learning tips

### ExplanationPanel
- Algorithm overview
- AI-powered detailed explanation
- Tabs for different information types

## Adding New Algorithms

To add a new algorithm:

1. **Add to SimulationEngine** (`backend/src/services/SimulationEngine.js`):
```javascript
yourAlgorithm(array) {
  const states = [];
  // Generate states with step-by-step snapshots
  return { states, complexity: {...} };
}
```

2. **Register in algorithms map** in SimulationEngine constructor

3. **Add to algorithm list** in `backend/src/controllers/dataController.js`

4. **Frontend automatically detects** new algorithms from API

## Customization

### Colors
Edit `src/index.css` and `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#EC4899',
}
```

### Animations
- Modify Framer Motion variants in components
- Adjust animation speeds in `PlaybackControls`

### Visualization
- Edit `ArrayVisualizer.jsx` for different visualization styles
- Add D3-based visualizations for complex structures

## Performance Tips

1. Use React.memo for expensive components
2. Optimize state updates with Zustand
3. Lazy load pages with React.lazy
4. Minify and compress assets during build

## Deployment

### Docker
```bash
docker build -t dsa-frontend .
docker run -p 3000:3000 dsa-frontend
```

### Vercel/Netlify
```bash
npm run build
# Deploy the dist folder
```

### Traditional Server
```bash
npm run build
# Serve dist folder with nginx/apache
```

## Troubleshooting

### Port 3000 already in use
```bash
npx kill-port 3000
```

### API connection errors
- Check backend is running on port 5000
- Verify `VITE_API_URL` environment variable
- Check CORS settings in backend

### Hot module replacement not working
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

