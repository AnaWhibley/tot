import React, { useState } from 'react';
import styles from './GuidePage.module.css';
import UserGuide from '../components/UserGuide';
import type { GuideConfig } from '../components/UserGuide/types';

interface GuidePageProps {
  steps: GuideConfig;
  label: string;
  completed: boolean;
  onComplete: () => void;
  onRestart: () => void;
}

const CheckCircle = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="14" fill="var(--color-success, #16a34a)" />
    <path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GuidePage: React.FC<GuidePageProps> = ({
  steps,
  label,
  completed,
  onComplete,
  onRestart,
}) => {
  const [key, setKey] = useState(0);

  const handleRestart = () => {
    setKey(k => k + 1);
    onRestart();
  };

  return (
    <div className={styles.shell}>
      {completed ? (
        <div className={styles.complete}>
          <CheckCircle />
          <h2 className={styles.completeTitle}>Guide complete</h2>
          <p className={styles.completeSubtitle}>
            You finished <strong>{label}</strong>.
          </p>
          <button className={styles.restartBtn} onClick={handleRestart}>
            Restart guide
          </button>
        </div>
      ) : (
        <UserGuide key={key} steps={steps} onComplete={onComplete} />
      )}
    </div>
  );
};

export default GuidePage;
