import { Router } from 'express';
import { getChats, createChat } from '../controllers/chatsController.js';

const router = Router();

router.get('/', getChats);
router.post('/', createChat);

export default router;
