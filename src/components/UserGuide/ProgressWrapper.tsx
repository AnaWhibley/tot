import React from 'react';
import Progress from '../Progress/Progress';
import { type GuideConfig, type ProgressStep, StepState } from './types';

interface ProgressWrapperProps {
  steps: GuideConfig;
  currentStep: number;
}

const ProgressWrapper: React.FC<ProgressWrapperProps> = ({ steps, currentStep }) => {
  // Collapse pages that share the same id into one progress node.
  // The node is InProgress if currentStep falls within its page range,
  // Complete if past it, NotStarted if before it.
  type Group = { id: string; name: string; min: number; max: number };
  const groups: Group[] = [];
  const seen: Record<string, number> = {};

  steps.forEach((step, i) => {
    if (seen[step.id] === undefined) {
      seen[step.id] = groups.length;
      groups.push({ id: step.id, name: step.name, min: i, max: i });
    } else {
      groups[seen[step.id]].max = i;
    }
  });

  const progressSteps: ProgressStep[] = groups.map(g => {
    let state: StepState;
    if (currentStep > g.max) state = StepState.Complete;
    else if (currentStep >= g.min) state = StepState.InProgress;
    else state = StepState.NotStarted;
    return { id: g.id, name: g.name, state };
  });

  return <Progress numbered steps={progressSteps} />;
};

export default ProgressWrapper;
