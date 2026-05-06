import React from 'react';
import styles from './Progress.module.css';
import { type ProgressStep, StepState } from '../UserGuide/types';

interface ProgressProps {
  numbered?: boolean;
  steps: ProgressStep[];
}

const CheckIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 6.5L4.5 9L10 3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Progress: React.FC<ProgressProps> = ({ numbered = false, steps }) => (
  <div className={styles.progress} role="progressbar" aria-label="Guide progress">
    {steps.map((step, index) => {
      const isComplete = step.state === StepState.Complete;
      const isInProgress = step.state === StepState.InProgress;
      const cls = [
        styles.step,
        isComplete && styles.stepComplete,
        isInProgress && styles.stepInProgress,
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div key={step.id} className={cls}>
          <div className={styles.node} aria-label={`${step.name}: ${step.state}`}>
            {numbered && (isComplete ? <CheckIcon /> : <span>{index + 1}</span>)}
          </div>
          <span className={styles.label}>{step.name}</span>
        </div>
      );
    })}
  </div>
);

export default Progress;
