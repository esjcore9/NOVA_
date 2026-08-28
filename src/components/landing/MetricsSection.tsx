import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import './MetricsSection.css';

export const MetricsSection: React.FC = () => {
  const metrics = [
    {
      value: '10x',
      label: 'Faster Roadmapping',
      description: 'From unedited voice notes and brainstorms to synchronized milestone roadmaps.',
      icon: TrendingUp,
    },
    {
      value: '0 min',
      label: 'Manual Filing & Tagging',
      description: 'NOVA automatically clusters context, files items, and maps dependencies.',
      icon: Clock,
    },
    {
      value: '94%',
      label: 'Fewer Dropped Tasks',
      description: 'Ambient monitoring ensures action items never slip through the cracks.',
      icon: ShieldCheck,
    },
    {
      value: '< 180ms',
      label: 'AI Stream Latency',
      description: 'Instant contextual responses without interrupting your focus stream.',
      icon: Zap,
    },
  ];

  return (
    <section id="metrics" className="nova-metrics">
      <Container size="xl">
        <div className="nova-metrics__header">
          <Badge variant="violet" dot icon={<Sparkles size={13} />}>
            Measured Impact
          </Badge>
          <h2 className="nova-metrics__title">
            Built for velocity. Engineered for calm.
          </h2>
          <p className="nova-metrics__subtitle">
            Experience the compounding advantage of an AI workspace that eliminates administrative friction.
          </p>
        </div>

        <div className="nova-metrics__grid">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard variant="surface" padding="lg" className="nova-metric-card">
                  <div className="nova-metric-card__icon-wrap">
                    <Icon size={20} className="nova-metric-icon" />
                  </div>
                  <div className="nova-metric-card__value text-gradient">{metric.value}</div>
                  <div className="nova-metric-card__label">{metric.label}</div>
                  <p className="nova-metric-card__desc">{metric.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
