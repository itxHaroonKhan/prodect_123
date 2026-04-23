"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVault } from "@/lib/vault-store";
import { TrendingUp, DollarSign, Target, Activity, Clock, Cpu, Server, Database } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const REVENUE_DATA = [
  { day: 'Mon', amount: 450 },
  { day: 'Tue', amount: 800 },
  { day: 'Wed', amount: 600 },
  { day: 'Thu', amount: 1100 },
  { day: 'Fri', amount: 950 },
  { day: 'Sat', amount: 400 },
  { day: 'Sun', amount: 200 },
];

const chartConfig = {
  amount: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};

export function Overview() {
  const { revenue, items } = useVault();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mtdPercent = (revenue.mtd / revenue.target) * 100;
  const growth = ((revenue.week - revenue.prevWeek) / revenue.prevWeek) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel border-primary/20 glow-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Weekly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">${revenue.week.toLocaleString()}</div>
            <p className="text-xs text-accent flex items-center mt-1 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> +{growth.toFixed(1)}% vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">MTD Performance</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">${revenue.mtd.toLocaleString()}</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>{mtdPercent.toFixed(0)}% of goal</span>
                <span>${revenue.target.toLocaleString()}</span>
              </div>
              <Progress value={mtdPercent} className="h-1.5 bg-white/5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Watchers</CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">4/4 Online</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GMAIL</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">WHATSAPP</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">FS-DROP</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">BANK</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Agent Load</CardTitle>
            <Cpu className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">12%</div>
            <p className="text-xs text-muted-foreground mt-1">Ralph Wiggum loop: Idle</p>
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 w-[12%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-panel lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Revenue Velocity</CardTitle>
            <CardDescription>Visualizing performance trends for the current week.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--foreground)/.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Agent Infrastructure</CardTitle>
            <CardDescription>Local-first node health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Vault Sync</p>
                  <p className="text-[10px] text-muted-foreground">Obsidian Local Mode</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">ENCRYPTED</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-accent/10 text-accent">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">MCP Gateway</p>
                  <p className="text-[10px] text-muted-foreground">8 servers attached</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h4>
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_hsl(var(--primary))]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {mounted ? new Date(item.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
