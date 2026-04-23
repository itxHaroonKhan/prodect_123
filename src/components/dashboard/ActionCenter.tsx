"use client";

import { useState, useEffect } from 'react';
import { useVault, VaultItem } from '@/lib/vault-store';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageCircle, FileText, CheckCircle, XCircle, Sparkles, BrainCircuit, Clock, MoreHorizontal } from "lucide-react";
import { generateTaskPlan } from '@/ai/flows/ai-generated-task-planning';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function ActionCenter() {
  const { items, moveItem, updateItemPlan } = useVault();
  const { toast } = useToast();
  const [isThinking, setIsThinking] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGeneratePlan = async (item: VaultItem) => {
    setIsThinking(item.id);
    try {
      const result = await generateTaskPlan({
        eventType: item.type,
        eventContent: item.content
      });
      updateItemPlan(item.id, result.planContent);
      toast({
        title: "Reasoning Loop Complete",
        description: "AgentPilot has generated an action plan for your review.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cognitive Error",
        description: "Failed to generate plan. Check Claude Code connectivity.",
      });
    } finally {
      setIsThinking(null);
    }
  };

  const renderItem = (item: VaultItem) => {
    const Icon = item.type === 'email' ? Mail : item.type === 'whatsapp' ? MessageCircle : FileText;
    
    return (
      <Card key={item.id} className="glass-panel group hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                item.type === 'whatsapp' ? "bg-emerald-500/10 text-emerald-400" :
                item.type === 'email' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.type}</span>
                  {item.priority === 'high' && (
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[8px] h-4 py-0">URGENT</Badge>
                  )}
                </div>
                <h3 className="text-lg font-headline font-bold mt-0.5">{item.title}</h3>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                <Clock className="h-3 w-3" />
                {mounted ? new Date(item.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed pl-12">{item.content}</p>

            {item.plan && (
              <div className="bg-white/5 rounded-xl p-5 border border-white/5 ml-12 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-accent agent-pulse" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Agent Reasoning Result</span>
                </div>
                <div className="text-xs font-code whitespace-pre-wrap text-muted-foreground bg-[#171d24] p-4 rounded-lg border border-white/5">
                  {item.plan}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white/5 p-6 md:w-64 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-3">
            {item.status === 'inbox' || item.status === 'needs_action' ? (
              <>
                <Button 
                  className={cn(
                    "w-full transition-all duration-300",
                    isThinking === item.id ? "bg-accent text-accent-foreground" : "glow-primary"
                  )} 
                  onClick={() => handleGeneratePlan(item)}
                  disabled={isThinking === item.id}
                >
                  {isThinking === item.id ? (
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Thinking...
                    </div>
                  ) : (
                    <>
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Generate Plan
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/10" onClick={() => moveItem(item.id, 'done')}>
                  Dismiss
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-bold">Action Center</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 border-white/10 text-[10px] font-bold uppercase tracking-wider">
            <MoreHorizontal className="h-3 w-3 mr-2" /> Bulk Actions
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-card/50 border border-white/10 p-1 rounded-xl mb-6">
          <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-xs">
            Inbox ({items.filter(i => i.status === 'inbox' || i.status === 'needs_action').length})
          </TabsTrigger>
          <TabsTrigger value="urgent" className="rounded-lg data-[state=active]:bg-destructive data-[state=active]:text-white font-bold text-xs">
            Urgent ({items.filter(i => i.priority === 'high' && i.status !== 'done').length})
          </TabsTrigger>
          <TabsTrigger value="done" className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-foreground font-bold text-xs">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-0">
          {(items.filter(i => i.status === 'inbox' || i.status === 'needs_action').length > 0) ? (
            items.filter(i => i.status === 'inbox' || i.status === 'needs_action').map(renderItem)
          ) : (
            <div className="text-center py-32 bg-card/20 rounded-3xl border border-dashed border-white/10">
              <div className="p-4 rounded-full bg-primary/5 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary/40" />
              </div>
              <h3 className="text-xl font-headline font-bold">Inbox Clear</h3>
              <p className="text-muted-foreground mt-2 max-w-xs mx-auto text-sm">AgentPilot is standing by for new watcher events.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4 mt-0">
          {items.filter(i => i.priority === 'high' && i.status !== 'done').map(renderItem)}
        </TabsContent>

        <TabsContent value="done" className="space-y-4 mt-0 opacity-60">
          {items.filter(i => i.status === 'done').map(renderItem)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
