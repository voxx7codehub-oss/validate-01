import React, { useState } from 'react';
import { CustomerType, BusinessModelType, StartupProject } from '../types';
import { ArrowLeft, ArrowRight, Sparkles, Edit3, Zap, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';
import { STARTER_TEMPLATES, IdeaTemplate } from '../data/templates';

interface CreateIdeaWizardProps {
  onCancel: () => void;
  onSubmit: (projectData: Partial<StartupProject>) => void;
  initialData?: Partial<StartupProject>;
}

export const CreateIdeaWizard: React.FC<CreateIdeaWizardProps> = ({
  onCancel,
  onSubmit,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Idea
  const [startupName, setStartupName] = useState(initialData?.idea?.startupName || '');
  const [whatBuilding, setWhatBuilding] = useState(initialData?.idea?.whatBuilding || '');
  const [problemSolved, setProblemSolved] = useState(initialData?.idea?.problemSolved || '');
  const [whoExperiences, setWhoExperiences] = useState(initialData?.idea?.whoExperiences || '');

  // Step 2: Customer
  const [primaryCustomer, setPrimaryCustomer] = useState(
    initialData?.customerAnalysis?.primaryCustomer || ''
  );
  const [industry, setIndustry] = useState(initialData?.customerAnalysis?.industry || '');
  const [geography, setGeography] = useState(initialData?.customerAnalysis?.geography || 'Global / US');
  const [customerType, setCustomerType] = useState<CustomerType>(
    initialData?.customerAnalysis?.customerType || 'Startup'
  );

  // Step 3: Business
  const [solution, setSolution] = useState(initialData?.solution?.coreConcept || '');
  const [valueProposition, setValueProposition] = useState(
    initialData?.solution?.valueProposition || ''
  );
  const [businessModel, setBusinessModel] = useState<BusinessModelType>(
    initialData?.businessModel?.modelType || 'Subscription'
  );
  const [targetMarket, setTargetMarket] = useState(
    initialData?.marketAnalysis?.targetMarket || ''
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleApplyTemplate = (tpl: IdeaTemplate) => {
    setStartupName(tpl.data.startupName);
    setWhatBuilding(tpl.data.whatBuilding);
    setProblemSolved(tpl.data.problemSolved);
    setWhoExperiences(tpl.data.whoExperiences);
    setPrimaryCustomer(tpl.data.primaryCustomer);
    setIndustry(tpl.data.industry);
    setGeography(tpl.data.geography);
    setCustomerType(tpl.data.customerType);
    setSolution(tpl.data.solution);
    setValueProposition(tpl.data.valueProposition);
    setBusinessModel(tpl.data.businessModel);
    setTargetMarket(tpl.data.targetMarket);
    setErrors({});
  };

  const handleResetForm = () => {
    setStartupName('');
    setWhatBuilding('');
    setProblemSolved('');
    setWhoExperiences('');
    setPrimaryCustomer('');
    setIndustry('');
    setGeography('Global / US');
    setCustomerType('Startup');
    setSolution('');
    setValueProposition('');
    setBusinessModel('Subscription');
    setTargetMarket('');
    setErrors({});
    setCurrentStep(1);
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!whatBuilding.trim()) errs.whatBuilding = 'Please describe what you are building.';
    if (!problemSolved.trim()) errs.problemSolved = 'Please explain what problem it solves.';
    if (!whoExperiences.trim()) errs.whoExperiences = 'Please specify who experiences this problem.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!primaryCustomer.trim()) errs.primaryCustomer = 'Please specify your primary customer.';
    if (!industry.trim()) errs.industry = 'Please identify the industry or vertical.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!solution.trim()) errs.solution = 'Please describe the proposed solution.';
    if (!valueProposition.trim()) errs.valueProposition = 'Please summarize the core value proposition.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  const handleFinish = () => {
    const projectPayload: Partial<StartupProject> = {
      name: startupName.trim() || 'Untitled Startup',
      idea: {
        startupName: startupName.trim(),
        whatBuilding: whatBuilding.trim(),
        problemSolved: problemSolved.trim(),
        whoExperiences: whoExperiences.trim(),
        sourceType: 'USER INPUT',
        updatedAt: new Date().toISOString(),
      },
      problem: {
        statement: problemSolved.trim(),
        urgency: 'Medium',
        frequency: 'Weekly',
        currentAlternatives: [],
        costOfInaction: 'Lost time and unresolved operational friction',
        sourceType: 'USER INPUT',
      },
      customerAnalysis: {
        primaryCustomer: primaryCustomer.trim(),
        industry: industry.trim(),
        geography: geography.trim(),
        customerType: customerType,
        segments: [
          {
            id: `seg_${Date.now()}`,
            name: primaryCustomer.trim() || 'Primary Customer Segment',
            description: `Target customers operating in ${industry || 'the primary vertical'}`,
            customerType: customerType,
            primaryIndustry: industry.trim(),
            geography: geography.trim(),
            isPrimary: true,
            buyingFactors: ['Time savings', 'Direct financial ROI', 'Simplicity'],
            typicalObjections: ['Switching costs', 'Budget allocation'],
            sourceType: 'USER INPUT',
          },
        ],
        painPoints: [
          {
            id: `pain_${Date.now()}`,
            description: problemSolved.trim(),
            severity: 'Severe',
            frequency: 'Weekly',
            emotionalImpact: 'High friction and operational anxiety',
            sourceType: 'USER INPUT',
          },
        ],
        currentBehavior: `Currently addressing via manual processes or legacy alternatives.`,
        customerNeeds: ['Reliable outcome', 'Affordable pricing', 'Fast setup'],
        buyingFactors: ['Proven reliability', 'Transparent pricing', 'Support'],
        objections: ['Implementation overhead', 'Learning curve'],
        willingnessToPayNotes: 'Requires explicit customer interview verification.',
        interviewQuestions: [],
      },
      solution: {
        coreConcept: solution.trim() || whatBuilding.trim(),
        valueProposition: valueProposition.trim(),
        uniqueAdvantage: 'Targeted focus on the specific problem space.',
        assumedRisks: ['Customer willingness to switch', 'Execution complexity'],
        sourceType: 'USER INPUT',
      },
      businessModel: {
        modelType: businessModel,
        pricing: {
          strategy: 'Value-Based',
          tiers: [],
          rationale: `Monetization based on ${businessModel.toLowerCase()} structure.`,
          modelType: businessModel,
        },
        revenueStreams: [
          {
            id: `rev_${Date.now()}`,
            name: `${businessModel} Revenue`,
            modelType: businessModel,
            description: `Primary monetization via ${businessModel.toLowerCase()}`,
            estimatedContribution: 'Primary (100%)',
          },
        ],
        costStructure: ['Server hosting & infrastructure', 'Customer acquisition', 'Support & operations'],
        unitEconomicsNotes: 'Unit economics to be validated with early pilot cohorts.',
        goToMarketStrategy: {
          type: businessModel,
          channels: ['Direct founder outreach', 'Targeted communities', 'Organic content'],
          targetDuration: '30 days',
        },
      },
      marketAnalysis: {
        industry: industry.trim(),
        targetMarket: targetMarket.trim() || `The ${industry || 'target'} market segment`,
        overview: `Validation workspace focused on ${industry || 'the chosen domain'}.`,
        marketSize: {
          isVerified: false,
          unverifiedMessage: 'Market size information is not available yet. Connect a research provider or add verified research.',
        },
        trends: [],
        drivers: ['Need for automation', 'Rising workflow complexity'],
        challenges: ['Market fragmentation', 'Customer inertia'],
        opportunities: ['Underserved niche workflows', 'Modern AI capabilities'],
        dataPoints: [],
      },
      competitorAnalysis: {
        directCompetitors: [],
        indirectCompetitors: [],
        substitutes: [],
        gaps: [],
        differentiationPoints: [],
      },
      feasibilityAnalysis: {
        areas: [
          {
            area: 'Customer',
            status: 'Uncertain',
            summary: 'Customer willingness to switch from current alternatives must be tested.',
            reasons: ['Habitual reliance on spreadsheets/manual workarounds'],
            evidence: [],
            assumptions: ['Customers feel acute enough pain to adopt new tooling'],
          },
          {
            area: 'Product',
            status: 'Feasible',
            summary: 'Core MVP functionality can be built in a focused 2-3 week sprint.',
            reasons: ['Leverages proven web and cloud architectures'],
            evidence: [],
            assumptions: ['Core problem can be solved with minimal UI'],
          },
        ],
      },
      swotAnalysis: {
        strengths: [{ id: 's1', text: 'Clear specific problem focus' }],
        weaknesses: [{ id: 'w1', text: 'Unproven brand and early validation stage' }],
        opportunities: [{ id: 'o1', text: 'Modern workflow integration' }],
        threats: [{ id: 't1', text: 'Incumbents adding competing features' }],
      },
      risks: [
        {
          id: `risk_${Date.now()}_1`,
          title: 'Problem Severity Risk',
          description: 'The problem might not occur frequently or severely enough for customers to pay.',
          category: 'Customer',
          likelihood: 'Medium',
          impact: 'High',
          mitigation: 'Conduct 10+ neutral discovery interviews focused on past behavior.',
          validationAction: 'Customer interview sprint',
          status: 'Active',
          sourceType: 'USER INPUT',
        },
      ],
      assumptions: [
        {
          id: `assump_${Date.now()}_1`,
          statement: `${primaryCustomer || 'Target customers'} are actively frustrated by ${problemSolved || 'the current problem'}.`,
          category: 'Customer',
          priority: 'High',
          status: 'Unvalidated',
          evidence: '',
          validationMethod: 'Interview',
          sourceType: 'ASSUMPTION',
        },
      ],
      validationPlan: {
        experiments: [],
        recommendedActions: [],
        checklist: [
          {
            id: 'chk_1',
            title: 'Define clear customer persona',
            completed: Boolean(primaryCustomer.trim()),
            category: 'Customer',
          },
          {
            id: 'chk_2',
            title: 'Document specific problem statement',
            completed: Boolean(problemSolved.trim()),
            category: 'Problem',
          },
          {
            id: 'chk_3',
            title: 'Conduct 10 neutral customer discovery interviews',
            completed: false,
            category: 'Customer',
          },
          {
            id: 'chk_4',
            title: 'Map current alternative workarounds',
            completed: false,
            category: 'Competition',
          },
          {
            id: 'chk_5',
            title: 'Test willingness to pay with non-binding LOI or deposit',
            completed: false,
            category: 'Pricing',
          },
          {
            id: 'chk_6',
            title: 'Build and test Must-Have MVP only',
            completed: false,
            category: 'Product',
          },
        ],
      },
      mvpPlan: {
        coreHypothesisToTest: `Will ${primaryCustomer || 'target users'} adopt a simple focused solution to solve ${problemSolved || 'their primary pain'}?`,
        buildTargetDuration: '2-3 weeks',
        features: [
          {
            id: `f_${Date.now()}_1`,
            feature: 'Core Problem Workflow',
            description: valueProposition || 'The single primary task needed to deliver value.',
            priority: 'MUST HAVE',
            reason: 'Essential to prove whether the user achieves their desired outcome.',
            validationPurpose: 'Test if core utility alone solves the problem.',
            sourceType: 'USER INPUT',
          },
        ],
      },
      gtmPlan: {
        initialCustomer: primaryCustomer.trim() || 'Early adopter segment',
        positioning: valueProposition.trim() || 'Direct, specialized solution for specific friction.',
        acquisitionChannels: [
          {
            id: `ch_${Date.now()}_1`,
            channel: 'Direct Outreach',
            tactics: 'Personalized outreach to 30 ideal customer profiles.',
            expectedCost: 'Low',
            feasibility: 'High',
          },
        ],
        salesApproach: 'Founder-led consultative sales',
        launchExperiment: '5 Pilot customer cohort',
        firstAction: 'Schedule first 5 discovery calls',
      },
    };

    onSubmit(projectPayload);
  };

  const steps = [
    { num: 1, title: 'The Idea', desc: 'Problem & Target' },
    { num: 2, title: 'The Customer', desc: 'Segment & Industry' },
    { num: 3, title: 'The Business', desc: 'Solution & Model' },
    { num: 4, title: 'Review & Analyze', desc: 'Confirm & Validate' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Step {currentStep} of 4</span>
            <button
              onClick={handleResetForm}
              title="Reset all fields"
              className="text-xs text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* 1-Click Starter Template Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 mb-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              1-Click Idea Templates (Instant Fill):
            </span>
            <span className="text-[11px] text-blue-700 font-medium">Click to auto-fill</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {STARTER_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 border border-slate-200 rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>{tpl.name}</span>
                <span className="text-[10px] text-slate-400">({tpl.category.split('&')[0].trim()})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div
                key={s.num}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-white border-blue-600 shadow-sm ring-1 ring-blue-500/20'
                    : isDone
                    ? 'bg-blue-50/50 border-blue-200 text-slate-700'
                    : 'bg-white/60 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold">
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {s.num}
                    </span>
                  )}
                  <span className={`truncate ${isCurrent ? 'text-blue-600' : ''}`}>{s.title}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 hidden sm:block truncate">
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Card Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-6 space-y-6">
          {/* STEP 1: IDEA */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Define Your Startup Idea</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Focus on describing the concrete pain point and who experiences it in plain words.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Startup / Project Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. InvoiceFlow, EcoPack, PitchPulse"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  What are you building? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={whatBuilding}
                  onChange={(e) => setWhatBuilding(e.target.value)}
                  placeholder="e.g. An autonomous micro-invoicing tool for solo freelancers that predicts late payments and drafts polite follow-up reminders."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.whatBuilding ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.whatBuilding && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.whatBuilding}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">
                  Tip: Describe what the product does simply, without buzzwords like "uber for x" or "disruptive AI".
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  What specific problem does it solve? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                  placeholder="e.g. Freelancers spend 4+ unpaid hours every week tracking milestone approvals, chasing overdue invoices, and feeling awkward asking clients for money."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.problemSolved ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.problemSolved && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.problemSolved}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-1">
                  Tip: Focus on quantifiable friction: lost hours, wasted dollars, or emotional stress.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Who experiences this problem? <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={whoExperiences}
                  onChange={(e) => setWhoExperiences(e.target.value)}
                  placeholder="e.g. Solo freelance designers, software contractors, and boutique agencies"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.whoExperiences ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.whoExperiences && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.whoExperiences}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMER */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Identify Your Target Customer</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nailing a specific initial niche is critical for early customer interviews.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Primary Customer Profile <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={primaryCustomer}
                  onChange={(e) => setPrimaryCustomer(e.target.value)}
                  placeholder="e.g. Independent creative contractors with 3-10 active clients"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.primaryCustomer ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.primaryCustomer && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.primaryCustomer}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Industry / Vertical <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Design & Creative Services"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                      errors.industry ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.industry && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Geography
                  </label>
                  <input
                    type="text"
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                    placeholder="e.g. North America, Global, US & Europe"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Customer Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'B2B SMB', label: 'B2B SMB', desc: 'Small teams / businesses' },
                    { id: 'B2B Enterprise', label: 'Enterprise', desc: 'Large organizations' },
                    { id: 'B2C', label: 'B2C Consumers', desc: 'Individual end users' },
                    { id: 'Startup', label: 'Startups & Pros', desc: 'Founders & creators' },
                  ].map((ct) => (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => setCustomerType(ct.id as CustomerType)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        customerType === ct.id
                          ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{ct.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{ct.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUSINESS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Solution & Business Model</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  How will you solve the problem and generate sustainable revenue?
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Proposed Solution Concept <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="e.g. Zero-setup web app connecting Stripe with WhatsApp to automate milestone invoice escalations."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.solution ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.solution && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.solution}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Core Value Proposition <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={valueProposition}
                  onChange={(e) => setValueProposition(e.target.value)}
                  placeholder="e.g. Get paid 12 days faster and eliminate awkward client money conversations."
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 ${
                    errors.valueProposition ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.valueProposition && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">{errors.valueProposition}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Revenue / Business Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Subscription',
                    'Usage-Based',
                    'Marketplace',
                    'Freemium',
                    'One-Time',
                    'Enterprise License',
                  ].map((bm) => (
                    <button
                      key={bm}
                      type="button"
                      onClick={() => setBusinessModel(bm as BusinessModelType)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        businessModel === bm
                          ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {bm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Review & Launch Validation</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your parameters. VALIDATEAI will analyze your assumptions without hallucinating vanity metrics.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500 font-medium">Startup Title:</span>
                  <span className="font-bold text-slate-900">{startupName || 'Untitled Startup'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500 font-medium">Target Customer:</span>
                  <span className="font-bold text-slate-900">{primaryCustomer} ({customerType})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500 font-medium">Industry:</span>
                  <span className="font-bold text-slate-900">{industry}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500 font-medium">Business Model:</span>
                  <span className="font-bold text-slate-900">{businessModel}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 font-medium block mb-1">Core Problem Statement:</span>
                  <p className="text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                    {problemSolved}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950 text-xs flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Next up:</strong> VALIDATEAI will synthesize your validation backlog, draft 5 neutral customer interview questions, scope your 3-bucket MVP, and design empirical testing experiments.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-7 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Validation Plan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
