import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guideA } from '../guides/guideA';
import { guideB } from '../guides/guideB';
import type { GuideStep } from '../components/UserGuide/types';
import styles from './Launchpad.module.css';

/* ── Tiny step icons (white strokes, 24×24 viewBox) ── */

const IcoWelcome = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l1.8 5.6H20l-4.9 3.6 1.9 5.6L12 13.5l-5 3.3 1.9-5.6L4 7.6h6.2z"
      stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const IcoProfile = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5" />
    <path d="M4 21c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoIdentity = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 5v6c0 5 3.6 9 8 10 4.4-1 8-5 8-10V5z"
      stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoBank = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="17" width="18" height="2.5" rx="1" fill="white" opacity="0.7" />
    <rect x="5" y="10" width="2.5" height="7" rx="1" fill="white" opacity="0.8" />
    <rect x="10.75" y="10" width="2.5" height="7" rx="1" fill="white" opacity="0.8" />
    <rect x="16.5" y="10" width="2.5" height="7" rx="1" fill="white" opacity="0.8" />
    <path d="M2 10h20M12 3L2 8h20z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoLimits = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="14" width="3.5" height="7" rx="1" fill="white" opacity="0.6" />
    <rect x="10.25" y="9" width="3.5" height="12" rx="1" fill="white" opacity="0.8" />
    <rect x="17.5" y="5" width="3.5" height="16" rx="1" fill="white" />
    <path d="M2 9.5h20" stroke="rgba(255,100,100,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 2" />
  </svg>
);

const IcoBirthday = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="white" strokeWidth="1.5" />
    <path d="M16 3v4M8 3v4M3 10h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="2" fill="white" opacity="0.8" />
  </svg>
);

const IcoAlerts = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C8.5 3 6 6 6 10v4l-2 3h16l-2-3v-4c0-4-2.5-7-6-7z"
      stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9.5 20a2.5 2.5 0 005 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoDashboard = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" stroke="white" strokeWidth="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="2" stroke="white" strokeWidth="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="2" stroke="white" strokeWidth="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="2" stroke="white" strokeWidth="1.5" />
  </svg>
);

const IcoDone = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
    <path d="M7.5 12l3 3 6-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoChart = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M3 18l5-6 4 4 6-8 3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 6l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 21h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IcoRisk = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 4v3M12 7l-6 2M12 7l6 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 9l-1 5h4l1-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9l-1 5h-4l1-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 20h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IcoPie = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 12V3a9 9 0 019 9z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="1.5" opacity="0.5" />
    <path d="M12 12L5 17.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoTarget = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" opacity="0.4" />
    <circle cx="12" cy="12" r="5.5" stroke="white" strokeWidth="1.5" opacity="0.65" />
    <circle cx="12" cy="12" r="2" fill="white" />
  </svg>
);

const IcoStarCal = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="white" strokeWidth="1.5" />
    <path d="M16 3v4M8 3v4M3 10h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 13l.9 2.6h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7H11z"
      stroke="white" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

const IcoFees = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="white" strokeWidth="1.5" />
    <circle cx="15" cy="15" r="2.5" stroke="white" strokeWidth="1.5" />
    <path d="M5.5 18.5l13-13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoFund = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="8" width="20" height="13" rx="2.5" stroke="white" strokeWidth="1.5" />
    <path d="M7 8V6a5 5 0 0110 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 13v4M10 15h4" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const IcoReview = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="white" strokeWidth="1.5" />
    <path d="M8 8.5h8M8 12h8M8 15.5h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <circle cx="6.5" cy="8.5" r="1" fill="white" opacity="0.6" />
    <circle cx="6.5" cy="12" r="1" fill="white" opacity="0.6" />
    <circle cx="6.5" cy="15.5" r="1" fill="white" opacity="0.6" />
  </svg>
);

const IcoRocket = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 2c0 0-7 4-7 12v1l7 4 7-4v-1C19 6 12 2 12 2z"
      stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="white" strokeWidth="1.4" />
    <path d="M8 17l-3 2M16 17l3 2" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Data: per-step icon and gradient ── */

const accountStepMeta = [
  { gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)', icon: <IcoWelcome /> },
  { gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', icon: <IcoProfile /> },
  { gradient: 'linear-gradient(135deg, #4338ca, #6d28d9)', icon: <IcoIdentity /> },
  { gradient: 'linear-gradient(135deg, #0284c7, #0369a1)', icon: <IcoBank /> },
  { gradient: 'linear-gradient(135deg, #6d28d9, #4338ca)', icon: <IcoLimits /> },
  { gradient: 'linear-gradient(135deg, #0891b2, #0284c7)', icon: <IcoBirthday /> },
  { gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)', icon: <IcoAlerts /> },
  { gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)', icon: <IcoDashboard /> },
  { gradient: 'linear-gradient(135deg, #16a34a, #15803d)', icon: <IcoDone /> },
];

const investStepMeta = [
  { gradient: 'linear-gradient(135deg, #16a34a, #15803d)', icon: <IcoChart /> },
  { gradient: 'linear-gradient(135deg, #d97706, #b45309)', icon: <IcoRisk /> },
  { gradient: 'linear-gradient(135deg, #2563eb, #4338ca)', icon: <IcoPie /> },
  { gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)', icon: <IcoTarget /> },
  { gradient: 'linear-gradient(135deg, #059669, #16a34a)', icon: <IcoStarCal /> },
  { gradient: 'linear-gradient(135deg, #dc2626, #c026d3)', icon: <IcoFees /> },
  { gradient: 'linear-gradient(135deg, #0284c7, #059669)', icon: <IcoFund /> },
  { gradient: 'linear-gradient(135deg, #0369a1, #0284c7)', icon: <IcoReview /> },
  { gradient: 'linear-gradient(135deg, #f97316, #ea580c)', icon: <IcoRocket /> },
];

/* ── Group definitions ── */

interface GroupDef {
  id: string;
  label: string;
  route: string;
  gradient: string;
  steps: GuideStep[];
  stepMeta: typeof accountStepMeta;
}

const groups: GroupDef[] = [
  {
    id: 'account',
    label: 'Account',
    route: '/account',
    gradient: 'linear-gradient(145deg, #1d4ed8, #4338ca)',
    steps: guideA,
    stepMeta: accountStepMeta,
  },
  {
    id: 'invest',
    label: 'Invest',
    route: '/invest',
    gradient: 'linear-gradient(145deg, #15803d, #0284c7)',
    steps: guideB,
    stepMeta: investStepMeta,
  },
];

/* ── Props ── */

interface LaunchpadProps {
  completedA: boolean;
  completedB: boolean;
}

/* ── Component ── */

const Launchpad: React.FC<LaunchpadProps> = ({ completedA, completedB }) => {
  const navigate = useNavigate();
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const activeGroup = groups.find(g => g.id === activeGroupId) ?? null;

  const openGroup = (id: string) => {
    setActiveGroupId(id);
    setAnimKey(k => k + 1);
  };

  const closeGroup = () => {
    setActiveGroupId(null);
    setAnimKey(k => k + 1);
  };

  const goToStep = (route: string, stepIndex: number) => {
    navigate(`${route}?step=${stepIndex}`);
  };

  const isGroupCompleted = (groupId: string) =>
    groupId === 'account' ? completedA : completedB;

  return (
    <div className={styles.launchpad}>
      <div className={styles.header}>
        {activeGroup && (
          <button className={styles.backBtn} onClick={closeGroup}>
            <BackIcon />
            All guides
          </button>
        )}
        <h1 className={styles.title}>
          {activeGroup ? activeGroup.label : 'Meridian'}
        </h1>
        <p className={styles.subtitle}>
          {activeGroup
            ? `${activeGroup.steps.length} steps to complete`
            : 'Choose a guide to get started'}
        </p>
      </div>

      {!activeGroup ? (
        /* Groups view */
        <div key={`groups-${animKey}`} className={`${styles.groupGrid} ${styles.viewEnter}`}>
          {groups.map(group => (
            <button
              key={group.id}
              className={styles.tile}
              onClick={() => openGroup(group.id)}
              aria-label={`Open ${group.label} guide`}
            >
              <div className={styles.groupIconWrap} style={{ background: group.gradient }}>
                <div className={styles.groupMiniGrid}>
                  {group.stepMeta.slice(0, 4).map((meta, i) => (
                    <div key={i} className={styles.groupMiniIcon} style={{ background: meta.gradient }}>
                      {meta.icon}
                    </div>
                  ))}
                </div>
                {isGroupCompleted(group.id) && <div className={styles.completedDot} />}
              </div>
              <span className={styles.groupLabel}>{group.label}</span>
              <span className={styles.groupCount}>{group.steps.length} steps</span>
            </button>
          ))}
        </div>
      ) : (
        /* Steps view */
        <div key={`steps-${animKey}`} className={`${styles.stepGrid} ${styles.viewEnter}`}>
          {activeGroup.steps.map((step, i) => {
            const meta = activeGroup.stepMeta[i];
            return (
              <button
                key={`${step.id}-${i}`}
                className={styles.tile}
                onClick={() => goToStep(activeGroup.route, i)}
                title={step.title}
              >
                <div className={styles.stepIconWrap} style={{ background: meta.gradient, position: 'relative' }}>
                  {meta.icon}
                </div>
                <span className={styles.stepLabel}>
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Launchpad;
