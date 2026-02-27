import React, { useState, useEffect, useRef } from 'react';
import BillPayment from '../components/BillPayment';

// Heroicons imports
import {
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  BuildingLibraryIcon,
  EyeIcon,
  PlusIcon,
  FunnelIcon,
  ChevronRightIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// Heroicons solid variants
import {
  ChartBarIcon as ChartBarSolid,
  DocumentTextIcon as DocumentTextSolid,
  CheckCircleIcon as CheckCircleSolid,
  ClockIcon as ClockSolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
  CreditCardIcon as CreditCardSolid,
  DevicePhoneMobileIcon as DevicePhoneMobileSolid,
  HomeIcon as HomeSolid,
  BuildingLibraryIcon as BuildingLibrarySolid,
} from '@heroicons/react/24/solid';

// Enhanced SBI YONO Business Theme with React Bits animations
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
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
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
    elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
};

// Enhanced Card Component with floating effects
const Card = ({ children, className = '', hoverable = false, animated = true, floating = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!floating || !cardRef.current) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      const floatOffset = Math.sin(scrollPercent * Math.PI) * 20;
      
      cardRef.current.style.transform = `translateY(${floatOffset}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [floating]);

  const styles = {
    card: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      boxShadow: isHovered && hoverable ? sbiTheme.shadows.lg : sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: animated ? `all 0.4s ${sbiTheme.animations.spring}` : 'none',
      transform: isHovered && hoverable ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      position: 'relative',
      overflow: 'hidden',
      ...props.style,
    },
  };

  return (
    <div
      ref={cardRef}
      style={styles.card}
      className={className}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

// Enhanced Button Component with micro-interactions
const Button = ({ 
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
      transform: isHovered && !disabled && !loading ? 'translateY(-2px)' : 
                 isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0)',
      position: 'relative',
      overflow: 'hidden',
      ...getButtonStyles(variant, size),
    },
    pulseEffect: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: sbiTheme.borderRadius.lg,
      animation: 'pulse 2s infinite',
      pointerEvents: 'none',
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
        boxShadow: sbiTheme.shadows.md,
      },
      secondary: {
        background: sbiTheme.colors.white,
        color: sbiTheme.colors.primary,
        border: `2px solid ${sbiTheme.colors.primary}`,
        boxShadow: sbiTheme.shadows.sm,
      },
      ghost: {
        background: 'transparent',
        color: sbiTheme.colors.textPrimary,
        border: `1px solid ${sbiTheme.colors.border}`,
      },
      success: {
        background: sbiTheme.gradients.success,
        color: sbiTheme.colors.white,
        boxShadow: sbiTheme.shadows.md,
      },
    };

    return { ...sizeStyles[size], ...variantStyles[variant] };
  }

  return (
    <button
      style={styles.button}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      onMouseDown={() => !disabled && !loading && setIsPressed(true)}
      onMouseUp={() => !disabled && !loading && setIsPressed(false)}
      {...props}
    >
      {pulse && <div style={styles.pulseEffect}></div>}
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

// Enhanced Stat Card with floating animation
const StatCard = ({ title, value, change, icon: Icon, trend = 'up', highlight = false, animated = true, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!animated || !cardRef.current) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      const floatOffset = Math.sin(scrollPercent * Math.PI * 2) * 10;
      
      cardRef.current.style.transform = `translateY(${floatOffset}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  const styles = {
    card: {
      background: highlight ? sbiTheme.gradients.primary : sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      border: `1px solid ${highlight ? 'rgba(255,255,255,0.2)' : sbiTheme.colors.border}`,
      boxShadow: isHovered && animated ? sbiTheme.shadows.lg : sbiTheme.shadows.sm,
      transition: animated ? `all 0.4s ${sbiTheme.animations.spring}` : 'none',
      position: 'relative',
      overflow: 'hidden',
      transform: isHovered && animated ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
      cursor: animated ? 'pointer' : 'default',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: sbiTheme.spacing.sm,
    },
    iconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: sbiTheme.borderRadius.lg,
      background: highlight ? 'rgba(255, 255, 255, 0.2)' : sbiTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.white,
      transition: animated ? `all 0.3s ${sbiTheme.animations.spring}` : 'none',
      transform: isHovered && animated ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0)',
    },
    title: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      margin: '0 0 0.5rem 0',
      transition: 'all 0.3s ease',
    },
    value: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
      lineHeight: 1,
      transition: 'all 0.3s ease',
    },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : (trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.error),
      fontWeight: sbiTheme.typography.fontWeight.medium,
      transition: 'all 0.3s ease',
    },
    trendIcon: {
      transition: animated ? `all 0.3s ${sbiTheme.animations.spring}` : 'none',
      transform: isHovered && animated ? 'scale(1.3)' : 'scale(1)',
    },
  };

  const TrendIcon = trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <Card 
      ref={cardRef}
      hoverable={animated} 
      animated={animated}
      floating={animated}
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
              <TrendIcon width={16} height={16} style={styles.trendIcon} />
              {change}
            </div>
          )}
        </div>
        <div style={styles.iconContainer}>
          <Icon width={24} height={24} />
        </div>
      </div>
    </Card>
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

// Enhanced FadeIn with scroll trigger
const FadeIn = ({ children, delay = 0, duration = 0.6, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const styles = {
    container: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
      transition: `all ${duration}s ${sbiTheme.animations.elastic}`,
    }
  };

  return <div ref={ref} style={styles.container}>{children}</div>;
};

// Enhanced SlideIn with scroll trigger
const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.5, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-50px)';
      case 'right': return 'translateX(50px)';
      case 'up': return 'translateY(50px)';
      case 'down': return 'translateY(-50px)';
      default: return 'translateY(30px)';
    }
  };

  const styles = {
    container: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0, 0)' : getTransform(),
      transition: `all ${duration}s ${sbiTheme.animations.elastic}`,
    }
  };

  return <div ref={ref} style={styles.container}>{children}</div>;
};

// Staggered List with enhanced animations
const StaggeredList = ({ children, staggerDelay = 0.1, threshold = 0.1 }) => {
  return React.Children.map(children, (child, index) => (
    <FadeIn delay={index * staggerDelay * 1000} threshold={threshold}>
      {child}
    </FadeIn>
  ));
};

// Floating Particles Background Component
const FloatingParticles = ({ count = 15 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            left: `${particle.left}%`,
            top: '-20px',
            animation: `floatParticle ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const BillsPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('payments');
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching recent payments
    setLoading(true);
    setTimeout(() => {
      setRecentPayments([
        { id: 1, biller: 'Electricity Board', amount: 4500, date: '2024-01-15', status: 'paid' },
        { id: 2, biller: 'Water Department', amount: 1200, date: '2024-01-10', status: 'paid' },
        { id: 3, biller: 'Internet Provider', amount: 899, date: '2024-01-05', status: 'pending' },
        { id: 4, biller: 'Mobile Recharge', amount: 599, date: '2024-01-03', status: 'paid' },
        { id: 5, biller: 'Insurance Premium', amount: 12500, date: '2024-01-01', status: 'paid' },
      ]);
      setLoading(false);
      setPageLoaded(true);
    }, 1200);

    // Scroll progress handler
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Styles with Hero UI patterns and animations
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: sbiTheme.colors.background,
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
        radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.15) 0%, transparent 55%),
        radial-gradient(circle at 15% 85%, rgba(0, 166, 81, 0.1) 0%, transparent 55%),
        linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)
      `,
      animation: 'gradientShift 8s ease-in-out infinite alternate',
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
    },
    pageTitle: {
      fontSize: sbiTheme.typography.fontSize['4xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      marginBottom: sbiTheme.spacing.md,
      color: sbiTheme.colors.white,
      lineHeight: '1.2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.md,
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
    // Scroll Progress Bar
    scrollProgress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${scrollProgress}%`,
      height: '3px',
      background: sbiTheme.gradients.primary,
      zIndex: 1000,
      transition: 'width 0.1s ease',
    },
    // Tab Styles
    tabContainer: {
      display: 'flex',
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.sm,
      marginBottom: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      position: 'relative',
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.lg}`,
      textAlign: 'center',
      background: 'transparent',
      border: 'none',
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.base,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      color: sbiTheme.colors.textSecondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
      position: 'relative',
      overflow: 'hidden',
    },
    activeTab: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.md,
      transform: 'translateY(-2px)',
    },
    // Stats Grid
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    // Quick Actions
    quickActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    actionCard: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      textAlign: 'center',
      transition: `all 0.4s ${sbiTheme.animations.spring}`,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    actionIcon: {
      width: '64px',
      height: '64px',
      background: sbiTheme.gradients.light,
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.md,
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      color: sbiTheme.colors.primary,
    },
    actionTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.xs,
      transition: 'all 0.3s ease',
    },
    actionDescription: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      lineHeight: '1.4',
      transition: 'all 0.3s ease',
    },
    // Recent Payments
    recentPaymentsCard: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      marginBottom: sbiTheme.spacing.xl,
    },
    sectionTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    paymentList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    paymentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: sbiTheme.spacing.lg,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
      borderRadius: sbiTheme.borderRadius.md,
      marginBottom: sbiTheme.spacing.xs,
    },
    paymentDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.xs,
      flex: 1,
    },
    paymentBiller: {
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.base,
    },
    paymentMeta: {
      display: 'flex',
      gap: sbiTheme.spacing.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    paymentAmount: {
      fontWeight: sbiTheme.typography.fontWeight.bold,
      fontSize: sbiTheme.typography.fontSize.base,
      color: sbiTheme.colors.success,
    },
    statusBadge: {
      padding: '0.375rem 0.75rem',
      borderRadius: sbiTheme.borderRadius.full,
      fontSize: sbiTheme.typography.fontSize.xs,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
    },
    statusPaid: {
      background: 'rgba(0, 166, 81, 0.1)',
      color: sbiTheme.colors.success,
      border: `1px solid rgba(0, 166, 81, 0.2)`,
    },
    statusPending: {
      background: 'rgba(240, 173, 78, 0.1)',
      color: sbiTheme.colors.warning,
      border: `1px solid rgba(240, 173, 78, 0.2)`,
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: sbiTheme.spacing['3xl'],
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      textAlign: 'center',
    },
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: `4px solid ${sbiTheme.colors.border}`,
      borderTop: `4px solid ${sbiTheme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: sbiTheme.spacing.lg,
    },
  };

  const quickActions = [
    {
      icon: CreditCardSolid,
      title: 'Quick Pay',
      description: 'Pay bills using saved beneficiaries and templates',
      action: () => setActiveTab('payments')
    },
    {
      icon: DevicePhoneMobileSolid,
      title: 'Mobile & DTH',
      description: 'Instant mobile recharge and DTH payments',
      action: () => setActiveTab('payments')
    },
    {
      icon: HomeSolid,
      title: 'Utility Bills',
      description: 'Electricity, Water, Gas and other utility payments',
      action: () => setActiveTab('payments')
    },
    {
      icon: BuildingLibrarySolid,
      title: 'Tax Payments',
      description: 'GST, Income Tax and other government payments',
      action: () => setActiveTab('payments')
    },
  ];

  const tabs = [
    {
      id: 'payments',
      label: 'Bill Payments',
      icon: CreditCardIcon,
      solidIcon: CreditCardSolid
    },
    {
      id: 'collections',
      label: 'Collections',
      icon: CurrencyDollarIcon,
      solidIcon: CurrencyDollarSolid
    },
    {
      id: 'history',
      label: 'Payment History',
      icon: DocumentTextIcon,
      solidIcon: DocumentTextSolid
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'paid':
        return { ...styles.statusBadge, ...styles.statusPaid };
      case 'pending':
        return { ...styles.statusBadge, ...styles.statusPending };
      default:
        return { ...styles.statusBadge, ...styles.statusPending };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon width={12} height={12} />;
      case 'pending':
        return <ClockIcon width={12} height={12} />;
      default:
        return <ClockIcon width={12} height={12} />;
    }
  };

  // Ripple effect handler for tabs
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

  return (
    <div style={styles.pageContainer}>
      {/* Scroll Progress Bar */}
      <div style={styles.scrollProgress}></div>

      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.headerBackground}></div>
        <FloatingParticles count={20} />
        <div style={styles.headerContent}>
          <SlideIn direction="down" duration={0.8}>
            <h1 style={styles.pageTitle}>
              <RocketLaunchIcon width={48} height={48} />
              Payments & Collections
            </h1>
          </SlideIn>
          <SlideIn direction="up" delay={200} duration={0.8}>
            <p style={styles.pageSubtitle}>
              Seamless bill payments, utility payments, and payment collection services for your business
            </p>
          </SlideIn>
        </div>
      </div>

      <div style={styles.contentSection}>
        {/* Statistics Cards */}
        <FadeIn delay={400} threshold={0.2}>
          <div style={styles.statsGrid}>
            <StatCard
              title="Payments This Month"
              value="12"
              change="+2 from last month"
              trend="up"
              icon={DocumentTextSolid}
              highlight={true}
            />
            
            <StatCard
              title="Total Paid"
              value="₹45,800"
              change="+15% growth"
              trend="up"
              icon={CurrencyDollarSolid}
            />
            
            <StatCard
              title="Pending Payments"
              value="3"
              change="Due this week"
              trend="neutral"
              icon={ClockSolid}
            />
            
            <StatCard
              title="Due Soon"
              value="5"
              change="Next 7 days"
              trend="warning"
              icon={ExclamationTriangleIcon}
            />
          </div>
        </FadeIn>

        {/* Quick Actions */}
        <FadeIn delay={600} threshold={0.2}>
          <div style={styles.quickActions}>
            <StaggeredList staggerDelay={0.1} threshold={0.1}>
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  hoverable
                  animated
                  floating
                  style={styles.actionCard}
                  onClick={action.action}
                >
                  <div style={styles.actionIcon}>
                    <action.icon width={32} height={32} />
                  </div>
                  <div style={styles.actionTitle}>{action.title}</div>
                  <div style={styles.actionDescription}>{action.description}</div>
                  <ChevronRightIcon 
                    width={16} 
                    height={16} 
                    style={{ 
                      position: 'absolute', 
                      right: sbiTheme.spacing.lg, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: sbiTheme.colors.textSecondary,
                      opacity: 0.7,
                      transition: 'all 0.3s ease'
                    }} 
                  />
                </Card>
              ))}
            </StaggeredList>
          </div>
        </FadeIn>

        {/* Tab Navigation */}
        <FadeIn delay={800} threshold={0.2}>
          <Card style={styles.tabContainer}>
            {tabs.map((tab) => {
              const IconComponent = activeTab === tab.id ? tab.solidIcon : tab.icon;
              return (
                <button 
                  key={tab.id}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab.id ? styles.activeTab : {})
                  }}
                  onClick={(e) => {
                    createRipple(e);
                    setActiveTab(tab.id);
                  }}
                >
                  <IconComponent width={20} height={20} />
                  {tab.label}
                </button>
              );
            })}
          </Card>
        </FadeIn>

        {/* Recent Payments Section */}
        <FadeIn delay={1000} threshold={0.2}>
          <Card style={styles.recentPaymentsCard} floating>
            <h3 style={styles.sectionTitle}>
              <SparklesIcon width={24} height={24} style={{ color: sbiTheme.colors.primary }} />
              Recent Payments
            </h3>
            
            {loading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={{ color: sbiTheme.colors.textSecondary, fontWeight: sbiTheme.typography.fontWeight.medium }}>
                  Loading your payment history...
                </p>
              </div>
            ) : (
              <>
                <ul style={styles.paymentList}>
                  <StaggeredList staggerDelay={0.05} threshold={0.05}>
                    {recentPayments.map((payment) => (
                      <li 
                        key={payment.id} 
                        style={styles.paymentItem}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = sbiTheme.colors.gray50;
                          e.currentTarget.style.transform = 'translateX(8px)';
                          e.currentTarget.style.boxShadow = sbiTheme.shadows.sm;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={styles.paymentDetails}>
                          <span style={styles.paymentBiller}>
                            {payment.biller}
                          </span>
                          <div style={styles.paymentMeta}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <CalendarIcon width={12} height={12} />
                              {new Date(payment.date).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <DocumentTextIcon width={12} height={12} />
                              ID: {payment.id.toString().padStart(6, '0')}
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.lg }}>
                          <span style={styles.paymentAmount}>
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </span>
                          <span style={getStatusStyle(payment.status)}>
                            {getStatusIcon(payment.status)} {payment.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </StaggeredList>
                </ul>

                <Button 
                  variant="secondary"
                  icon={EyeIcon}
                  iconPosition="right"
                  pulse={true}
                  style={{ marginTop: sbiTheme.spacing.lg, width: '100%' }}
                >
                  View Complete Payment History
                </Button>
              </>
            )}
          </Card>
        </FadeIn>

        {/* BillPayment Component */}
        <FadeIn delay={1200} threshold={0.2}>
          <BillPayment user={user} />
        </FadeIn>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 70, 135, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 70, 135, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 70, 135, 0);
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
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

        /* Enhanced selection */
        ::selection {
          background: ${sbiTheme.colors.primaryLight};
          color: white;
        }
      `}</style>
    </div>
  );
};

export default BillsPage;