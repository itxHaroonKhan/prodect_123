
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, TrendingUp, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { aiGeneratedCEOBriefing } from '@/ai/flows/ai-generated-ceo-briefing';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from "@/components/ui/scroll-area";

export function CEOBriefing() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await aiGeneratedCEOBriefing({
        businessGoalsMarkdown: "# Business Goals\nTarget: $10k",
        weeklyRevenue: 2450,
        monthlyTarget: 10000,
        monthlyCurrent: 4500,
        completedTasks: [
          { task: "Client A invoice", expectedDays: 1, actualDays: 1 },
          { task: "LinkedIn outreach", expectedDays: 2, actualDays: 4 }
        ],
        bankTransactions: [
          { description: "Vercel Hosting", amount: -142, date: new Date().toISOString() },
          { description: "Client B Payment", amount: 1500, date: new Date().toISOString() }
        ],
        periodStart: "2025-12-30",
        periodEnd: "2026-01-05",
        currentTimestamp: new Date().toISOString()
      });
      setBriefing(result.briefingContent);
      toast({
        title: "Briefing Ready",
        description: "Monday Morning CEO Briefing has been generated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to perform business audit.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-bold">Monday Morning CEO Briefing</h2>
          <p className="text-muted-foreground text-sm">Autonomous audit of bank transactions, tasks, and bottlenecks.</p>
        </div>
        <div className="flex gap-3">
          {briefing && (
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Download className="h-4 w-4 mr-2" /> Export MD
            </Button>
          )}
          <Button onClick={handleGenerate} disabled={isGenerating} className="glow-accent bg-accent hover:bg-accent/90 text-accent-foreground">
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "Auditing Systems..." : "Run Weekly Audit"}
          </Button>
        </div>
      </div>

      {!briefing ? (
        <Card className="glass-panel border-dashed py-20">
          <CardContent className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-accent/10">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-headline font-bold">No Audit Performed Yet</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Click "Run Weekly Audit" to have AgentPilot analyze your last 7 days of business activity, identify cost optimizations, and project revenue trends.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-panel overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <Badge className="bg-accent text-accent-foreground">PROACTIVE BRIEFING</Badge>
              <span className="text-xs text-muted-foreground">Generated {new Date().toLocaleDateString()}</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] w-full p-8">
              <div className="prose prose-invert max-w-none font-body leading-relaxed">
                <div className="whitespace-pre-wrap font-body text-foreground text-base">
                  {briefing}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {briefing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-panel bg-green-500/5 border-green-500/10">
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Proactive Suggestion</h4>
                <p className="text-xs text-muted-foreground mt-1">Found $142 in unused SaaS subscriptions. Shall I move them to Pending Approval for cancellation?</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-panel bg-amber-500/5 border-amber-500/10">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Bottleneck Detected</h4>
                <p className="text-xs text-muted-foreground mt-1">Project Beta outreach is taking 200% longer than expected. Recommend reassessing scope or delegating to sub-agent.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
