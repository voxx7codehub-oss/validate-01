import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  Users,
  DollarSign,
  Layers,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface ValidationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTemplate?: (templateId: string) => void;
}

export const ValidationGuideModal: React.FC<ValidationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'momtest' | 'mvp' | 'pricing' | 'faq'>('principles');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Founder Validation Playbook
              </h2>
              <p className="text-xs text-slate-500">
                How to validate before building the wrong product
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto gap-2">
          {[
            { id: 'principles', label: 'Core Principles', icon: Lightbulb },
            { id: 'momtest', label: 'The Mom Test', icon: Users },
            { id: 'mvp', label: 'MVP Scoping', icon: Layers },
            { id: 'pricing', label: 'Pricing & WTP', icon: DollarSign },
            { id: 'faq', label: 'Common Pitfalls', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1 leading-relaxed">
          {activeTab === 'principles' && (
            <div className="space-y-5">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-blue-900">
                <h4 className="font-semibold text-blue-950 mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" />
                  The Golden Rule of Idea Validation
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Startups rarely fail because they cannot build the technology. They fail because they build something nobody urgently wants or is willing to pay for.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">1</span>
                    Fall in Love with the Problem
                  </div>
                  <p className="text-xs text-slate-600">
                    Never lock yourself into a specific solution feature. Ask what pain your customer currently endures and what workarounds they spend money/time on today.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">2</span>
                    Disconfirm Your Hypotheses
                  </div>
                  <p className="text-xs text-slate-600">
                    Don't search for compliments or polite validation. Actively look for evidence that you might be wrong — it saves months of wasted coding.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">3</span>
                    Actions Over Opinions
                  </div>
                  <p className="text-xs text-slate-600">
                    What people <em>say</em> they will do ("Sure, I would buy that!") is worthless. What they <em>have done in the past 30 days</em> is ground truth.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">4</span>
                    Shrink Scope Aggressively
                  </div>
                  <p className="text-xs text-slate-600">
                    A true MVP is not a 6-month product build with 15 tabs. It is the fastest, simplest experiment that tests your single riskiest assumption.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'momtest' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">How to Conduct Neutral Customer Interviews</h3>
              <p className="text-xs text-slate-600">
                Based on Rob Fitzpatrick's <em>The Mom Test</em>: Formulate questions so that even your own mother cannot lie to you out of kindness.
              </p>

              <div className="space-y-3">
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-3.5">
                  <div className="text-xs font-semibold text-red-900 flex items-center gap-1.5 mb-1">
                    <X className="w-4 h-4 text-red-600" />
                    DON'T Ask Leading / Hypothetical Questions:
                  </div>
                  <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                    <li>"Would you buy an AI app that organizes your receipts?" <em>(Everyone says yes to be polite)</em></li>
                    <li>"Do you think $29/mo is a fair price for this idea?"</li>
                    <li>"Isn't it annoying when your invoices are late?"</li>
                  </ul>
                </div>

                <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-3.5">
                  <div className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    DO Ask About Past Concrete Behavior:
                  </div>
                  <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                    <li>"When was the last time this problem happened to you?"</li>
                    <li>"Walk me through what you did step-by-step to solve it."</li>
                    <li>"What tools or spreadsheets are you currently paying for to manage this?"</li>
                    <li>"What is the most frustrating part about the tool you use right now?"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mvp' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">The 3-Bucket MVP Strategy</h3>
              <p className="text-xs text-slate-600">
                To prevent scope creep, every feature idea must be categorized strictly into one of three buckets:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
                  <div className="font-bold text-xs text-blue-900 mb-1">1. MUST HAVE (Max 2-3 Core Features)</div>
                  <p className="text-xs text-blue-800">
                    The absolute minimum workflow required to prove whether customers receive the core value. If this works, the user gets value immediately without extra bells and whistles.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
                  <div className="font-bold text-xs text-amber-900 mb-1">2. SHOULD HAVE (Post-Validation Iterations)</div>
                  <p className="text-xs text-amber-800">
                    Important usability improvements (like advanced filters, export formats, dark mode) that can wait until the core hypothesis has paying or active users.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-xs text-slate-900 mb-1">3. LATER (Backlog Hypotheses)</div>
                  <p className="text-xs text-slate-600">
                    Features that sound exciting (enterprise single sign-on, AI custom avatars, multi-language) but distract you from validating the initial 10 customers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Testing Willingness to Pay (WTP)</h3>
              <p className="text-xs text-slate-600">
                You don't need a finished Stripe checkout to know if users will pay. Here are 3 proven pre-build tests:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="font-semibold text-xs text-slate-900">Letter of Intent (LOI)</div>
                  <p className="text-[11px] text-slate-600">
                    For B2B: Ask prospects to sign a non-binding letter agreeing to a pilot at $X/month once the MVP meets 2 agreed specs.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="font-semibold text-xs text-slate-900">Concierge Service</div>
                  <p className="text-[11px] text-slate-600">
                    Do the work manually for the first 3 customers and charge them upfront before writing any automated software.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="font-semibold text-xs text-slate-900">Pre-Order Deposit</div>
                  <p className="text-[11px] text-slate-600">
                    Ask customers to put down a refundable $10-$50 reservation deposit for early beta access and locked-in lifetime discounts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base mb-2">Common Startup Validation Traps</h3>

              <div className="p-3 border border-slate-200 rounded-lg space-y-1">
                <div className="font-semibold text-xs text-slate-900">"What if someone steals my idea?"</div>
                <p className="text-xs text-slate-600">
                  Execution and distribution are 99% of startup success. Established companies are busy with their own roadmap. Talking to users is the only way to build what they actually want.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg space-y-1">
                <div className="font-semibold text-xs text-slate-900">"Everyone I talked to said they like the idea, but nobody is signing up."</div>
                <p className="text-xs text-slate-600">
                  Politeness is the enemy of validation. Switch from asking "Would you use this?" to asking for a committed action: an intro to their CFO, a deposit, or a calendar booking for a pilot.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg space-y-1">
                <div className="font-semibold text-xs text-slate-900">"How many customer interviews do I need?"</div>
                <p className="text-xs text-slate-600">
                  Aim for 10 to 15 in-depth, 20-minute conversations. You will start hearing identical patterns and quotes by interview #8.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            VALIDATEAI Objective Framework
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Got it, Let's Validate
          </button>
        </div>
      </div>
    </div>
  );
};
