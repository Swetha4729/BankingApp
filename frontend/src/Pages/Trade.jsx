import React, { useState, useEffect, useRef } from 'react';
import TradeFinance from '../components/TradeFinance';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  BanknotesIcon,
  ChevronRightIcon,
  EyeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChartBarIcon as ChartBarSolid,
  DocumentTextIcon as DocumentTextSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
  ArrowTrendingUpIcon as ArrowTrendingUpSolid,
  BuildingLibraryIcon as BuildingLibrarySolid,
  CheckCircleIcon as CheckCircleSolid,
} from '@heroicons/react/24/solid';

// Enhanced SBI YONO Business Theme with advanced animations
const sbiTheme = {
  colors: {
    primary: '#004687',
    primaryLight: '#0066b3',
    primaryDark: '#003366',
    secondary: '#ff6a00',
    secondaryLight: '#ff8c3a',
    success: '#00a651',
    successLight: '#00c569',
    warning: '#f0ad4e',
    error: '#d9534f',
    info: '#5bc0de',
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    background: '#f8fafc',
    border: '#e5e7eb',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #004687 0%, #0066b3 100%)',
    secondary: 'linear-gradient(135deg, #ff6a00 0%, #ff8c3a 100%)',
    success: 'linear-gradient(135deg, #00a651 0%, #00c569 100%)',
    premium: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    light: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    dark: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(0, 112, 243, 0.15)',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', 'Roboto', 'Arial', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  animations: {
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  }
};

// Glass Card Component with advanced animations
const GlassCard = ({ children, className = '', hoverable = false, animated = true, blur = true, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const styles = {
    card: {
      background: blur ? 'rgba(255, 255, 255, 0.25)' : sbiTheme.colors.white,
      backdropFilter: blur ? 'blur(20px)' : 'none',
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.lg,
      boxShadow: isHovered && hoverable ? sbiTheme.shadows.glow : sbiTheme.shadows.base,
      border: `1px solid ${blur ? 'rgba(255, 255, 255, 0.3)' : sbiTheme.colors.border}`,
      transition: animated ? `all 0.4s ${sbiTheme.animations.spring}` : 'none',
      transform: isHovered && hoverable ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      position: 'relative',
      overflow: 'hidden',
      ...props.style,
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 112, 243, 0.1) 0%, transparent 50%)`,
      opacity: isHovered && hoverable ? 1 : 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none',
    },
  };

  return (
    <div
      style={styles.card}
      className={className}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      onMouseMove={hoverable ? handleMouseMove : undefined}
      {...props}
    >
      {hoverable && <div style={styles.gradientOverlay} />}
      {children}
    </div>
  );
};

// Enhanced Button Component with micro-interactions
const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  animated = true,
  pulse = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const styles = {
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
      border: 'none',
      borderRadius: sbiTheme.borderRadius.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: animated ? `all 0.3s ${sbiTheme.animations.spring}` : 'none',
      opacity: disabled ? 0.6 : 1,
      transform: isPressed ? 'scale(0.95)' : (isHovered && !disabled && !loading ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)'),
      position: 'relative',
      overflow: 'hidden',
      ...getButtonStyles(variant, size),
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
    },
  };

  function getButtonStyles(variant, size) {
    const sizeStyles = {
      sm: {
        padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.md}`,
        fontSize: sbiTheme.typography.fontSize.sm,
      },
      md: {
        padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.lg}`,
        fontSize: sbiTheme.typography.fontSize.base,
      },
      lg: {
        padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.xl}`,
        fontSize: sbiTheme.typography.fontSize.lg,
      },
    };

    const variantStyles = {
      primary: {
        background: sbiTheme.gradients.primary,
        color: sbiTheme.colors.white,
        boxShadow: sbiTheme.shadows.sm,
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: sbiTheme.colors.primary,
        border: `1px solid rgba(0, 112, 243, 0.3)`,
        backdropFilter: 'blur(10px)',
      },
      ghost: {
        background: 'transparent',
        color: sbiTheme.colors.textPrimary,
        border: `1px solid ${sbiTheme.colors.border}`,
      },
      success: {
        background: sbiTheme.gradients.success,
        color: sbiTheme.colors.white,
        boxShadow: sbiTheme.shadows.sm,
      },
    };

    return { ...sizeStyles[size], ...variantStyles[variant] };
  }

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (e) => {
    if (!disabled && !loading) {
      createRipple(e);
      props.onClick?.(e);
    }
  };

  return (
    <button
      style={{
        ...styles.button,
        animation: pulse ? 'pulse 2s infinite' : 'none',
      }}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      onMouseDown={() => !disabled && !loading && setIsPressed(true)}
      onMouseUp={() => !disabled && !loading && setIsPressed(false)}
      onClick={handleClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon width={20} height={20} />}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.sm }}>
          <div style={loadingSpinner}></div>
          Loading...
        </div>
      ) : (
        children
      )}
      {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
    </button>
  );
};

// Simplified Stat Card without particle effects
const StatCard = ({ title, value, change, icon: Icon, trend = 'up', highlight = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      background: highlight ? sbiTheme.gradients.primary : sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      boxShadow: isHovered ? sbiTheme.shadows.md : sbiTheme.shadows.sm,
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      position: 'relative',
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      cursor: 'pointer',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: sbiTheme.spacing.sm,
    },
    iconContainer: {
      width: '60px',
      height: '60px',
      borderRadius: sbiTheme.borderRadius.xl,
      background: highlight ? 'rgba(255, 255, 255, 0.2)' : sbiTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.white,
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      boxShadow: sbiTheme.shadows.sm,
    },
    title: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      margin: '0 0 0.5rem 0',
    },
    value: {
      fontSize: sbiTheme.typography.fontSize['3xl'],
      fontWeight: sbiTheme.typography.fontWeight.extrabold,
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
      lineHeight: 1,
    },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : (trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.error),
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={styles.header}>
        <div>
          <h4 style={styles.title}>{title}</h4>
          <h3 style={styles.value}>{value}</h3>
          {change && (
            <div style={styles.change}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.error,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: sbiTheme.colors.white,
                fontSize: '10px',
              }}>
                {trend === 'up' ? '↗' : '↘'}
              </div>
              {change}
            </div>
          )}
        </div>
        <div style={styles.iconContainer}>
          <Icon width={28} height={28} />
        </div>
      </div>
    </div>
  );
};

// Loading spinner style
const loadingSpinner = {
  width: '16px',
  height: '16px',
  border: '2px solid transparent',
  borderTop: '2px solid currentColor',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Advanced FadeIn with stagger children
const FadeIn = ({ children, delay = 0, duration = 0.6, direction = 'up', distance = 20 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return `translateY(${distance}px)`;
    }
  };

  const styles = {
    container: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0, 0)' : getTransform(),
      transition: `all ${duration}s ${sbiTheme.animations.smooth}`,
    }
  };

  return <div ref={ref} style={styles.container}>{children}</div>;
};

// Staggered List with advanced animations
const StaggeredList = ({ children, staggerDelay = 0.1, animation = 'fadeIn' }) => {
  return React.Children.map(children, (child, index) => (
    <FadeIn 
      delay={index * staggerDelay * 1000} 
      duration={0.8}
      direction="up"
      distance={30}
    >
      {child}
    </FadeIn>
  ));
};

// Floating Action Button
const FloatingActionButton = ({ icon: Icon, onClick, pulse = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    fab: {
      position: 'fixed',
      bottom: sbiTheme.spacing.xl,
      right: sbiTheme.spacing.xl,
      width: '60px',
      height: '60px',
      borderRadius: sbiTheme.borderRadius.full,
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      border: 'none',
      boxShadow: sbiTheme.shadows.xl,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all 0.3s ${sbiTheme.animations.elastic}`,
      transform: isHovered ? 'scale(1.1) rotate(90deg)' : 'scale(1) rotate(0)',
      zIndex: 1000,
      animation: pulse ? 'pulse 2s infinite' : 'none',
    },
  };

  return (
    <button
      style={styles.fab}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Icon width={24} height={24} />
    </button>
  );
};

// Notification Toast
const Toast = ({ message, type = 'info', onClose, visible }) => {
  const styles = {
    toast: {
      position: 'fixed',
      top: sbiTheme.spacing.xl,
      right: sbiTheme.spacing.xl,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      padding: sbiTheme.spacing.lg,
      borderRadius: sbiTheme.borderRadius.xl,
      boxShadow: sbiTheme.shadows.xl,
      borderLeft: `4px solid ${sbiTheme.colors[type]}`,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      zIndex: 1001,
      transform: visible ? 'translateX(0)' : 'translateX(400px)',
      transition: `transform 0.5s ${sbiTheme.animations.elastic}`,
      backdropFilter: 'blur(20px)',
    },
  };

  return (
    <div style={styles.toast}>
      <CheckCircleIcon width={20} height={20} style={{ color: sbiTheme.colors[type] }} />
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <XMarkIcon width={16} height={16} />
      </button>
    </div>
  );
};

const TradePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tradeStats, setTradeStats] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Simulate fetching trade data
    setLoading(true);
    setTimeout(() => {
      setTradeStats({
        totalLC: 12,
        activeGuarantees: 5,
        pendingApprovals: 3,
        totalVolume: 45000000,
      });
      setRecentTransactions([
        { id: 'LC2024001', type: 'Letter of Credit', amount: 15000000, date: '2024-01-15', status: 'active', counterparty: 'ABC Imports Inc.' },
        { id: 'BG2024002', type: 'Bank Guarantee', amount: 5000000, date: '2024-01-12', status: 'issued', counterparty: 'XYZ Exports Ltd.' },
        { id: 'LC2024003', type: 'Letter of Credit', amount: 8000000, date: '2024-01-10', status: 'pending', counterparty: 'Global Traders Co.' },
        { id: 'BG2024004', type: 'Bank Guarantee', amount: 3000000, date: '2024-01-08', status: 'active', counterparty: 'Ocean Freight Corp.' },
      ]);
      setLoading(false);
      setPageLoaded(true);
      showNotification('Trade dashboard loaded successfully!');
    }, 1500);
  }, []);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const quickServices = [
    {
      icon: DocumentTextSolid,
      title: 'Letter of Credit',
      description: 'Secure your international trade transactions with confirmed payment guarantees',
      action: () => {
        setActiveTab('letters');
        showNotification('Navigating to Letters of Credit');
      },
      color: sbiTheme.colors.primary,
      gradient: sbiTheme.gradients.primary,
    },
    {
      icon: ShieldCheckSolid,
      title: 'Bank Guarantees',
      description: 'Performance and financial guarantees for your business contracts',
      action: () => {
        setActiveTab('guarantees');
        showNotification('Navigating to Bank Guarantees');
      },
      color: sbiTheme.colors.success,
      gradient: sbiTheme.gradients.success,
    },
    {
      icon: BuildingLibrarySolid,
      title: 'Export Finance',
      description: 'Pre-shipment and post-shipment financing for exporters',
      action: () => {
        setActiveTab('export');
        showNotification('Navigating to Export Finance');
      },
      color: sbiTheme.colors.secondary,
      gradient: sbiTheme.gradients.secondary,
    },
    {
      icon: GlobeAltIcon,
      title: 'Import Finance',
      description: 'Working capital and payment solutions for importers',
      action: () => {
        setActiveTab('import');
        showNotification('Navigating to Import Finance');
      },
      color: sbiTheme.colors.info,
      gradient: sbiTheme.gradients.premium,
    },
  ];

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '0.5rem 1rem',
      borderRadius: sbiTheme.borderRadius.full,
      fontSize: sbiTheme.typography.fontSize.xs,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
    };

    switch (status) {
      case 'active':
        return { 
          ...baseStyle, 
          background: 'rgba(0, 166, 81, 0.1)',
          color: sbiTheme.colors.success,
          border: `1px solid rgba(0, 166, 81, 0.2)`,
        };
      case 'issued':
        return { 
          ...baseStyle, 
          background: 'rgba(0, 70, 135, 0.1)',
          color: sbiTheme.colors.primary,
          border: `1px solid rgba(0, 70, 135, 0.2)`,
        };
      case 'pending':
        return { 
          ...baseStyle, 
          background: 'rgba(240, 173, 78, 0.1)',
          color: sbiTheme.colors.warning,
          border: `1px solid rgba(240, 173, 78, 0.2)`,
        };
      default:
        return baseStyle;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon width={14} height={14} />;
      case 'issued':
        return <DocumentTextIcon width={14} height={14} />;
      case 'pending':
        return <ClockIcon width={14} height={14} />;
      default:
        return <ClockIcon width={14} height={14} />;
    }
  };

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${sbiTheme.colors.background} 0%, #f1f5f9 100%)`,
      fontFamily: sbiTheme.typography.fontFamily,
      opacity: pageLoaded ? 1 : 0,
      transition: 'opacity 0.6s ease-in-out',
      position: 'relative',
    },
    headerSection: {
      background: sbiTheme.gradients.dark,
      color: sbiTheme.colors.white,
      padding: `${sbiTheme.spacing['3xl']} ${sbiTheme.spacing.lg}`,
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
        radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.2) 0%, transparent 55%),
        radial-gradient(circle at 15% 85%, rgba(0, 166, 81, 0.15) 0%, transparent 55%),
        linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)
      `,
      animation: 'gradientShift 8s ease-in-out infinite alternate',
    },
    floatingOrbs: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
      animation: 'float 6s ease-in-out infinite',
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
    },
    pageTitle: {
      fontSize: sbiTheme.typography.fontSize['5xl'],
      fontWeight: sbiTheme.typography.fontWeight.extrabold,
      marginBottom: sbiTheme.spacing.md,
      color: sbiTheme.colors.white,
      lineHeight: '1.2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.md,
      background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    pageSubtitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      opacity: 0.92,
      margin: 0,
      color: sbiTheme.colors.white,
      fontWeight: sbiTheme.typography.fontWeight.normal,
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6',
    },
    contentSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: sbiTheme.spacing.lg,
      paddingTop: sbiTheme.spacing.xl,
    },
    // Stats Grid
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    // Quick Services
    quickServices: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    serviceCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      textAlign: 'center',
      transition: `all 0.4s ${sbiTheme.animations.spring}`,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
    },
    serviceIcon: {
      width: '80px',
      height: '80px',
      borderRadius: sbiTheme.borderRadius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.lg,
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.lg,
    },
    serviceTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.sm,
    },
    serviceDescription: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      lineHeight: '1.5',
      marginBottom: sbiTheme.spacing.lg,
    },
    // Recent Transactions
    recentTransactionsCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      marginBottom: sbiTheme.spacing.xl,
      backdropFilter: 'blur(20px)',
    },
    sectionTitle: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      background: sbiTheme.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    transactionList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    transactionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: sbiTheme.spacing.lg,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
      borderRadius: sbiTheme.borderRadius.lg,
      marginBottom: sbiTheme.spacing.xs,
      background: 'rgba(255, 255, 255, 0.5)',
    },
    transactionDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.xs,
      flex: 1,
    },
    transactionType: {
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.base,
    },
    transactionMeta: {
      display: 'flex',
      gap: sbiTheme.spacing.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    transactionAmount: {
      fontWeight: sbiTheme.typography.fontWeight.bold,
      fontSize: sbiTheme.typography.fontSize.lg,
      background: sbiTheme.gradients.success,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: sbiTheme.spacing['3xl'],
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: sbiTheme.borderRadius['2xl'],
      boxShadow: sbiTheme.shadows.base,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      textAlign: 'center',
      backdropFilter: 'blur(20px)',
    },
    loadingSpinner: {
      width: '60px',
      height: '60px',
      border: `4px solid ${sbiTheme.colors.border}`,
      borderTop: `4px solid ${sbiTheme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: sbiTheme.spacing.lg,
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.headerBackground}></div>
        <div style={{ ...styles.floatingOrbs, top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div style={{ ...styles.floatingOrbs, top: '60%', right: '15%', animationDelay: '2s', width: '150px', height: '150px' }}></div>
        <div style={{ ...styles.floatingOrbs, bottom: '20%', left: '20%', animationDelay: '4s', width: '100px', height: '100px' }}></div>
        
        <div style={styles.headerContent}>
          <FadeIn direction="down" duration={1}>
            <h1 style={styles.pageTitle}>
              <GlobeAltIcon width={56} height={56} />
              Trade Finance
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={200} duration={1}>
            <p style={styles.pageSubtitle}>
              Comprehensive trade finance solutions including Letters of Credit, Bank Guarantees, 
              and export-import financing for global business operations
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={styles.contentSection}>
        {/* Statistics Cards */}
        <FadeIn delay={400}>
          <div style={styles.statsGrid}>
            <StatCard
              title="Active LCs"
              value={tradeStats.totalLC || 0}
              change="+2 this month"
              trend="up"
              icon={DocumentTextSolid}
              highlight={true}
            />
            
            <StatCard
              title="Bank Guarantees"
              value={tradeStats.activeGuarantees || 0}
              change="Active"
              trend="neutral"
              icon={ShieldCheckSolid}
            />
            
            <StatCard
              title="Pending Approvals"
              value={tradeStats.pendingApprovals || 0}
              change="Requires attention"
              trend="warning"
              icon={ClockIcon}
            />
            
            <StatCard
              title="Total Volume"
              value={`₹${(tradeStats.totalVolume || 0).toLocaleString('en-IN')}`}
              change="+15% growth"
              trend="up"
              icon={CurrencyDollarSolid}
            />
          </div>
        </FadeIn>

        {/* Quick Services */}
        <FadeIn delay={600}>
          <h2 style={styles.sectionTitle}>
            <ArrowTrendingUpIcon width={28} height={28} />
            Quick Services
          </h2>
          <div style={styles.quickServices}>
            <StaggeredList staggerDelay={0.15}>
              {quickServices.map((service, index) => (
                <GlassCard
                  key={index}
                  hoverable
                  animated
                  style={styles.serviceCard}
                  onClick={service.action}
                >
                  <div style={{
                    ...styles.serviceIcon,
                    background: service.gradient,
                    transform: 'rotate(0deg)',
                  }}>
                    <service.icon width={32} height={32} />
                  </div>
                  <div style={styles.serviceTitle}>{service.title}</div>
                  <div style={styles.serviceDescription}>{service.description}</div>
                  <AnimatedButton 
                    variant="secondary"
                    icon={ChevronRightIcon}
                    iconPosition="right"
                    style={{ width: '100%' }}
                    pulse={index === 0}
                  >
                    Explore Service
                  </AnimatedButton>
                </GlassCard>
              ))}
            </StaggeredList>
          </div>
        </FadeIn>

        {/* Recent Transactions Section */}
        <FadeIn delay={1000}>
          <GlassCard style={styles.recentTransactionsCard}>
            <h3 style={styles.sectionTitle}>
              <ClockIcon width={28} height={28} />
              Recent Trade Transactions
            </h3>
            
            {loading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={{ color: sbiTheme.colors.textSecondary, fontWeight: sbiTheme.typography.fontWeight.medium }}>
                  Loading your trade transactions...
                </p>
              </div>
            ) : (
              <>
                <ul style={styles.transactionList}>
                  <StaggeredList staggerDelay={0.08}>
                    {recentTransactions.map((transaction) => (
                      <GlassCard 
                        key={transaction.id} 
                        hoverable
                        animated
                        style={styles.transactionItem}
                      >
                        <div style={styles.transactionDetails}>
                          <span style={styles.transactionType}>
                            {transaction.type} - {transaction.id}
                          </span>
                          <div style={styles.transactionMeta}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <CalendarIcon width={14} height={14} />
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <BuildingLibraryIcon width={14} height={14} />
                              {transaction.counterparty}
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.lg }}>
                          <span style={styles.transactionAmount}>
                            ₹{transaction.amount.toLocaleString('en-IN')}
                          </span>
                          <span style={getStatusStyle(transaction.status)}>
                            {getStatusIcon(transaction.status)} {transaction.status}
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                  </StaggeredList>
                </ul>

                <AnimatedButton 
                  variant="secondary"
                  icon={EyeIcon}
                  iconPosition="right"
                  style={{ marginTop: sbiTheme.spacing.lg, width: '100%' }}
                  pulse
                >
                  View Complete Trade History
                </AnimatedButton>
              </>
            )}
          </GlassCard>
        </FadeIn>

        {/* TradeFinance Component */}
        <FadeIn delay={1200}>
          <TradeFinance user={user} />
        </FadeIn>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        icon={DocumentTextSolid} 
        onClick={() => showNotification('New trade transaction started!')}
        pulse
      />

      {/* Notification Toast */}
      <Toast 
        message={toastMessage} 
        type="success" 
        onClose={() => setShowToast(false)} 
        visible={showToast}
      />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 25px 50px -12px rgba(0, 112, 243, 0.25);
          }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${sbiTheme.colors.gray100};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${sbiTheme.gradients.primary};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${sbiTheme.colors.primaryDark};
        }

        /* Focus styles */
        button:focus {
          outline: 2px solid ${sbiTheme.colors.primary};
          outline-offset: 2px;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: color 0.3s ease, background-color 0.3s ease;
        }

        /* Glass morphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Text gradient animations */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default TradePage;