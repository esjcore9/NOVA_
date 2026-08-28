import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import clsx from 'clsx';
import './Navbar.css';

interface NavbarProps {
  onLaunchWorkspace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchWorkspace }) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Capabilities', href: '#features' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Impact', href: '#metrics' },
    { label: 'Manifesto', href: '#manifesto' },
  ];

  return (
    <header className={clsx('nova-nav-header', isScrolled && 'nova-nav-header--scrolled')}>
      <Container size="xl">
        <div className="nova-nav-bar">
          {/* Brand Logo */}
          <a href="#" className="nova-brand">
            <div className="nova-brand__icon-wrap">
              <svg viewBox="0 0 32 32" className="nova-brand__svg" fill="none">
                <rect width="32" height="32" rx="8" fill="#11111D" />
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#8B5CF6" strokeOpacity="0.4" />
                <path d="M16 7L23 16L16 25L9 16L16 7Z" fill="url(#brand-grad)" stroke="#B9A7FF" strokeWidth="1.2" />
                <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="brand-grad" x1="9" y1="7" x2="23" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.7" stopColor="#5B8CFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="nova-brand__title">
              NOVA<span className="nova-brand__dot">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nova-nav-links" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nova-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="nova-nav-actions">
            <Button
              variant="ghost"
              size="sm"
              className="nova-nav-btn-signin"
              onClick={onLaunchWorkspace}
            >
              Sign In
            </Button>

            <Button
              variant="primary"
              size="sm"
              glow
              rightIcon={<ArrowRight size={14} />}
              onClick={onLaunchWorkspace}
            >
              Launch Workspace
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="nova-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="nova-nav-mobile"
            >
              <div className="nova-nav-mobile__links">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nova-nav-mobile__link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="nova-nav-mobile__footer">
                <Button
                  variant="primary"
                  size="md"
                  glow
                  leftIcon={<Sparkles size={16} />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLaunchWorkspace();
                  }}
                  className="nova-btn--full"
                >
                  Launch Workspace
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};
