import { Router } from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  verifyProperty
} from '../controllers/propertiesController.js';

const router = Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.post('/:id/verify', verifyProperty);

export default router;
