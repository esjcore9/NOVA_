import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FabricBackground } from '@/components/landing/FabricBackground';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { WorkflowPreview } from '@/components/landing/WorkflowPreview';
import { MetricsSection } from '@/components/landing/MetricsSection';
import { Footer } from '@/components/landing/Footer';
import { Container } from '@/components/common/Container';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Sparkles, ArrowLeft, LayoutDashboard, Clock, Layers, FolderKanban } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');

  const handleLaunchWorkspace = () => {
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nova-app">
      {/* Dynamic Digital-Fabric Micro-Grid Canvas */}
      <FabricBackground />

      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="nova-app__landing"
          >
            <Navbar onLaunchWorkspace={handleLaunchWorkspace} />
            <main>
              <HeroSection onLaunchWorkspace={handleLaunchWorkspace} />
              <FeaturesGrid />
              <WorkflowPreview onLaunchWorkspace={handleLaunchWorkspace} />
              <MetricsSection />
            </main>
            <Footer onLaunchWorkspace={handleLaunchWorkspace} />
          </motion.div>
        ) : (
          <motion.div
            key="workspace-placeholder"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="nova-app__workspace-preview"
          >
            <header className="nova-preview-header">
              <Container size="xl">
                <div className="nova-preview-header__bar">
                  <Button
                    variant="glass"
                    size="sm"
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={handleBackToLanding}
                  >
                    Back to Landing Page
                  </Button>
                  <div className="nova-preview-header__title">
                    <Sparkles size={16} className="nova-preview-sparkle" />
                    <span>NOVA Workspace // Phase 2 Gateway</span>
                  </div>
                  <Badge variant="violet" dot>
                    Phase 1 Complete
                  </Badge>
                </div>
              </Container>
            </header>

            <main className="nova-preview-main">
              <Container size="md">
                <GlassCard variant="glow" padding="lg" className="nova-preview-card">
                  <div className="nova-preview-card__icon">
                    <LayoutDashboard size={36} />
                  </div>
                  <Badge variant="violet">Phase 2: NOVA Workspace</Badge>
                  <h1 className="nova-preview-card__title">
                    Workspace Module Ready for Phase 2
                  </h1>
                  <p className="nova-preview-card__desc">
                    Phase 1 foundation, design tokens, digital-fabric ripple background, and landing page architecture are now fully operational.
                  </p>

                  <div className="nova-preview-milestones">
                    <div className="nova-milestone-item">
                      <FolderKanban size={18} className="nova-milestone-icon" />
                      <div>
                        <div className="nova-milestone-label">Sidebar & Project Matrix</div>
                        <div className="nova-milestone-sub">Upcoming in Phase 2</div>
                      </div>
                    </div>
                    <div className="nova-milestone-item">
                      <Clock size={18} className="nova-milestone-icon" />
                      <div>
                        <div className="nova-milestone-label">Tasks & Velocity Progress</div>
                        <div className="nova-milestone-sub">Upcoming in Phase 2</div>
                      </div>
                    </div>
                    <div className="nova-milestone-item">
                      <Layers size={18} className="nova-milestone-icon" />
                      <div>
                        <div className="nova-milestone-label">AI Insights Feed</div>
                        <div className="nova-milestone-sub">Upcoming in Phase 2</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    glow
                    leftIcon={<ArrowLeft size={16} />}
                    onClick={handleBackToLanding}
                  >
                    Return to Landing Page
                  </Button>
                </GlassCard>
              </Container>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
