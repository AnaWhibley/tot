import React from 'react';
import type { AnimDirection, AnimPhase, GuideStep } from './types';

interface StepContentProps {
  step: GuideStep;
  phase: AnimPhase;
  direction: AnimDirection;
  children?: React.ReactNode;
}

function visualClass(phase: AnimPhase): string {
  if (phase === 'exiting') return 'ug-visual__inner ug-visual__inner--exiting';
  if (phase === 'entering') return 'ug-visual__inner ug-visual__inner--entering';
  return 'ug-visual__inner';
}

function contentClass(phase: AnimPhase, direction: AnimDirection): string {
  if (phase === 'idle') return 'ug-step-body';
  return `ug-step-body ug-step-body--${phase}-${direction}`;
}

const StepContent: React.FC<StepContentProps> = ({ step, phase, direction, children }) => (
  <>
    <div className="ug-visual" aria-hidden="true">
      <div className={visualClass(phase)}>
        {step.visual}
      </div>
    </div>

    <div className="ug-content">
      <div className={contentClass(phase, direction)}>
        <h2 className="ug-step-title">{step.title}</h2>
        <div className="ug-step-description">{step.description}</div>
      </div>
      {children}
    </div>
  </>
);

export default StepContent;
