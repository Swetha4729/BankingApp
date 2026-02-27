import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';

// SBI YONO Business Theme
const sbiTheme = {
  colors: {
    primary: '#004687',
    secondary: '#0066b3',
    accent: '#ff6a00',
    green: '#00a651',
    lightBlue: '#f0f8ff',
    darkBlue: '#003366',
    white: '#ffffff',
    textPrimary: '#333333',
    textSecondary: '#666666',
    background: '#f5f7fa',
    border: '#e1e5eb',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #004687 0%, #0066b3 100%)',
    accent: 'linear-gradient(135deg, #ff6a00 0%, #ff8c3a 100%)',
    light: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%)',
  },
  shadows: {
    medium: '0 4px 12px rgba(0, 70, 135, 0.15)',
    large: '0 8px 24px rgba(0, 70, 135, 0.2)',
  },
  borderRadius: {
    medium: '8px',
    large: '12px',
  },
};

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', description: 'Overview & Analytics' },
    { path: '/accounts', label: 'Accounts', icon: '🏦', description: 'Manage Accounts' },
    { path: '/transfer', label: 'Fund Transfer', icon: '💸', description: 'Send Money' },
    { path: '/bills', label: 'Bill Payments', icon: '🧾', description: 'Pay Bills' },
    { path: '/reports', label: 'Transaction History', icon: '📈', description: 'View Reports' },
    { path: '/trade', label: 'Trade Finance', icon: '🌐', description: 'LC & Guarantees' },
    { path: '/beneficiaries', label: 'Beneficiaries', icon: '👥', description: 'Manage Contacts' },
    { path: '/collections', label: 'Collections', icon: '💰', description: 'Payment Collections' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: isMobile && isOpen ? 'block' : 'none',
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: isOpen ? '320px' : '80px',
      background: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.medium,
      borderRight: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    toggleBtn: {
      position: 'absolute',
      top: '20px',
      right: '-20px',
      width: '40px',
      height: '40px',
      background: sbiTheme.gradients.primary,
      border: 'none',
      borderRadius: '50%',
      color: sbiTheme.colors.white,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      boxShadow: sbiTheme.shadows.medium,
      zIndex: 1001,
      transition: 'all 0.3s ease',
    },
    sidebarHeader: {
      padding: '2rem 1.5rem 1.5rem',
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      position: 'relative',
      overflow: 'hidden',
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 90% 10%, rgba(255, 106, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 10% 90%, rgba(0, 166, 81, 0.1) 0%, transparent 50%)
      `,
    },
    userSection: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    userAvatar: {
      width: '50px',
      height: '50px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: sbiTheme.colors.white,
      border: '2px solid rgba(255, 255, 255, 0.3)',
    },
    userInfo: {
      flex: 1,
      minWidth: 0,
    },
    userName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    userEmail: {
      fontSize: '0.8rem',
      opacity: 0.9,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: '1.5rem 0',
      margin: 0,
      flex: 1,
      overflowY: 'auto',
    },
    menuItem: {
      margin: '0.25rem 1rem',
    },
    menuLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      textDecoration: 'none',
      color: sbiTheme.colors.textPrimary,
      borderRadius: sbiTheme.borderRadius.medium,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    activeMenuLink: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.medium,
    },
    menuIcon: {
      fontSize: '1.25rem',
      width: '24px',
      textAlign: 'center',
      flexShrink: 0,
    },
    menuContent: {
      flex: 1,
      minWidth: 0,
      marginLeft: '1rem',
    },
    menuLabel: {
      fontSize: '0.95rem',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    menuDescription: {
      fontSize: '0.75rem',
      opacity: 0.7,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    activeIndicator: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '6px',
      height: '6px',
      background: sbiTheme.colors.white,
      borderRadius: '50%',
    },
    sidebarFooter: {
      padding: '1.5rem',
      borderTop: `1px solid ${sbiTheme.colors.border}`,
      background: sbiTheme.colors.lightBlue,
    },
    quickStats: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: sbiTheme.colors.textSecondary,
      fontWeight: '500',
    },
    statValue: {
      fontSize: '0.8rem',
      color: sbiTheme.colors.primary,
      fontWeight: '600',
    },
    collapsedMenuLink: {
      justifyContent: 'center',
      padding: '1rem',
    },
    collapsedIcon: {
      fontSize: '1.5rem',
    },
    tooltip: {
      position: 'absolute',
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      background: sbiTheme.colors.darkBlue,
      color: sbiTheme.colors.white,
      padding: '0.5rem 1rem',
      borderRadius: sbiTheme.borderRadius.medium,
      fontSize: '0.8rem',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      boxShadow: sbiTheme.shadows.medium,
      zIndex: 1002,
      display: 'none',
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div style={styles.sidebar}>
        <button 
          style={styles.toggleBtn}
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isOpen ? '◀' : '▶'}
        </button>
        
        {/* Sidebar Header */}
        <div style={styles.sidebarHeader}>
          <div style={styles.headerBackground}></div>
          <div style={styles.userSection}>
            <div style={styles.userAvatar}>
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div style={styles.userInfo}>
                <h3 style={styles.userName}>
                  Welcome, {user?.full_name?.split(' ')[0] || 'User'}
                </h3>
                <p style={styles.userEmail}>{user?.email || 'user@company.com'}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Menu */}
        <ul style={styles.sidebarMenu}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            const isCollapsed = !isOpen;
            
            return (
              <li key={item.path} style={styles.menuItem}>
                <Link 
                  to={item.path} 
                  style={{
                    ...styles.menuLink,
                    ...(isCollapsed && styles.collapsedMenuLink),
                    ...(isActive && styles.activeMenuLink),
                  }}
                  onClick={handleLinkClick}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = sbiTheme.colors.lightBlue;
                      e.target.style.color = sbiTheme.colors.primary;
                    }
                    if (isCollapsed) {
                      const tooltip = document.createElement('div');
                      tooltip.style.cssText = `
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        background: ${sbiTheme.colors.darkBlue};
                        color: ${sbiTheme.colors.white};
                        padding: 0.5rem 1rem;
                        border-radius: ${sbiTheme.borderRadius.medium};
                        font-size: 0.8rem;
                        font-weight: 500;
                        white-space: nowrap;
                        box-shadow: ${sbiTheme.shadows.medium};
                        z-index: 1002;
                      `;
                      tooltip.textContent = item.label;
                      e.target.appendChild(tooltip);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = sbiTheme.colors.textPrimary;
                    }
                    if (isCollapsed) {
                      const tooltip = e.target.querySelector('div');
                      if (tooltip) {
                        tooltip.remove();
                      }
                    }
                  }}
                >
                  <span style={{
                    ...styles.menuIcon,
                    ...(isCollapsed && styles.collapsedIcon)
                  }}>
                    {item.icon}
                  </span>
                  
                  {isOpen && (
                    <div style={styles.menuContent}>
                      <div style={styles.menuLabel}>{item.label}</div>
                      <div style={styles.menuDescription}>{item.description}</div>
                    </div>
                  )}
                  
                  {isActive && isOpen && (
                    <span style={styles.activeIndicator}></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Sidebar Footer */}
        {isOpen && (
          <div style={styles.sidebarFooter}>
            <div style={styles.quickStats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Active Session</span>
                <span style={styles.statValue}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Last Login</span>
                <span style={styles.statValue}>
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Security</span>
                <span style={{...styles.statValue, color: sbiTheme.colors.green}}>
                  🔒 Secure
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;