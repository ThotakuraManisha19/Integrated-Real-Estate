import { Request, Response } from 'express';
import { db } from '../data/db.js';
import { Appointment, SiteInspectionReport } from '../types/index.js';

export const getAppointments = (req: Request, res: Response) => {
  const { agentId, status, propertyId } = req.query;
  let items = db.getAppointments();

  if (agentId) {
    items = items.filter(a => a.agentId === String(agentId));
  }
  if (status) {
    items = items.filter(a => a.status === String(status));
  }
  if (propertyId) {
    items = items.filter(a => a.propertyId === String(propertyId));
  }

  res.json({ success: true, count: items.length, data: items });
};

export const getAppointmentById = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const item = db.getAppointmentById(id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }
  res.json({ success: true, data: item });
};

export const bookAppointment = (req: Request, res: Response) => {
  const {
    propertyId,
    agentId,
    buyerName,
    buyerPhone,
    buyerEmail,
    appointmentDate,
    timeSlot,
    visitType,
    meetingPoint,
    specialInstructions
  } = req.body;

  const property = db.getPropertyById(propertyId);
  const agent = db.getAgentById(agentId);

  if (!property) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  if (!agent) {
    return res.status(404).json({ success: false, message: 'Agent not found' });
  }

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    propertyId: property.id,
    propertyTitle: property.title,
    propertyAddress: property.address,
    propertyCity: property.city,
    propertyType: property.propertyType,
    plotSize: property.plotSize,
    sizeUnit: property.sizeUnit,
    surveyNumber: property.surveyNumber,
    price: property.price,

    agentId: agent.id,
    agentName: agent.name,
    agentPhone: agent.phone,
    agentAvatar: agent.avatar,
    agentRole: agent.role,

    buyerName,
    buyerPhone,
    buyerEmail,

    appointmentDate,
    timeSlot,
    visitType: visitType || 'Assisted Site Visit',
    serviceFee: agent.serviceFee,
    meetingPoint: meetingPoint || 'At Plot Location',
    specialInstructions,

    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const created = db.addAppointment(newAppointment);
  res.status(201).json({ success: true, data: created });
};

export const updateAppointmentStatus = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { status } = req.body;
  const updated = db.updateAppointment(id, { status });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }
  res.json({ success: true, data: updated });
};

export const submitInspectionReport = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const apt = db.getAppointmentById(id);
  if (!apt) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  const report: SiteInspectionReport = {
    id: `rep-${Date.now()}`,
    appointmentId: apt.id,
    completedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    boundaryStoneVerified: req.body.boundaryStoneVerified ?? true,
    boundaryNotes: req.body.boundaryNotes || 'Boundary stones checked on site.',
    measuredRoadWidth: req.body.measuredRoadWidth || apt.plotSize || 40,
    roadCondition: req.body.roadCondition || 'Good approach road',
    groundCondition: req.body.groundCondition || 'Level & Clean',
    waterElectricityVerified: req.body.waterElectricityVerified ?? true,
    disputeSignsFound: req.body.disputeSignsFound ?? false,
    inspectorNotes: req.body.inspectorNotes || 'Physical inspection completed.',
    groundPhotos: req.body.groundPhotos || [],
    verificationScore: req.body.verificationScore || 96
  };

  const updated = db.updateAppointment(apt.id, {
    status: 'completed',
    inspectionReport: report
  });

  res.json({ success: true, data: updated });
};
