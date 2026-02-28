import express from 'express';
import * as simulationController from '../controllers/simulationController.js';
import { validateSimulationInput } from '../middleware/validateInput.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/run', validateSimulationInput, authMiddleware, simulationController.runSimulation);
router.post('/complexity', simulationController.getComplexity);
router.get('/sessions', authMiddleware, simulationController.getSessions);
router.get('/sessions/:id', authMiddleware, simulationController.getSession);

export default router;
