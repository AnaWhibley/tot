import React from 'react';
import type { GuideConfig } from '../components/UserGuide/types';

/* ─── Illustration helpers ─── */

const primary = 'var(--color-primary, #2563eb)';
const primaryLight = 'var(--color-primary-light, #eff6ff)';
const border = 'var(--color-border, rgba(0,0,0,0.1))';
const surface = 'var(--color-surface, #fff)';
const green = 'var(--color-success, #16a34a)';
const greenLight = 'var(--color-success-light, #dcfce7)';

const Illus: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
    {children}
  </svg>
);

const ChartIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="78" fill={greenLight} opacity="0.5" />
    {/* Trend line */}
    <path
      d="M70 160 L95 148 L115 152 L135 130 L155 118 L175 100 L200 78"
      stroke={green}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Area fill */}
    <path
      d="M70 160 L95 148 L115 152 L135 130 L155 118 L175 100 L200 78 L200 168 L70 168 Z"
      fill={green}
      opacity="0.08"
    />
    {/* Axis */}
    <path d="M70 168 L210 168" stroke={border} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M70 100 L210 100" stroke={border} strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4" />
    {/* Highlight dot */}
    <circle cx="200" cy="78" r="6" fill={green} />
    <circle cx="200" cy="78" r="11" fill={green} opacity="0.15" />
    {/* Arrow up */}
    <path d="M196 58 L200 50 L204 58" fill={green} opacity="0.7" />
    <path d="M200 50 L200 72" stroke={green} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
  </Illus>
);

const ScaleIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="75" fill={primaryLight} opacity="0.4" />
    {/* Pivot post */}
    <rect x="137" y="80" width="6" height="68" rx="3" fill={border} />
    <circle cx="140" cy="78" r="8" fill={primary} opacity="0.6" />
    {/* Beam (slightly tilted for visual interest) */}
    <rect x="78" y="95" width="124" height="6" rx="3" fill={primary} transform="rotate(-3 140 98)" />
    {/* Left pan */}
    <path d="M88 102 L98 128 L118 128 L128 102" stroke={primary} strokeWidth="1.5" fill="none" opacity="0.7" transform="rotate(-3 108 115)" />
    <rect x="94" y="128" width="28" height="6" rx="3" fill={primary} opacity="0.4" transform="rotate(-3 108 131)" />
    {/* Right pan */}
    <path d="M152 98 L162 124 L182 124 L192 98" stroke={primary} strokeWidth="1.5" fill="none" opacity="0.7" transform="rotate(-3 172 111)" />
    <rect x="158" y="124" width="28" height="6" rx="3" fill={primary} opacity="0.4" transform="rotate(-3 172 127)" />
    {/* Labels */}
    <rect x="90" y="136" width="36" height="12" rx="4" fill={primaryLight} />
    <rect x="154" y="132" width="36" height="12" rx="4" fill={primaryLight} />
    <rect x="96" y="139" width="24" height="6" rx="2" fill={primary} opacity="0.4" />
    <rect x="160" y="135" width="24" height="6" rx="2" fill={primary} opacity="0.4" />
  </Illus>
);

const PieIllus: React.FC = () => {
  const cx = 140, cy = 108, r = 62;
  // 3 segments: 50%, 30%, 20%
  const segments = [
    { start: -90, sweep: 180, color: primary, opacity: '1' },
    { start: 90, sweep: 108, color: primary, opacity: '0.45' },
    { start: 198, sweep: 72, color: primary, opacity: '0.2' },
  ];

  function arc(startDeg: number, sweepDeg: number, innerR: number) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(startDeg + sweepDeg));
    const y2 = cy + r * Math.sin(toRad(startDeg + sweepDeg));
    const ix1 = cx + innerR * Math.cos(toRad(startDeg));
    const iy1 = cy + innerR * Math.sin(toRad(startDeg));
    const ix2 = cx + innerR * Math.cos(toRad(startDeg + sweepDeg));
    const iy2 = cy + innerR * Math.sin(toRad(startDeg + sweepDeg));
    const large = sweepDeg > 180 ? 1 : 0;
    return `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`;
  }

  return (
    <Illus>
      <circle cx={cx} cy={cy} r={82} fill={primaryLight} opacity="0.4" />
      {segments.map((seg, i) => (
        <path
          key={i}
          d={arc(seg.start, seg.sweep, 30)}
          fill={seg.color}
          opacity={seg.opacity}
          stroke={surface}
          strokeWidth="2"
        />
      ))}
      {/* Centre label */}
      <circle cx={cx} cy={cy} r="28" fill={surface} />
      <rect x="126" y="104" width="28" height="7" rx="3.5" fill={primary} opacity="0.4" />
      {/* Legend */}
      {[
        { y: 180, label: 'Growth', op: '1' },
        { y: 193, label: 'Bonds', op: '0.45' },
        { y: 206, label: 'Cash', op: '0.2' },
      ].map(({ y, label, op }) => (
        <g key={label}>
          <rect x="70" y={y - 6} width="10" height="10" rx="2" fill={primary} opacity={op} />
          <text x="86" y={y + 2} fontSize="9" fill="var(--color-text-secondary, #52596a)" fontFamily="system-ui, sans-serif">
            {label}
          </text>
        </g>
      ))}
    </Illus>
  );
};

const TargetIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="78" fill={primaryLight} opacity="0.4" />
    <circle cx="140" cy="110" r="60" stroke={primary} strokeWidth="1.5" fill="none" opacity="0.2" />
    <circle cx="140" cy="110" r="42" stroke={primary} strokeWidth="1.5" fill="none" opacity="0.35" />
    <circle cx="140" cy="110" r="24" stroke={primary} strokeWidth="1.5" fill="none" opacity="0.55" />
    <circle cx="140" cy="110" r="10" fill={primary} />
    {/* Arrow */}
    <path
      d="M168 74 L148 105"
      stroke={primary}
      strokeWidth="2.5"
      strokeLinecap="round"
      markerEnd="url(#arrow)"
    />
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill={primary} />
      </marker>
    </defs>
    <circle cx="172" cy="70" r="6" fill={primary} opacity="0.5" />
    {/* Goal card */}
    <rect x="78" y="155" width="124" height="28" rx="8" fill={surface} stroke={border} strokeWidth="1.5" />
    <rect x="88" y="163" width="50" height="7" rx="3.5" fill={primary} opacity="0.3" />
    <rect x="144" y="163" width="48" height="7" rx="3.5" fill={green} opacity="0.5" />
  </Illus>
);

const StartDateIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="72" fill={primaryLight} opacity="0.45" />
    {/* Calendar */}
    <rect x="82" y="72" width="116" height="98" rx="8" fill={surface} stroke={border} strokeWidth="1.5" />
    <rect x="82" y="72" width="116" height="30" rx="8" fill={primary} />
    <rect x="82" y="88" width="116" height="14" rx="0" fill={primary} />
    <rect x="102" y="81" width="56" height="10" rx="3" fill="white" opacity="0.3" />
    <circle cx="94" cy="87" r="4" fill="white" opacity="0.6" />
    <circle cx="186" cy="87" r="4" fill="white" opacity="0.6" />
    {/* Day grid */}
    {[0, 1, 2, 3, 4, 5, 6].map(col => (
      <circle key={col} cx={97 + col * 14} cy={116} r={4} fill={border} />
    ))}
    {[0, 1, 2, 3, 4, 5, 6].map(col => (
      <circle key={col} cx={97 + col * 14} cy={132} r={4} fill={border} />
    ))}
    {/* Star highlight */}
    <circle cx="153" cy="148" r="10" fill={primary} opacity="0.15" />
    <path
      d="M153 140 L154.8 145.5 L160.5 145.5 L155.9 148.9 L157.7 154.5 L153 151 L148.3 154.5 L150.1 148.9 L145.5 145.5 L151.2 145.5 Z"
      fill={primary}
    />
    <circle cx="97" cy="148" r="4" fill={border} />
    <circle cx="111" cy="148" r="4" fill={border} />
    <circle cx="125" cy="148" r="4" fill={border} />
    <circle cx="139" cy="148" r="4" fill={border} />
    <rect x="100" y="65" width="8" height="14" rx="3" fill={primary} opacity="0.6" />
    <rect x="172" y="65" width="8" height="14" rx="3" fill={primary} opacity="0.6" />
  </Illus>
);

const FeesIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="74" fill={primaryLight} opacity="0.4" />
    {/* Document */}
    <rect x="95" y="55" width="100" height="120" rx="6" fill={surface} stroke={border} strokeWidth="1.5" />
    <rect x="155" y="55" width="40" height="30" rx="0" fill={surface} />
    <path d="M155 55 L195 85 L155 85 Z" fill={primaryLight} stroke={border} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Lines */}
    {[78, 92, 106, 120, 134].map(y => (
      <rect key={y} x="107" y={y} width="70" height="6" rx="3" fill={border} />
    ))}
    {/* Magnifier */}
    <circle cx="172" cy="148" r="24" fill={surface} stroke={border} strokeWidth="1.5" />
    <circle cx="168" cy="144" r="14" stroke={primary} strokeWidth="2.5" fill="none" />
    <path d="M178 154 L188 164" stroke={primary} strokeWidth="2.5" strokeLinecap="round" />
    {/* % symbol */}
    <text x="160" y="149" fontSize="14" fontWeight="700" fill={primary} fontFamily="system-ui, sans-serif">%</text>
  </Illus>
);

const WalletIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="75" fill={greenLight} opacity="0.5" />
    {/* Wallet body */}
    <rect x="78" y="80" width="128" height="80" rx="8" fill={surface} stroke={border} strokeWidth="1.5" />
    <rect x="78" y="80" width="128" height="20" rx="8" fill={border} opacity="0.3" />
    <rect x="78" y="90" width="128" height="10" rx="0" fill={border} opacity="0.3" />
    {/* Card-pocket */}
    <rect x="150" y="102" width="46" height="36" rx="6" fill={primaryLight} stroke={primary} strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="173" cy="120" r="8" fill={primary} opacity="0.3" />
    {/* Plus arrow */}
    <circle cx="106" cy="120" r="20" fill={green} opacity="0.15" />
    <path d="M106 112 L106 128 M98 120 L114 120" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
    {/* Coins */}
    <circle cx="72" cy="68" r="10" fill={green} opacity="0.4" />
    <circle cx="56" cy="82" r="7" fill={green} opacity="0.25" />
  </Illus>
);

const ChecklistIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="74" fill={primaryLight} opacity="0.4" />
    <rect x="86" y="62" width="108" height="120" rx="8" fill={surface} stroke={border} strokeWidth="1.5" />
    {[
      { y: 84, checked: true },
      { y: 104, checked: true },
      { y: 124, checked: true },
      { y: 144, checked: false },
      { y: 164, checked: false },
    ].map(({ y, checked }) => (
      <g key={y}>
        <rect x="100" y={y - 8} width="16" height="16" rx="4" fill={checked ? primary : surface} stroke={checked ? primary : border} strokeWidth="1.5" />
        {checked && (
          <path d="M103 92 L107 96 L113 88" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" transform={`translate(0, ${y - 100})`} />
        )}
        <rect x="124" y={y - 4} width="58" height="7" rx="3.5" fill={checked ? primary : border} opacity={checked ? '0.5' : '1'} />
      </g>
    ))}
  </Illus>
);

const RocketIllus: React.FC = () => (
  <Illus>
    <circle cx="140" cy="110" r="80" fill={greenLight} opacity="0.45" />
    <circle cx="140" cy="110" r="52" fill={greenLight} opacity="0.5" />
    {/* Rocket */}
    <path d="M140 52 C140 52 118 76 118 100 L118 122 L140 134 L162 122 L162 100 C162 76 140 52 140 52 Z" fill={surface} stroke={green} strokeWidth="2" />
    <circle cx="140" cy="96" r="12" fill={green} opacity="0.3" stroke={green} strokeWidth="1.5" />
    <circle cx="140" cy="96" r="6" fill={green} opacity="0.6" />
    {/* Fins */}
    <path d="M118 116 L104 130 L118 126 Z" fill={green} opacity="0.5" />
    <path d="M162 116 L176 130 L162 126 Z" fill={green} opacity="0.5" />
    {/* Flames */}
    <path d="M130 134 Q132 148 140 144 Q148 148 150 134" fill={primary} opacity="0.5" />
    <path d="M133 134 Q134 144 140 141 Q146 144 147 134" fill={primary} opacity="0.35" />
    {/* Stars */}
    {[
      [88, 70], [192, 80], [78, 130], [200, 140], [168, 60],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill={green} opacity="0.5" />
    ))}
  </Illus>
);

/* ─── Guide B: Investment Portfolio Setup ─── */

export const guideB: GuideConfig = [
  {
    id: 'invest-welcome',
    title: 'Start growing your wealth',
    description: (
      <>
        <p>
          Meridian Invest gives you a straightforward way to put your money to
          work. This guide helps you set up your first portfolio in under
          five minutes.
        </p>
        <p>
          No jargon, no minimum requirements beyond what regulations demand, and
          full visibility into how your money is being managed.
        </p>
      </>
    ),
    visual: <ChartIllus />,
  },
  {
    id: 'risk',
    title: 'Understanding investment risk',
    description: (
      <>
        <p>
          All investments carry some level of risk — the potential for returns
          and the possibility of loss are two sides of the same coin.
        </p>
        <p>
          <strong>Key principles to keep in mind:</strong>
        </p>
        <ul>
          <li>Higher potential returns generally mean higher risk</li>
          <li>Diversification reduces, but does not eliminate, risk</li>
          <li>Time horizon matters — longer is generally lower risk</li>
        </ul>
        <p>
          You'll set your personal risk appetite on the next screen. You can
          adjust it at any time.
        </p>
      </>
    ),
    visual: <ScaleIllus />,
  },
  {
    id: 'portfolio-type',
    title: 'Choose your portfolio type',
    description: (
      <>
        <p>
          We offer three managed portfolio strategies, each with a different
          balance of asset classes:
        </p>
        <ul>
          <li>
            <strong>Conservative</strong> — 80% bonds, 20% equities. Minimal
            volatility, steady returns.
          </li>
          <li>
            <strong>Balanced</strong> — 50% equities, 50% bonds. Moderate risk
            and growth.
          </li>
          <li>
            <strong>Growth</strong> — 80% equities, 20% bonds. Higher
            long-term potential with increased short-term swings.
          </li>
        </ul>
        <p>
          Not sure which to pick? Our risk questionnaire will recommend one
          based on your answers.
        </p>
      </>
    ),
    visual: <PieIllus />,
  },
  {
    id: 'goals',
    title: 'Set your investment goals',
    description: (
      <>
        <p>
          Defining a goal helps us tailor projections and send you meaningful
          progress updates.
        </p>
        <ul>
          <li>
            <strong>Goal name</strong> — e.g. "House deposit", "Retirement",
            "Emergency fund"
          </li>
          <li>
            <strong>Target amount</strong> — how much you want to accumulate
          </li>
          <li>
            <strong>Target date</strong> — when you'd like to reach it
          </li>
        </ul>
        <p>
          You can set multiple goals and link each one to a separate portfolio.
        </p>
      </>
    ),
    visual: <TargetIllus />,
  },
  {
    id: 'start-date',
    title: 'Choose your investment start date',
    description: (
      <>
        <p>
          Select when you'd like your first investment to be executed. Your
          money will be allocated to your chosen portfolio on that date.
        </p>
        <p>
          <strong>Accepted date formats:</strong>
        </p>
        <ul>
          <li>
            <code>DD/MM/YYYY</code> — e.g.{' '}
            <span className="ug-example-date">01/06/2025</span>
          </li>
          <li>
            <code>MM-DD-YYYY</code> — e.g.{' '}
            <span className="ug-example-date">06-01-2025</span>
          </li>
          <li>
            <code>YYYY-MM-DD</code> — e.g.{' '}
            <span className="ug-example-date">2025-06-01</span>
          </li>
        </ul>
        <p>
          The start date must be at least <strong>2 business days</strong> from
          today to allow for settlement. Markets closed on weekends and public
          holidays will roll to the next available day.
        </p>
      </>
    ),
    visual: <StartDateIllus />,
  },
  {
    id: 'fees',
    title: 'Review the fee structure',
    description: (
      <>
        <p>
          We believe in full transparency. Here's exactly what you'll pay:
        </p>
        <ul>
          <li>
            <strong>Annual management fee:</strong> 0.25% of assets under
            management, charged monthly
          </li>
          <li>
            <strong>Transaction fee:</strong> None — we absorb trading costs
          </li>
          <li>
            <strong>Withdrawal fee:</strong> None for standard withdrawals
            (T+2); expedited same-day withdrawals cost £1.50
          </li>
        </ul>
        <p>
          There are no hidden fees. The total cost is shown on your dashboard
          in real time.
        </p>
      </>
    ),
    visual: <FeesIllus />,
  },
  {
    id: 'fund',
    title: 'Fund your investment account',
    description: (
      <>
        <p>
          Add the initial amount you'd like to invest. You can top up at any
          time, or set up a recurring monthly contribution.
        </p>
        <ul>
          <li>
            <strong>Minimum deposit:</strong> £100
          </li>
          <li>
            <strong>Instant top-up</strong> from any linked bank account
          </li>
          <li>
            <strong>Standing order</strong> — set a monthly date and amount for
            automatic contributions
          </li>
        </ul>
        <p>
          Your funds are held in a segregated client account, separate from
          Meridian's own funds, and covered up to £85,000 by FSCS protection.
        </p>
      </>
    ),
    visual: <WalletIllus />,
  },
  {
    id: 'confirm',
    title: 'Review and confirm',
    description: (
      <>
        <p>
          Before we activate your portfolio, please review your selections:
        </p>
        <ul>
          <li>Portfolio type and risk level</li>
          <li>Investment goal and target date</li>
          <li>Initial deposit amount</li>
          <li>First investment date</li>
          <li>Fee confirmation</li>
        </ul>
        <p>
          By tapping <strong>Finish</strong>, you agree to Meridian's{' '}
          <a href="#terms">Investment Terms &amp; Conditions</a> and acknowledge
          that the value of investments can go down as well as up.
        </p>
      </>
    ),
    visual: <ChecklistIllus />,
  },
  {
    id: 'activated',
    title: 'Your portfolio is live',
    description: (
      <>
        <p>
          Congratulations — your Meridian Invest portfolio has been activated.
          Your first investment will execute on the date you selected.
        </p>
        <p>
          <strong>What happens next:</strong>
        </p>
        <ul>
          <li>
            You'll receive a confirmation email with your portfolio summary
          </li>
          <li>
            Your dashboard will update once the first trade settles (T+2)
          </li>
          <li>Monthly statements arrive on the 1st of each month</li>
        </ul>
        <p>
          Track performance, adjust contributions, or change your strategy at
          any time from the <strong>Invest</strong> tab.
        </p>
      </>
    ),
    visual: <RocketIllus />,
  },
];
