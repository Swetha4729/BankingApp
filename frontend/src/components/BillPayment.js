import React, { useState, useEffect } from 'react';
import {
  BuildingStorefrontIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  BoltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ArrowPathIcon,
  HomeIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CalendarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import {
  BuildingStorefrontIcon as BuildingStorefrontSolid,
  CurrencyRupeeIcon as CurrencyRupeeSolid,
  DocumentTextIcon as DocumentTextSolid,
  BoltIcon as BoltSolid,
  ShieldCheckIcon as ShieldCheckSolid,
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
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 30px rgba(0, 70, 135, 0.2)',
  },
  animations: {
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }
};

// Enhanced Floating Background with Random Elements
const EnhancedFloatingBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate random floating elements
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 80 + 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 20 + 10,
      color: `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 255}, ${Math.random() * 0.1 + 0.05})`,
      shape: Math.random() > 0.5 ? 'circle' : 'blob',
      rotation: Math.random() * 360,
    }));
    setElements(newElements);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
    }}>
      {/* Animated gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(0, 70, 135, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(0, 166, 81, 0.05) 0%, transparent 50%)
        `,
        animation: 'gradientShift 15s ease-in-out infinite alternate',
      }}></div>
      
      {/* Random floating elements */}
      {elements.map(element => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.left}%`,
            top: `${element.top}%`,
            background: element.color,
            borderRadius: element.shape === 'circle' ? '50%' : '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(20px)',
            animation: `
              floatX ${element.duration}s ease-in-out ${element.delay}s infinite alternate,
              floatY ${element.duration * 1.3}s ease-in-out ${element.delay * 1.7}s infinite alternate,
              rotate ${element.duration * 2}s linear ${element.delay}s infinite
            `,
            opacity: 0.6,
            transform: `rotate(${element.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Card Component with glass morphism and improved animations
const EnhancedCard = ({ children, className = '', hoverable = false, glass = false, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const styles = {
    card: {
      background: glass ? sbiTheme.gradients.glass : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: glass ? 'blur(20px)' : 'blur(10px)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: isHovered && hoverable ? 
        '0 25px 50px -12px rgba(0, 70, 135, 0.3)' : 
        '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: glass ? '1px solid rgba(255, 255, 255, 0.3)' : `1px solid ${sbiTheme.colors.border}`,
      transition: `all 0.5s ${sbiTheme.animations.spring}`,
      transform: isHovered && hoverable ? 
        'translateY(-8px) scale(1.02) rotateX(2deg)' : 
        isVisible ? 'translateY(0) scale(1) rotateX(0)' : 'translateY(30px) scale(0.95)',
      opacity: isVisible ? 1 : 0,
      position: 'relative',
      overflow: 'hidden',
      animation: isVisible ? `cardGlow 4s ease-in-out ${delay}ms infinite alternate` : 'none',
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

// Animated Number Counter with enhanced effects
const EnhancedAnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span style={{
      display: 'inline-block',
      transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
      transition: 'transform 0.3s ease',
      background: isAnimating ? 'linear-gradient(135deg, #004687, #0066b3)' : 'transparent',
      backgroundClip: isAnimating ? 'text' : 'none',
      WebkitBackgroundClip: isAnimating ? 'text' : 'none',
      color: isAnimating ? 'transparent' : 'inherit',
    }}>
      {value.includes('$') ? `$${count.toLocaleString()}` : count}
    </span>
  );
};

// Enhanced Staggered Container
const EnhancedStaggeredContainer = ({ children, delay = 100 }) => {
  return React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      delay: index * delay,
    })
  );
};

// Particle Effect Component
const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: 'rgba(0, 70, 135, 0.3)',
            borderRadius: '50%',
            animation: `particleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced BillPayment Component with Advanced Animations
function BillPayment() {
  const [form, setForm] = useState({ 
    vendor_name: '', 
    bill_amount: '', 
    bill_id: '' 
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const statsData = [
    {
      title: "Payments This Month",
      value: "12",
      change: "+2 from last month",
      trend: "up",
      icon: CalendarIcon,
      color: sbiTheme.gradients.primary
    },
    {
      title: "Total Paid",
      value: "$45,800",
      change: "+15% growth",
      trend: "up",
      icon: BanknotesIcon,
      color: sbiTheme.gradients.success
    },
    {
      title: "Pending Payments",
      value: "3",
      change: "Due this week",
      trend: "warning",
      icon: ClockIcon,
      color: sbiTheme.gradients.secondary
    },
    {
      title: "Due Soon",
      value: "5",
      change: "Next 7 days",
      trend: "warning",
      icon: ExclamationTriangleIcon,
      color: sbiTheme.gradients.premium
    }
  ];

  const quickActions = [
    {
      title: "Quick Pay",
      description: "Pay bills using saved beneficiaries and templates",
      icon: BoltSolid,
      gradient: sbiTheme.gradients.primary
    },
    {
      title: "Mobile & DTH",
      description: "Instant mobile recharge and DTH payments",
      icon: DevicePhoneMobileIcon,
      gradient: sbiTheme.gradients.secondary
    },
    {
      title: "Utility Bills",
      description: "Electricity, Water, Gas and other utility payments",
      icon: HomeIcon,
      gradient: sbiTheme.gradients.success
    },
    {
      title: "Tax Payments",
      description: "GST, Income Tax and other government payments",
      icon: DocumentTextSolid,
      gradient: sbiTheme.gradients.premium
    }
  ];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    }, 2000);
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Inter', 'Poppins', 'Roboto', 'Arial', sans-serif",
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1,
    },
    fullWidthHeader: {
      background: sbiTheme.gradients.primary,
      padding: '60px 40px',
      margin: '0 -20px 50px -20px', // Negative margin to break out of container
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0, 70, 135, 0.3)',
      animation: 'headerGlow 4s ease-in-out infinite alternate',
      width: 'calc(100% + 40px)', // Extend beyond container
      left: '-20px', // Center alignment adjustment
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
    },
    header: {
      marginBottom: '50px',
      textAlign: 'center',
      position: 'relative',
    },
    headerWithBackground: {
      background: sbiTheme.gradients.primary,
      padding: '40px 30px',
      borderRadius: '20px',
      marginBottom: '50px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0, 70, 135, 0.3)',
      animation: 'headerGlow 4s ease-in-out infinite alternate',
    },
    headerTitle: {
      fontSize: '3.5rem',
      fontWeight: '900',
      background: sbiTheme.colors.white,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '16px',
      animation: 'titleGlow 3s ease-in-out infinite alternate, slideDown 1s ease-out',
      textShadow: '0 4px 8px rgba(0, 70, 135, 0.2)',
    },
    headerSubtitle: {
      fontSize: '1.3rem',
      color: 'rgba(255, 255, 255, 0.9)',
      margin: 0,
      animation: 'fadeInUp 1s ease-out 0.3s both',
      fontWeight: '500',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '28px',
      marginBottom: '50px',
    },
    statCard: {
      position: 'relative',
      overflow: 'hidden',
    },
    statIcon: {
      position: 'absolute',
      top: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      animation: 'iconPulse 2s ease-in-out infinite',
    },
    statTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: sbiTheme.colors.textSecondary,
      marginBottom: '16px',
      letterSpacing: '0.5px',
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: sbiTheme.colors.textPrimary,
      marginBottom: '12px',
      fontFeatureSettings: '"tnum"',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    statChange: {
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '28px',
      marginBottom: '50px',
    },
    quickActionCard: {
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '200px',
    },
    quickActionContent: {
      position: 'relative',
      zIndex: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    quickActionBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      opacity: 0,
      transition: 'all 0.4s ease',
    },
    quickActionIconWrapper: {
      width: '72px',
      height: '72px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      color: sbiTheme.colors.white,
      position: 'relative',
      overflow: 'hidden',
      animation: 'iconFloat 3s ease-in-out infinite',
    },
    quickActionTitle: {
      fontSize: '1.4rem',
      fontWeight: '800',
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 12px 0',
    },
    quickActionDescription: {
      fontSize: '15px',
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      lineHeight: '1.6',
    },
    paymentForm: {
      position: 'relative',
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: sbiTheme.colors.textPrimary,
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      animation: 'fadeInUp 0.8s ease-out 0.8s both',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    label: {
      fontSize: '15px',
      fontWeight: '700',
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    input: {
      padding: '18px 24px',
      border: `2px solid ${sbiTheme.colors.gray200}`,
      borderRadius: '14px',
      fontSize: '16px',
      transition: `all 0.4s ${sbiTheme.animations.smooth}`,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
    },
    inputActive: {
      borderColor: sbiTheme.colors.primary,
      boxShadow: sbiTheme.shadows.glow,
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    payButton: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      border: 'none',
      borderRadius: '14px',
      padding: '20px 40px',
      fontSize: '17px',
      fontWeight: '800',
      cursor: 'pointer',
      transition: `all 0.5s ${sbiTheme.animations.spring}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      marginTop: '32px',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    buttonShine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '50%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      transition: 'left 0.6s ease',
    },
    successOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 166, 81, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: '20px',
      color: sbiTheme.colors.white,
      zIndex: 20,
      animation: 'successSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    processingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderRadius: '20px',
      zIndex: 20,
    },
  };

  return (
    <>
      <EnhancedFloatingBackground />
      <div style={styles.container}>
        
        {/* Full Width Header with Blue Background */}
        <div style={styles.fullWidthHeader}>
          {/* Additional decorative elements */}
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'pulse 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            animation: 'pulse 8s ease-in-out infinite 1s'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            width: 100,
            height: 100,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            animation: 'pulse 7s ease-in-out infinite 0.5s'
          }}></div>
          
          <div style={styles.headerContent}>
            <h1 style={styles.headerTitle}>Payments & Collections</h1>
            <p style={styles.headerSubtitle}>
              Seamless bill payments, utility payments, and payment collection services for your business
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <EnhancedStaggeredContainer delay={150}>
          <div style={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <EnhancedCard 
                key={index} 
                hoverable 
                delay={index * 150}
                style={styles.statCard}
              >
                <ParticleEffect />
                <div style={{...styles.statIcon, background: stat.color}}>
                  <stat.icon width={28} height={28} />
                </div>
                <div style={styles.statTitle}>{stat.title}</div>
                <div style={styles.statValue}>
                  <EnhancedAnimatedNumber value={stat.value} />
                </div>
                <div style={{
                  ...styles.statChange,
                  color: stat.trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.warning
                }}>
                  {stat.trend === 'up' ? 
                    <ArrowUpIcon width={18} height={18} /> : 
                    <ExclamationTriangleIcon width={18} height={18} />
                  }
                  {stat.change}
                </div>
              </EnhancedCard>
            ))}
          </div>
        </EnhancedStaggeredContainer>

        {/* Quick Actions Grid */}
        <EnhancedStaggeredContainer delay={100}>
          <div style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <EnhancedCard 
                key={index} 
                hoverable 
                glass
                delay={index * 100}
                style={styles.quickActionCard}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('.action-bg').style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('.action-bg').style.opacity = '0';
                }}
              >
                <div 
                  className="action-bg"
                  style={styles.quickActionBackground}
                />
                <div style={styles.quickActionContent}>
                  <div 
                    style={{
                      ...styles.quickActionIconWrapper,
                      background: action.gradient,
                      boxShadow: `0 12px 40px ${sbiTheme.colors.primary}40`
                    }}
                  >
                    <action.icon width={32} height={32} />
                  </div>
                  <h3 style={styles.quickActionTitle}>{action.title}</h3>
                  <p style={styles.quickActionDescription}>{action.description}</p>
                </div>
              </EnhancedCard>
            ))}
          </div>
        </EnhancedStaggeredContainer>

        {/* Payment Form */}
        <EnhancedCard hoverable delay={600} style={styles.paymentForm}>
          {/* Processing Overlay */}
          {isProcessing && (
            <div style={styles.processingOverlay}>
              <div style={{
                width: '70px',
                height: '70px',
                border: `4px solid ${sbiTheme.colors.primary}20`,
                borderTop: `4px solid ${sbiTheme.colors.primary}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
              }}></div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: sbiTheme.colors.primary
              }}>Processing Payment...</div>
            </div>
          )}

          {/* Success Overlay */}
          {paymentSuccess && (
            <div style={styles.successOverlay}>
              <CheckCircleIcon width={100} height={100} style={{ marginBottom: '20px' }} />
              <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
                Payment Successful!
              </div>
              <div style={{ fontSize: '18px', opacity: 0.9 }}>
                Your bill payment has been processed successfully
              </div>
            </div>
          )}

          <h2 style={styles.formTitle}>
            <BoltSolid width={36} height={36} style={{ color: sbiTheme.colors.primary }} />
            Quick Bill Payment
          </h2>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <BuildingStorefrontSolid width={22} height={22} />
                Vendor Name
              </label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(activeField === 'vendor' && styles.inputActive)
                }}
                placeholder="Enter vendor name"
                value={form.vendor_name}
                onChange={(e) => setForm({...form, vendor_name: e.target.value})}
                onFocus={() => setActiveField('vendor')}
                onBlur={() => setActiveField(null)}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <CurrencyRupeeSolid width={22} height={22} />
                Bill Amount
              </label>
              <input
                type="number"
                style={{
                  ...styles.input,
                  ...(activeField === 'amount' && styles.inputActive)
                }}
                placeholder="0.00"
                value={form.bill_amount}
                onChange={(e) => setForm({...form, bill_amount: e.target.value})}
                onFocus={() => setActiveField('amount')}
                onBlur={() => setActiveField(null)}
              />
            </div>
            
            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label}>
                <DocumentTextSolid width={22} height={22} />
                Bill Reference Number
              </label>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...(activeField === 'reference' && styles.inputActive)
                }}
                placeholder="Enter bill reference number"
                value={form.bill_id}
                onChange={(e) => setForm({...form, bill_id: e.target.value})}
                onFocus={() => setActiveField('reference')}
                onBlur={() => setActiveField(null)}
              />
            </div>
          </div>
          
          <button 
            style={styles.payButton}
            onClick={handlePay}
            disabled={isProcessing}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = sbiTheme.shadows.xl;
                e.currentTarget.querySelector('.button-shine').style.left = '100%';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.button-shine').style.left = '-100%';
              }
            }}
          >
            <div className="button-shine" style={styles.buttonShine}></div>
            <BoltIcon width={26} height={26} />
            {isProcessing ? 'Processing...' : 'Pay Bill Now'}
          </button>
        </EnhancedCard>
      </div>

      <style>{`
        @keyframes headerGlow {
          0% { 
            box-shadow: 0 15px 35px rgba(0, 70, 135, 0.3);
            transform: translateY(0px);
          }
          100% { 
            box-shadow: 0 20px 45px rgba(0, 70, 135, 0.4);
            transform: translateY(-5px);
          }
        }
          @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatX {
          0%, 100% { transform: translateX(-20px); }
          50% { transform: translateX(20px); }
        }
        
        @keyframes floatY {
          0%, 100% { transform: translateY(-15px); }
          50% { transform: translateY(15px); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes successSlide {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes titleGlow {
          0% { text-shadow: 0 4px 8px rgba(0, 70, 135, 0.2); }
          100% { text-shadow: 0 8px 16px rgba(0, 70, 135, 0.4), 0 0 30px rgba(0, 70, 135, 0.3); }
        }
        
        @keyframes cardGlow {
          0% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
          100% { box-shadow: 0 12px 40px rgba(0, 70, 135, 0.15); }
        }
        
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { 
            transform: translateY(-100px) translateX(20px);
          }
        }
        
        input:focus {
          outline: none;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: #f8fafc;
          overflow-x: hidden;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${sbiTheme.colors.primary}, ${sbiTheme.colors.secondary});
          border-radius: 5px;
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, ${sbiTheme.colors.primaryLight}, ${sbiTheme.colors.secondaryLight});
          transform: scale(1.1);
        }
        
        ::selection {
          background: rgba(0, 70, 135, 0.3);
          color: ${sbiTheme.colors.primaryDark};
        }
      `}</style>
    </>
  );
}

export default BillPayment;