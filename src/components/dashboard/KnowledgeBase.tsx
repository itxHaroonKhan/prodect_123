"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Target, Save, FileText, ChevronRight, Shield, Zap, Sparkles } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const MOCK_FILES = {
  'Company_Handbook.md': `# Company Handbook & Rules of Engagement
---
last_updated: 2026-01-01
---

## Communication Style
- Always be professional but friendly on WhatsApp.
- If a client asks for a meeting, check my Google Calendar first.
- Do not respond to sales pitches without flagging for my review.

## Financial Rules
- Flag any payment request over $500.
- Categorize SaaS subscriptions under "Operating Expenses".
- Generate invoices automatically for Client A and Client B.

## Safety Protocols
- Never execute a destructive file system operation without HITL approval.
- Keep vault sync active via Git 24/7.`,
  'Business_Goals.md': `# Business Goals Q1 2026
---
monthly_target: 10000
review_frequency: weekly
---

## Revenue Objectives
- Grow monthly recurring revenue to $10,000 by March 31.
- Maintain a net margin of 40%.

## Active Projects
1. Project Alpha - Final delivery Jan 15.
2. Launch AI Consulting package by Feb 1.

## Subscription Audit Rules
- Flag any tool not logged into for 30 days.
- Flag cost increases over 20%.`,
  'Skills.md': `# Agent Skills Registry
---
agent_version: v0.1.2
---

## Capabilities
- [x] GMAIL_TRIAGE
- [x] WHATSAPP_SENTINEL
- [x] BANKING_AUDIT_V2
- [ ] ODOO_INTEGRATION (Pending Installation)

## Ralph Wiggum Constraints
- Max iterations per loop: 10
- Self-correction: Enabled`
};

export function KnowledgeBase() {
  const [selectedFile, setSelectedFile] = useState<keyof typeof MOCK_FILES>('Company_Handbook.md');
  const [content, setContent] = useState(MOCK_FILES['Company_Handbook.md']);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Vault Updated",
      description: `${selectedFile} has been synced to the local filesystem.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline font-bold">Company OS</h2>
          <p className="text-muted-foreground text-sm">Manage rules, objectives, and skills for your Digital FTE.</p>
        </div>
        <Button onClick={handleSave} className="glow-primary px-6">
          <Save className="h-4 w-4 mr-2" /> Sync Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel md:col-span-1 border-white/5 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <FileText className="h-3 w-3" /> Core Vault
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              {Object.keys(MOCK_FILES).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => {
                    setSelectedFile(fileName as any);
                    setContent(MOCK_FILES[fileName as keyof typeof MOCK_FILES]);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-4 text-xs transition-all border-l-2",
                    selectedFile === fileName 
                    ? "bg-primary/10 border-primary text-primary font-bold" 
                    : "border-transparent hover:bg-white/5 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {fileName.includes('Handbook') ? <Shield className="h-3.5 w-3.5" /> : 
                     fileName.includes('Goals') ? <Target className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
                    <span className="truncate">{fileName}</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", selectedFile === fileName ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <Card className="glass-panel md:col-span-3 border-white/5 overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5 py-5 px-8 flex flex-row items-center gap-4">
            <div className={cn(
              "p-2.5 rounded-xl",
              selectedFile.includes('Goals') ? 'bg-accent/10 text-accent' : 
              selectedFile.includes('Handbook') ? 'bg-primary/10 text-primary' : 'bg-purple-500/10 text-purple-400'
            )}>
              {selectedFile.includes('Goals') ? <Target className="h-5 w-5" /> : 
               selectedFile.includes('Handbook') ? <Shield className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-xl font-headline tracking-tight">{selectedFile}</CardTitle>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Markdown • Agent Readable</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 bg-[#171d24]">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[650px] bg-transparent border-0 focus-visible:ring-0 font-code text-sm p-8 resize-none leading-relaxed text-foreground/80"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
