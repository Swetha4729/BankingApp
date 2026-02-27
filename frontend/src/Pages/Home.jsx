import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// SBI YONO Business Theme
const sbiTheme = {
  colors: {
    primary: '#004687', // SBI Dark Blue
    secondary: '#0066b3', // SBI Medium Blue
    accent: '#ff6a00', // SBI Orange
    green: '#00a651', // SBI Green
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
    success: 'linear-gradient(135deg, #00a651 0%, #00c569 100%)',
    light: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%)',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 70, 135, 0.1)',
    medium: '0 4px 12px rgba(0, 70, 135, 0.15)',
    large: '0 8px 24px rgba(0, 70, 135, 0.2)',
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
    xl: '3rem',
    xxl: '4rem',
  },
  animations: {
    fadeIn: 'fadeIn 0.8s ease-out',
    slideUp: 'slideUp 0.6s ease-out',
    slideInLeft: 'slideInLeft 0.7s ease-out',
    slideInRight: 'slideInRight 0.7s ease-out',
    scaleIn: 'scaleIn 0.5s ease-out',
    bounceIn: 'bounceIn 0.8s ease-out',
    pulse: 'pulse 2s infinite',
    float: 'float 6s ease-in-out infinite',
    shimmer: 'shimmer 2s infinite linear',
    floatSlow: 'floatSlow 8s ease-in-out infinite',
    floatFast: 'floatFast 4s ease-in-out infinite',
  }
};

// Data arrays moved outside component
const features = [
  {
    icon: '💰',
    title: 'Payments & Transfers',
    description: 'Seamless fund transfers, bill payments, and bulk transactions with real-time tracking.'
  },
  {
    icon: '📊',
    title: 'Trade Finance',
    description: 'Letters of Credit, bank guarantees, and comprehensive document management.'
  },
  {
    icon: '📈',
    title: 'Reports & Analytics',
    description: 'Real-time transaction insights, customizable reports, and financial analytics.'
  },
  {
    icon: '🔄',
    title: 'Collections',
    description: 'Efficient vendor payment management and automated collection processes.'
  },
  {
    icon: '🏦',
    title: 'Account Management',
    description: 'Multi-account overview, balance tracking, and comprehensive account services.'
  },
  {
    icon: '🔒',
    title: 'Secure Banking',
    description: 'Enterprise-grade security with multi-factor authentication and encryption.'
  }
];

// Floating elements data - various shapes and symbols
const floatingShapes = ['●', '■', '▲', '◆', '★', '✦', '❖', '◈', '⬡', '⬢', '○', '□', '△', '◇'];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    features: false,
    cta: false
  });

  const navigate = useNavigate();

  // Handle navigation with explicit function
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle scroll events - FIXED: Removed visibleSections from dependencies
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollY(scrollY);
      
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Check which sections are visible
      const heroSection = document.getElementById('hero-section');
      const featuresSection = document.getElementById('features-section');
      const ctaSection = document.getElementById('cta-section');

      const newVisibleSections = { ...visibleSections };

      // Hero section visibility (always visible once loaded)
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.top < window.innerHeight * 0.8;
        if (isHeroVisible && !visibleSections.hero) {
          newVisibleSections.hero = true;
        }
      }

      // Features section visibility
      if (featuresSection) {
        const featuresRect = featuresSection.getBoundingClientRect();
        const isFeaturesVisible = featuresRect.top < window.innerHeight * 0.8;
        if (isFeaturesVisible && !visibleSections.features) {
          newVisibleSections.features = true;
        }
      }

      // CTA section visibility
      if (ctaSection) {
        const ctaRect = ctaSection.getBoundingClientRect();
        const isCtaVisible = ctaRect.top < window.innerHeight * 0.8;
        if (isCtaVisible && !visibleSections.cta) {
          newVisibleSections.cta = true;
        }
      }

      // Only update if something actually changed
      if (JSON.stringify(newVisibleSections) !== JSON.stringify(visibleSections)) {
        setVisibleSections(newVisibleSections);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial setup
    setIsVisible(true);
    handleScroll(); // Check initial visibility

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // FIXED: Empty dependency array to prevent infinite re-renders

  // Generate random floating elements for different sections
  const generateFloatingElements = (count, section = 'hero') => {
    const colors = {
      hero: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)'],
      features: ['rgba(0, 70, 135, 0.1)', 'rgba(0, 102, 179, 0.08)', 'rgba(0, 166, 81, 0.06)'],
      cta: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.08)']
    };
    
    return Array.from({ length: count }, (_, i) => {
      return {
        id: i,
        shape: floatingShapes[Math.floor(Math.random() * floatingShapes.length)],
        size: Math.random() * 20 + 8,
        color: colors[section][Math.floor(Math.random() * colors[section].length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 6,
        animation: Math.random() > 0.5 ? 'floatSlow' : 'floatFast',
        rotation: Math.random() * 360,
      };
    });
  };

  const [heroFloatingElements] = useState(() => generateFloatingElements(20, 'hero'));
  const [featuresFloatingElements] = useState(() => generateFloatingElements(15, 'features'));
  const [ctaFloatingElements] = useState(() => generateFloatingElements(12, 'cta'));

  const styles = {
    homeContainer: {
      minHeight: '100vh',
      background: sbiTheme.colors.background,
      fontFamily: sbiTheme.typography.fontFamily,
      position: 'relative',
      overflow: 'hidden',
    },

    // Scroll Progress Indicator
    scrollProgress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${scrollProgress}%`,
      height: '3px',
      background: sbiTheme.gradients.accent,
      zIndex: 1000,
      transition: 'width 0.1s ease',
      boxShadow: `0 0 10px ${sbiTheme.colors.accent}`,
    },

    // Hero Section Styles
    heroSection: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      padding: `${sbiTheme.spacing.xxl} ${sbiTheme.spacing.xl}`,
      position: 'relative',
      overflow: 'hidden',
      marginTop: '0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      transform: `translateY(${scrollY * 0.1}px)`,
      transition: 'transform 0.1s ease-out',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(255, 106, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 166, 81, 0.1) 0%, transparent 50%)
      `,
      transform: `translateY(${scrollY * 0.3}px)`,
      transition: 'transform 0.1s ease-out',
    },
    floatingElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    floatingElement: {
      position: 'absolute',
      color: 'rgba(255, 255, 255, 0.2)',
      fontSize: '1rem',
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'transform 0.1s ease-out',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      width: '100%',
      opacity: visibleSections.hero ? 1 : 0,
      transform: visibleSections.hero ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out',
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      marginBottom: sbiTheme.spacing.md,
      lineHeight: '1.2',
      opacity: visibleSections.hero ? 1 : 0,
      transform: visibleSections.hero ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heroSubtitle: {
      fontSize: '1.3rem',
      marginBottom: sbiTheme.spacing.xl,
      opacity: visibleSections.hero ? 0.9 : 0,
      transform: visibleSections.hero ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    ctaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: sbiTheme.spacing.md,
      flexWrap: 'wrap',
      opacity: visibleSections.hero ? 1 : 0,
      transform: visibleSections.hero ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },

    // Button Styles
    btn: {
      padding: `${sbiTheme.spacing.sm} ${sbiTheme.spacing.lg}`,
      border: 'none',
      borderRadius: sbiTheme.borderRadius.medium,
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.xs,
      position: 'relative',
      overflow: 'hidden',
    },
    btnPrimary: {
      background: sbiTheme.gradients.accent,
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.medium,
    },
    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: sbiTheme.colors.white,
      border: `2px solid rgba(255, 255, 255, 0.3)`,
      backdropFilter: 'blur(10px)',
    },
    btnShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      animation: `${sbiTheme.animations.shimmer} 3s infinite`,
    },

    // Features Section
    featuresSection: {
      padding: `${sbiTheme.spacing.xxl} ${sbiTheme.spacing.xl}`,
      background: sbiTheme.colors.white,
      position: 'relative',
      transform: `translateY(${scrollY * 0.08}px)`,
      transition: 'transform 0.1s ease-out',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: '600',
      color: sbiTheme.colors.darkBlue,
      marginBottom: sbiTheme.spacing.lg,
      opacity: visibleSections.features ? 1 : 0,
      transform: visibleSections.features ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out 0.3s',
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: '1.1rem',
      color: sbiTheme.colors.textSecondary,
      marginBottom: sbiTheme.spacing.xl,
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      opacity: visibleSections.features ? 1 : 0,
      transform: visibleSections.features ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease-out 0.5s',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: sbiTheme.spacing.lg,
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
    },
    featureCard: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.large,
      padding: sbiTheme.spacing.lg,
      boxShadow: sbiTheme.shadows.small,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      opacity: visibleSections.features ? 1 : 0,
      transform: visibleSections.features ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
      animation: visibleSections.features ? `${sbiTheme.animations.scaleIn} 0.5s ease-out` : 'none',
      position: 'relative',
      overflow: 'hidden',
    },
    featureIcon: {
      width: '80px',
      height: '80px',
      background: sbiTheme.gradients.light,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.md,
      fontSize: '2rem',
      transition: 'all 0.3s ease',
      animation: visibleSections.features ? `${sbiTheme.animations.bounceIn} 0.8s ease-out` : 'none',
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: sbiTheme.colors.darkBlue,
      marginBottom: sbiTheme.spacing.sm,
      transition: 'all 0.3s ease',
    },
    featureDescription: {
      color: sbiTheme.colors.textSecondary,
      lineHeight: '1.6',
      transition: 'all 0.3s ease',
    },

    // Final CTA Section
    ctaSection: {
      padding: `${sbiTheme.spacing.xxl} ${sbiTheme.spacing.xl}`,
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transform: `translateY(${scrollY * 0.04}px)`,
      transition: 'transform 0.1s ease-out',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
    },
    ctaBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 70% 30%, rgba(255, 106, 0, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 30% 70%, rgba(0, 166, 81, 0.15) 0%, transparent 50%)
      `,
      transform: `translateY(${scrollY * 0.2}px)`,
      transition: 'transform 0.1s ease-out',
    },
    ctaContent: {
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      opacity: visibleSections.cta ? 1 : 0,
      transform: visibleSections.cta ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
      transition: 'all 0.8s ease-out',
    },

    // Footer
    footer: {
      background: sbiTheme.colors.darkBlue,
      color: sbiTheme.colors.white,
      padding: `${sbiTheme.spacing.xl} ${sbiTheme.spacing.xl}`,
      textAlign: 'center',
      position: 'relative',
      transform: `translateY(${scrollY * 0.02}px)`,
      transition: 'transform 0.1s ease-out',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
    },
    footerText: {
      opacity: 0.8,
      margin: 0,
      animation: `${sbiTheme.animations.fadeIn} 1s ease-out`,
    },
  };

  return (
    <div style={styles.homeContainer}>
      {/* Scroll Progress Indicator */}
      <div style={styles.scrollProgress}></div>

      {/* Hero Section */}
      <section id="hero-section" style={styles.heroSection}>
        <div style={styles.heroBackground}></div>
        <div style={styles.floatingElements}>
          {heroFloatingElements.map((element) => (
            <div
              key={element.id}
              style={{
                ...styles.floatingElement,
                fontSize: `${element.size}px`,
                left: `${element.left}%`,
                top: `${element.top}%`,
                animation: `${element.animation} ${element.duration}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`,
                color: element.color,
                transform: `rotate(${element.rotation}deg) translateY(${scrollY * 0.1}px)`,
              }}
            >
              {element.shape}
            </div>
          ))}
        </div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            YOLO Business - SST Corporate Banking
          </h1>
          <p style={styles.heroSubtitle}>
            Integrated digital platform for payments, trade finance, reports, and comprehensive liquidity management for your business.
          </p>
          <div style={styles.ctaButtons}>
            <button 
              onClick={() => handleNavigation('/login')}
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.boxShadow = sbiTheme.shadows.large;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = sbiTheme.shadows.medium;
              }}
            >
              <span style={styles.btnShimmer}></span>
              🚀 Get Started
            </button>
            <button 
              onClick={() => handleNavigation('/features')}
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              📋 Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" style={styles.featuresSection}>
        <div style={styles.floatingElements}>
          {featuresFloatingElements.map((element) => (
            <div
              key={element.id}
              style={{
                ...styles.floatingElement,
                fontSize: `${element.size}px`,
                left: `${element.left}%`,
                top: `${element.top}%`,
                animation: `${element.animation} ${element.duration}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`,
                color: element.color,
                transform: `rotate(${element.rotation}deg) translateY(${scrollY * 0.08}px)`,
              }}
            >
              {element.shape}
            </div>
          ))}
        </div>
        
        <h2 style={styles.sectionTitle}>Comprehensive Business Banking</h2>
        <p style={styles.sectionSubtitle}>
          Everything your business needs for efficient banking operations in one integrated platform
        </p>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                ...styles.featureCard,
                transitionDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = sbiTheme.shadows.large;
                e.currentTarget.style.borderColor = sbiTheme.colors.primary;
                
                const icon = e.currentTarget.querySelector('.feature-icon');
                if (icon) {
                  icon.style.transform = 'scale(1.1) rotate(5deg)';
                  icon.style.background = sbiTheme.gradients.accent;
                  icon.style.color = sbiTheme.colors.white;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = sbiTheme.shadows.small;
                e.currentTarget.style.borderColor = sbiTheme.colors.border;
                
                const icon = e.currentTarget.querySelector('.feature-icon');
                if (icon) {
                  icon.style.transform = 'scale(1) rotate(0)';
                  icon.style.background = sbiTheme.gradients.light;
                  icon.style.color = 'inherit';
                }
              }}
            >
              <div 
                className="feature-icon"
                style={{
                  ...styles.featureIcon,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta-section" style={styles.ctaSection}>
        <div style={styles.ctaBackground}></div>
        <div style={styles.floatingElements}>
          {ctaFloatingElements.map((element) => (
            <div
              key={element.id}
              style={{
                ...styles.floatingElement,
                fontSize: `${element.size}px`,
                left: `${element.left}%`,
                top: `${element.top}%`,
                animation: `${element.animation} ${element.duration}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`,
                color: element.color,
                transform: `rotate(${element.rotation}deg) translateY(${scrollY * 0.04}px)`,
              }}
            >
              {element.shape}
            </div>
          ))}
        </div>
        <div style={styles.ctaContent}>
          <h2 style={{ 
            ...styles.sectionTitle, 
            color: sbiTheme.colors.white, 
            marginBottom: sbiTheme.spacing.md,
          }}>
            Ready to Transform Your Business Banking?
          </h2>
          <p style={{ 
            ...styles.sectionSubtitle, 
            color: 'rgba(255, 255, 255, 0.9)', 
            marginBottom: sbiTheme.spacing.xl,
          }}>
            Join thousands of businesses already using YONO Business for their banking needs
          </p>
          <button 
            onClick={() => handleNavigation('/signup')}
            style={{ 
              ...styles.btn, 
              ...styles.btnPrimary,
              fontSize: '1.1rem',
              padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.xl}`,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.05)';
              e.target.style.boxShadow = sbiTheme.shadows.large;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = sbiTheme.shadows.medium;
            }}
          >
            <span style={styles.btnShimmer}></span>
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            © 2024 YOLO Business - Corporate Banking Platform.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-15px) rotate(120deg);
          }
          66% { 
            transform: translateY(10px) rotate(240deg);
          }
        }
        
        @keyframes floatSlow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% { 
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% { 
            transform: translateY(10px) translateX(5px) rotate(270deg);
          }
        }
        
        @keyframes floatFast {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-25px) translateX(15px) rotate(120deg);
          }
          66% { 
            transform: translateY(15px) translateX(-15px) rotate(240deg);
          }
        }
        
        @keyframes shimmer {
          0% { 
            left: -100%;
          }
          100% { 
            left: 100%;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Performance optimizations */
        * {
          box-sizing: border-box;
        }
        
        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid ${sbiTheme.colors.accent};
          outline-offset: 2px;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${sbiTheme.colors.background};
        }

        ::-webkit-scrollbar-thumb {
          background: ${sbiTheme.colors.primary};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${sbiTheme.colors.secondary};
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.1rem !important;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
          
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;