import { Router } from 'express';
import {
  getAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointmentStatus,
  submitInspectionReport
} from '../controllers/appointmentsController.js';

const router = Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', bookAppointment);
router.put('/:id/status', updateAppointmentStatus);
router.post('/:id/report', submitInspectionReport);

export default router;
