"use client";

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Overview } from '@/components/dashboard/Overview';
import { ActionCenter } from '@/components/dashboard/ActionCenter';
import { KnowledgeBase } from '@/components/dashboard/KnowledgeBase';
import { CEOBriefing } from '@/components/dashboard/CEOBriefing';
import { ApprovalHub } from '@/components/dashboard/ApprovalHub';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Bell, Activity } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#1F272E]">
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      
      <SidebarInset className="bg-transparent">
        <header className="h-16 px-8 flex items-center justify-between glass-panel sticky top-0 z-50 rounded-none border-t-0 border-x-0">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="hover:bg-white/5" />
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search vault, tasks, or knowledge..." 
                className="bg-white/5 border-white/10 pl-10 h-9 text-xs focus-visible:ring-primary focus-visible:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Digital FTE: Online</span>
            </div>

            <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full border-2 border-[#1F272E]" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold font-headline">Alex Rivers</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Chief Executive</p>
              </div>
              <Avatar className="h-9 w-9 border border-white/10 ring-2 ring-primary/20 transition-transform hover:scale-105 cursor-pointer">
                <AvatarImage src="https://picsum.photos/seed/ceo/200/200" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="p-8 pb-24">
          <div className="max-w-7xl mx-auto">
            {activeView === 'dashboard' && <Overview />}
            {activeView === 'actions' && <ActionCenter />}
            {activeView === 'approvals' && <ApprovalHub />}
            {activeView === 'knowledge' && <KnowledgeBase />}
            {activeView === 'briefing' && <CEOBriefing />}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
