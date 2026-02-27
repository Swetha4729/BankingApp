import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
    error: '#d9534f',
    warning: '#f0ad4e',
    success: '#00a651',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #004687 0%, #0066b3 100%)',
    accent: 'linear-gradient(135deg, #ff6a00 0%, #ff8c3a 100%)',
    success: 'linear-gradient(135deg, #00a651 0%, #00c569 100%)',
    light: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%)',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 70, 135, 0.1)',
    medium: '0 4px 12px rgba(0, 70, 135, 0.15)',
    large: '0 8px 24px rgba(0, 70, 135, 0.2)',
    card: '0 2px 12px rgba(0, 70, 135, 0.08)',
  },
  borderRadius: {
    small: '4px',
    medium: '6px',
    large: '8px',
    xlarge: '12px',
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    xxl: '3rem',
  },
};

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const styles = {
    navbar: {
      background: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.medium,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
    },
    navContainer: {
      maxWidth: '1500px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.lg}`,
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.md,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      textDecoration: 'none',
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: sbiTheme.gradients.primary,
      borderRadius: sbiTheme.borderRadius.medium,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginLeft: '50px',
    },
    logoText: {
      display: 'flex',
      flexDirection: 'column',
    },
    logoMain: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: sbiTheme.colors.primary,
      lineHeight: '1.2',
    },
    logoSub: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: sbiTheme.colors.textSecondary,
      letterSpacing: '0.5px',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: sbiTheme.spacing.md,
      alignItems: 'center',
    },
    navItem: {
      position: 'relative',
    },
    navLink: {
      color: sbiTheme.colors.textPrimary,
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '0.9rem',
      padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.md}`,
      borderRadius: sbiTheme.borderRadius.medium,
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
      whiteSpace: 'nowrap',
    },
    activeNavLink: {
      color: sbiTheme.colors.primary,
      background: sbiTheme.colors.lightBlue,
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.md,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.md}`,
      background: sbiTheme.colors.lightBlue,
      borderRadius: sbiTheme.borderRadius.medium,
      color: sbiTheme.colors.primary,
      fontWeight: '500',
      fontSize: '0.9rem',
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      background: sbiTheme.gradients.primary,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      fontWeight: '600',
      fontSize: '0.8rem',
    },
    logoutBtn: {
      background: 'transparent',
      border: `2px solid ${sbiTheme.colors.accent}`,
      color: sbiTheme.colors.accent,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.md}`,
      borderRadius: sbiTheme.borderRadius.medium,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
    },
    authButtons: {
      display: 'flex',
      gap: sbiTheme.spacing.sm,
      alignItems: 'center',
    },
    loginBtn: {
      background: 'transparent',
      border: `2px solid ${sbiTheme.colors.primary}`,
      color: sbiTheme.colors.primary,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.lg}`,
      borderRadius: sbiTheme.borderRadius.medium,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
    },
    signupBtn: {
      background: sbiTheme.gradients.accent,
      border: 'none',
      color: sbiTheme.colors.white,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.lg}`,
      borderRadius: sbiTheme.borderRadius.medium,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
      boxShadow: sbiTheme.shadows.small,
    },
    mobileMenuButton: {
      display: 'none',
      background: 'transparent',
      border: 'none',
      color: sbiTheme.colors.primary,
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: sbiTheme.spacing.xs,
      borderRadius: sbiTheme.borderRadius.small,
    },
    mobileMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.large,
      borderTop: `1px solid ${sbiTheme.colors.border}`,
      display: isMobileMenuOpen ? 'block' : 'none',
      zIndex: 1000,
    },
    mobileMenuList: {
      listStyle: 'none',
      margin: 0,
      padding: sbiTheme.spacing.md,
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.sm,
    },
    mobileMenuItem: {
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      padding: `${sbiTheme.spacing.sm} 0`,
    },
    mobileMenuLink: {
      color: sbiTheme.colors.textPrimary,
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.md}`,
      borderRadius: sbiTheme.borderRadius.medium,
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      width: '100%',
    },
    mobileActiveLink: {
      color: sbiTheme.colors.primary,
      background: sbiTheme.colors.lightBlue,
    },
    mobileUserSection: {
      padding: sbiTheme.spacing.md,
      borderTop: `1px solid ${sbiTheme.colors.border}`,
      background: sbiTheme.colors.lightBlue,
    },
    mobileUserInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      marginBottom: sbiTheme.spacing.md,
      padding: sbiTheme.spacing.sm,
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.medium,
    },
  };

  // Updated navigation links - Removed Accounts, Fund Transfer, and Beneficiaries
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊', protected: true },
    { path: '/bills', label: 'Bill Payments', icon: '💳', protected: true },
    { path: '/transfer', label: 'Transfer', icon : '' , protected: true},
    { path: '/reports', label: 'Transaction History', icon: '📈', protected: true },
    { path: '/trade', label: 'Trade Finance', icon: '🌐', protected: true },
  ];

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>SST</div>
            <div style={styles.logoText}>
              <span style={styles.logoMain}>YOLO Business</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Menu - Show only on larger screens */}
        <ul style={{ ...styles.navMenu, display: window.innerWidth > 1024 ? 'flex' : 'none' }}>
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            return (
              <li key={link.path} style={styles.navItem}>
                <Link
                  to={link.path}
                  style={{
                    ...styles.navLink,
                    ...(isActiveLink(link.path) && styles.activeNavLink),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActiveLink(link.path)) {
                      e.target.style.background = sbiTheme.colors.lightBlue;
                      e.target.style.color = sbiTheme.colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiveLink(link.path)) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = sbiTheme.colors.textPrimary;
                    }
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop User Section - Show only on larger screens */}
        <div style={{ ...styles.userSection, display: window.innerWidth > 1024 ? 'flex' : 'none' }}>
          {user ? (
            <>
              <div style={styles.userInfo}>
                <div style={styles.userAvatar}>
                  {getInitials(user.full_name)}
                </div>
                <span>Hi, {user.full_name?.split(' ')[0]}</span>
              </div>
              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.background = sbiTheme.colors.accent;
                  e.target.style.color = sbiTheme.colors.white;
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = sbiTheme.colors.accent;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span>🚪</span>
                Logout
              </button>
            </>
          ) : (
            <div style={styles.authButtons}>
              <Link
                to="/login"
                style={styles.loginBtn}
                onMouseEnter={(e) => {
                  e.target.style.background = sbiTheme.colors.primary;
                  e.target.style.color = sbiTheme.colors.white;
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = sbiTheme.colors.primary;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span>🔑</span>
                Login
              </Link>
              <Link
                to="/signup"
                style={styles.signupBtn}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = sbiTheme.shadows.medium;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = sbiTheme.shadows.small;
                }}
              >
                <span>📝</span>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Show only on smaller screens */}
        <button
          style={{ ...styles.mobileMenuButton, display: window.innerWidth <= 1024 ? 'flex' : 'none' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <ul style={styles.mobileMenuList}>
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            return (
              <li key={link.path} style={styles.mobileMenuItem}>
                <Link
                  to={link.path}
                  style={{
                    ...styles.mobileMenuLink,
                    ...(isActiveLink(link.path) && styles.mobileActiveLink),
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {user && (
          <div style={styles.mobileUserSection}>
            <div style={styles.mobileUserInfo}>
              <div style={styles.userAvatar}>
                {getInitials(user.full_name)}
              </div>
              <span style={{ fontWeight: '600', color: sbiTheme.colors.primary }}>
                {user.full_name}
              </span>
            </div>
            <button
              style={{
                ...styles.logoutBtn,
                width: '100%',
                justifyContent: 'center',
              }}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.background = sbiTheme.colors.accent;
                e.target.style.color = sbiTheme.colors.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = sbiTheme.colors.accent;
              }}
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        )}

        {!user && (
          <div style={{ ...styles.mobileUserSection, background: sbiTheme.colors.lightBlue }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sbiTheme.spacing.sm }}>
              <Link
                to="/login"
                style={{
                  ...styles.loginBtn,
                  width: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = sbiTheme.colors.primary;
                  e.target.style.color = sbiTheme.colors.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = sbiTheme.colors.primary;
                }}
              >
                <span>🔑</span>
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  ...styles.signupBtn,
                  width: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = sbiTheme.shadows.medium;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = sbiTheme.shadows.small;
                }}
              >
                <span>📝</span>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;