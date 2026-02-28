import express from 'express';
import * as dataController from '../controllers/dataController.js';

const router = express.Router();

router.get('/', dataController.getAlgorithms);

export default router;
