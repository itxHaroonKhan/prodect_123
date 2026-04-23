"use client";

import { useState, useEffect } from 'react';
import { useVault } from '@/lib/vault-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, XCircle, FileWarning, ExternalLink, ArrowRight } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export function ApprovalHub() {
  const { items, moveItem } = useVault();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const pendingItems = items.filter(i => i.status === 'pending_approval');

  const handleApprove = (id: string) => {
    moveItem(id, 'done');
    toast({
      title: "Action Executed",
      description: "Digital FTE has triggered the MCP sequence for this task.",
    });
  };

  const handleReject = (id: string) => {
    moveItem(id, 'needs_action');
    toast({
      variant: "destructive",
      title: "Action Rejected",
      description: "Task sent back for revision.",
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline font-bold">Approval Hub</h2>
          <p className="text-muted-foreground text-sm">Human-in-the-loop gateway for sensitive autonomous actions.</p>
        </div>
        <Badge variant="outline" className="py-1 px-4 border-accent text-accent">
          {pendingItems.length} Awaiting Review
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingItems.length > 0 ? (
          pendingItems.map((item) => (
            <Card key={item.id} className="glass-panel border-l-4 border-l-accent overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-3 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-accent/10 text-accent">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-headline font-bold">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter">Requires Authorization</Badge>
                        <span className="text-[10px] text-muted-foreground">
                          Requested {mounted ? new Date(item.receivedAt).toLocaleTimeString() : '--:--'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl border border-white/5 p-4 font-code text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {item.plan || item.content}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-6 w-6 rounded-full border-2 border-[#1F272E] bg-accent/20 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-accent">A{i}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">Plan verified by 3 internal agent nodes</span>
                  </div>
                </div>

                <div className="bg-white/5 p-6 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-3">
                  <Button 
                    className="w-full glow-accent bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                    onClick={() => handleApprove(item.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Execute
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/10 hover:bg-white/5"
                    onClick={() => handleReject(item.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject & Revise
                  </Button>
                  <div className="pt-4 mt-4 border-t border-white/5 text-center">
                    <p className="text-[9px] text-muted-foreground flex items-center justify-center gap-1">
                      <ExternalLink className="h-3 w-3" /> View Source Metadata
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-headline font-bold">All Actions Authorized</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
              Your Digital FTE is operating within approved boundaries. No high-stakes decisions are currently pending.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
