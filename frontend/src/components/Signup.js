import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SBI YONO Business Theme
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

// Animation Component
const AnimatedComponent = ({ children, delay = 0, style = {}, animation = 'fadeInUp' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const getAnimationStyle = () => {
    const baseStyle = {
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: `${delay}ms`,
      ...style
    };
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp':
          return { ...baseStyle, opacity: 0, transform: 'translateY(20px)' };
        case 'fadeInLeft':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-20px)' };
        case 'fadeInRight':
          return { ...baseStyle, opacity: 0, transform: 'translateX(20px)' };
        case 'scaleIn':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.9)' };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }
    
    return { ...baseStyle, opacity: 1, transform: 'none' };
  };
  
  return (
    <div style={getAnimationStyle()}>
      {children}
    </div>
  );
};

function SignupForm() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', address: '', dob: '', password: ''
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [shake, setShake] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  // Floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getFloatTransform = () => {
    const yOffset = Math.sin(floatOffset * Math.PI / 180) * 3;
    return `translateY(${yOffset}px)`;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    // Password strength calculation
    if (id === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSignup = () => {
    // Basic validation
    const requiredFields = ['full_name', 'email', 'phone', 'password'];
    const missingFields = requiredFields.filter(field => !form[field].trim());
    
    if (missingFields.length > 0) {
      setMsg(`Please fill in: ${missingFields.map(f => f.replace('_', ' ')).join(', ')}`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (form.password.length < 8) {
      setMsg('Password must be at least 8 characters long');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    setMsg('');

    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMsg(data.error);
          setShake(true);
          setTimeout(() => setShake(false), 500);
        } else {
          setMsg('Signup successful! Please login.');
          // Reset form on success
          setForm({
            full_name: '', email: '', phone: '', address: '', dob: '', password: ''
          });
          setPasswordStrength(0);
        }
      })
      .catch(err => {
        setMsg('Server error. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  // Custom Icons as SVG Components
  const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );

  const EnvelopeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );

  const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );

  const HomeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );

  const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );

  const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );

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

  const BuildingLibraryIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21h15z" />
    </svg>
  );

  const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );

  const getFieldIcon = (fieldName) => {
    const icons = {
      full_name: UserIcon,
      email: EnvelopeIcon,
      phone: PhoneIcon,
      address: HomeIcon,
      dob: CalendarIcon,
      password: LockIcon,
    };
    return icons[fieldName] || UserIcon;
  };

  const getFieldType = (fieldName) => {
    if (fieldName === 'password') return 'password';
    if (fieldName === 'dob') return 'date';
    if (fieldName === 'email') return 'email';
    if (fieldName === 'phone') return 'tel';
    return 'text';
  };

  const getFieldPlaceholder = (fieldName) => {
    const placeholders = {
      full_name: 'Enter your full name',
      email: 'Enter your email address',
      phone: 'Enter your phone number',
      address: 'Enter your address',
      dob: 'Select your date of birth',
      password: 'Create a strong password',
    };
    return placeholders[fieldName] || `Enter ${fieldName.replace('_', ' ')}`;
  };

  const styles = {
    signupContainer: {
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, ${sbiTheme.colors.primary} 0%, ${sbiTheme.colors.primaryDark} 100%),
        radial-gradient(circle at 10% 20%, rgba(255, 106, 0, 0.15) 0%, transparent 25%),
        radial-gradient(circle at 90% 80%, rgba(0, 166, 81, 0.1) 0%, transparent 25%)
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
    signupCard: {
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
      maxWidth: '480px',
      position: 'relative',
      zIndex: 2,
      transform: `${getFloatTransform()} ${isCardHovered ? 'scale(1.02)' : 'scale(1)'}`,
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
    formGrid: {
      display: 'grid',
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
      transition: 'all 0.3s ease',
    },
    inputContainer: {
      position: 'relative',
    },
    input: {
      width: '85%',
      padding: `${sbiTheme.spacing.lg} ${sbiTheme.spacing.xl} ${sbiTheme.spacing.lg} 3rem`,
      background: sbiTheme.colors.white,
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.base,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      color: sbiTheme.colors.textPrimary,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderLeft: `4px solid ${sbiTheme.colors.primary}`,
    },
    inputActive: {
      borderColor: sbiTheme.colors.primary,
      boxShadow: `0 0 0 3px ${sbiTheme.colors.primary}20, 0 8px 20px rgba(0, 70, 135, 0.15)`,
      background: sbiTheme.colors.white,
      transform: 'translateY(-2px)',
    },
    inputError: {
      borderColor: sbiTheme.colors.error,
      borderLeftColor: sbiTheme.colors.error,
      animation: 'shake 0.5s ease-in-out',
    },
    inputIcon: {
      position: 'absolute',
      left: sbiTheme.spacing.lg,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: sbiTheme.colors.primary,
      transition: 'all 0.3s ease',
    },
    passwordToggle: {
      position: 'absolute',
      right: sbiTheme.spacing.lg,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: sbiTheme.colors.textSecondary,
      cursor: 'pointer',
      padding: sbiTheme.spacing.xs,
      borderRadius: sbiTheme.borderRadius.sm,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    passwordStrength: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      marginTop: sbiTheme.spacing.xs,
    },
    strengthBars: {
      display: 'flex',
      gap: '4px',
      flex: 1,
    },
    strengthBar: {
      height: '6px',
      flex: 1,
      background: sbiTheme.colors.gray200,
      borderRadius: sbiTheme.borderRadius.sm,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scaleY(0.8)',
    },
    strengthBarActive: {
      transform: 'scaleY(1)',
      boxShadow: '0 2px 8px rgba(0, 166, 81, 0.3)',
    },
    strengthText: {
      fontSize: sbiTheme.typography.fontSize.xs,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      minWidth: '60px',
      textAlign: 'right',
      transition: 'all 0.3s ease',
    },
    signupButton: {
      width: '100%',
      padding: sbiTheme.spacing.lg,
      background: sbiTheme.gradients.primary,
      border: 'none',
      borderRadius: sbiTheme.borderRadius.lg,
      color: sbiTheme.colors.white,
      fontSize: sbiTheme.typography.fontSize.lg,
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
    signupButtonDisabled: {
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
      width: '20px',
      height: '20px',
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
      animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
    loginLink: {
      color: sbiTheme.colors.primary,
      textDecoration: 'none',
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    loginLinkUnderline: {
      position: 'absolute',
      bottom: '-2px',
      left: 0,
      width: '0%',
      height: '2px',
      background: sbiTheme.colors.secondary,
      transition: 'width 0.3s ease',
    },
  };

  const getStrengthColor = (strength) => {
    if (strength === 0) return sbiTheme.colors.gray400;
    if (strength <= 2) return sbiTheme.colors.error;
    if (strength === 3) return sbiTheme.colors.warning;
    return sbiTheme.colors.success;
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return 'Weak';
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div style={styles.signupContainer}>
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
      
      <div 
        style={{
          ...styles.signupCard,
          animation: shake ? 'shake 0.5s ease-in-out' : 'none'
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div style={{
          ...styles.cardGlow,
          opacity: isCardHovered ? 1 : 0,
        }}></div>
        
        {/* Header */}
        <AnimatedComponent delay={200} animation="fadeInUp">
          <div style={styles.cardHeader}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <BuildingLibraryIcon width={28} height={28} />
              </div>
            </div>
            <h2 style={styles.title}>Join YONO Business</h2>
            <p style={styles.subtitle}>Create your corporate banking account</p>
          </div>
        </AnimatedComponent>

        {/* Form */}
        <div style={styles.formGrid}>
          {Object.keys(form).map((key, index) => {
            const FieldIcon = getFieldIcon(key);
            const isPasswordField = key === 'password';
            
            return (
              <AnimatedComponent key={key} delay={300 + index * 100} animation="fadeInUp">
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>
                    <FieldIcon width={16} height={16} />
                    {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                  <div style={styles.inputContainer}>
                    <FieldIcon style={styles.inputIcon} />
                    <input 
                      id={key}
                      type={isPasswordField ? (showPassword ? 'text' : 'password') : getFieldType(key)}
                      value={form[key]}
                      onChange={handleChange}
                      placeholder={getFieldPlaceholder(key)}
                      onFocus={() => setActiveField(key)}
                      onBlur={() => setActiveField(null)}
                      onKeyPress={handleKeyPress}
                      style={{
                        ...styles.input,
                        ...(activeField === key && styles.inputActive),
                        ...(msg && !msg.includes('successful') && styles.inputError)
                      }}
                    />
                    {isPasswordField && (
                      <button 
                        type="button"
                        style={{
                          ...styles.passwordToggle,
                          ...(activeField === key && {
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
                          if (activeField !== key) {
                            e.target.style.background = 'none';
                            e.target.style.transform = 'translateY(-50%) scale(1)';
                          }
                        }}
                      >
                        <EyeIcon show={showPassword} width={16} height={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {isPasswordField && form.password && (
                    <div style={styles.passwordStrength}>
                      <div style={styles.strengthBars}>
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            style={{
                              ...styles.strengthBar,
                              ...(index <= passwordStrength && {
                                background: getStrengthColor(passwordStrength),
                                ...styles.strengthBarActive
                              })
                            }}
                          />
                        ))}
                      </div>
                      <span 
                        style={{
                          ...styles.strengthText,
                          color: getStrengthColor(passwordStrength),
                          fontWeight: sbiTheme.typography.fontWeight.bold
                        }}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                  )}
                </div>
              </AnimatedComponent>
            );
          })}
        </div>

        {/* Signup Button */}
        <AnimatedComponent delay={900} animation="scaleIn">
          <button 
            onClick={handleSignup}
            disabled={isLoading}
            style={{
              ...styles.signupButton,
              ...((isLoading || !form.full_name || !form.email || !form.phone || !form.password) && styles.signupButtonDisabled)
            }}
            onMouseEnter={(e) => {
              if (!isLoading && form.full_name && form.email && form.phone && form.password) {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 70, 135, 0.4)';
                e.target.style.background = sbiTheme.gradients.secondary;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && form.full_name && form.email && form.phone && form.password) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 70, 135, 0.3)';
                e.target.style.background = sbiTheme.gradients.primary;
              }
            }}
          >
            {!isLoading && form.full_name && form.email && form.phone && form.password && (
              <div style={styles.buttonShimmer}></div>
            )}
            {isLoading ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Creating Account...
              </>
            ) : (
              <>
                <CheckIcon width={20} height={20} />
                Create YONO Business Account
              </>
            )}
          </button>
        </AnimatedComponent>

        {/* Message */}
        {msg && (
          <AnimatedComponent delay={100} animation="fadeIn">
            <div style={{
              ...styles.message,
              ...(msg.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
              {msg}
            </div>
          </AnimatedComponent>
        )}

        {/* Footer */}
        <AnimatedComponent delay={1000} animation="fadeIn">
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={styles.loginLink}
                onMouseEnter={(e) => {
                  e.target.style.color = sbiTheme.colors.secondary;
                  e.target.querySelector('.underline').style.width = '100%';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = sbiTheme.colors.primary;
                  e.target.querySelector('.underline').style.width = '0%';
                }}
              >
                Sign in here
                <span className="underline" style={styles.loginLinkUnderline}></span>
              </Link>
            </p>
          </div>
        </AnimatedComponent>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
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
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus {
          outline: none;
        }
        
        input[type="date"] {
          color: ${sbiTheme.colors.textPrimary};
        }
        
        input[type="date"]:invalid {
          color: ${sbiTheme.colors.textSecondary};
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

export default SignupForm;