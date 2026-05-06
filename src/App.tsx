import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import type { NavGroup } from './components/NavBar/NavBar';
import Home from './pages/Home';
import GuidePage from './pages/GuidePage';
import { guideA } from './guides/guideA';
import { guideB } from './guides/guideB';

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
  const [completedA, setCompletedA] = useState(false);
  const [completedB, setCompletedB] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);

  const navGroups: NavGroup[] = [
    {
      id: 'account',
      label: 'Account',
      icon: <AccountGroupIcon />,
      items: [
        { id: 'account', label: 'Account Onboarding', icon: <AccountIcon />, to: '/account', completed: completedA },
      ],
    },
    {
      id: 'invest',
      label: 'Invest',
      icon: <InvestGroupIcon />,
      items: [
        { id: 'invest', label: 'Portfolio Setup', icon: <InvestIcon />, to: '/invest', completed: completedB },
      ],
    },
  ];

  return (
    <div className={styles.app}>
      <NavBar
        groups={navGroups}
        collapsed={navCollapsed}
        onToggleCollapse={() => setNavCollapsed(v => !v)}
      />

      <div className={styles.content}>
        <Routes>
          <Route path="/" element={
            <Home completedA={completedA} completedB={completedB} />
          } />
          <Route path="/account" element={
            <GuidePage
              steps={guideA}
              label="Account Onboarding"
              completed={completedA}
              onComplete={() => setCompletedA(true)}
              onRestart={() => setCompletedA(false)}
            />
          } />
          <Route path="/invest" element={
            <GuidePage
              steps={guideB}
              label="Portfolio Setup"
              completed={completedB}
              onComplete={() => setCompletedB(true)}
              onRestart={() => setCompletedB(false)}
            />
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
