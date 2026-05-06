import React from 'react';
import type { GuideConfig } from '../components/UserGuide/types';
import { parseMarkdown } from './parseMarkdown';

import welcomeMd from './content/guideA/welcome.md?raw';
import profileMd from './content/guideA/profile.md?raw';
import identityMd from './content/guideA/identity.md?raw';
import bankLinkMd from './content/guideA/bank-link.md?raw';
import limitsMd from './content/guideA/limits.md?raw';
import dateOfBirthMd from './content/guideA/date-of-birth.md?raw';
import notificationsMd from './content/guideA/notifications.md?raw';
import dashboardMd from './content/guideA/dashboard.md?raw';
import completeMd from './content/guideA/complete.md?raw';

/* ─── Illustration helpers ─── */

const C = (props: React.SVGProps<SVGCircleElement>) => <circle {...props} />;
const R = (props: React.SVGProps<SVGRectElement>) => <rect {...props} />;
const P = (props: React.SVGProps<SVGPathElement>) => <path {...props} />;

const primary = 'var(--color-primary, #2563eb)';
const primaryLight = 'var(--color-primary-light, #eff6ff)';
const border = 'var(--color-border, rgba(0,0,0,0.1))';
const surface = 'var(--color-surface, #fff)';

const Illus: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    {children}
  </svg>
);

const WelcomeIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="110" r="90" fill={primaryLight} opacity="0.6" />
    <C cx="80" cy="60" r="28" fill={primaryLight} opacity="0.5" />
    <C cx="210" cy="155" r="18" fill={primaryLight} opacity="0.4" />
    <R x="70" y="72" width="140" height="86" rx="10" fill={surface} stroke={border} strokeWidth="1.5" />
    <R x="78" y="82" width="60" height="10" rx="4" fill={primary} opacity="0.15" />
    <R x="78" y="98" width="100" height="6" rx="3" fill={border} />
    <R x="78" y="110" width="80" height="6" rx="3" fill={border} />
    <R x="78" y="122" width="50" height="18" rx="5" fill={primary} />
    <P d="M56 52L58 46L60 52L66 54L60 56L58 62L56 56L50 54Z" fill={primary} opacity="0.6" />
    <P d="M210 72L211.5 68L213 72L217 73.5L213 75L211.5 79L210 75L206 73.5Z" fill={primary} opacity="0.4" />
  </Illus>
);

const ProfileIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="90" r="40" fill={primaryLight} />
    <C cx="140" cy="76" r="18" fill={primary} opacity="0.7" />
    <P d="M100 130 Q110 110 140 110 Q170 110 180 130" fill={primary} opacity="0.5" />
    <R x="80" y="140" width="120" height="7" rx="3.5" fill={border} />
    <R x="90" y="154" width="100" height="7" rx="3.5" fill={border} />
    <R x="100" y="168" width="80" height="7" rx="3.5" fill={border} />
  </Illus>
);

const IdentityIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="110" r="78" fill={primaryLight} opacity="0.5" />
    <P d="M140 40 L190 62 L190 100 Q190 138 140 162 Q90 138 90 100 L90 62 Z" fill={surface} stroke={primary} strokeWidth="2" />
    <P d="M140 48 L182 67 L182 100 Q182 132 140 152 Q98 132 98 100 L98 67 Z" fill={primaryLight} />
    <P d="M120 105 L133 118 L162 89" stroke={primary} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </Illus>
);

const BankIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="110" r="75" fill={primaryLight} opacity="0.45" />
    <R x="90" y="90" width="100" height="70" rx="2" fill={surface} stroke={border} strokeWidth="1.5" />
    {[100, 116, 132, 148, 164, 180].map(x => (
      <R key={x} x={x} y="90" width="8" height="70" rx="1" fill={primary} opacity="0.12" />
    ))}
    <R x="85" y="84" width="110" height="10" rx="2" fill={primary} opacity="0.7" />
    <R x="110" y="72" width="60" height="14" rx="2" fill={primary} opacity="0.5" />
    <R x="126" y="130" width="28" height="30" rx="3" fill={primary} opacity="0.2" />
    <P d="M88 160 L192 160" stroke={border} strokeWidth="2" strokeLinecap="round" />
    <C cx="195" cy="75" r="16" fill={surface} stroke={border} strokeWidth="1.5" />
    <P d="M189 75 L201 75M195 69 L195 81" stroke={primary} strokeWidth="2" strokeLinecap="round" />
  </Illus>
);

const LimitsIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="115" r="72" fill={primaryLight} opacity="0.45" />
    {[
      { x: 88, h: 40, full: false },
      { x: 110, h: 65, full: false },
      { x: 132, h: 50, full: false },
      { x: 154, h: 80, full: true },
      { x: 176, h: 55, full: false },
    ].map(({ x, h, full }) => (
      <R key={x} x={x} y={158 - h} width="18" height={h} rx="4" fill={primary} opacity={full ? '1' : '0.25'} />
    ))}
    <P d="M82 108 L198 108" stroke="#ef4444" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="5 3" />
    <R x="186" y="100" width="28" height="16" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
    <P d="M191 109 L191 107 L196 107" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    <P d="M82 160 L198 160" stroke={border} strokeWidth="1.5" strokeLinecap="round" />
  </Illus>
);

const CalendarIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="110" r="72" fill={primaryLight} opacity="0.45" />
    <R x="82" y="72" width="116" height="98" rx="8" fill={surface} stroke={border} strokeWidth="1.5" />
    <R x="82" y="72" width="116" height="30" rx="8" fill={primary} />
    <R x="82" y="88" width="116" height="14" rx="0" fill={primary} />
    <R x="102" y="81" width="56" height="10" rx="3" fill="white" opacity="0.35" />
    <C cx="94" cy="87" r="4" fill="white" opacity="0.6" />
    <C cx="186" cy="87" r="4" fill="white" opacity="0.6" />
    {[0, 1, 2, 3, 4, 5, 6].map(col => (
      <C key={col} cx={97 + col * 14} cy="116" r="4" fill={border} />
    ))}
    {[0, 1, 2, 3, 4, 5, 6].map(col => (
      <C key={col} cx={97 + col * 14} cy="132" r="4" fill={border} />
    ))}
    <C cx="139" cy="148" r="9" fill={primary} />
    <R x="103" y="144" width="8" height="8" rx="2" fill={border} />
    <R x="151" y="144" width="8" height="8" rx="2" fill={border} />
    <R x="163" y="144" width="8" height="8" rx="2" fill={border} />
    <R x="100" y="65" width="8" height="14" rx="3" fill={primary} opacity="0.6" />
    <R x="172" y="65" width="8" height="14" rx="3" fill={primary} opacity="0.6" />
  </Illus>
);

const BellIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="105" r="72" fill={primaryLight} opacity="0.45" />
    <P d="M140 52 C112 52 96 72 96 98 L96 120 L84 134 L196 134 L184 120 L184 98 C184 72 168 52 140 52 Z" fill={surface} stroke={border} strokeWidth="1.5" />
    <P d="M128 134 Q128 148 140 148 Q152 148 152 134" fill={surface} stroke={border} strokeWidth="1.5" />
    <C cx="174" cy="62" r="12" fill="#ef4444" />
    <P d="M170 62 L174 66 L180 58" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <P d="M80 94 Q76 100 80 106" stroke={primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <P d="M200 94 Q204 100 200 106" stroke={primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </Illus>
);

const DashboardIllus: React.FC = () => (
  <Illus>
    <R x="60" y="52" width="160" height="116" rx="10" fill={surface} stroke={border} strokeWidth="1.5" />
    <R x="70" y="62" width="66" height="44" rx="6" fill={primaryLight} />
    <R x="144" y="62" width="66" height="44" rx="6" fill={primaryLight} />
    <R x="70" y="114" width="140" height="44" rx="6" fill={primaryLight} opacity="0.5" />
    <P d="M80 148 L100 136 L120 142 L145 128 L165 134 L190 122" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <R x="78" y="70" width="40" height="6" rx="3" fill={primary} opacity="0.4" />
    <R x="78" y="82" width="25" height="10" rx="3" fill={primary} opacity="0.6" />
    <R x="152" y="70" width="40" height="6" rx="3" fill={primary} opacity="0.4" />
    <R x="152" y="82" width="25" height="10" rx="3" fill={primary} opacity="0.6" />
  </Illus>
);

const CompleteIllus: React.FC = () => (
  <Illus>
    <C cx="140" cy="108" r="82" fill={primaryLight} opacity="0.5" />
    <C cx="140" cy="108" r="56" fill={primaryLight} opacity="0.6" />
    <C cx="140" cy="108" r="40" fill={primary} />
    <P d="M122 108 L134 120 L160 94" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const r = 72;
      const rad = (deg * Math.PI) / 180;
      const cx = 140 + r * Math.cos(rad);
      const cy = 108 + r * Math.sin(rad);
      return <C key={i} cx={cx} cy={cy} r="4" fill={primary} opacity={i % 2 === 0 ? '0.5' : '0.25'} />;
    })}
  </Illus>
);

/* ─── Guide A: Account Onboarding ─── */

const visuals = [
  <WelcomeIllus />,
  <ProfileIllus />,
  <IdentityIllus />,
  <BankIllus />,
  <LimitsIllus />,
  <CalendarIllus />,
  <BellIllus />,
  <DashboardIllus />,
  <CompleteIllus />,
];

const sources = [
  welcomeMd, profileMd, identityMd, bankLinkMd, limitsMd,
  dateOfBirthMd, notificationsMd, dashboardMd, completeMd,
];

export const guideA: GuideConfig = sources.map((src, i) => ({
  ...parseMarkdown(src),
  visual: visuals[i],
}));
