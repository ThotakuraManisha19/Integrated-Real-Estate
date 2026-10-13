import { Request, Response } from 'express';
import { db } from '../data/db.js';
import { ChatMessage } from '../types/index.js';

export const getChats = (req: Request, res: Response) => {
  const { propertyId } = req.query;
  let items = db.getChats();
  if (propertyId) {
    items = items.filter(c => c.propertyId === String(propertyId));
  }
  res.json({ success: true, count: items.length, data: items });
};

export const createChat = (req: Request, res: Response) => {
  const newMsg: ChatMessage = {
    ...req.body,
    id: `chat-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  const created = db.addChat(newMsg);
  res.status(201).json({ success: true, data: created });
};
