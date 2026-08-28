import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FeatureCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  previewType?: 'capture' | 'organize' | 'action' | 'automation';
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  status: 'input' | 'processing' | 'plan' | 'complete';
  badge: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  accent?: 'violet' | 'blue' | 'lavender';
}
