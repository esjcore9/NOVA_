import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CornerDownLeft, Zap, CheckCircle2, Bot, Layers } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { GlassCard } from '@/components/common/GlassCard';
import './HeroSection.css';

interface HeroSectionProps {
  onLaunchWorkspace: () => void;
}

const SAMPLE_PROMPTS = [
  {
    input: "Organize raw notes from investor call into 3 strategic milestones and assign tasks",
    tag: "Strategy",
    output: "Generated 3 Milestones • 8 Action Items • Risk Matrix attached",
  },
  {
    input: "Turn scattered bullet points into a sprint backlog with priority tags and timelines",
    tag: "Execution",
    output: "Created 12 User Stories • Estimated 24 Story Points • Synced to Board",
  },
  {
    input: "Synthesize quarterly customer feedback transcripts into prioritized roadmap items",
    tag: "Synthesis",
    output: "Identified 4 Critical Themes • Scored by Impact vs Effort",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchWorkspace }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handlePromptSelect = (index: number) => {
    if (index === activePromptIndex) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      setActivePromptIndex(index);
      setIsSynthesizing(false);
    }, 280);
  };

  return (
    <section className="nova-hero">
      <Container size="xl">
        <div className="nova-hero__content">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="nova-hero__badge-wrap"
          >
            <Badge variant="violet" dot icon={<Sparkles size={13} />}>
              NOVA 2.0 AI Workspace
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="nova-hero__title"
          >
            Where messy ideas become <br />
            <span className="text-gradient">structured execution.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="nova-hero__subtitle"
          >
            Capture unstructured thoughts instantly. NOVA’s ambient AI intelligence organizes 
            the chaos, creates synchronized execution plans, and keeps your projects moving automatically.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="nova-hero__cta-group"
          >
            <Button
              variant="primary"
              size="lg"
              glow
              rightIcon={<ArrowRight size={18} />}
              onClick={onLaunchWorkspace}
            >
              Start in Workspace
            </Button>
            <a href="#workflow">
              <Button variant="secondary" size="lg">
                Explore Workflow
              </Button>
            </a>
          </motion.div>

          {/* Interactive AI Synthesis Teaser Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="nova-hero__card-wrapper"
          >
            <GlassCard variant="glow" padding="none" className="nova-hero__glass-card">
              {/* Window Header */}
              <div className="nova-card-header">
                <div className="nova-card-dots">
                  <span className="nova-dot nova-dot--red" />
                  <span className="nova-dot nova-dot--yellow" />
                  <span className="nova-dot nova-dot--green" />
                </div>
                <div className="nova-card-title-tab">
                  <Bot size={14} className="nova-card-title-icon" />
                  <span>nova-agent // ambient-synthesis</span>
                </div>
                <div className="nova-card-status">
                  <span className="nova-card-status-pulse" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="nova-card-body">
                {/* Prompt Selector Pills */}
                <div className="nova-prompt-pills">
                  <span className="nova-prompt-pills__label">Quick Scenario:</span>
                  {SAMPLE_PROMPTS.map((p, idx) => (
                    <button
                      key={p.tag}
                      onClick={() => handlePromptSelect(idx)}
                      className={`nova-prompt-pill ${activePromptIndex === idx ? 'nova-prompt-pill--active' : ''}`}
                    >
                      {p.tag}
                    </button>
                  ))}
                </div>

                {/* Simulated AI Prompt Box */}
                <div className="nova-ai-box">
                  <div className="nova-ai-box__input-row">
                    <div className="nova-ai-box__sparkle-icon">
                      <Sparkles size={16} />
                    </div>
                    <div className="nova-ai-box__text">
                      {SAMPLE_PROMPTS[activePromptIndex].input}
                    </div>
                    <button
                      className="nova-ai-box__return-btn"
                      onClick={onLaunchWorkspace}
                      title="Run in Workspace"
                    >
                      <CornerDownLeft size={14} />
                    </button>
                  </div>

                  {/* AI Synthesis Stream Result */}
                  <AnimatePresence mode="wait">
                    {!isSynthesizing ? (
                      <motion.div
                        key={activePromptIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="nova-ai-box__result"
                      >
                        <div className="nova-result-item">
                          <CheckCircle2 size={15} className="nova-result-icon--success" />
                          <span className="nova-result-text">
                            {SAMPLE_PROMPTS[activePromptIndex].output}
                          </span>
                        </div>
                        <div className="nova-result-action">
                          <Badge variant="subtle" icon={<Layers size={11} />}>
                            Ready to Execute
                          </Badge>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="nova-ai-box__synthesizing">
                        <Zap size={14} className="nova-synth-icon" />
                        <span>Synthesizing roadmap...</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
