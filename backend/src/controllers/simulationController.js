import SimulationEngine from '../services/SimulationEngine.js';
import SimulationSession from '../models/SimulationSession.js';

const simulationEngine = new SimulationEngine();

export const runSimulation = async (req, res) => {
  try {
    const { algorithm, input } = req.body;

    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm is required' });
    }

    const result = simulationEngine.simulate(algorithm, input);

    // Save session to database
    if (req.user) {
      const session = new SimulationSession({
        userId: req.user._id,
        algorithm,
        input,
        states: result.states,
        complexity: result.complexity
      });
      await session.save();
    }

    res.json({
      success: true,
      algorithm,
      states: result.states,
      complexity: result.complexity,
      result: result.result || null,
      operationCount: result.states[result.states.length - 1]?.operationCount || {}
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComplexity = async (req, res) => {
  try {
    const { algorithm } = req.body;

    const complexityMap = {
      'bubble-sort': { timeAverage: 'O(n²)', timeBest: 'O(n)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' },
      'insertion-sort': { timeAverage: 'O(n²)', timeBest: 'O(n)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' },
      'selection-sort': { timeAverage: 'O(n²)', timeBest: 'O(n²)', timeWorst: 'O(n²)', spaceComplexity: 'O(1)' },
      'merge-sort': { timeAverage: 'O(n log n)', timeBest: 'O(n log n)', timeWorst: 'O(n log n)', spaceComplexity: 'O(n)' },
      'quick-sort': { timeAverage: 'O(n log n)', timeBest: 'O(n log n)', timeWorst: 'O(n²)', spaceComplexity: 'O(log n)' },
      'linear-search': { timeAverage: 'O(n)', timeBest: 'O(1)', timeWorst: 'O(n)', spaceComplexity: 'O(1)' },
      'binary-search': { timeAverage: 'O(log n)', timeBest: 'O(1)', timeWorst: 'O(log n)', spaceComplexity: 'O(1)' },
      'dfs': { timeAverage: 'O(V+E)', timeBest: 'O(V+E)', timeWorst: 'O(V+E)', spaceComplexity: 'O(V)' },
      'bfs': { timeAverage: 'O(V+E)', timeBest: 'O(V+E)', timeWorst: 'O(V+E)', spaceComplexity: 'O(V)' },
      'fibonacci-recursive': { timeAverage: 'O(2^n)', timeBest: 'O(2^n)', timeWorst: 'O(2^n)', spaceComplexity: 'O(n)' },
      'dijkstra': { timeAverage: 'O((V+E)logV)', timeBest: 'O((V+E)logV)', timeWorst: 'O(V²)', spaceComplexity: 'O(V)' }
    };

    const complexity = complexityMap[algorithm];
    if (!complexity) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    res.json({ algorithm, ...complexity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const sessions = await SimulationSession.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SimulationSession.findById(id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (req.user && session.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
