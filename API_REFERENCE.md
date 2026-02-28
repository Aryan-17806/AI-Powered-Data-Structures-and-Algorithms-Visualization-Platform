# Architecture & API Reference

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER (React)                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Pages: HomePage | VisualizerPage | LoginPage | SignupPage       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Components Layer                                                 │  │
│  │  ┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐    │  │
│  │  │AlgorithmCtrl │  │ArrayVisualizer  │  │PlaybackControls  │    │  │
│  │  └──────────────┘  └─────────────────┘  └──────────────────┘    │  │
│  │  ┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐    │  │
│  │  │ComplexPanel  │  │ExplanationPanel │  │Navbar            │    │  │
│  │  └──────────────┘  └─────────────────┘  └──────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  State Management (Zustand)                                      │  │
│  │  ├─ authStore: User, Token, Auth methods                        │  │
│  │  └─ visualizationStore: Algorithm state, Simulation state       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│                    HTTP (Axios) ───┼─── REST API Calls                 │
│                                    │                                     │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
         ┌─────────────────┐ ┌──────────────┐ ┌──────────────┐
         │  REST API       │ │  Database    │ │  LLM API     │
         │  Routes         │ │  (MongoDB)   │ │  (OpenAI)    │
         └─────────────────┘ └──────────────┘ └──────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER (Node.js/Express)                      │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Routes Layer                                                    │  │
│  │  /api/auth  /api/structures  /api/algorithms  /api/simulate     │  │
│  │  /api/explain  /api/health                                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Middleware                                                      │  │
│  │  ├─ Authentication (JWT validation)                            │  │
│  │  ├─ Validation (Input validation)                              │  │
│  │  ├─ Error Handling                                             │  │
│  │  └─ Logging                                                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Controllers                                                     │  │
│  │  ├─ authController     ├─ dataController                       │  │
│  │  ├─ simulationController  ├─ explanationController            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Services (Business Logic)                                       │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  SimulationEngine                                        │  │  │
│  │  │  ├─ Bubble Sort      ├─ Merge Sort    ├─ Linear Search  │  │  │
│  │  │  ├─ Insertion Sort   ├─ Quick Sort    ├─ Binary Search  │  │  │
│  │  │  ├─ Selection Sort   ├─ DFS/BFS      ├─ Fibonacci      │  │  │
│  │  │  └─ Dijkstra                                             │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  AIService                                               │  │  │
│  │  │  ├─ explainAlgorithm()                                  │  │  │
│  │  │  ├─ explainComplexity()                                 │  │  │
│  │  │  └─ answerQuestion()                                    │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  AuthService                                             │  │  │
│  │  │  ├─ signUp()    ├─ login()    ├─ verifyToken()         │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Data Models (MongoDB Schemas)                                   │  │
│  │  ├─ User          ├─ SimulationSession    ├─ Configuration      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
         ┌─────────────────┐ ┌──────────────┐ ┌──────────────┐
         │  MongoDB        │ │  OpenAI API  │ │  JWT Tokens  │
         │  Database       │ │  (GPT-4)     │ │  (Security)  │
         └─────────────────┘ └──────────────┘ └──────────────┘
```

## Data Flow

### Simulation Process
```
User Input (Algorithm + Array)
       ↓
Frontend → POST /api/simulate/run
       ↓
Backend receives request
       ↓
SimulationEngine.simulate(algorithm, input)
       ↓
Generate states array:
[
  { step: 0, array: [...], highlighted: [], operation: 'START' },
  { step: 1, array: [...], highlighted: [0,1], operation: 'COMPARE' },
  { step: 2, array: [...], highlighted: [0,1], operation: 'SWAP' },
  ...continues for each step...
]
       ↓
Return states + complexity info
       ↓
Frontend animates through states
       ↓
User controls playback (step, speed, reset)
```

## API Endpoints Reference

### Authentication

#### POST /api/auth/signup
Create new user account.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "65f8d4a2c9e3a1b2c3d4e5f6",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/login
User login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "user": { "_id": "...", "username": "...", "email": "..." },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /api/auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": { "_id": "...", "username": "...", "email": "..." }
}
```

### Data & Metadata

#### GET /api/structures
Get all supported data structures.

**Response:**
```json
[
  {
    "id": "array",
    "name": "Array",
    "description": "Contiguous collection of elements",
    "visualization": "rectangles"
  },
  {
    "id": "stack",
    "name": "Stack",
    "description": "LIFO data structure",
    "visualization": "vertical-blocks"
  },
  ...
]
```

#### GET /api/algorithms
Get all supported algorithms with complexity info.

**Response:**
```json
[
  {
    "id": "bubble-sort",
    "name": "Bubble Sort",
    "category": "Sorting",
    "description": "Repeatedly compares and swaps adjacent elements",
    "timeComplexity": {
      "best": "O(n)",
      "average": "O(n²)",
      "worst": "O(n²)"
    },
    "spaceComplexity": "O(1)"
  },
  ...
]
```

### Simulation

#### POST /api/simulate/run
Run algorithm simulation and get state snapshots.

**Headers:**
```
Authorization: Bearer <token>  (optional)
Content-Type: application/json
```

**Request:**
```json
{
  "algorithm": "bubble-sort",
  "input": {
    "array": [64, 34, 25, 12, 22, 11, 90]
  }
}
```

**Response:**
```json
{
  "success": true,
  "algorithm": "bubble-sort",
  "states": [
    {
      "step": 0,
      "dataStructureState": [64, 34, 25, 12, 22, 11, 90],
      "highlightedIndices": [],
      "currentLine": "",
      "operationType": "START",
      "stackState": [],
      "operationCount": {
        "comparisons": 0,
        "swaps": 0,
        "assignments": 0,
        "recursionDepth": 0
      },
      "timestamp": "2024-01-15T10:30:00Z"
    },
    ...more states...
  ],
  "complexity": {
    "timeAverage": "O(n²)",
    "timeBest": "O(n)",
    "timeWorst": "O(n²)",
    "spaceComplexity": "O(1)"
  },
  "result": null,
  "operationCount": {
    "comparisons": 42,
    "swaps": 15,
    "assignments": 57,
    "recursionDepth": 0
  }
}
```

#### POST /api/simulate/complexity
Get complexity analysis for an algorithm.

**Request:**
```json
{
  "algorithm": "merge-sort"
}
```

**Response:**
```json
{
  "algorithm": "merge-sort",
  "timeAverage": "O(n log n)",
  "timeBest": "O(n log n)",
  "timeWorst": "O(n log n)",
  "spaceComplexity": "O(n)"
}
```

#### GET /api/simulate/sessions
Get user's saved simulation sessions.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "65f8d4a2c9e3a1b2c3d4e5f6",
    "userId": "...",
    "algorithm": "bubble-sort",
    "input": { "array": [...] },
    "states": [...],
    "complexity": {...},
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

### AI Explanations

#### POST /api/explain/algorithm
Get AI explanation for an algorithm.

**Request:**
```json
{
  "algorithm": "bubble-sort",
  "stepDetails": { "step": 5, "operation": "SWAP" }
}
```

**Response:**
```json
{
  "explanation": "Bubble Sort works by repeatedly stepping through the list...",
  "source": "openai",
  "model": "gpt-4"
}
```

#### POST /api/explain/complexity
Get explanation of algorithm complexity.

**Request:**
```json
{
  "algorithm": "merge-sort",
  "complexity": {
    "timeAverage": "O(n log n)",
    "timeBest": "O(n log n)",
    "timeWorst": "O(n log n)",
    "spaceComplexity": "O(n)"
  }
}
```

**Response:**
```json
{
  "explanation": "Merge Sort achieves O(n log n) time complexity in all cases...",
  "source": "openai",
  "model": "gpt-4"
}
```

#### POST /api/explain/question
Ask question about an algorithm.

**Request:**
```json
{
  "algorithm": "quick-sort",
  "question": "Why is quick sort faster than merge sort in practice?"
}
```

**Response:**
```json
{
  "answer": "Although both have O(n log n) average complexity, quick sort...",
  "source": "openai",
  "model": "gpt-4"
}
```

### Utility

#### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Error Handling

All errors follow standard HTTP status codes:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (not allowed)
- `404` - Not Found
- `500` - Server Error

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  passwordHash: String (required, bcrypt hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### SimulationSession Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  algorithm: String (enum),
  input: {
    array: [Number],
    value: Number,
    startNode: String
  },
  states: [
    {
      step: Number,
      dataStructureState: Mixed,
      highlightedIndices: [Number],
      currentLine: String,
      operationType: String,
      stackState: [Mixed],
      operationCount: {
        comparisons: Number,
        swaps: Number,
        assignments: Number,
        recursionDepth: Number
      },
      timestamp: Date
    }
  ],
  complexity: {
    timeAverage: String,
    timeBest: String,
    timeWorst: String,
    spaceComplexity: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Configuration Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  animationSpeed: Number (0.5-3),
  layoutMode: String (compact/expanded/hierarchical),
  theme: String (light/dark),
  autoPlay: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Algorithm Complexity Reference

### Sorting
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | O(1) |
| Merge | O(n logn) | O(n logn) | O(n logn) | O(n) |
| Quick | O(n logn) | O(n logn) | O(n²) | O(logn) |

### Searching
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Linear | O(1) | O(n) | O(n) | O(1) |
| Binary | O(1) | O(logn) | O(logn) | O(1) |

### Graph
| Algorithm | Time | Space |
|-----------|------|-------|
| DFS | O(V+E) | O(V) |
| BFS | O(V+E) | O(V) |
| Dijkstra | O((V+E)logV) | O(V) |

---

**For questions about specific endpoints or data structures, refer to the appropriate setup guide.**
