import React from 'react';
import { motion } from 'framer-motion';
import { Mic, BrainCircuit, CheckSquare2, BellRing, Sparkles, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import './FeaturesGrid.css';

interface FeaturesGridProps {
  onExploreFeature?: (featureId: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onExploreFeature }) => {
  const features = [
    {
      id: 'capture',
      title: 'Capture Everything',
      tagline: 'Frictionless intake of raw thought',
      description: 'Voice memos, quick bullet dumps, scattered links, or meeting transcripts. Drop anything in without worrying about formatting, tags, or manual filing.',
      icon: Mic,
      badge: 'Zero Friction',
      preview: {
        type: 'audio-note',
        content: 'Audio recorded (0:42) → "Align Q3 design sprint with engineering velocity"',
        tag: 'Voice & Text',
      },
    },
    {
      id: 'organize',
      title: 'AI Organizes It',
      tagline: 'Instant contextual clustering',
      description: 'NOVA automatically detects semantic relationships, clusters fragmented ideas, extracts action items, and connects them directly to active workspaces.',
      icon: BrainCircuit,
      badge: 'Auto-Clustered',
      preview: {
        type: 'cluster',
        content: 'Synthesized 5 fragments into #Project-Alpha Workspace',
        tag: 'Context Mesh',
      },
    },
    {
      id: 'action',
      title: 'Turn Ideas Into Action',
      tagline: 'From unstructured ideas to executable plans',
      description: 'Convert high-level brainstorming notes into prioritized tasks, structured milestones, timeline dependencies, and checklists with instant clarity.',
      icon: CheckSquare2,
      badge: 'Execution Ready',
      preview: {
        type: 'task-breakdown',
        content: 'Milestone: Architecture Review (4 Tasks • 2 Dependencies • High Priority)',
        tag: 'Action Plan',
      },
    },
    {
      id: 'automation',
      title: 'Stay Ahead Automatically',
      tagline: 'Proactive ambient workspace intelligence',
      description: 'Background intelligence identifies dependencies, flags upcoming blockers, tracks velocity, and drafts summaries before you even have to ask.',
      icon: BellRing,
      badge: 'Proactive',
      preview: {
        type: 'insight',
        content: 'Insight: Task "API Contract" is blocking 2 downstream deliverables',
        tag: 'Ambient Monitor',
      },
    },
  ];

  return (
    <section id="features" className="nova-features">
      <Container size="xl">
        <div className="nova-features__header">
          <Badge variant="violet" dot icon={<Sparkles size={13} />}>
            Core Capabilities
          </Badge>
          <h2 className="nova-features__title">
            Built for how your mind actually works.
          </h2>
          <p className="nova-features__subtitle">
            Most tools force you to structure your thinking upfront. NOVA meets you at the moment of inspiration and turns chaos into momentum.
          </p>
        </div>

        <div className="nova-features__grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard
                  variant="interactive"
                  padding="lg"
                  className="nova-feature-card"
                  onClick={() => onExploreFeature && onExploreFeature(feature.id)}
                >
                  <div className="nova-feature-card__top">
                    <div className="nova-feature-card__icon-box">
                      <Icon size={22} className="nova-feature-icon" />
                    </div>
                    <div className="nova-feature-card__meta">
                      <Badge variant="subtle">{feature.badge}</Badge>
                      <ArrowUpRight size={16} className="nova-feature-card__arrow" />
                    </div>
                  </div>

                  <h3 className="nova-feature-card__title">{feature.title}</h3>
                  <p className="nova-feature-card__tagline">{feature.tagline}</p>
                  <p className="nova-feature-card__description">{feature.description}</p>

                  {/* Micro Visual Card */}
                  <div className="nova-feature-card__preview">
                    <div className="nova-feature-preview__header">
                      <span className="nova-feature-preview__tag">{feature.preview.tag}</span>
                      <span className="nova-feature-preview__status" />
                    </div>
                    <div className="nova-feature-preview__content">
                      {feature.preview.content}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
