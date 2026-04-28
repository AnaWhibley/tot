import React from 'react';
import Progress from '../Progress/Progress';
import { type GuideConfig, type ProgressStep, StepState } from './types';

interface ProgressWrapperProps {
  steps: GuideConfig;
  currentStep: number;
}

function stepState(index: number, current: number): StepState {
  if (index < current) return StepState.Complete;
  if (index === current) return StepState.InProgress;
  return StepState.NotStarted;
}

const ProgressWrapper: React.FC<ProgressWrapperProps> = ({ steps, currentStep }) => {
  const progressSteps: ProgressStep[] = steps.map((step, i) => ({
    name: step.id,
    state: stepState(i, currentStep),
  }));

  return (
    <Progress
      numbered
      progressLabel="Step"
      steps={progressSteps}
    />
  );
};

export default ProgressWrapper;
