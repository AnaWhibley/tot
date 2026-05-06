import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to: string;
  completed?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

interface NavBarProps {
  groups: NavGroup[];
  collapsed: boolean;
  onToggleCollapse: () => void;
}

/* ── Icons ── */

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Component ── */

const NavBar: React.FC<NavBarProps> = ({ groups, collapsed, onToggleCollapse }) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(groups.map(g => [g.id, true]))
  );

  const toggleGroup = (id: string) => {
    if (!collapsed) setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav
      className={`${styles.navBar}${collapsed ? ` ${styles.navBarCollapsed}` : ''}`}
      aria-label="Guide navigation"
    >
      {/* Header / toggle */}
      <div className={styles.header}>
        <button
          className={styles.toggle}
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <MenuIcon />
        </button>
        <Link to="/" className={`${styles.navSlide} ${styles.title}`}>
          Guides
        </Link>
      </div>

      <div className={styles.divider} />

      {/* Groups */}
      {groups.map(group => {
        const isOpen = openGroups[group.id] ?? true;
        const bodyOpen = isOpen || collapsed;

        return (
          <div key={group.id} className={styles.group}>
            <button
              className={styles.groupHeader}
              onClick={() => toggleGroup(group.id)}
              aria-expanded={!collapsed && isOpen}
              title={collapsed ? group.label : undefined}
            >
              <span className={styles.groupIcon}>{group.icon}</span>
              <span className={`${styles.navSlide} ${styles.groupLabel}`}>{group.label}</span>
              <span className={`${styles.navSlide} ${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ''}`}>
                <ChevronDownIcon />
              </span>
            </button>

            <div
              className={`${styles.groupBody}${bodyOpen ? ` ${styles.groupBodyOpen}` : ''}`}
              aria-hidden={!bodyOpen}
            >
              <div className={styles.groupInner}>
                {group.items.map(item => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `${styles.item}${isActive ? ` ${styles.itemActive}` : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    <span className={`${styles.navSlide} ${styles.itemLabelRow}`}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.completed && (
                        <span className={styles.badge} aria-label="Completed">
                          <CheckIcon />
                        </span>
                      )}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default NavBar;
