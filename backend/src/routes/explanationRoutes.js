import express from 'express';
import * as explanationController from '../controllers/explanationController.js';
import { validateExplanationInput } from '../middleware/validateInput.js';

const router = express.Router();

router.post('/algorithm', validateExplanationInput, explanationController.explainAlgorithm);
router.post('/complexity', explanationController.explainComplexity);
router.post('/question', explanationController.answerQuestion);

export default router;
