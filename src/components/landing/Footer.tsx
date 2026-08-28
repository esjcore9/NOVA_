import React from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { GlassCard } from '@/components/common/GlassCard';
import './Footer.css';

interface FooterProps {
  onLaunchWorkspace: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchWorkspace }) => {
  return (
    <footer className="nova-footer">
      <Container size="xl">
        {/* Pre-footer High Impact CTA Card */}
        <div className="nova-footer__cta-wrap">
          <GlassCard variant="glow" padding="lg" className="nova-footer-cta-card">
            <div className="nova-footer-cta__content">
              <Badge variant="violet" dot icon={<Sparkles size={13} />}>
                Instant Access
              </Badge>
              <h2 className="nova-footer-cta__title">
                Ready to experience clarity at the speed of thought?
              </h2>
              <p className="nova-footer-cta__subtitle">
                Join the next generation of builders turning raw ideas into executed plans.
              </p>
              <div className="nova-footer-cta__actions">
                <Button
                  variant="primary"
                  size="lg"
                  glow
                  rightIcon={<ArrowRight size={18} />}
                  onClick={onLaunchWorkspace}
                >
                  Open NOVA Workspace
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Footer Bottom Bar */}
        <div className="nova-footer__bottom">
          <div className="nova-footer__brand-col">
            <div className="nova-brand">
              <div className="nova-brand__icon-wrap">
                <svg viewBox="0 0 32 32" className="nova-brand__svg" fill="none">
                  <rect width="32" height="32" rx="8" fill="#11111D" />
                  <path d="M16 7L23 16L16 25L9 16L16 7Z" fill="#8B5CF6" stroke="#B9A7FF" strokeWidth="1.2" />
                  <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="nova-brand__title">
                NOVA<span className="nova-brand__dot">.</span>
              </span>
            </div>
            <p className="nova-footer__tagline">
              The intelligent ambient workspace for high-velocity teams and independent creators.
            </p>
          </div>

          <div className="nova-footer__status-col">
            <div className="nova-status-badge">
              <span className="nova-status-dot" />
              <span>Ambient Core 2.0: Active</span>
            </div>
            <div className="nova-footer__copy">
              © {new Date().getFullYear()} NOVA Workspace. Crafted with <Heart size={12} className="nova-heart" /> for builders.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
