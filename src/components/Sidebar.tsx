import React from 'react';
import {
  LayoutDashboard,
  Lightbulb,
  TrendingUp,
  Users,
  Compass,
  Briefcase,
  CheckSquare,
  FileText,
  Settings,
  X,
  ArrowLeft,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export type WorkspaceTab =
  | 'dashboard'
  | 'my-idea'
  | 'market'
  | 'customers'
  | 'competitors'
  | 'business'
  | 'validation'
  | 'report'
  | 'settings';

interface SidebarProps {
  activeTab: WorkspaceTab;
  onSelectTab: (tab: WorkspaceTab) => void;
  projectName: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onGoHome?: () => void;
  onOpenPlaybook?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  projectName,
  isMobileOpen,
  onCloseMobile,
  onGoHome,
  onOpenPlaybook,
}) => {
  const navItems: { id: WorkspaceTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-idea', label: 'My Idea', icon: Lightbulb },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'market', label: 'Market Dynamics', icon: TrendingUp },
    { id: 'competitors', label: 'Competitors & Gaps', icon: Compass },
    { id: 'business', label: 'Business Model', icon: Briefcase },
    { id: 'validation', label: 'Validation Plan & MVP', icon: CheckSquare },
    { id: 'report', label: 'Executive Report', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-64 select-none">
      {/* Brand & Project indicator */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
              V
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              VALIDATE<span className="text-blue-600">AI</span>
            </span>
          </div>
          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>All Projects</span>
          </button>
        )}

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <div className="text-xs font-bold text-slate-900 truncate">
            {projectName || 'Untitled Project'}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Validation Workspace
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (isMobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Workspace Footer status & Playbook */}
      <div className="p-3 border-t border-slate-200 space-y-2 bg-slate-50/50">
        {onOpenPlaybook && (
          <button
            onClick={onOpenPlaybook}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60 rounded-xl transition-colors text-left"
          >
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">Founder Playbook</span>
          </button>
        )}
        <div className="text-[10px] text-slate-400 px-1">
          <div>Local Browser Vault • Zero Cloud Lockin</div>
        </div>
      </div>
    </div>
  );
};
