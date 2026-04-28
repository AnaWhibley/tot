import { useState } from 'react';
import UserGuide from './components/UserGuide';
import { guideA } from './guides/guideA';
import { guideB } from './guides/guideB';
import './App.css';

type ActiveGuide = 'A' | 'B';

function App() {
  const [active, setActive] = useState<ActiveGuide>('A');
  const [completedA, setCompletedA] = useState(false);
  const [completedB, setCompletedB] = useState(false);

  const guides = {
    A: { label: 'Account Onboarding', steps: guideA, completed: completedA },
    B: { label: 'Investment Setup', steps: guideB, completed: completedB },
  };

  const handleComplete = () => {
    if (active === 'A') setCompletedA(true);
    if (active === 'B') setCompletedB(true);
  };

  const handleRestart = () => {
    if (active === 'A') setCompletedA(false);
    if (active === 'B') setCompletedB(false);
  };

  const current = guides[active];

  return (
    <div className="app">
      {/* Guide selector */}
      <div className="app-tabs" role="tablist" aria-label="Select guide">
        {(Object.keys(guides) as ActiveGuide[]).map(key => (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            className={`app-tab ${active === key ? 'app-tab--active' : ''}`}
            onClick={() => setActive(key)}
          >
            {guides[key].label}
            {guides[key].completed && <span className="app-tab__badge">✓</span>}
          </button>
        ))}
      </div>

      {/* Guide or completion screen */}
      <div className="app-guide-shell" style={{ height: 560 }}>
        {current.completed ? (
          <div className="app-complete">
            <div className="app-complete__icon">✓</div>
            <h2>Guide complete</h2>
            <p>You finished the <strong>{current.label}</strong> guide.</p>
            <button className="app-complete__restart" onClick={handleRestart}>
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
  );
}

export default App;
