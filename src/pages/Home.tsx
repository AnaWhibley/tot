import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

interface GuideCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: number;
  completed?: boolean;
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckBadge = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="9" fill="var(--color-success, #16a34a)" />
    <path d="M5 9l3 3 5-5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GuideCard: React.FC<GuideCardProps> = ({ to, icon, title, description, steps, completed }) => (
  <Link to={to} className={styles.card}>
    <div className={styles.cardIcon}>{icon}</div>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {completed && (
          <span className={styles.cardBadge}>
            <CheckBadge />
            Complete
          </span>
        )}
      </div>
      <p className={styles.cardDesc}>{description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardSteps}>{steps} steps</span>
        <span className={styles.cardArrow}><ArrowRight /></span>
      </div>
    </div>
  </Link>
);

/* ── Guide icons ── */

const AccountIllus = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="14" fill="var(--color-primary-light, #eff6ff)" />
    <circle cx="24" cy="19" r="6" stroke="var(--color-primary, #2563eb)" strokeWidth="2" />
    <path d="M10 40c0-7.732 6.268-12 14-12s14 4.268 14 12"
      stroke="var(--color-primary, #2563eb)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InvestIllus = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="14" fill="var(--color-success-light, #dcfce7)" />
    <path d="M10 34l8-10 6 6 10-14"
      stroke="var(--color-success, #16a34a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 18h8v8"
      stroke="var(--color-success, #16a34a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Logo mark ── */

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="var(--color-primary, #2563eb)" />
    <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 21h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

interface HomeProps {
  completedA?: boolean;
  completedB?: boolean;
}

const Home: React.FC<HomeProps> = ({ completedA, completedB }) => (
  <div className={styles.home}>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <div className={styles.logoRow}>
          <LogoMark />
          <span className={styles.logoName}>Meridian</span>
        </div>
        <h1 className={styles.headline}>Your guides to smarter<br />financial management</h1>
        <p className={styles.sub}>
          Step-by-step walkthroughs to help you get set up, stay in control,
          and grow your money with confidence.
        </p>
      </header>

      <section aria-label="Available guides">
        <p className={styles.sectionLabel}>Get started</p>
        <div className={styles.cards}>
          <GuideCard
            to="/account"
            icon={<AccountIllus />}
            title="Account Onboarding"
            description="Set up your profile, verify your identity, link your bank account, and configure your preferences."
            steps={9}
            completed={completedA}
          />
          <GuideCard
            to="/invest"
            icon={<InvestIllus />}
            title="Portfolio Setup"
            description="Choose your risk appetite, set investment goals, review fees, and activate your first portfolio."
            steps={9}
            completed={completedB}
          />
        </div>
      </section>
    </div>
  </div>
);

export default Home;
