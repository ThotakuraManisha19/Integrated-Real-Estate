import { Request, Response } from 'express';
import { db } from '../data/db.js';
import { MiddlemanAgent } from '../types/index.js';

export const getAgents = (req: Request, res: Response) => {
  const { city, role, availableOnly } = req.query;
  let items = db.getAgents();

  if (city) {
    items = items.filter(a => a.territoryCities.some(c => c.toLowerCase() === String(city).toLowerCase()));
  }
  if (role) {
    items = items.filter(a => a.role === role);
  }
  if (availableOnly === 'true') {
    items = items.filter(a => a.isAvailableNow);
  }

  res.json({ success: true, count: items.length, data: items });
};

export const getAgentById = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const item = db.getAgentById(id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Agent not found' });
  }
  res.json({ success: true, data: item });
};

export const createAgent = (req: Request, res: Response) => {
  const newAgent: MiddlemanAgent = {
    ...req.body,
    id: req.body.id || `agent-${Date.now()}`,
    rating: req.body.rating || 5.0,
    reviewCount: 0,
    totalVisitsCompleted: 0
  };
  const created = db.addAgent(newAgent);
  res.status(201).json({ success: true, data: created });
};
