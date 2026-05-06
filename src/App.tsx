import { useState } from 'react';
import styles from './App.module.css';
import UserGuide from './components/UserGuide';
import NavBar from './components/NavBar/NavBar';
import type { NavGroup } from './components/NavBar/NavBar';
import { guideA } from './guides/guideA';
import { guideB } from './guides/guideB';

type ActiveGuide = 'A' | 'B';

/* ── Nav icons ── */

const AccountIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AccountGroupIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const InvestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 12l3.5-4 2.5 2.5 4-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 5H13v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InvestGroupIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="9" width="3" height="5" rx="1" fill="currentColor" opacity="0.4" />
    <rect x="6.5" y="6" width="3" height="8" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="11" y="3" width="3" height="11" rx="1" fill="currentColor" />
  </svg>
);

/* ── App ── */

function App() {
  const [active, setActive] = useState<ActiveGuide>('A');
  const [completedA, setCompletedA] = useState(false);
  const [completedB, setCompletedB] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);

  const guides = {
    A: { label: 'Account Onboarding', steps: guideA, completed: completedA },
    B: { label: 'Portfolio Setup', steps: guideB, completed: completedB },
  };

  const handleComplete = () => {
    if (active === 'A') setCompletedA(true);
    if (active === 'B') setCompletedB(true);
  };

  const handleRestart = () => {
    if (active === 'A') setCompletedA(false);
    if (active === 'B') setCompletedB(false);
  };

  const navGroups: NavGroup[] = [
    {
      id: 'account',
      label: 'Account',
      icon: <AccountGroupIcon />,
      items: [
        { id: 'A', label: 'Account Onboarding', icon: <AccountIcon />, completed: completedA },
      ],
    },
    {
      id: 'invest',
      label: 'Invest',
      icon: <InvestGroupIcon />,
      items: [
        { id: 'B', label: 'Portfolio Setup', icon: <InvestIcon />, completed: completedB },
      ],
    },
  ];

  const current = guides[active];

  return (
    <div className={styles.app}>
      <NavBar
        groups={navGroups}
        activeId={active}
        onSelect={id => setActive(id as ActiveGuide)}
        collapsed={navCollapsed}
        onToggleCollapse={() => setNavCollapsed(v => !v)}
      />

      <div className={styles.content}>
        <div className={styles.guideShell}>
          {current.completed ? (
            <div className={styles.complete}>
              <div className={styles.completeIcon}>✓</div>
              <h2>Guide complete</h2>
              <p>You finished the <strong>{current.label}</strong> guide.</p>
              <button className={styles.completeRestart} onClick={handleRestart}>
                Restart guide
              </button>
            </div>
          ) : (
            <UserGuide
              key={active}
              steps={current.steps}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
