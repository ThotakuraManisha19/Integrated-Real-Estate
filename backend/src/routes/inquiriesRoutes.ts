import { Router } from 'express';
import { getInquiries, createInquiry, updateInquiryStatus } from '../controllers/inquiriesController.js';

const router = Router();

router.get('/', getInquiries);
router.post('/', createInquiry);
router.put('/:id/status', updateInquiryStatus);

export default router;
