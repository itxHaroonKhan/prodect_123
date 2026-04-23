
"use client";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  CheckCircle, 
  BookOpen, 
  ShieldCheck, 
  Settings, 
  Command,
  FileBadge,
  MessageSquare,
  Zap
} from "lucide-react";
import { useVault } from "@/lib/vault-store";

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { counts } = useVault();

  return (
    <Sidebar className="border-r border-white/5 bg-[#171d24]">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary glow-primary flex items-center justify-center">
            <Command className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-headline font-bold tracking-tight">AgentPilot</h1>
            <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">Digital FTE v0.1</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Core Operations</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeView === 'dashboard'} 
                onClick={() => setActiveView('dashboard')}
                className="hover:bg-white/5"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeView === 'actions'} 
                onClick={() => setActiveView('actions')}
                className="hover:bg-white/5"
              >
                <BrainCircuit className="h-4 w-4" />
                <span>Action Center</span>
                {counts.needs_action > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-[10px] px-1.5 rounded-full font-bold">
                    {counts.needs_action}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeView === 'approvals'} 
                onClick={() => setActiveView('approvals')}
                className="hover:bg-white/5"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Approval Hub</span>
                {counts.pending_approval > 0 && (
                  <span className="ml-auto bg-accent text-accent-foreground text-[10px] px-1.5 rounded-full font-bold">
                    {counts.pending_approval}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-white/5" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Knowledge Base</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeView === 'briefing'} 
                onClick={() => setActiveView('briefing')}
                className="hover:bg-white/5"
              >
                <FileBadge className="h-4 w-4" />
                <span>CEO Briefing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={activeView === 'knowledge'} 
                onClick={() => setActiveView('knowledge')}
                className="hover:bg-white/5"
              >
                <BookOpen className="h-4 w-4" />
                <span>Company OS</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-white/5" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Integrations</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-white/5 opacity-50 cursor-not-allowed">
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Sync</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-white/5 opacity-50 cursor-not-allowed">
                <Zap className="h-4 w-4" />
                <span>MCP Servers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-white/5">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Watcher Active</span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-tight">Listening for Gmail, WhatsApp, and Filesystem events...</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
