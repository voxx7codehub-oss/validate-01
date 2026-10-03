import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  Users,
  Target,
  Layers,
  FileText,
  Upload,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  Check,
} from 'lucide-react';
import { StartupProject } from '../types';
import { STARTER_TEMPLATES, IdeaTemplate } from '../data/templates';

interface HomepageProps {
  projects: StartupProject[];
  onStartValidating: () => void;
  onOpenProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onImportClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectTemplate?: (template: IdeaTemplate) => void;
  onOpenPlaybook?: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  projects,
  onStartValidating,
  onOpenProject,
  onDeleteProject,
  onDuplicateProject,
  onImportClick,
  onNavigateSection,
  onSelectTemplate,
  onOpenPlaybook,
}) => {
  const [projectSearch, setProjectSearch] = useState('');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const filteredProjects = projects.filter((p) =>
    (p.name || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
    (p.idea?.whatBuilding || '').toLowerCase().includes(projectSearch.toLowerCase()) ||
    (p.idea?.problemSolved || '').toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827]">
      {/* Top Bar / Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              V
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              VALIDATE<span className="text-blue-600">AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigateSection('templates')}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              Idea Templates
            </button>
            <button
              onClick={() => onNavigateSection('how-it-works')}
              className="hover:text-slate-900 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigateSection('framework')}
              className="hover:text-slate-900 transition-colors"
            >
              The Framework
            </button>
            {projects.length > 0 && (
              <button
                onClick={() => onNavigateSection('projects')}
                className="hover:text-slate-900 transition-colors font-semibold text-blue-600"
              >
                My Projects ({projects.length})
              </button>
            )}
          </nav>

          {/* Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenPlaybook && (
              <button
                onClick={onOpenPlaybook}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Validation Playbook
              </button>
            )}
            <button
              onClick={onImportClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              Import JSON
            </button>
            <button
              onClick={onStartValidating}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Validate Idea</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Stop building before validating • Save months of wasted engineering
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto" style={{ textWrap: 'balance' }}>
          Validate your startup idea <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            before you write a single line of code.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Analyze real customer pain points, uncover genuine competitors, formulate unbiased interview questions, and build a lean MVP test plan grounded in empirical evidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onStartValidating}
            className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Start Validating My Idea
            <ArrowRight className="w-4 h-4" />
          </button>
          {onOpenPlaybook && (
            <button
              onClick={onOpenPlaybook}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Read Founder Playbook
            </button>
          )}
        </div>

        {/* 1-Click Interactive Starter Templates Grid */}
        <div id="templates" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto text-left shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick-Start Interactive Demos
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Don't have an idea ready? Try a 1-click sample idea:
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click any card to load instant analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STARTER_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="group border border-slate-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-md bg-slate-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {tpl.category}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 font-mono">
                      {tpl.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {tpl.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 mb-2 font-medium">
                    {tpl.tagline}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Model: <strong className="text-slate-700">{tpl.data.businessModel}</strong>
                  </span>
                  <button
                    onClick={() => onSelectTemplate ? onSelectTemplate(tpl) : onStartValidating()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Test This Idea</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-12 px-6 max-w-6xl mx-auto border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Validation Workspaces</h2>
              <p className="text-xs text-slate-500">
                {projects.length} project{projects.length > 1 ? 's' : ''} saved privately in your local browser storage.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Filter projects..."
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>
              <button
                onClick={onStartValidating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                New Idea
              </button>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
              No projects match your filter "{projectSearch}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 text-base truncate">
                        {proj.name || 'Untitled Idea'}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(proj.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {proj.idea.whatBuilding || 'No description provided'}
                    </p>
                    <div className="text-[11px] text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Core Problem: </span>
                      <span className="line-clamp-1">{proj.idea.problemSolved || 'Unspecified'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenProject(proj.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onDuplicateProject(proj.id)}
                        title="Duplicate Project"
                        className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        title="Delete Project"
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">How VALIDATEAI Works</h2>
          <p className="text-sm text-slate-600">
            Most startups fail not from poor engineering, but from building something nobody urgently needs. VALIDATEAI brings institutional-grade validation to every founder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Uncover Hidden Assumptions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every pitch deck relies on hidden assumptions. We automatically extract customer, pricing, market, and technical assumptions into a prioritized validation backlog.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Neutral Customer Inquiries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leading questions ("Would you buy this?") produce false compliments. We formulate Mom Test compliant discovery questions focused strictly on past customer behavior.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">3-Bucket MVP Strategy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stop scope creep in its tracks. Categorize features strictly into MUST HAVE, SHOULD HAVE, and LATER so you can run live experiments in days rather than quarters.
            </p>
          </div>
        </div>
      </section>

      {/* Validation Readiness Mini-Quiz */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-4">
              <Award className="w-3.5 h-3.5 text-blue-300" />
              Quick Founder Self-Check
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
              "Have you spoken with 10 people who experienced this problem in the past 30 days?"
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setQuizAnswer(1)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  quizAnswer === 1
                    ? 'bg-emerald-500/20 border-emerald-400 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                }`}
              >
                <div className="font-bold text-sm mb-1 flex items-center justify-between">
                  <span>Yes, I have notes from 10+ calls</span>
                  {quizAnswer === 1 && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-xs text-slate-300">
                  Awesome! Use VALIDATEAI to extract competitive gaps, pricing models, and design your lean MVP.
                </p>
              </button>

              <button
                onClick={() => setQuizAnswer(2)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  quizAnswer === 2
                    ? 'bg-amber-500/20 border-amber-400 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                }`}
              >
                <div className="font-bold text-sm mb-1 flex items-center justify-between">
                  <span>Not yet, just starting out</span>
                  {quizAnswer === 2 && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-slate-300">
                  Perfect timing! VALIDATEAI will generate your neutral interview script so you don't waste time on biased questions.
                </p>
              </button>
            </div>

            <div className="mt-8 text-center sm:text-left">
              <button
                onClick={onStartValidating}
                className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2"
              >
                Start Validating Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 max-w-7xl mx-auto border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">VALIDATEAI</span>
          <span>•</span>
          <span>Open Startup Idea Validation Platform</span>
        </div>
        <div>
          <span>Local storage • Privacy first • No credit card required</span>
        </div>
      </footer>
    </div>
  );
};
