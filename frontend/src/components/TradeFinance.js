import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  BoltIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import {
  DocumentTextIcon as DocumentTextSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
  CheckCircleIcon as CheckCircleSolid,
  BoltIcon as BoltSolid,
} from '@heroicons/react/24/solid';

// Enhanced SBI YONO Business Theme with animations
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
  }
};

// Enhanced Card Component with animations
const Card = ({ children, className = '', hoverable = false, animated = true, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      boxShadow: isHovered && hoverable ? sbiTheme.shadows.lg : sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: animated ? `all 0.4s ${sbiTheme.animations.spring}` : 'none',
      transform: isHovered && hoverable ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      ...props.style,
    },
  };

  return (
    <div
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

// Enhanced Button Component with animations
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  animated = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
      transform: isHovered && !disabled && !loading ? 'translateY(-2px)' : 'translateY(0)',
      ...getButtonStyles(variant, size),
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
        background: sbiTheme.colors.white,
        color: sbiTheme.colors.primary,
        border: `1px solid ${sbiTheme.colors.primary}`,
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

  return (
    <button
      style={styles.button}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon width={20} height={20} />}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.sm }}>
          <div style={loadingSpinner}></div>
          Processing...
        </div>
      ) : (
        children
      )}
      {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
    </button>
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

// FadeIn Animation Component
const FadeIn = ({ children, delay = 0, duration = 0.6 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const styles = {
    container: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all ${duration}s ${sbiTheme.animations.smooth}`,
    }
  };

  return <div style={styles.container}>{children}</div>;
};

// SlideIn Animation Component
const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.5 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-30px)';
      case 'right': return 'translateX(30px)';
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      default: return 'translateY(20px)';
    }
  };

  const styles = {
    container: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0, 0)' : getTransform(),
      transition: `all ${duration}s ${sbiTheme.animations.spring}`,
    }
  };

  return <div style={styles.container}>{children}</div>;
};

// Staggered List Component
const StaggeredList = ({ children, staggerDelay = 0.1 }) => {
  return React.Children.map(children, (child, index) => (
    <FadeIn delay={index * staggerDelay * 1000}>
      {child}
    </FadeIn>
  ));
};

// Pulse Animation Component
const Pulse = ({ children, duration = 2 }) => {
  const styles = {
    container: {
      animation: `pulse ${duration}s ${sbiTheme.animations.smooth} infinite`,
    }
  };

  return <div style={styles.container}>{children}</div>;
};

// Enhanced TradeFinance Component with Hero UI and animations
const TradeFinance = ({ user }) => {
  const [activeTab, setActiveTab] = useState('lc');
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPageLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const tradeServices = [
    { 
      id: 'lc', 
      name: 'Letters of Credit', 
      icon: DocumentTextIcon,
      solidIcon: DocumentTextSolid,
      description: 'Secure international trade payments with guaranteed payment terms',
      features: [
        'Import/Export LC issuance',
        'LC confirmation and advising',
        'Document verification',
        'Sight and usance LC options'
      ],
      requirements: ['Trade license', 'Import/export code', 'KYC documents'],
      action: 'Apply for LC',
      color: sbiTheme.colors.primary
    },
    { 
      id: 'guarantees', 
      name: 'Bank Guarantees', 
      icon: ShieldCheckIcon,
      solidIcon: ShieldCheckSolid,
      description: 'Financial guarantees for business contracts and tenders',
      features: [
        'Performance guarantees',
        'Bid bonds and tender guarantees',
        'Advance payment guarantees',
        'Financial guarantees'
      ],
      requirements: ['Company registration', 'Financial statements', 'Contract details'],
      action: 'Request Guarantee',
      color: sbiTheme.colors.success
    },
    { 
      id: 'collections', 
      name: 'Document Collections', 
      icon: ClipboardDocumentListIcon,
      solidIcon: ClipboardDocumentListSolid,
      description: 'Professional handling of trade document processing',
      features: [
        'Documentary collections',
        'Bill of exchange handling',
        'Shipping document verification',
        'Payment against documents'
      ],
      requirements: ['Shipping documents', 'Invoice copies', 'Bill of lading'],
      action: 'Initiate Collection',
      color: sbiTheme.colors.secondary
    },
    { 
      id: 'financing', 
      name: 'Trade Financing', 
      icon: CurrencyDollarIcon,
      solidIcon: CurrencyDollarSolid,
      description: 'Working capital solutions for trade operations',
      features: [
        'Pre-shipment financing',
        'Post-shipment financing',
        'Bill discounting',
        'Export packing credit'
      ],
      requirements: ['Purchase order', 'LC copy', 'Financial statements'],
      action: 'Apply for Financing',
      color: sbiTheme.colors.info
    }
  ];

  const recentActivities = [
    { id: 1, type: 'LC Issued', amount: '₹5,00,000', date: '2024-01-15', status: 'Active', service: 'lc' },
    { id: 2, type: 'Performance Guarantee', amount: '₹2,50,000', date: '2024-01-10', status: 'Completed', service: 'guarantees' },
    { id: 3, type: 'Export Financing', amount: '₹7,50,000', date: '2024-01-05', status: 'Pending', service: 'financing' },
    { id: 4, type: 'Document Collection', amount: '₹1,20,000', date: '2024-01-02', status: 'Completed', service: 'collections' }
  ];

  const activeService = tradeServices.find(service => service.id === activeTab);
  const filteredActivities = recentActivities.filter(activity => activity.service === activeTab);

  const handleServiceAction = (serviceType) => {
    const service = tradeServices.find(s => s.id === serviceType);
    // Simulate API call
    setTimeout(() => {
      alert(`Successfully initiated ${service?.name} application process!`);
    }, 500);
  };

  const styles = {
    pageContainer: {
      opacity: pageLoaded ? 1 : 0,
      transition: 'opacity 0.6s ease-in-out',
    },
    card: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: sbiTheme.spacing.lg,
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.md,
      position: 'relative',
    },
    headerBackground: {
      position: 'absolute',
      top: -50,
      right: -50,
      width: '200px',
      height: '200px',
      background: `radial-gradient(circle, ${sbiTheme.colors.primaryLight}20 0%, transparent 70%)`,
      borderRadius: '50%',
    },
    title: {
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize['3xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      margin: 0,
      background: sbiTheme.gradients.primary,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      color: sbiTheme.colors.textSecondary,
      fontSize: sbiTheme.typography.fontSize.lg,
      margin: `${sbiTheme.spacing.sm} 0 0 0`,
      lineHeight: '1.6',
    },
    tabsContainer: {
      display: 'flex',
      gap: sbiTheme.spacing.sm,
      marginBottom: sbiTheme.spacing.xl,
      flexWrap: 'wrap',
      background: sbiTheme.colors.white,
      padding: sbiTheme.spacing.sm,
      borderRadius: sbiTheme.borderRadius.xl,
      boxShadow: sbiTheme.shadows.sm,
      border: `1px solid ${sbiTheme.colors.border}`,
    },
    tab: {
      padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.xl}`,
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textSecondary,
      cursor: 'pointer',
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      fontSize: sbiTheme.typography.fontSize.base,
      position: 'relative',
      overflow: 'hidden',
    },
    activeTab: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      borderColor: sbiTheme.colors.primary,
      transform: 'translateY(-2px)',
      boxShadow: sbiTheme.shadows.md,
    },
    contentSection: {
      marginBottom: sbiTheme.spacing.xl,
    },
    serviceHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.lg,
      padding: sbiTheme.spacing.xl,
      background: sbiTheme.gradients.light,
      borderRadius: sbiTheme.borderRadius.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      position: 'relative',
      overflow: 'hidden',
    },
    serviceIconLarge: {
      width: '60px',
      height: '60px',
      padding: sbiTheme.spacing.md,
      background: activeService?.color ? `${activeService.color}15` : sbiTheme.gradients.primary,
      color: activeService?.color || sbiTheme.colors.primary,
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
    },
    serviceInfo: {
      flex: 1,
    },
    serviceName: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.5rem 0',
    },
    serviceDescription: {
      color: sbiTheme.colors.textSecondary,
      fontSize: sbiTheme.typography.fontSize.lg,
      margin: 0,
      lineHeight: '1.6',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.lg,
    },
    featureCard: {
      background: sbiTheme.colors.white,
      padding: sbiTheme.spacing.lg,
      borderRadius: sbiTheme.borderRadius.lg,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      boxShadow: sbiTheme.shadows.sm,
      position: 'relative',
      overflow: 'hidden',
    },
    featureTitle: {
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.5rem 0',
      fontSize: sbiTheme.typography.fontSize.base,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    requirementsList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 1.5rem 0',
    },
    requirementItem: {
      padding: '1rem 0',
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      color: sbiTheme.colors.textSecondary,
      fontSize: sbiTheme.typography.fontSize.base,
      transition: 'all 0.3s ease',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    serviceCard: {
      background: sbiTheme.colors.white,
      padding: sbiTheme.spacing.xl,
      borderRadius: sbiTheme.borderRadius.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.4s ${sbiTheme.animations.spring}`,
      cursor: 'pointer',
      boxShadow: sbiTheme.shadows.sm,
      position: 'relative',
      overflow: 'hidden',
    },
    serviceCardActive: {
      borderColor: sbiTheme.colors.primary,
      background: 'rgba(0, 70, 135, 0.05)',
      transform: 'translateY(-4px)',
      boxShadow: sbiTheme.shadows.lg,
    },
    serviceHeaderSmall: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.md,
    },
    serviceIcon: {
      width: '50px',
      height: '50px',
      padding: sbiTheme.spacing.sm,
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
    },
    serviceNameSmall: {
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: 0,
      fontSize: sbiTheme.typography.fontSize.lg,
    },
    serviceDescriptionSmall: {
      color: sbiTheme.colors.textSecondary,
      fontSize: sbiTheme.typography.fontSize.base,
      margin: 0,
      lineHeight: '1.5',
    },
    activitiesSection: {
      marginTop: sbiTheme.spacing.xl,
    },
    activitiesTitle: {
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.bold,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    activitiesList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    activityItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: sbiTheme.spacing.lg,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
      borderRadius: sbiTheme.borderRadius.md,
      marginBottom: sbiTheme.spacing.xs,
    },
    activityDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: 1,
    },
    activityType: {
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.base,
    },
    activityMeta: {
      display: 'flex',
      gap: sbiTheme.spacing.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    activityAmount: {
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.success,
      fontSize: sbiTheme.typography.fontSize.base,
    },
    status: {
      padding: '0.5rem 1rem',
      borderRadius: sbiTheme.borderRadius.full,
      fontSize: sbiTheme.typography.fontSize.xs,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
      transition: `all 0.3s ${sbiTheme.animations.smooth}`,
    },
    statusActive: {
      background: 'rgba(0, 166, 81, 0.1)',
      color: sbiTheme.colors.success,
      border: `1px solid rgba(0, 166, 81, 0.2)`,
    },
    statusCompleted: {
      background: 'rgba(107, 114, 128, 0.1)',
      color: sbiTheme.colors.textSecondary,
      border: `1px solid rgba(107, 114, 128, 0.2)`,
    },
    statusPending: {
      background: 'rgba(240, 173, 78, 0.1)',
      color: sbiTheme.colors.warning,
      border: `1px solid rgba(240, 173, 78, 0.2)`,
    },
    actionButton: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      border: 'none',
      padding: `${sbiTheme.spacing.lg} ${sbiTheme.spacing['2xl']}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontWeight: sbiTheme.typography.fontWeight.bold,
      cursor: 'pointer',
      transition: `all 0.3s ${sbiTheme.animations.spring}`,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      fontSize: sbiTheme.typography.fontSize.lg,
      marginTop: sbiTheme.spacing.lg,
      position: 'relative',
      overflow: 'hidden',
    },
    sectionTitle: {
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.bold,
      margin: `0 0 ${sbiTheme.spacing.lg} 0`,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: sbiTheme.spacing['3xl'],
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
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

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { ...styles.status, ...styles.statusActive };
      case 'completed':
        return { ...styles.status, ...styles.statusCompleted };
      case 'pending':
        return { ...styles.status, ...styles.statusPending };
      default:
        return styles.status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon width={14} height={14} />;
      case 'completed':
        return <CheckCircleIcon width={14} height={14} />;
      case 'pending':
        return <ClockIcon width={14} height={14} />;
      default:
        return <ExclamationTriangleIcon width={14} height={14} />;
    }
  };

  // Ripple effect for tabs
  const createRipple = (event, tabId) => {
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
    setActiveTab(tabId);
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={{ color: sbiTheme.colors.textSecondary, fontWeight: sbiTheme.typography.fontWeight.medium }}>
          Loading Trade Finance Services...
        </p>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Card hoverable animated style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBackground}></div>
          <SlideIn direction="left" duration={0.8}>
            <div>
              <h3 style={styles.title}>
                <GlobeAltIcon width={32} height={32} />
                Trade Finance
              </h3>
              <p style={styles.subtitle}>
                Comprehensive international trade operations and financing solutions
              </p>
            </div>
          </SlideIn>
          <SlideIn direction="right" delay={200} duration={0.8}>
            <Pulse>
              <div style={{
                background: sbiTheme.gradients.success,
                color: sbiTheme.colors.white,
                padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.lg}`,
                borderRadius: sbiTheme.borderRadius.full,
                fontSize: sbiTheme.typography.fontSize.sm,
                fontWeight: sbiTheme.typography.fontWeight.semibold,
                display: 'flex',
                alignItems: 'center',
                gap: sbiTheme.spacing.sm,
              }}>
                <BanknotesIcon width={16} height={16} />
                Active Services
              </div>
            </Pulse>
          </SlideIn>
        </div>

        {/* Services Tabs */}
        <SlideIn direction="down" delay={400} duration={0.6}>
          <div style={styles.tabsContainer}>
            {tradeServices.map(service => {
              const IconComponent = activeTab === service.id ? service.solidIcon : service.icon;
              return (
                <button
                  key={service.id}
                  style={{
                    ...styles.tab,
                    ...(activeTab === service.id ? styles.activeTab : {})
                  }}
                  onClick={(e) => createRipple(e, service.id)}
                >
                  <IconComponent width={20} height={20} />
                  {service.name}
                </button>
              );
            })}
          </div>
        </SlideIn>

        {/* Service Cards Grid */}
        <FadeIn delay={600} duration={0.8}>
          <div style={styles.servicesGrid}>
            <StaggeredList staggerDelay={0.1}>
              {tradeServices.map(service => {
                const IconComponent = activeTab === service.id ? service.solidIcon : service.icon;
                return (
                  <div
                    key={service.id}
                    style={{
                      ...styles.serviceCard,
                      ...(activeTab === service.id ? styles.serviceCardActive : {})
                    }}
                    onClick={() => setActiveTab(service.id)}
                    onMouseEnter={(e) => {
                      if (activeTab !== service.id) {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = sbiTheme.shadows.lg;
                        e.currentTarget.style.borderColor = service.color;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== service.id) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = sbiTheme.shadows.sm;
                        e.currentTarget.style.borderColor = sbiTheme.colors.border;
                      }
                    }}
                  >
                    <div style={styles.serviceHeaderSmall}>
                      <div style={{
                        ...styles.serviceIcon,
                        background: service.color ? `${service.color}15` : sbiTheme.gradients.primary,
                        color: service.color || sbiTheme.colors.primary,
                      }}>
                        <IconComponent width={24} height={24} />
                      </div>
                      <h4 style={styles.serviceNameSmall}>{service.name}</h4>
                    </div>
                    <p style={styles.serviceDescriptionSmall}>{service.description}</p>
                  </div>
                );
              })}
            </StaggeredList>
          </div>
        </FadeIn>

        {/* Active Service Details */}
        {activeService && (
          <FadeIn key={activeTab} delay={800} duration={0.8}>
            <div style={styles.contentSection}>
              <div style={styles.serviceHeader}>
                <div style={styles.serviceIconLarge}>
                  <activeService.solidIcon width={28} height={28} />
                </div>
                <div style={styles.serviceInfo}>
                  <h4 style={styles.serviceName}>{activeService.name}</h4>
                  <p style={styles.serviceDescription}>{activeService.description}</p>
                </div>
              </div>

              {/* Features */}
              <h5 style={styles.sectionTitle}>
                <BoltSolid width={24} height={24} style={{ color: sbiTheme.colors.secondary }} />
                Key Features
              </h5>
              <div style={styles.featuresGrid}>
                <StaggeredList staggerDelay={0.05}>
                  {activeService.features.map((feature, index) => (
                    <Card key={index} hoverable animated style={styles.featureCard}>
                      <h6 style={styles.featureTitle}>
                        <CheckCircleSolid width={18} height={18} style={{ color: sbiTheme.colors.success }} />
                        {feature}
                      </h6>
                    </Card>
                  ))}
                </StaggeredList>
              </div>

              {/* Requirements */}
              <h5 style={styles.sectionTitle}>
                <ClipboardDocumentListSolid width={24} height={24} style={{ color: sbiTheme.colors.primary }} />
                Requirements
              </h5>
              <ul style={styles.requirementsList}>
                <StaggeredList staggerDelay={0.1}>
                  {activeService.requirements.map((requirement, index) => (
                    <li 
                      key={index} 
                      style={styles.requirementItem}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = sbiTheme.colors.gray50;
                        e.currentTarget.style.paddingLeft = sbiTheme.spacing.md;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <CheckCircleSolid width={18} height={18} style={{ color: sbiTheme.colors.success }} />
                      {requirement}
                    </li>
                  ))}
                </StaggeredList>
              </ul>

              {/* Action Button */}
              <Button
                onClick={() => handleServiceAction(activeService.id)}
                icon={ArrowPathIcon}
                size="lg"
                animated
                style={{ 
                  width: '100%',
                  background: activeService.color ? `linear-gradient(135deg, ${activeService.color} 0%, ${activeService.color}80 100%)` : sbiTheme.gradients.primary
                }}
              >
                {activeService.action}
              </Button>
            </div>
          </FadeIn>
        )}

        {/* Recent Activities for Active Service */}
        <FadeIn delay={1000} duration={0.8}>
          <div style={styles.activitiesSection}>
            <h4 style={styles.activitiesTitle}>
              <CalendarIcon width={24} height={24} style={{ color: sbiTheme.colors.primary }} />
              Recent {activeService?.name} Activities
            </h4>
            <ul style={styles.activitiesList}>
              {filteredActivities.length > 0 ? (
                <StaggeredList staggerDelay={0.05}>
                  {filteredActivities.map(activity => (
                    <Card 
                      key={activity.id} 
                      hoverable
                      animated
                      style={styles.activityItem}
                    >
                      <div style={styles.activityDetails}>
                        <span style={styles.activityType}>{activity.type}</span>
                        <div style={styles.activityMeta}>
                          <span style={styles.activityAmount}>{activity.amount}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <ClockIcon width={14} height={14} />
                            {activity.date}
                          </span>
                        </div>
                      </div>
                      <span style={getStatusStyle(activity.status)}>
                        {getStatusIcon(activity.status)}
                        {activity.status}
                      </span>
                    </Card>
                  ))}
                </StaggeredList>
              ) : (
                <Card style={{ 
                  textAlign: 'center', 
                  color: sbiTheme.colors.textSecondary,
                  flexDirection: 'column',
                  gap: sbiTheme.spacing.lg,
                  padding: sbiTheme.spacing['2xl']
                }}>
                  <DocumentTextIcon width={48} height={48} style={{ opacity: 0.5 }} />
                  <div style={{ fontSize: sbiTheme.typography.fontSize.lg, fontWeight: sbiTheme.typography.fontWeight.medium }}>
                    No recent activities for {activeService?.name}
                  </div>
                  <div style={{ fontSize: sbiTheme.typography.fontSize.sm, opacity: 0.7 }}>
                    Start using {activeService?.name} to see your activities here
                  </div>
                </Card>
              )}
            </ul>
          </div>
        </FadeIn>
      </Card>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
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
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${sbiTheme.colors.gray100};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${sbiTheme.colors.gray400};
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${sbiTheme.colors.gray500};
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
      `}</style>
    </div>
  );
};

export default TradeFinance;