import { Request, Response } from 'express';
import { db } from '../data/db.js';
import { PropertyItem } from '../types/index.js';

export const getProperties = (req: Request, res: Response) => {
  const { city, category, propertyType, minPrice, maxPrice, isVerifiedOnly, isCornerPlotOnly } = req.query;
  let items = db.getProperties();

  if (city) {
    items = items.filter(p => p.city.toLowerCase() === String(city).toLowerCase());
  }
  if (category && category !== 'all') {
    items = items.filter(p => p.category === category);
  }
  if (propertyType) {
    items = items.filter(p => p.propertyType === propertyType);
  }
  if (minPrice) {
    items = items.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    items = items.filter(p => p.price <= Number(maxPrice));
  }
  if (isVerifiedOnly === 'true') {
    items = items.filter(p => p.isVerified);
  }
  if (isCornerPlotOnly === 'true') {
    items = items.filter(p => p.isCornerPlot);
  }

  res.json({ success: true, count: items.length, data: items });
};

export const getPropertyById = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const item = db.getPropertyById(id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  res.json({ success: true, data: item });
};

export const createProperty = (req: Request, res: Response) => {
  const newProp: PropertyItem = {
    ...req.body,
    id: req.body.id || `prop-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewsCount: 1,
    inquiriesCount: 0
  };
  const created = db.addProperty(newProp);
  res.status(201).json({ success: true, data: created });
};

export const updateProperty = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = db.updateProperty(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  res.json({ success: true, data: updated });
};

export const deleteProperty = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const success = db.deleteProperty(id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  res.json({ success: true, message: 'Property deleted successfully' });
};

export const verifyProperty = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { isVerified, checklist, adminNotes } = req.body;
  const prop = db.getPropertyById(id);
  if (!prop) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }

  const updatedChecklist = checklist ? { ...prop.verificationChecklist, ...checklist } : prop.verificationChecklist;
  const countPassed = Object.values(updatedChecklist).filter(Boolean).length;
  const newScore = Math.round((countPassed / 6) * 100);

  const updated = db.updateProperty(id, {
    isVerified,
    verificationDate: isVerified ? new Date().toISOString().split('T')[0] : undefined,
    verifiedBy: isVerified ? 'Verified by TerraPlots Regulatory Officer' : undefined,
    verificationScore: newScore,
    verificationChecklist: updatedChecklist,
    adminNotes: adminNotes ?? prop.adminNotes
  });

  res.json({ success: true, data: updated });
};
