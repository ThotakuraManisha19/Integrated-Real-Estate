import { Request, Response } from 'express';
import { db } from '../data/db.js';
import { Inquiry } from '../types/index.js';

export const getInquiries = (req: Request, res: Response) => {
  const { sellerId, propertyId } = req.query;
  let items = db.getInquiries();

  if (sellerId) {
    items = items.filter(i => i.sellerId === String(sellerId));
  }
  if (propertyId) {
    items = items.filter(i => i.propertyId === String(propertyId));
  }

  res.json({ success: true, count: items.length, data: items });
};

export const createInquiry = (req: Request, res: Response) => {
  const newInq: Inquiry = {
    ...req.body,
    id: `inq-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  const created = db.addInquiry(newInq);

  // Increment property inquiries count
  const prop = db.getPropertyById(newInq.propertyId);
  if (prop) {
    db.updateProperty(prop.id, { inquiriesCount: prop.inquiriesCount + 1 });
  }

  res.status(201).json({ success: true, data: created });
};

export const updateInquiryStatus = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { status } = req.body;
  const updated = db.updateInquiryStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }
  res.json({ success: true, data: updated });
};
