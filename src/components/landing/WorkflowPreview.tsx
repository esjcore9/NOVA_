import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Cpu, ListTodo, CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import './WorkflowPreview.css';

interface WorkflowPreviewProps {
  onLaunchWorkspace: () => void;
}

export const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ onLaunchWorkspace }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'messy-ideas',
      number: '01',
      title: 'Messy Ideas',
      subtitle: 'Raw & Unstructured',
      icon: FileText,
      description: 'Jot unedited thoughts, paste screenshots, record quick voice memos, or import raw meeting summaries without organizing anything.',
      snippet: {
        title: 'Raw Thought Capture',
        type: 'input',
        items: [
          '• Need to redesign mobile onboarding flow - 32% dropoff on step 2',
          '• Ask Sarah for new Figma components before Friday sync',
          '• Check latency spikes on auth service (P99 > 850ms)',
        ],
      },
    },
    {
      id: 'ai-understanding',
      number: '02',
      title: 'AI Understanding',
      subtitle: 'Contextual Synthesis',
      icon: Cpu,
      description: 'NOVA parses natural language, extracts entities, maps dependencies, and recognizes project context automatically.',
      snippet: {
        title: 'Semantic Context Analysis',
        type: 'processing',
        items: [
          '✦ Detected 2 Projects: [Mobile App] & [Backend Infra]',
          '✦ Extracted 3 Action Items & 1 Dependency blocker',
          '✦ Priority assigned: High (Auth Latency) & Medium (Onboarding)',
        ],
      },
    },
    {
      id: 'structured-plan',
      number: '03',
      title: 'Structured Plan',
      subtitle: 'Actionable Architecture',
      icon: ListTodo,
      description: 'Your ideas are translated into clear milestones, prioritized work items, estimated timelines, and linked documentation.',
      snippet: {
        title: 'Generated Project Roadmap',
        type: 'plan',
        items: [
          '✓ Milestone 1: Auth Redis Caching Optimization [Backend]',
          '✓ Milestone 2: Onboarding Drop-off UX Revision [Design]',
          '✓ Auto-scheduled: Review meeting sync with Sarah for Friday 2pm',
        ],
      },
    },
    {
      id: 'completed-action',
      number: '04',
      title: 'Completed Action',
      subtitle: 'Automated Momentum',
      icon: CheckCircle,
      description: 'Tasks sync directly to execution pipelines, notifications keep teams unblocked, and progress reports draft automatically.',
      snippet: {
        title: 'Execution & Velocity Sync',
        type: 'complete',
        items: [
          '★ 100% Roadmap aligned across team workspaces',
          '★ Blockers eliminated before standup',
          '★ Real-time progress dashboard updated',
        ],
      },
    },
  ];

  return (
    <section id="workflow" className="nova-workflow">
      <Container size="xl">
        <div className="nova-workflow__header">
          <Badge variant="violet" dot icon={<Sparkles size={13} />}>
            The NOVA Lifecycle
          </Badge>
          <h2 className="nova-workflow__title">
            The straight line from thought to done.
          </h2>
          <p className="nova-workflow__subtitle">
            Experience the 4-stage continuum that turns chaotic mental load into finished outcomes.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="nova-workflow__nav">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`nova-workflow-tab ${isActive ? 'nova-workflow-tab--active' : ''}`}
              >
                <div className="nova-workflow-tab__num">{step.number}</div>
                <div className="nova-workflow-tab__content">
                  <div className="nova-workflow-tab__title-row">
                    <Icon size={16} className="nova-workflow-tab__icon" />
                    <span className="nova-workflow-tab__title">{step.title}</span>
                  </div>
                  <span className="nova-workflow-tab__sub">{step.subtitle}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="nova-workflow-tab__arrow-wrap">
                    <ArrowRight size={14} className="nova-workflow-tab__arrow" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Visualizer */}
        <div className="nova-workflow__stage-display">
          <GlassCard variant="glow" padding="lg" className="nova-workflow__card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="nova-workflow-detail"
              >
                <div className="nova-workflow-detail__info">
                  <div className="nova-workflow-detail__badge-row">
                    <Badge variant="violet">Phase {steps[activeStep].number}</Badge>
                    <span className="nova-workflow-detail__tag">{steps[activeStep].subtitle}</span>
                  </div>
                  <h3 className="nova-workflow-detail__heading">{steps[activeStep].title}</h3>
                  <p className="nova-workflow-detail__desc">{steps[activeStep].description}</p>
                  
                  <Button
                    variant="primary"
                    size="md"
                    glow
                    rightIcon={<ArrowRight size={16} />}
                    onClick={onLaunchWorkspace}
                  >
                    Test in Workspace
                  </Button>
                </div>

                <div className="nova-workflow-detail__terminal">
                  <div className="nova-terminal-top">
                    <span className="nova-terminal-file">{steps[activeStep].snippet.title}</span>
                    <Badge variant="subtle" dot>Live Preview</Badge>
                  </div>
                  <div className="nova-terminal-body">
                    {steps[activeStep].snippet.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="nova-terminal-line"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
};
