import { ReactNode } from 'react';

export enum StepState {
  Complete = 'Complete',
  InProgress = 'InProgress',
  NotStarted = 'NotStarted',
}

export interface ProgressStep {
  name: string;
  state: StepState;
}

export interface GuideStep {
  id: string;
  title: string;
  description: ReactNode;
  visual: ReactNode;
}

export type GuideConfig = GuideStep[];

export type AnimPhase = 'idle' | 'exiting' | 'entering';
export type AnimDirection = 'forward' | 'backward';