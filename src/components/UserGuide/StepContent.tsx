import React from 'react';
import styles from './UserGuide.module.css';
import type { AnimDirection, AnimPhase, GuideStep } from './types';

interface StepContentProps {
  step: GuideStep;
  phase: AnimPhase;
  direction: AnimDirection;
  children?: React.ReactNode;
}

function visualClass(phase: AnimPhase): string {
  if (phase === 'exiting') return `${styles.visualInner} ${styles.visualInnerExiting}`;
  if (phase === 'entering') return `${styles.visualInner} ${styles.visualInnerEntering}`;
  return styles.visualInner;
}

function contentClass(phase: AnimPhase, direction: AnimDirection): string {
  if (phase === 'idle') return styles.stepBody;
  if (phase === 'exiting') {
    return `${styles.stepBody} ${direction === 'forward' ? styles.stepBodyExitForward : styles.stepBodyExitBackward}`;
  }
  return `${styles.stepBody} ${direction === 'forward' ? styles.stepBodyEnterForward : styles.stepBodyEnterBackward}`;
}

const StepContent: React.FC<StepContentProps> = ({ step, phase, direction, children }) => (
  <>
    <div className={styles.visual} aria-hidden="true">
      <div className={visualClass(phase)}>
        {step.visual}
      </div>
    </div>

    <div className={styles.content}>
      <div className={contentClass(phase, direction)}>
        <h2 className={styles.stepTitle}>{step.title}</h2>
        <div className={styles.stepDescription}>{step.description}</div>
      </div>
      {children}
    </div>
  </>
);

export default StepContent;
