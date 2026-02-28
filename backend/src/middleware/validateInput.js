export const validateSimulationInput = (req, res, next) => {
  const { algorithm, input } = req.body;

  if (!algorithm || typeof algorithm !== 'string') {
    return res.status(400).json({ error: 'Algorithm name is required' });
  }

  if (!input || !Array.isArray(input.array) && input.value === undefined) {
    return res.status(400).json({ error: 'Valid input is required' });
  }

  // Prevent large inputs
  if (input.array && input.array.length > parseInt(process.env.MAX_SIMULATION_SIZE || 10000)) {
    return res.status(400).json({ error: 'Input size exceeds maximum allowed' });
  }

  next();
};

export const validateExplanationInput = (req, res, next) => {
  const { algorithm } = req.body;

  if (!algorithm || typeof algorithm !== 'string') {
    return res.status(400).json({ error: 'Algorithm name is required' });
  }

  next();
};
