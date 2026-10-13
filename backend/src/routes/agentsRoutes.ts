import { Router } from 'express';
import { getAgents, getAgentById, createAgent } from '../controllers/agentsController.js';

const router = Router();

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', createAgent);

export default router;
