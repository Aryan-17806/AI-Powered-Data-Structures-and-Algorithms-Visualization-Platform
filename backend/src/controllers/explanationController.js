import AIService from '../services/AIService.js';

export const explainAlgorithm = async (req, res) => {
  try {
    const { algorithm, stepDetails } = req.body;

    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    const explanation = await AIService.explainAlgorithm(algorithm, stepDetails);
    res.json(explanation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const explainComplexity = async (req, res) => {
  try {
    const { algorithm, complexity } = req.body;

    if (!algorithm || !complexity) {
      return res.status(400).json({ error: 'Algorithm and complexity data are required' });
    }

    const explanation = await AIService.explainComplexity(algorithm, complexity);
    res.json(explanation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const answerQuestion = async (req, res) => {
  try {
    const { algorithm, question } = req.body;

    if (!algorithm || !question) {
      return res.status(400).json({ error: 'Algorithm and question are required' });
    }

    const answer = await AIService.answerQuestion(algorithm, question);
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
