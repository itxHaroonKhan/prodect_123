"use client";

import { useState, useEffect } from 'react';

export type TaskStatus = 'inbox' | 'needs_action' | 'pending_approval' | 'done';

export interface VaultItem {
  id: string;
  type: 'email' | 'whatsapp' | 'file_drop' | 'task';
  title: string;
  content: string;
  status: TaskStatus;
  receivedAt: string;
  metadata?: Record<string, any>;
  plan?: string;
  priority?: 'low' | 'medium' | 'high';
}

const INITIAL_ITEMS: VaultItem[] = [
  {
    id: 'msg_1',
    type: 'whatsapp',
    title: 'Invoice Request - Client A',
    content: 'Hey, can you send me the invoice for January?',
    status: 'needs_action',
    receivedAt: new Date(Date.now() - 3600000).toISOString(),
    priority: 'high',
    metadata: { from: 'Client A' }
  },
  {
    id: 'email_1',
    type: 'email',
    title: 'Partnership Proposal',
    content: 'Hi Alex, we are interested in your recent post on LinkedIn about AgentPilot. Can we schedule a brief chat?',
    status: 'inbox',
    receivedAt: new Date(Date.now() - 7200000).toISOString(),
    priority: 'medium',
    metadata: { from: 'Sarah Chen' }
  },
  {
    id: 'pay_1',
    type: 'task',
    title: 'Payment Approval: Hosting Bill',
    content: 'Monthly hosting bill from Vercel: $142.00. Rule: All payments > $100 require CEO Approval.',
    status: 'pending_approval',
    receivedAt: new Date(Date.now() - 14400000).toISOString(),
    priority: 'high',
    plan: `---
created: 2026-01-07T10:30:00Z
status: pending_approval
---
## Objective
Approve and execute payment for Vercel monthly hosting.

## Steps
- [x] Verify amount against budget ($150 allocated)
- [x] Check for duplicate invoices
- [ ] Execute payment via Browser MCP (REQUIRES APPROVAL)
- [ ] Log to /Accounting/Expenses.md`,
    metadata: { amount: 142.00, vendor: 'Vercel' }
  },
  {
    id: 'file_1',
    type: 'file_drop',
    title: 'Receipt_Lunch_2026-01-05.pdf',
    content: 'New receipt detected in /Drops folder. Categorization needed.',
    status: 'needs_action',
    receivedAt: new Date(Date.now() - 86400000).toISOString(),
    priority: 'low'
  }
];

export function useVault() {
  const [items, setItems] = useState<VaultItem[]>(INITIAL_ITEMS);
  const [revenue, setRevenue] = useState({ 
    week: 2450, 
    mtd: 4500, 
    target: 10000,
    prevWeek: 2100 
  });

  const moveItem = (id: string, newStatus: TaskStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const updateItemPlan = (id: string, plan: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, plan, status: 'pending_approval' } : item));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return {
    items,
    revenue,
    moveItem,
    updateItemPlan,
    deleteItem,
    counts: {
      inbox: items.filter(i => i.status === 'inbox').length,
      needs_action: items.filter(i => i.status === 'needs_action').length,
      pending_approval: items.filter(i => i.status === 'pending_approval').length,
      done: items.filter(i => i.status === 'done').length,
    }
  };
}
