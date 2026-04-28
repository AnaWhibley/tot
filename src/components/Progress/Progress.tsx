import React from 'react';
import { type ProgressStep, StepState } from '../UserGuide/types';

interface ProgressProps {
  numbered?: boolean;
  progressLabel?: string;
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

const Progress: React.FC<ProgressProps> = ({
  numbered = false,
  progressLabel = 'Step',
  steps,
}) => (
  <div className="ds-progress" role="progressbar" aria-label="Guide progress">
    {steps.map((step, index) => {
      const isComplete = step.state === StepState.Complete;
      const isInProgress = step.state === StepState.InProgress;
      const cls = [
        'ds-progress__step',
        isComplete && 'ds-progress__step--complete',
        isInProgress && 'ds-progress__step--in-progress',
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div key={step.name} className={cls}>
          <div
            className="ds-progress__node"
            aria-label={`${progressLabel} ${index + 1}: ${step.state}`}
          >
            {numbered &&
              (isComplete ? <CheckIcon /> : <span>{index + 1}</span>)}
          </div>
          <span className="ds-progress__label">
            {progressLabel} {index + 1}
          </span>
        </div>
      );
    })}
  </div>
);

export default Progress;
