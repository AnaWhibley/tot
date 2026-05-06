import React, { useCallback, useRef, useState } from 'react';
import styles from './UserGuide.module.css';
import StepContent from './StepContent';
import ProgressWrapper from './ProgressWrapper';
import type { AnimDirection, AnimPhase, GuideConfig } from './types';

const EXIT_MS = 180;
const ENTER_MS = 260;

interface UserGuideProps {
  steps: GuideConfig;
  onComplete?: () => void;
  initialStep?: number;
}

const BackArrow: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NextArrow: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserGuide: React.FC<UserGuideProps> = ({ steps, onComplete, initialStep = 0 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [displayedStep, setDisplayedStep] = useState(initialStep);
  const [phase, setPhase] = useState<AnimPhase>('idle');
  const [direction, setDirection] = useState<AnimDirection>('forward');

  const animating = useRef(false);

  const navigate = useCallback(
    (target: number) => {
      if (animating.current) return;
      if (target < 0 || target > steps.length - 1) return;

      const dir: AnimDirection = target > currentStep ? 'forward' : 'backward';
      animating.current = true;
      setDirection(dir);
      setCurrentStep(target);
      setPhase('exiting');

      setTimeout(() => {
        setDisplayedStep(target);
        setPhase('entering');

        setTimeout(() => {
          setPhase('idle');
          animating.current = false;
        }, ENTER_MS);
      }, EXIT_MS);
    },
    [currentStep, steps.length],
  );

  const handleNext = useCallback(() => {
    if (currentStep === steps.length - 1) {
      onComplete?.();
    } else {
      navigate(currentStep + 1);
    }
  }, [currentStep, navigate, onComplete, steps.length]);

  const handleBack = useCallback(() => {
    navigate(currentStep - 1);
  }, [currentStep, navigate]);

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <StepContent step={steps[displayedStep]} phase={phase} direction={direction}>
          <nav className={styles.nav} aria-label="Guide navigation">
            <button
              className={`${styles.navBtn} ${styles.navBtnGhost}`}
              onClick={handleBack}
              disabled={isFirst}
              aria-label="Go to previous step"
            >
              <BackArrow />
              Back
            </button>

            <span className={styles.stepCounter} aria-live="polite" aria-atomic="true">
              {currentStep + 1} / {steps.length}
            </span>

            <button
              className={`${styles.navBtn} ${styles.navBtnPrimary}`}
              onClick={handleNext}
              aria-label={isLast ? 'Finish guide' : 'Go to next step'}
            >
              {isLast ? 'Finish' : 'Next'}
              {!isLast && <NextArrow />}
            </button>
          </nav>
        </StepContent>
      </div>

      <footer className={styles.footer}>
        <ProgressWrapper steps={steps} currentStep={currentStep} />
      </footer>
    </div>
  );
};

export default UserGuide;
