import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

// Enhanced SBI YONO Business Theme with Hero UI principles
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
};

// Animation variants
const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideInLeft: {
    initial: { opacity: 0, transform: 'translateX(-20px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  slideInRight: {
    initial: { opacity: 0, transform: 'translateX(20px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Animated Component Wrapper
const AnimatedComponent = ({ children, variant = animationVariants.fadeIn, delay = 0, style = {}, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const animationStyle = {
    opacity: isVisible ? variant.animate.opacity : variant.initial.opacity,
    transform: isVisible ? variant.animate.transform : variant.initial.transform,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${variant.transition.duration}s`,
    transitionTimingFunction: variant.transition.ease,
    transitionDelay: `${delay / 1000}s`,
    ...style
  };
  
  return (
    <div style={animationStyle} {...props}>
      {children}
    </div>
  );
};

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const navigate = useNavigate();

  // Floating animation state
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const floatInterval = setInterval(() => {
      setFloatOffset(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(floatInterval);
  }, []);

  const getFloatTransform = () => {
    const yOffset = Math.sin(floatOffset * Math.PI / 180) * 3;
    return `translateY(${yOffset}px)`;
  };

  // Setup reCAPTCHA verifier
  const setupRecaptcha = () => {
    try {
      // Clear any existing recaptcha
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          console.log('reCAPTCHA solved successfully');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setMsg('Security check expired. Please try again.');
        },
        'error-callback': () => {
          console.log('reCAPTCHA error');
          setMsg('Security check failed. Please try again.');
        }
      });

      // Render the reCAPTCHA widget
      window.recaptchaVerifier.render().then((widgetId) => {
        console.log('reCAPTCHA widget rendered with ID:', widgetId);
        window.recaptchaWidgetId = widgetId;
      });

    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      setMsg('Failed to load security check. Please refresh the page.');
    }
  };

  // Send OTP with detailed error handling
  const sendOtp = async () => {
    if (!phone) {
      setMsg('Please enter your phone number');
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      setMsg('Please enter phone number in international format (e.g., +919876543210)');
      return;
    }

    setIsOtpLoading(true);
    setMsg('');

    try {
      console.log('Starting OTP process for:', phone);
      
      // Setup reCAPTCHA
      setupRecaptcha();
      
      // Wait for reCAPTCHA to be ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const appVerifier = window.recaptchaVerifier;
      
      if (!appVerifier) {
        throw new Error('reCAPTCHA not initialized');
      }

      console.log('Calling signInWithPhoneNumber...');
      
      // Send OTP
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      console.log('OTP sent successfully, confirmation:', confirmation);
      
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setMsg('OTP sent successfully to your phone');
      
    } catch (error) {
      console.error('Detailed OTP Error:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      
      // More specific error handling
      if (error.code === 'auth/invalid-phone-number') {
        setMsg('Invalid phone number format. Please check and try again.');
      } else if (error.code === 'auth/missing-phone-number') {
        setMsg('Phone number is required.');
      } else if (error.code === 'auth/quota-exceeded') {
        setMsg('SMS quota exceeded. Please try again later.');
      } else if (error.code === 'auth/user-disabled') {
        setMsg('This account has been disabled.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setMsg('Phone authentication is not enabled. Please contact support.');
      } else if (error.code === 'auth/captcha-check-failed') {
        setMsg('Security verification failed. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setMsg('Too many attempts. Please try again later.');
      } else {
        setMsg(`Failed to send OTP: ${error.message}`);
      }
      
      // Reset recaptcha on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsOtpLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setMsg('Please enter a valid 6-digit OTP');
      return;
    }

    setIsOtpLoading(true);
    setMsg('');

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      const idToken = await user.getIdToken();
      
      const response = await fetch('http://localhost:5000/api/auth/firebase-login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();

      if (data.error) {
        setMsg(data.error);
        return;
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMsg(getErrorMessage(error));
    } finally {
      setIsOtpLoading(false);
    }
  };

  // Handle regular login
  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.error) {
        setMsg(data.error);
      } else {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setMsg('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press for regular login
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!otpSent) {
        handleLogin();
      }
    }
  };

  // Handle key press for OTP input
  const handleOtpKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyOtp();
    }
  };

  // Error message helper
  const getErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/invalid-phone-number':
        return 'Invalid phone number format';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/invalid-verification-code':
        return 'Invalid OTP. Please try again';
      case 'auth/code-expired':
        return 'OTP has expired. Please request a new one';
      case 'auth/captcha-check-failed':
        return 'Security check failed. Please try again';
      case 'auth/quota-exceeded':
        return 'SMS quota exceeded. Please try again later';
      default:
        return error.message || 'Authentication failed. Please try again';
    }
  };

  // Reset OTP flow
  const resetOtpFlow = () => {
    setOtpSent(false);
    setOtp('');
    setConfirmationResult(null);
    setMsg('');
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
  };

  // Enhanced Icons with proper sizing
  const EyeIcon = ({ show, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      {show ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c4.058 0 7.573-2.475 9.096-6.024M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c4.058 0 7.573-2.475 9.096-6.024M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )}
    </svg>
  );

  const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );

  const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );

  const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );

  const BuildingLibraryIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21h15z" />
    </svg>
  );

  const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );

  const RefreshIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );

  const ShieldCheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );

  // Enhanced Styles with Hero UI principles and animations
  const styles = {
    loginContainer: {
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, ${sbiTheme.colors.primary} 0%, ${sbiTheme.colors.primaryDark} 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 106, 0, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 166, 81, 0.1) 0%, transparent 50%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: sbiTheme.spacing.lg,
      fontFamily: sbiTheme.typography.fontFamily,
      position: 'relative',
      overflow: 'hidden',
    },
    floatingShapes: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    floatingShape: {
      position: 'absolute',
      borderRadius: '50%',
      background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
      filter: 'blur(40px)',
      animation: 'float 6s ease-in-out infinite',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `,
      opacity: 0.6,
    },
    loginCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: sbiTheme.borderRadius['3xl'],
      padding: sbiTheme.spacing['3xl'],
      boxShadow: `
        ${sbiTheme.shadows.xl},
        0 0 0 1px rgba(255, 255, 255, 0.1),
        0 20px 40px rgba(0, 0, 0, 0.1)
      `,
      border: `1px solid rgba(255, 255, 255, 0.2)`,
      width: '100%',
      maxWidth: '440px',
      position: 'relative',
      zIndex: 2,
      transform: getFloatTransform(),
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: sbiTheme.borderRadius['3xl'],
      background: `linear-gradient(135deg, ${sbiTheme.colors.primary}20, ${sbiTheme.colors.secondary}20)`,
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1,
    },
    cardHeader: {
      textAlign: 'center',
      marginBottom: sbiTheme.spacing.xl,
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
      marginBottom: sbiTheme.spacing.lg,
    },
    logoIcon: {
      width: '56px',
      height: '56px',
      background: sbiTheme.gradients.primary,
      borderRadius: sbiTheme.borderRadius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.lg,
      animation: 'pulse 2s ease-in-out infinite',
    },
    title: {
      fontSize: sbiTheme.typography.fontSize['3xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.5rem 0',
      background: sbiTheme.gradients.primary,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 3s ease-in-out infinite',
    },
    subtitle: {
      fontSize: sbiTheme.typography.fontSize.base,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      lineHeight: 1.6,
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.lg,
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.sm,
    },
    inputLabel: {
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      transition: 'all 0.2s ease',
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      width: '90%',
      padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.lg} ${sbiTheme.spacing.md} 2.75rem`,
      background: sbiTheme.colors.white,
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.base,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      color: sbiTheme.colors.textPrimary,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderLeft: `3px solid ${sbiTheme.colors.primary}`,
    },
    inputActive: {
      borderColor: sbiTheme.colors.primary,
      boxShadow: `0 0 0 3px ${sbiTheme.colors.primary}20, 0 4px 12px rgba(0, 70, 135, 0.1)`,
      background: sbiTheme.colors.white,
      transform: 'translateY(-1px)',
    },
    inputError: {
      borderColor: sbiTheme.colors.error,
      borderLeftColor: sbiTheme.colors.error,
      animation: 'shake 0.5s ease-in-out',
    },
    inputIcon: {
      position: 'absolute',
      left: sbiTheme.spacing.md,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '18px',
      height: '18px',
      color: sbiTheme.colors.primary,
      transition: 'all 0.3s ease',
    },
    passwordToggle: {
      position: 'absolute',
      right: sbiTheme.spacing.md,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: sbiTheme.colors.textSecondary,
      cursor: 'pointer',
      padding: '4px',
      borderRadius: sbiTheme.borderRadius.sm,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginButton: {
      width: '100%',
      padding: `${sbiTheme.spacing.md} ${sbiTheme.spacing.lg}`,
      background: sbiTheme.gradients.primary,
      border: 'none',
      borderRadius: sbiTheme.borderRadius.lg,
      color: sbiTheme.colors.white,
      fontSize: sbiTheme.typography.fontSize.base,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
      marginTop: sbiTheme.spacing.lg,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 70, 135, 0.3)',
    },
    loginButtonDisabled: {
      background: sbiTheme.colors.gray400,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
    buttonShimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'shimmer 2s infinite',
    },
    loadingSpinner: {
      width: '18px',
      height: '18px',
      border: `2px solid transparent`,
      borderTop: `2px solid ${sbiTheme.colors.white}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    message: {
      textAlign: 'center',
      padding: sbiTheme.spacing.md,
      borderRadius: sbiTheme.borderRadius.lg,
      marginTop: sbiTheme.spacing.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      animation: 'slideDown 0.3s ease-out',
    },
    errorMessage: {
      background: `${sbiTheme.colors.error}15`,
      color: sbiTheme.colors.error,
      border: `1px solid ${sbiTheme.colors.error}30`,
    },
    successMessage: {
      background: `${sbiTheme.colors.success}15`,
      color: sbiTheme.colors.success,
      border: `1px solid ${sbiTheme.colors.success}30`,
    },
    footer: {
      textAlign: 'center',
      marginTop: sbiTheme.spacing.xl,
      paddingTop: sbiTheme.spacing.lg,
      borderTop: `1px solid ${sbiTheme.colors.border}`,
    },
    footerText: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      margin: '0 0 1rem 0',
    },
    signupLink: {
      color: sbiTheme.colors.primary,
      textDecoration: 'none',
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    signupLinkUnderline: {
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: '0%',
      height: '2px',
      background: sbiTheme.colors.secondary,
      transition: 'width 0.3s ease',
    },
    // Enhanced OTP Styles
    otpSection: {
      marginTop: sbiTheme.spacing.lg,
      padding: sbiTheme.spacing.xl,
      background: `linear-gradient(135deg, ${sbiTheme.colors.gray50} 0%, ${sbiTheme.colors.white} 100%)`,
      borderRadius: sbiTheme.borderRadius.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      boxShadow: sbiTheme.shadows.sm,
      animation: 'scaleIn 0.4s ease-out',
    },
    otpTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    otpInput: {
      width: '100%',
      padding: sbiTheme.spacing.lg,
      background: sbiTheme.colors.white,
      border: `2px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      textAlign: 'center',
      letterSpacing: '12px',
      color: sbiTheme.colors.textPrimary,
      transition: 'all 0.3s ease',
      fontVariantNumeric: 'tabular-nums',
      animation: 'pulse 2s ease-in-out infinite',
    },
    otpButtonGroup: {
      display: 'flex',
      gap: sbiTheme.spacing.sm,
      marginTop: sbiTheme.spacing.lg,
    },
    secondaryButton: {
      flex: 1,
      padding: sbiTheme.spacing.md,
      background: sbiTheme.colors.white,
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      color: sbiTheme.colors.textPrimary,
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
    },
    loginOptions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: `${sbiTheme.spacing.xl} 0`,
      position: 'relative',
    },
    loginDivider: {
      flex: 1,
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${sbiTheme.colors.border}, transparent)`,
    },
    loginDividerText: {
      padding: `0 ${sbiTheme.spacing.lg}`,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      background: sbiTheme.colors.white,
    },
    phoneNote: {
      fontSize: sbiTheme.typography.fontSize.xs,
      color: sbiTheme.colors.textSecondary,
      marginTop: sbiTheme.spacing.xs,
      fontStyle: 'italic',
      animation: 'fadeIn 0.5s ease-out',
    },
    securityBadge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sbiTheme.spacing.sm,
      marginTop: sbiTheme.spacing.lg,
      padding: sbiTheme.spacing.sm,
      background: sbiTheme.colors.gray50,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.xs,
      color: sbiTheme.colors.textSecondary,
      animation: 'fadeIn 0.6s ease-out',
    },
    recaptchaContainer: {
      margin: `${sbiTheme.spacing.md} 0`,
      display: 'flex',
      justifyContent: 'center',
      minHeight: '78px',
      animation: 'fadeIn 0.5s ease-out',
    },
  };

  return (
    <div style={styles.loginContainer}>
      {/* Animated Background Elements */}
      <div style={styles.floatingShapes}>
        <div style={{
          ...styles.floatingShape,
          width: '300px',
          height: '300px',
          top: '10%',
          left: '5%',
          animationDelay: '0s',
        }}></div>
        <div style={{
          ...styles.floatingShape,
          width: '200px',
          height: '200px',
          top: '60%',
          right: '10%',
          animationDelay: '2s',
        }}></div>
        <div style={{
          ...styles.floatingShape,
          width: '250px',
          height: '250px',
          bottom: '20%',
          left: '15%',
          animationDelay: '4s',
        }}></div>
      </div>
      
      <div style={styles.backgroundPattern}></div>
      
      <AnimatedComponent variant={animationVariants.scaleIn} delay={200}>
        <div 
          style={{
            ...styles.loginCard,
            transform: `${getFloatTransform()} ${isCardHovered ? 'scale(1.02)' : 'scale(1)'}`,
          }}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          <div style={{
            ...styles.cardGlow,
            opacity: isCardHovered ? 1 : 0,
          }}></div>
          
          {/* Header */}
          <AnimatedComponent variant={animationVariants.fadeInUp} delay={300}>
            <div style={styles.cardHeader}>
              <div style={styles.logoSection}>
                <div style={styles.logoIcon}>
                  <BuildingLibraryIcon width={28} height={28} />
                </div>
              </div>
              <h2 style={styles.title}>Welcome to YONO Business</h2>
              <p style={styles.subtitle}>
                {otpSent ? 'Enter OTP sent to your phone' : 'Secure access to your corporate banking'}
              </p>
            </div>
          </AnimatedComponent>

          {!otpSent ? (
            <>
              {/* Regular Login Form */}
              <AnimatedComponent variant={animationVariants.fadeInUp} delay={400}>
                <div style={styles.formGroup}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>
                      <UserIcon width={14} height={14} />
                      Email Address
                    </label>
                    <div style={styles.inputContainer}>
                      <UserIcon style={styles.inputIcon} />
                      <input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Enter your email address"
                        type="email"
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        onKeyPress={handleKeyPress}
                        style={{
                          ...styles.input,
                          ...(activeField === 'email' && styles.inputActive),
                          ...(msg && styles.inputError)
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>
                      <LockIcon width={14} height={14} />
                      Password
                    </label>
                    <div style={styles.inputContainer}>
                      <LockIcon style={styles.inputIcon} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                        onFocus={() => setActiveField('password')}
                        onBlur={() => setActiveField(null)}
                        onKeyPress={handleKeyPress}
                        style={{
                          ...styles.input,
                          ...(activeField === 'password' && styles.inputActive),
                          ...(msg && styles.inputError)
                        }}
                      />
                      <button 
                        type="button"
                        style={{
                          ...styles.passwordToggle,
                          ...(activeField === 'password' && {
                            background: sbiTheme.colors.gray100,
                            transform: 'translateY(-50%) scale(1.1)'
                          })
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseEnter={(e) => {
                          e.target.style.background = sbiTheme.colors.gray100;
                          e.target.style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          if (activeField !== 'password') {
                            e.target.style.background = 'none';
                            e.target.style.transform = 'translateY(-50%) scale(1)';
                          }
                        }}
                      >
                        <EyeIcon show={showPassword} width={16} height={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedComponent>

              {/* Regular Login Button */}
              <AnimatedComponent variant={animationVariants.fadeInUp} delay={500}>
                <button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  style={{
                    ...styles.loginButton,
                    ...((!isLoading && email && password) ? {} : styles.loginButtonDisabled)
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && email && password) {
                      e.target.style.transform = 'translateY(-2px) scale(1.02)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 70, 135, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading && email && password) {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 70, 135, 0.3)';
                    }
                  }}
                >
                  {!isLoading && email && password && <div style={styles.buttonShimmer}></div>}
                  {isLoading ? (
                    <>
                      <div style={styles.loadingSpinner}></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <ArrowRightIcon width={18} height={18} />
                      Sign In with Email
                    </>
                  )}
                </button>
              </AnimatedComponent>

              {/* Login Options Divider */}
              <AnimatedComponent variant={animationVariants.fadeIn} delay={600}>
                <div style={styles.loginOptions}>
                  <div style={styles.loginDivider}></div>
                  <span style={styles.loginDividerText}>OR</span>
                  <div style={styles.loginDivider}></div>
                </div>
              </AnimatedComponent>

              {/* OTP Login Section */}
              <AnimatedComponent variant={animationVariants.slideInUp} delay={700}>
                <div style={styles.otpSection}>
                  <h3 style={styles.otpTitle}>
                    <PhoneIcon width={18} height={18} />
                    Sign in with OTP
                  </h3>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>
                      Phone Number
                    </label>
                    <div style={styles.inputContainer}>
                      <PhoneIcon style={styles.inputIcon} />
                      <input 
                        value={phone} 
                        onChange={e => setPhone(e.target.value)} 
                        placeholder="+919876543210"
                        type="tel"
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                        style={{
                          ...styles.input,
                          ...(activeField === 'phone' && styles.inputActive),
                          ...(msg && styles.inputError)
                        }}
                      />
                    </div>
                    <p style={styles.phoneNote}>
                      Enter phone number with country code (e.g., +91 for India)
                    </p>
                  </div>

                  <button 
                    onClick={sendOtp}
                    disabled={isOtpLoading || !phone}
                    style={{
                      ...styles.loginButton,
                      ...((!isOtpLoading && phone) ? {} : styles.loginButtonDisabled),
                      marginTop: sbiTheme.spacing.lg,
                    }}
                  >
                    {isOtpLoading ? (
                      <>
                        <div style={styles.loadingSpinner}></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <ArrowRightIcon width={18} height={18} />
                        Send OTP
                      </>
                    )}
                  </button>
                </div>
              </AnimatedComponent>
            </>
          ) : (
            /* OTP Verification Section */
            <AnimatedComponent variant={animationVariants.scaleIn} delay={300}>
              <div style={styles.otpSection}>
                <h3 style={styles.otpTitle}>
                  <ShieldCheckIcon width={18} height={18} />
                  Verify OTP
                </h3>
                
                <p style={{...styles.subtitle, marginBottom: sbiTheme.spacing.lg, textAlign: 'center'}}>
                  Enter the 6-digit OTP sent to <strong>{phone}</strong>
                </p>

                <div style={styles.inputGroup}>
                  <input 
                    value={otp} 
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    placeholder="000000"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    onFocus={() => setActiveField('otp')}
                    onBlur={() => setActiveField(null)}
                    onKeyPress={handleOtpKeyPress}
                    style={{
                      ...styles.otpInput,
                      ...(activeField === 'otp' && styles.inputActive),
                      ...(msg && styles.inputError)
                    }}
                  />
                </div>

                <div style={styles.otpButtonGroup}>
                  <button 
                    onClick={resetOtpFlow}
                    style={styles.secondaryButton}
                    onMouseEnter={(e) => {
                      e.target.style.background = sbiTheme.colors.gray100;
                      e.target.style.transform = 'translateY(-1px) scale(1.02)';
                      e.target.style.boxShadow = sbiTheme.shadows.sm;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = sbiTheme.colors.white;
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <RefreshIcon width={14} height={14} />
                    Change Number
                  </button>
                  
                  <button 
                    onClick={verifyOtp}
                    disabled={isOtpLoading || otp.length !== 6}
                    style={{
                      ...styles.loginButton,
                      ...((!isOtpLoading && otp.length === 6) ? {} : styles.loginButtonDisabled),
                      flex: 2,
                    }}
                  >
                    {isOtpLoading ? (
                      <>
                        <div style={styles.loadingSpinner}></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <ShieldCheckIcon width={16} height={16} />
                        Verify OTP
                      </>
                    )}
                  </button>
                </div>

                <button 
                  onClick={sendOtp}
                  disabled={isOtpLoading}
                  style={{
                    ...styles.secondaryButton,
                    marginTop: sbiTheme.spacing.sm,
                    background: 'transparent',
                    border: 'none',
                    color: sbiTheme.colors.primary,
                  }}
                >
                  <RefreshIcon width={14} height={14} />
                  Resend OTP
                </button>
              </div>
            </AnimatedComponent>
          )}

          {/* Security Badge */}
          <AnimatedComponent variant={animationVariants.fadeIn} delay={800}>
            <div style={styles.securityBadge}>
              <ShieldCheckIcon width={14} height={14} />
              <span>Bank-grade security & encryption</span>
            </div>
          </AnimatedComponent>

          {/* Message */}
          {msg && (
            <AnimatedComponent variant={animationVariants.fadeIn} delay={100}>
              <div style={{
                ...styles.message,
                ...(msg.includes('successfully') ? styles.successMessage : styles.errorMessage)
              }}>
                {msg}
              </div>
            </AnimatedComponent>
          )}

          {/* reCAPTCHA Container */}
          <div id="recaptcha-container" style={styles.recaptchaContainer}></div>

          {/* Footer */}
          <AnimatedComponent variant={animationVariants.fadeIn} delay={900}>
            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  style={styles.signupLink}
                  onMouseEnter={(e) => {
                    e.target.style.color = sbiTheme.colors.secondary;
                    e.target.querySelector('.underline').style.width = '100%';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = sbiTheme.colors.primary;
                    e.target.querySelector('.underline').style.width = '0%';
                  }}
                >
                  Create one now
                  <span className="underline" style={styles.signupLinkUnderline}></span>
                </a>
              </p>
            </div>
          </AnimatedComponent>
        </div>
      </AnimatedComponent>

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @keyframes gradientShift {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        input:focus {
          outline: none;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* OTP input styling */
        input[type="text"]::-webkit-outer-spin-button,
        input[type="text"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="text"] {
          -moz-appearance: textfield;
        }

        /* Enhanced scrollbar */
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

        /* Smooth page load animation */
        body {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;