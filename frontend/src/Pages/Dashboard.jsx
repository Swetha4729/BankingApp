import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Accounts from '../components/Accounts';
import BillPayment from '../components/BillPayment';
import TradeFinance from '../components/TradeFinance';
import Reports from '../components/Reports';
// Heroicons imports
import {
  ChartBarIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  ChartPieIcon,
  UsersIcon,
  GlobeAltIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ChevronUpIcon,
  TrashIcon,
  PencilIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
// Heroicons solid variants
import {
  ChartBarIcon as ChartBarSolid,
  BanknotesIcon as BanknotesSolid,
  ArrowsRightLeftIcon as ArrowsRightLeftSolid,
  DocumentTextIcon as DocumentTextSolid,
  ChartPieIcon as ChartPieSolid,
  UsersIcon as UsersSolid,
  GlobeAltIcon as GlobeAltSolid,
  CogIcon as CogSolid,
} from '@heroicons/react/24/solid';

// Enhanced SBI YONO Business Theme
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
  },
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
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
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
};

// Fixed Animation variants
const animationVariants = {
  // Slide in from left with fade
  slideInLeft: {
    initial: { 
      opacity: 0, 
      transform: 'translateX(-30px)' 
    },
    animate: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
    transition: { 
      duration: 0.5, 
      ease: 'ease-out' 
    }
  },
  // Slide in from right with fade
  slideInRight: {
    initial: { 
      opacity: 0, 
      transform: 'translateX(30px)' 
    },
    animate: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
    transition: { 
      duration: 0.5, 
      ease: 'ease-out' 
    }
  },
  // Slide in from bottom with fade
  slideInUp: {
    initial: { 
      opacity: 0, 
      transform: 'translateY(30px)' 
    },
    animate: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
    transition: { 
      duration: 0.5, 
      ease: 'ease-out' 
    }
  },
  // Fade in with scale
  fadeInScale: {
    initial: { 
      opacity: 0, 
      transform: 'scale(0.95)' 
    },
    animate: { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
    transition: { 
      duration: 0.4, 
      ease: 'ease-out' 
    }
  },
  // Staggered children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Fixed default variant
const defaultVariant = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1 
  },
  transition: { 
    duration: 0.3, 
    ease: 'ease-out' 
  }
};

// Fixed Animated Component Wrapper
const AnimatedComponent = ({ children, variant = defaultVariant, delay = 0, style = {}, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const safeVariant = {
    initial: variant?.initial || defaultVariant.initial,
    animate: variant?.animate || defaultVariant.animate,
    transition: {
      duration: variant?.transition?.duration || defaultVariant.transition.duration,
      ease: variant?.transition?.ease || defaultVariant.transition.ease,
      delay: delay / 1000
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Fixed: Don't mix shorthand and non-shorthand animation properties
  const animationStyle = {
    // Apply initial styles
    opacity: safeVariant.initial.opacity || 0,
    transform: safeVariant.initial.transform || 'none',
    
    // Apply animate styles when visible
    ...(isVisible && {
      opacity: safeVariant.animate.opacity || 1,
      transform: safeVariant.animate.transform || 'none',
    }),
    
    // Apply transition properties separately
    transitionProperty: 'opacity, transform',
    transitionDuration: `${safeVariant.transition.duration}s`,
    transitionTimingFunction: safeVariant.transition.ease,
    transitionDelay: `${safeVariant.transition.delay}s`,
    
    // Apply custom styles
    ...style
  };
  
  return (
    <div style={animationStyle} {...props}>
      {children}
    </div>
  );
};

// Fixed Scroll Float Container Component
const ScrollFloatContainer = ({ children, scrollY, intensity = 0.3 }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setElementTop(rect.top + window.pageYOffset);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const getFloatTransform = () => {
    const distance = Math.max(0, scrollY - elementTop);
    const floatAmount = Math.sin(distance * 0.01) * 10 * intensity;
    return `translateY(${floatAmount}px)`;
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: getFloatTransform(),
        transition: 'transform 0.1s ease-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? `${getFloatTransform()} translateY(0)` : `${getFloatTransform()} translateY(30px)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.6s',
        transitionTimingFunction: 'ease-out',
      }}
    >
      {children}
    </div>
  );
};

// Enhanced ++
// bar Component
const Sidebar = ({ user, isOpen, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      path: '',
      label: 'Dashboard',
      icon: ChartBarIcon,
      solidIcon: ChartBarSolid,
      description: 'Overview & Analytics'
    },
    {
      path: 'accounts',
      label: 'Accounts',
      icon: BuildingLibraryIcon,
      solidIcon: BuildingLibraryIcon,
      description: 'Manage Accounts'
    },
    {
      path: 'transfer',
      label: 'Fund Transfer',
      icon: ArrowsRightLeftIcon,
      solidIcon: ArrowsRightLeftSolid,
      description: 'Send Money'
    },
    {
      path: 'bills',
      label: 'Bill Payments',
      icon: DocumentTextIcon,
      solidIcon: DocumentTextSolid,
      description: 'Pay Bills'
    },
    {
      path: 'reports',
      label: 'Transaction History',
      icon: ChartPieIcon,
      solidIcon: ChartPieSolid,
      description: 'View Reports'
    },
    {
      path: 'trade',
      label: 'Trade Finance',
      icon: GlobeAltIcon,
      solidIcon: GlobeAltSolid,
      description: 'LC & Guarantees'
    },
    {
      path: 'beneficiaries',
      label: 'Beneficiaries',
      icon: UsersIcon,
      solidIcon: UsersSolid,
      description: 'Manage Contacts'
    },
  ];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: isMobile && isOpen ? 'block' : 'none',
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: isHovered || isOpen ? '280px' : '80px',
      background: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.lg,
      borderRight: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
    },
    
    sidebarHeader: {
      padding: '1.5rem 1rem 1rem',
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      position: 'relative',
      minHeight: '140px', // Increased from 120px to 140px
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    // Logo Section
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    },
    logo: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      color: sbiTheme.colors.primary,
      flexShrink: 0,
    },
    logoText: {
      flex: 1,
      minWidth: 0,
    },
    logoTitle: {
      fontSize: '16px',
      fontWeight: '700',
      margin: '0 0 2px 0',
      color: sbiTheme.colors.white,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    logoSubtitle: {
      fontSize: '11px',
      opacity: 0.8,
      margin: 0,
      color: sbiTheme.colors.white,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    userSection: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.white,
      border: '2px solid rgba(255, 255, 255, 0.3)',
    },
    userInfo: {
      flex: 1,
      minWidth: 0,
    },
    userName: {
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      margin: '0 0 0.25rem 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    userEmail: {
      fontSize: sbiTheme.typography.fontSize.xs,
      opacity: 0.9,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: '1rem 0',
      margin: 0,
      flex: 1,
      overflowY: 'auto',
    },
    menuItem: {
      margin: '0.125rem 0.5rem',
    },
    menuLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      textDecoration: 'none',
      color: sbiTheme.colors.textPrimary,
      borderRadius: sbiTheme.borderRadius.lg,
      transition: 'all 0.3s ease',
      border: '1px solid transparent',
    },
    activeMenuLink: {
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.primary,
      boxShadow: sbiTheme.shadows.sm,
      borderColor: sbiTheme.colors.primary,
    },
    menuIcon: {
      width: '20px',
      height: '20px',
      flexShrink: 0,
    },
    menuContent: {
      flex: 1,
      minWidth: 0,
      marginLeft: '0.75rem',
    },
    menuLabel: {
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      margin: '0 0 0.125rem 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    menuDescription: {
      fontSize: sbiTheme.typography.fontSize.xs,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  return (
    <>
      {isMobile && isOpen && (
        <AnimatedComponent
          variant={animationVariants.fadeInScale}
          style={styles.overlay}
          onClick={() => onToggle(false)}
        />
      )}
      
      <AnimatedComponent
        variant={animationVariants.slideInLeft}
        style={styles.sidebar}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        
        
        <div style={styles.sidebarHeader}>
  {/* Logo Section - Always Visible */}
  <div style={styles.logoSection}>
    <div style={styles.logo}>
      SST
    </div>
    {(isHovered || isOpen) && (
      <div style={styles.logoText}>
        <div style={styles.logoTitle}>YOLO Business</div>
      </div>
    )}
  </div>
  
  {/* User Section */}
  <div style={styles.userSection}>
    <div style={styles.userAvatar}>
      {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
    </div>
    {(isHovered || isOpen) && (
      <div style={styles.userInfo}>
        <h3 style={styles.userName}>
          Welcome, {user?.full_name?.split(' ')[0] || 'User'}
        </h3>
        <p style={styles.userEmail}>{user?.email || 'user@company.com'}</p>
      </div>
    )}
  </div>
</div>
        
        <ul style={styles.sidebarMenu}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === `/dashboard/${item.path}` || 
                            (location.pathname === '/dashboard' && item.path === '');
            const isCollapsed = !(isHovered || isOpen);
            const IconComponent = isActive ? item.solidIcon : item.icon;
            
            return (
              <AnimatedComponent
                key={item.path}
                variant={animationVariants.slideInLeft}
                delay={index * 100}
                style={styles.menuItem}
              >
                <li>
                  <Link
                    to={`/dashboard/${item.path}`}
                    style={{
                      ...styles.menuLink,
                      ...(isActive && styles.activeMenuLink),
                    }}
                    onClick={() => isMobile && onToggle(false)}
                  >
                    <IconComponent style={styles.menuIcon} />
                    
                    {(isHovered || isOpen) && (
                      <div style={styles.menuContent}>
                        <div style={styles.menuLabel}>{item.label}</div>
                        <div style={styles.menuDescription}>{item.description}</div>
                      </div>
                    )}
                  </Link>
                </li>
              </AnimatedComponent>
            );
          })}
        </ul>
      </AnimatedComponent>
    </>
  );
};

// Enhanced Beneficiaries Management Component - UPDATED
const BeneficiariesManagement = ({ user }) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    beneficiary_name: '',
    beneficiary_account_number: '',
    bank_name: 'SBI',
    ifsc_code: ''
  });

  useEffect(() => {
    fetchBeneficiaries();
  }, [user?.user_id]);

  const fetchBeneficiaries = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/beneficiaries/${user.user_id}`);
      if (response.ok) {
        const data = await response.json();
        setBeneficiaries(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch beneficiaries');
        setBeneficiaries([]);
      }
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
      setBeneficiaries([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.beneficiary_name.trim()) {
      return 'Beneficiary name is required';
    }
    if (!formData.beneficiary_account_number.trim() || formData.beneficiary_account_number.length < 8) {
      return 'Valid account number is required (minimum 8 characters)';
    }
    if (!formData.ifsc_code.trim() || formData.ifsc_code.length !== 11) {
      return 'Valid IFSC code is required (11 characters)';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: 'error', text: validationError });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const url = editingBeneficiary 
        ? `http://localhost:5000/api/beneficiaries/${editingBeneficiary.beneficiary_id}`
        : 'http://localhost:5000/api/beneficiaries';
      
      const method = editingBeneficiary ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id,
          ...formData
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingBeneficiary ? 'Beneficiary updated successfully!' : 'Beneficiary added successfully!' 
        });
        resetForm();
        fetchBeneficiaries();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Operation failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (beneficiaryId) => {
    if (!window.confirm('Are you sure you want to delete this beneficiary?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/beneficiaries/${beneficiaryId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Beneficiary deleted successfully!' });
        fetchBeneficiaries();
      } else {
        throw new Error(result.error || 'Delete failed');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete beneficiary' });
    }
  };

  const handleEdit = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setFormData({
      beneficiary_name: beneficiary.beneficiary_name,
      beneficiary_account_number: beneficiary.beneficiary_account_number,
      bank_name: beneficiary.bank_name,
      ifsc_code: beneficiary.ifsc_code
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      beneficiary_name: '',
      beneficiary_account_number: '',
      bank_name: 'SBI',
      ifsc_code: ''
    });
    setEditingBeneficiary(null);
    setShowAddForm(false);
    setMessage(null);
  };

  // Filter beneficiaries based on search term
  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.beneficiary_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.beneficiary_account_number.includes(searchTerm) ||
    beneficiary.bank_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bankOptions = [
    'SBI', 'HDFC', 'ICICI', 'AXIS', 'PNB', 'BOB', 'CANARA', 'UNION', 'OTHER'
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    title: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.5rem 0',
    },
    subtitle: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
    },
    addButton: {
      background: sbiTheme.colors.primary,
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      transition: 'all 0.2s',
    },
    searchInput: {
      padding: '0.75rem 1rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: '8px',
      fontSize: '0.875rem',
      minWidth: '250px',
    },
    formCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: sbiTheme.shadows.md,
      border: `1px solid ${sbiTheme.colors.border}`,
      marginBottom: '2rem',
    },
    formHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    formTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      margin: 0,
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      color: sbiTheme.colors.textSecondary,
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '4px',
      transition: 'all 0.2s',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: sbiTheme.colors.textPrimary,
      fontSize: '0.875rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: '8px',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: '8px',
      fontSize: '0.875rem',
      background: 'white',
      transition: 'all 0.2s',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    submitButton: {
      background: sbiTheme.colors.primary,
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
    },
    cancelButton: {
      background: sbiTheme.colors.gray500,
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
    },
    message: {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    successMessage: {
      background: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
    },
    errorMessage: {
      background: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
    beneficiariesSection: {
      marginTop: '2rem',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    sectionTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      margin: 0,
    },
    beneficiariesCount: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      background: sbiTheme.colors.gray100,
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
    },
    beneficiariesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem',
    },
    beneficiaryCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: sbiTheme.shadows.sm,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    beneficiaryCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: sbiTheme.shadows.md,
      borderColor: sbiTheme.colors.primary,
    },
    beneficiaryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
    },
    beneficiaryInfo: {
      flex: 1,
    },
    beneficiaryName: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
    },
    beneficiaryAccount: {
      fontSize: '0.875rem',
      color: sbiTheme.colors.textSecondary,
      fontFamily: 'monospace',
      margin: '0 0 0.25rem 0',
    },
    beneficiaryBank: {
      fontSize: '0.875rem',
      color: sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    beneficiaryIfsc: {
      fontSize: '0.75rem',
      color: sbiTheme.colors.textSecondary,
      margin: '0 0 0.25rem 0',
      fontFamily: 'monospace',
    },
    beneficiaryDate: {
      fontSize: '0.75rem',
      color: sbiTheme.colors.gray500,
      margin: '0.5rem 0 0 0',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    editButton: {
      background: sbiTheme.colors.warning,
      color: 'white',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: 'all 0.2s',
    },
    deleteButton: {
      background: sbiTheme.colors.error,
      color: 'white',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: 'all 0.2s',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: sbiTheme.colors.textSecondary,
      background: 'white',
      borderRadius: '12px',
      border: `1px solid ${sbiTheme.colors.border}`,
    },
    emptyStateIcon: {
      width: '64px',
      height: '64px',
      color: sbiTheme.colors.gray400,
      margin: '0 auto 1rem',
    },
    statsCard: {
      background: sbiTheme.gradients.primary,
      color: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    statsTitle: {
      fontSize: sbiTheme.typography.fontSize.sm,
      margin: '0 0 0.5rem 0',
      opacity: 0.9,
    },
    statsValue: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Manage Beneficiaries</h2>
          <p style={styles.subtitle}>
            Add, edit, or remove your saved beneficiaries for quick transfers
          </p>
        </div>
        <div style={styles.headerRight}>
          <input
            type="text"
            placeholder="Search beneficiaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button
            style={styles.addButton}
            onClick={() => setShowAddForm(true)}
            onMouseEnter={(e) => {
              e.target.style.background = sbiTheme.colors.primaryLight;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = sbiTheme.colors.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <PlusIcon width={20} height={20} />
            Add Beneficiary
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div style={styles.statsCard}>
        <p style={styles.statsTitle}>Total Beneficiaries</p>
        <h3 style={styles.statsValue}>{beneficiaries.length}</h3>
      </div>

      {/* Message Display */}
      {message && (
        <div style={{
          ...styles.message,
          ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
        }}>
          {message.type === 'success' ? (
            <CheckCircleIcon width={20} height={20} />
          ) : (
            <XCircleIcon width={20} height={20} />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add/Edit Beneficiary Form */}
      {showAddForm && (
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>
              {editingBeneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}
            </h3>
            <button
              style={styles.closeButton}
              onClick={resetForm}
              onMouseEnter={(e) => {
                e.target.style.background = sbiTheme.colors.gray100;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <XCircleIcon width={20} height={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Beneficiary Name *</label>
                <input
                  type="text"
                  name="beneficiary_name"
                  value={formData.beneficiary_name}
                  onChange={handleInputChange}
                  placeholder="Enter full name as per bank records"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Account Number *</label>
                <input
                  type="text"
                  name="beneficiary_account_number"
                  value={formData.beneficiary_account_number}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  style={styles.input}
                  required
                  maxLength="18"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Bank Name *</label>
                <select
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="">Select Bank</option>
                  {bankOptions.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>IFSC Code *</label>
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleInputChange}
                  placeholder="Enter 11-character IFSC"
                  style={styles.input}
                  maxLength="11"
                  required
                />
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                style={styles.submitButton}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = sbiTheme.colors.primaryLight;
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = sbiTheme.colors.primary;
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon width={16} height={16} className="animate-spin" />
                    {editingBeneficiary ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingBeneficiary ? 'Update Beneficiary' : 'Add Beneficiary'
                )}
              </button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
                onMouseEnter={(e) => {
                  e.target.style.background = sbiTheme.colors.gray600;
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = sbiTheme.colors.gray500;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Beneficiaries List Section */}
      <div style={styles.beneficiariesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Saved Beneficiaries</h3>
          <div style={styles.beneficiariesCount}>
            {filteredBeneficiaries.length} of {beneficiaries.length} beneficiaries
          </div>
        </div>

        {filteredBeneficiaries.length === 0 ? (
          <div style={styles.emptyState}>
            <UsersIcon style={styles.emptyStateIcon} />
            <h3>No Beneficiaries Found</h3>
            <p>
              {searchTerm 
                ? 'No beneficiaries match your search criteria'
                : 'Get started by adding your first beneficiary'
              }
            </p>
            {!searchTerm && (
              <button
                style={styles.addButton}
                onClick={() => setShowAddForm(true)}
              >
                <PlusIcon width={20} height={20} />
                Add Your First Beneficiary
              </button>
            )}
          </div>
        ) : (
          <div style={styles.beneficiariesGrid}>
            {filteredBeneficiaries.map(beneficiary => (
              <div
                key={beneficiary.beneficiary_id}
                style={styles.beneficiaryCard}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.beneficiaryCardHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.beneficiaryCard);
                }}
              >
                <div style={styles.beneficiaryHeader}>
                  <div style={styles.beneficiaryInfo}>
                    <h4 style={styles.beneficiaryName}>
                      {beneficiary.beneficiary_name}
                    </h4>
                    <p style={styles.beneficiaryAccount}>
                      {beneficiary.beneficiary_account_number}
                    </p>
                    <p style={styles.beneficiaryBank}>
                      <BuildingLibraryIcon width={14} height={14} />
                      {beneficiary.bank_name}
                    </p>
                    <p style={styles.beneficiaryIfsc}>
                      IFSC: {beneficiary.ifsc_code}
                    </p>
                    {beneficiary.created_at && (
                      <p style={styles.beneficiaryDate}>
                        Added: {new Date(beneficiary.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div style={styles.actionButtons}>
                  <button
                    style={styles.editButton}
                    onClick={() => handleEdit(beneficiary)}
                    title="Edit beneficiary"
                    onMouseEnter={(e) => {
                      e.target.style.background = '#d97706';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = sbiTheme.colors.warning;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <PencilIcon width={14} height={14} />
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(beneficiary.beneficiary_id)}
                    title="Delete beneficiary"
                    onMouseEnter={(e) => {
                      e.target.style.background = '#dc2626';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = sbiTheme.colors.error;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <TrashIcon width={14} height={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Home Component with Integrated Fund Transfer Form
const DashboardHome = ({ user, accounts, setAccounts, beneficiaries = [] }) => {
  const navigate = useNavigate();
  
  // Fund Transfer State
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    remarks: '',
    transactionType: 'IMPS'
  });
  const [loading, setLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(0);

  const transactionTypes = [
    { value: 'IMPS', label: 'IMPS (Instant)', maxAmount: 200000, charges: '₹5 + GST', time: 'Instant' },
    { value: 'NEFT', label: 'NEFT', maxAmount: 10000000, charges: 'Free', time: '2-4 hours' },
    { value: 'RTGS', label: 'RTGS (Large)', maxAmount: 999999999, charges: '₹25 + GST', time: '30 minutes' }
  ];

  useEffect(() => {
    if (transferData.fromAccount) {
      const selectedAccount = accounts.find(acc => acc.account_number === transferData.fromAccount);
      setAvailableBalance(selectedAccount ? parseFloat(selectedAccount.balance) : 0);
    }
  }, [transferData.fromAccount, accounts]);

  const getTotalBalance = () => {
    return accounts.reduce((total, acc) => total + (parseFloat(acc.balance) || 0), 0);
  };

  const getPrimaryAccount = () => {
    return accounts.length > 0 ? accounts[0] : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBeneficiarySelect = (beneficiary) => {
    setTransferData(prev => ({
      ...prev,
      toAccount: beneficiary.beneficiary_account_number
    }));
  };

  const validateTransfer = () => {
    const amount = parseFloat(transferData.amount);
    const selectedType = transactionTypes.find(t => t.value === transferData.transactionType);

    if (!transferData.fromAccount) {
      return 'Please select source account';
    }
    if (!transferData.toAccount || transferData.toAccount.length < 8) {
      return 'Please enter valid beneficiary account number';
    }
    if (!amount || amount <= 0) {
      return 'Please enter valid amount';
    }
    if (amount > availableBalance) {
      return 'Insufficient balance';
    }
    if (amount > selectedType.maxAmount) {
      return `Amount exceeds ${selectedType.value} limit of ₹${selectedType.maxAmount.toLocaleString()}`;
    }
    if (transferData.fromAccount === transferData.toAccount) {
      return 'Cannot transfer to same account';
    }
    return null;
  };

  const processTransfer = async () => {
    const validationError = validateTransfer();
    if (validationError) {
      setTransactionStatus({ success: false, message: validationError });
      return;
    }

    setLoading(true);
    setTransactionStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id,
          from_account: transferData.fromAccount,
          to_account: transferData.toAccount,
          amount: parseFloat(transferData.amount),
          transaction_type: transferData.transactionType,
          remarks: transferData.remarks || `Transfer to ${transferData.toAccount}`,
        })
      });

      const result = await response.json();

      if (response.ok) {
        setTransactionStatus({ 
          success: true, 
          message: `Transaction Successful! Transfer to ${result.beneficiary_name} completed.`,
          transactionId: result.transaction_id,
          details: {
            from: result.from_account,
            to: result.to_account,
            amount: transferData.amount,
            type: transferData.transactionType,
            newBalance: result.new_balance,
            timestamp: result.timestamp
          }
        });
        
        // Refresh accounts data to update balances
        const accountsResponse = await fetch(`http://localhost:5000/api/accounts/${user.user_id}`);
        if (accountsResponse.ok) {
          const accountsData = await accountsResponse.json();
          setAccounts(Array.isArray(accountsData) ? accountsData : []);
        }
        
        // Reset form after successful transfer
        setTimeout(() => {
          setTransferData({
            fromAccount: transferData.fromAccount, // Keep the from account selected
            toAccount: '',
            amount: '',
            remarks: '',
            transactionType: 'IMPS'
          });
          setTransactionStatus(null);
        }, 5000);
      } else {
        throw new Error(result.error || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      setTransactionStatus({ 
        success: false, 
        message: error.message || 'Transaction failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const quickTransferAmounts = [1000, 2000, 5000, 10000];

  const calculateCharges = () => {
    const selectedType = transactionTypes.find(t => t.value === transferData.transactionType);
    return selectedType?.charges || 'Free';
  };

  const getProcessingTime = () => {
    const selectedType = transactionTypes.find(t => t.value === transferData.transactionType);
    return selectedType?.time || 'Instant';
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const styles = {
    welcomeSection: {
      background: sbiTheme.gradients.dark,
      color: sbiTheme.colors.white,
      padding: '2rem',
      borderRadius: sbiTheme.borderRadius.xl,
      marginBottom: '2rem',
      boxShadow: sbiTheme.shadows.lg,
    },
    welcomeTitle: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      marginBottom: '0.5rem',
    },
    welcomeSubtitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      opacity: 0.9,
      margin: 0,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    gridCard: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: '1.5rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      boxShadow: sbiTheme.shadows.sm,
      transition: 'all 0.3s ease',
    },
    gridCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: sbiTheme.shadows.lg,
      borderColor: sbiTheme.colors.primary,
    },
    gridCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    gridCardTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      margin: 0,
    },
    gridCardIcon: {
      width: '40px',
      height: '40px',
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
    },
    accountNumber: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      margin: '0.5rem 0',
      fontFamily: 'monospace',
    },
    accountBalance: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: '0.5rem 0',
    },
    accountType: {
      fontSize: sbiTheme.typography.fontSize.xs,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    beneficiaryCount: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      margin: '1rem 0 0.5rem 0',
    },
    beneficiaryLabel: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
    },
    quickAction: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.primary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    viewAllLink: {
      color: sbiTheme.colors.primary,
      textDecoration: 'none',
      fontWeight: sbiTheme.typography.fontWeight.medium,
      fontSize: sbiTheme.typography.fontSize.sm,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    // Fund Transfer Form Styles
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#374151',
      fontSize: '0.875rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
    },
    select: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      background: 'white',
      transition: 'all 0.2s',
    },
    balanceInfo: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem',
    },
    chargesInfo: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem',
      fontStyle: 'italic',
    },
    quickAmounts: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem',
      flexWrap: 'wrap',
    },
    quickAmount: {
      padding: '0.25rem 0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      background: 'white',
      cursor: 'pointer',
      fontSize: '0.75rem',
      transition: 'all 0.2s',
    },
    quickAmountSelected: {
      borderColor: sbiTheme.colors.primary,
      background: sbiTheme.colors.primary,
      color: 'white',
    },
    submitButton: {
      width: '100%',
      padding: '0.75rem',
      background: sbiTheme.colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s',
      marginTop: '1rem',
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    statusMessage: {
      padding: '0.75rem',
      borderRadius: '6px',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
    },
    statusSuccess: {
      background: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
    },
    statusError: {
      background: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
    beneficiarySection: {
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      padding: '0.75rem',
      marginBottom: '1rem',
      background: '#f9fafb',
    },
    beneficiaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '0.5rem',
      marginTop: '0.5rem',
    },
    beneficiaryCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      padding: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: 'white',
      textAlign: 'center',
    },
    beneficiaryCardSelected: {
      borderColor: sbiTheme.colors.primary,
      background: '#f0f8ff',
    },
    beneficiaryName: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 0.25rem 0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    beneficiaryAccount: {
      fontSize: '0.625rem',
      color: '#6b7280',
      fontFamily: 'monospace',
      margin: 0,
    },
  };

  const primaryAccount = getPrimaryAccount();

  // Fund Transfer Form Component
  const FundTransferForm = () => (
    <div>
      <div style={styles.gridCardHeader}>
        <h3 style={styles.gridCardTitle}>Quick Fund Transfer</h3>
        <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.secondary}}>
          <ArrowsRightLeftIcon width={20} height={20} />
        </div>
      </div>

      {/* Quick Beneficiaries */}
      {beneficiaries.length > 0 && (
        <div style={styles.beneficiarySection}>
          <label style={styles.label}>Quick Select</label>
          <div style={styles.beneficiaryGrid}>
            {beneficiaries.slice(0, 4).map(beneficiary => (
              <div
                key={beneficiary.beneficiary_id}
                style={{
                  ...styles.beneficiaryCard,
                  ...(transferData.toAccount === beneficiary.beneficiary_account_number && styles.beneficiaryCardSelected)
                }}
                onClick={() => handleBeneficiarySelect(beneficiary)}
              >
                <div style={styles.beneficiaryName}>
                  {beneficiary.nickname || beneficiary.beneficiary_name.split(' ')[0]}
                </div>
                <div style={styles.beneficiaryAccount}>
                  {beneficiary.beneficiary_account_number.slice(-4)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* From Account */}
      <div style={styles.formGroup}>
        <label style={styles.label}>From Account *</label>
        <select
          name="fromAccount"
          value={transferData.fromAccount}
          onChange={handleInputChange}
          style={styles.select}
          required
        >
          <option value="">Select Account</option>
          {accounts.map(account => (
            <option key={account.account_number} value={account.account_number}>
              {account.account_number} - ₹{parseFloat(account.balance).toLocaleString()}
            </option>
          ))}
        </select>
        {transferData.fromAccount && (
          <div style={styles.balanceInfo}>
            Available: ₹{availableBalance.toLocaleString()}
          </div>
        )}
      </div>

      {/* To Account */}
      <div style={styles.formGroup}>
        <label style={styles.label}>To Account *</label>
        <input
          type="text"
          name="toAccount"
          value={transferData.toAccount}
          onChange={handleInputChange}
          placeholder="Enter account number"
          style={styles.input}
          required
        />
      </div>

      {/* Amount */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Amount (₹) *</label>
        <input
          type="number"
          name="amount"
          value={transferData.amount}
          onChange={handleInputChange}
          placeholder="Enter amount"
          style={styles.input}
          min="1"
          max={availableBalance}
          required
        />
        
        <div style={styles.quickAmounts}>
          {quickTransferAmounts.map(amount => (
            <button
              key={amount}
              type="button"
              style={{
                ...styles.quickAmount,
                ...(transferData.amount == amount && styles.quickAmountSelected)
              }}
              onClick={() => setTransferData(prev => ({ ...prev, amount: amount.toString() }))}
            >
              ₹{amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Transfer Type */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Transfer Type</label>
        <select
          name="transactionType"
          value={transferData.transactionType}
          onChange={handleInputChange}
          style={styles.select}
        >
          {transactionTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <div style={styles.chargesInfo}>
          Charges: {calculateCharges()} • Time: {getProcessingTime()}
        </div>
      </div>

      {/* Remarks */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Remarks (Optional)</label>
        <input
          type="text"
          name="remarks"
          value={transferData.remarks}
          onChange={handleInputChange}
          placeholder="Add description"
          style={styles.input}
        />
      </div>

      {/* Transaction Status */}
      {transactionStatus && !transactionStatus.success && (
        <div style={{
          ...styles.statusMessage,
          ...styles.statusError
        }}>
          <XCircleIcon width={16} height={16} />
          <span>{transactionStatus.message}</span>
        </div>
      )}

      {transactionStatus?.success && (
        <div style={{
          ...styles.statusMessage,
          ...styles.statusSuccess
        }}>
          <CheckCircleIcon width={16} height={16} />
          <span>{transactionStatus.message}</span>
        </div>
      )}

      {/* Send Button */}
      <button
        style={{
          ...styles.submitButton,
          ...(loading && styles.submitButtonDisabled)
        }}
        onClick={processTransfer}
        disabled={loading}
      >
        {loading ? (
          <>
            <ArrowPathIcon width={16} height={16} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ArrowUpTrayIcon width={16} height={16} />
            Send Money
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      <AnimatedComponent variant={animationVariants.slideInUp} delay={100}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Welcome to YONO Business</h1>
          <p style={styles.welcomeSubtitle}>
            Hello {user.full_name}, manage your corporate banking with ease and security
          </p>
        </div>
      </AnimatedComponent>

      <div style={styles.statsGrid}>
        <div style={styles.gridCard}>
          <div style={styles.gridCardHeader}>
            <div>
              <h4 style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.textSecondary, margin: '0 0 0.5rem 0' }}>
                Total Balance
              </h4>
              <h3 style={{ fontSize: sbiTheme.typography.fontSize['2xl'], fontWeight: sbiTheme.typography.fontWeight.bold, color: sbiTheme.colors.textPrimary, margin: '0 0 0.25rem 0' }}>
                ₹{getTotalBalance().toLocaleString('en-IN')}
              </h3>
              <div style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.success }}>
                +2.9%
              </div>
            </div>
            <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.primary}}>
              <CurrencyDollarIcon width={24} height={24} />
            </div>
          </div>
        </div>

        <div style={styles.gridCard}>
          <div style={styles.gridCardHeader}>
            <div>
              <h4 style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.textSecondary, margin: '0 0 0.5rem 0' }}>
                Active Accounts
              </h4>
              <h3 style={{ fontSize: sbiTheme.typography.fontSize['2xl'], fontWeight: sbiTheme.typography.fontWeight.bold, color: sbiTheme.colors.textPrimary, margin: '0 0 0.25rem 0' }}>
                {accounts.length}
              </h3>
              <div style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.success }}>
                +1
              </div>
            </div>
            <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.success}}>
              <BuildingLibraryIcon width={24} height={24} />
            </div>
          </div>
        </div>

        <div style={styles.gridCard}>
          <div style={styles.gridCardHeader}>
            <div>
              <h4 style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.textSecondary, margin: '0 0 0.5rem 0' }}>
                Transactions
              </h4>
              <h3 style={{ fontSize: sbiTheme.typography.fontSize['2xl'], fontWeight: sbiTheme.typography.fontWeight.bold, color: sbiTheme.colors.textPrimary, margin: '0 0 0.25rem 0' }}>
                24
              </h3>
              <div style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.success }}>
                100% success
              </div>
            </div>
            <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.secondary}}>
              <ArrowsRightLeftIcon width={24} height={24} />
            </div>
          </div>
        </div>

        <div style={styles.gridCard}>
          <div style={styles.gridCardHeader}>
            <div>
              <h4 style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.textSecondary, margin: '0 0 0.5rem 0' }}>
                Beneficiaries
              </h4>
              <h3 style={{ fontSize: sbiTheme.typography.fontSize['2xl'], fontWeight: sbiTheme.typography.fontWeight.bold, color: sbiTheme.colors.textPrimary, margin: '0 0 0.25rem 0' }}>
                {beneficiaries.length}
              </h3>
              <div style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.success }}>
                +2
              </div>
            </div>
            <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.premium}}>
              <UsersIcon width={24} height={24} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainGrid}>
        {/* Account Overview Card */}
        <AnimatedComponent variant={animationVariants.fadeInScale} delay={300}>
          <div
            style={styles.gridCard}
            onClick={() => handleCardClick('/dashboard/accounts')}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.gridCardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.gridCard);
            }}
          >
            <div style={styles.gridCardHeader}>
              <h3 style={styles.gridCardTitle}>Account Overview</h3>
              <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.primary}}>
                <BuildingLibraryIcon width={20} height={20} />
              </div>
            </div>
            
            {primaryAccount ? (
              <>
                <p style={styles.accountNumber}>
                  {primaryAccount.account_number}
                </p>
                <h2 style={styles.accountBalance}>
                  ₹{(parseFloat(primaryAccount.balance) || 0).toLocaleString('en-IN')}
                </h2>
                <p style={styles.accountType}>
                  {primaryAccount.account_type || 'Savings Account'}
                </p>
              </>
            ) : (
              <p>No accounts found</p>
            )}
            
            <div style={styles.quickAction}>
              <span>View All Accounts</span>
              <ChevronRightIcon width={16} height={16} />
            </div>
          </div>
        </AnimatedComponent>

        {/* Fund Transfer Card with Integrated Form */}
        <AnimatedComponent variant={animationVariants.fadeInScale} delay={400}>
          <div style={styles.gridCard}>
            <FundTransferForm />
          </div>
        </AnimatedComponent>

        {/* Beneficiaries Card */}
        <AnimatedComponent variant={animationVariants.fadeInScale} delay={500}>
          <div
            style={styles.gridCard}
            onClick={() => handleCardClick('/dashboard/beneficiaries')}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.gridCardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.gridCard);
            }}
          >
            <div style={styles.gridCardHeader}>
              <h3 style={styles.gridCardTitle}>Beneficiaries</h3>
              <div style={{...styles.gridCardIcon, background: sbiTheme.gradients.success}}>
                <UsersIcon width={20} height={20} />
              </div>
            </div>
            
            <h2 style={styles.beneficiaryCount}>
              {beneficiaries.length}
            </h2>
            <p style={styles.beneficiaryLabel}>
              Saved Beneficiaries
            </p>
            
            {beneficiaries.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                {beneficiaries.slice(0, 3).map((beneficiary, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: index < 2 ? `1px solid ${sbiTheme.colors.border}` : 'none'
                  }}>
                    <span style={{fontSize: sbiTheme.typography.fontSize.sm}}>
                      {beneficiary.beneficiary_name}
                    </span>
                    <span style={{
                      fontSize: sbiTheme.typography.fontSize.xs,
                      color: sbiTheme.colors.textSecondary,
                      fontFamily: 'monospace'
                    }}>
                      {beneficiary.beneficiary_account_number}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div style={styles.quickAction}>
              <span>Manage Beneficiaries</span>
              <ChevronRightIcon width={16} height={16} />
            </div>
          </div>
        </AnimatedComponent>
      </div>

      {/* Accounts Preview */}
      <AnimatedComponent variant={animationVariants.slideInUp} delay={600}>
        <div style={{marginTop: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{fontSize: sbiTheme.typography.fontSize.xl, fontWeight: sbiTheme.typography.fontWeight.semibold}}>
              Recent Accounts
            </h3>
            <Link to="/dashboard/accounts" style={styles.viewAllLink}>
              View All <ChevronRightIcon width={16} height={16} />
            </Link>
          </div>
          <Accounts accounts={accounts.slice(0, 3)} isPreview={true} />
        </div>
      </AnimatedComponent>
    </>
  );
};

// Main Dashboard Layout Component
const Dashboard = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 10);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [user, navigate, lastScrollY]);

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  const getParallaxValue = (speed = 0.5, base = 0) => {
    return base - (scrollY * speed);
  };

  const getScaleValue = (elementPosition = 0, intensity = 0.0005) => {
    const distanceFromTop = Math.max(0, scrollY - elementPosition);
    return Math.max(0.8, 1 - (distanceFromTop * intensity));
  };

  const getOpacityValue = (elementPosition = 0, range = 300) => {
    const distance = Math.abs(scrollY - elementPosition);
    return Math.max(0, 1 - (distance / range));
  };

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/accounts/${user.user_id}`);
        if (response.ok) {
          const data = await response.json();
          setAccounts(Array.isArray(data) ? data : []);
        } else {
          setAccounts([
            {
              account_id: 1,
              account_number: '1000000003',
              balance: '33885',
              status: 'active',
              account_type: 'Savings'
            },
            {
              account_id: 2,
              account_number: '1000000004',
              balance: '15000',
              status: 'active',
              account_type: 'Current'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setAccounts([
          {
            account_id: 1,
            account_number: '1000000003',
            balance: '33885',
            status: 'active',
            account_type: 'Savings'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/beneficiaries/${user.user_id}`);
        if (response.ok) {
          const data = await response.json();
          setBeneficiaries(Array.isArray(data) ? data : []);
        } else {
          setBeneficiaries([
            {
              beneficiary_id: 1,
              beneficiary_name: 'John Doe',
              beneficiary_account_number: '1000000005',
              bank_name: 'SBI',
              ifsc_code: 'SBIN0000123'
            },
            {
              beneficiary_id: 2,
              beneficiary_name: 'Jane Smith',
              beneficiary_account_number: '1000000006',
              bank_name: 'HDFC',
              ifsc_code: 'HDFC0000456'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        setBeneficiaries([
          {
            beneficiary_id: 1,
            beneficiary_name: 'John Doe',
            beneficiary_account_number: '1000000005',
            bank_name: 'SBI',
            ifsc_code: 'SBIN0000123'
          }
        ]);
      }
    };

    fetchAccounts();
    fetchBeneficiaries();
  }, [user?.user_id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!user) {
    return null;
  }

  const styles = {
    dashboardContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: sbiTheme.colors.background,
      fontFamily: sbiTheme.typography.fontFamily,
      position: 'relative',
      overflowX: 'hidden',
    },
    mainContent: {
      flex: 1,
      marginLeft: isMobile ? '0' : '80px',
      minHeight: '100vh',
      transition: 'margin-left 0.3s ease',
      width: '100%',
      position: 'relative',
    },
    contentArea: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      position: 'relative',
    },
    pageHeader: {
      marginBottom: '2rem',
      position: 'relative',
    },
    pageTitle: {
      fontSize: sbiTheme.typography.fontSize['3xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: '0.5rem',
      transform: `translateY(${getParallaxValue(0.3)}px) scale(${getScaleValue(0, 0.0002)})`,
      opacity: getOpacityValue(0, 200),
      transitionProperty: 'transform, opacity',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-out',
    },
    pageSubtitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      transform: `translateY(${getParallaxValue(0.2)}px)`,
      opacity: getOpacityValue(50, 250),
      transitionProperty: 'transform, opacity',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-out',
    },
    scrollIndicator: {
      position: 'fixed',
      top: '50%',
      right: '2rem',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    scrollDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: sbiTheme.colors.primary,
      transition: 'all 0.3s ease',
      opacity: 0.6,
    },
    scrollDotActive: {
      background: sbiTheme.colors.secondary,
      transform: 'scale(1.5)',
      opacity: 1,
    },
    floatButton: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: sbiTheme.gradients.primary,
      border: 'none',
      color: sbiTheme.colors.white,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: sbiTheme.shadows.xl,
      zIndex: 1000,
      transform: `translateY(${scrollDirection === 'down' ? '100px' : '0'})`,
      opacity: scrollDirection === 'down' ? 0 : 1,
      transitionProperty: 'transform, opacity',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    floatingBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
    },
    floatingShape: {
      position: 'absolute',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${sbiTheme.colors.primary}05 0%, transparent 70%)`,
      filter: 'blur(40px)',
    },
  };

  const floatingShapes = [
    { id: 1, size: 300, top: 10, left: 5, color: sbiTheme.colors.primary, speed: 0.3 },
    { id: 2, size: 200, top: 60, right: 10, color: sbiTheme.colors.secondary, speed: 0.5 },
    { id: 3, size: 250, bottom: 20, left: 15, color: sbiTheme.colors.success, speed: 0.4 },
    { id: 4, size: 180, top: 30, right: 20, color: sbiTheme.colors.info, speed: 0.6 },
  ];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: sbiTheme.colors.background
      }}>
        <AnimatedComponent variant={animationVariants.fadeInScale}>
          <div style={{
            fontSize: sbiTheme.typography.fontSize.xl,
            color: sbiTheme.colors.primary,
            fontWeight: sbiTheme.typography.fontWeight.semibold
          }}>
            Loading dashboard...
          </div>
        </AnimatedComponent>
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.floatingBackground}>
        {floatingShapes.map(shape => (
          <div
            key={shape.id}
            style={{
              ...styles.floatingShape,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              top: shape.top !== undefined ? `${shape.top}%` : 'auto',
              bottom: shape.bottom !== undefined ? `${shape.bottom}%` : 'auto',
              left: shape.left !== undefined ? `${shape.left}%` : 'auto',
              right: shape.right !== undefined ? `${shape.right}%` : 'auto',
              background: `radial-gradient(circle, ${shape.color}08 0%, transparent 70%)`,
              transform: `translateY(${getParallaxValue(shape.speed)}px)`,
              transitionProperty: 'transform',
              transitionDuration: '0.1s',
              transitionTimingFunction: 'ease-out',
            }}
          />
        ))}
      </div>

      <div style={styles.scrollIndicator}>
        {[0, 1, 2, 3].map((dot, index) => (
          <div
            key={index}
            style={{
              ...styles.scrollDot,
              ...(Math.floor(scrollY / 300) === index && styles.scrollDotActive),
              transform: `scale(${Math.floor(scrollY / 300) === index ? 1.5 : 1}) translateY(${getParallaxValue(0.1 * index)}px)`,
            }}
          />
        ))}
      </div>

      <button
        style={styles.floatButton}
        onClick={scrollToTop}
        title="Scroll to top"
      >
        <ChevronUpIcon width={24} height={24} />
      </button>

      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
      />
      
      <div style={styles.mainContent}>
        <div style={styles.contentArea}>
          <Routes>
            <Route
              index
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <DashboardHome
                    user={user}
                    accounts={accounts}
                    setAccounts={setAccounts}
                    beneficiaries={beneficiaries}
                  />
                </ScrollFloatContainer>
              }
            />
            <Route
              path="accounts"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Accounts</h1>
                      <p style={styles.pageSubtitle}>Manage your bank accounts and view balances</p>
                    </div>
                    <Accounts accounts={accounts} />
                  </div>
                </ScrollFloatContainer>
              }
            />
            <Route
              path="transfer"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Fund Transfer</h1>
                      <p style={styles.pageSubtitle}>Transfer money securely to beneficiaries</p>
                    </div>
                    <div style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '2rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb',
                      maxWidth: '600px',
                      margin: '0 auto'
                    }}>
                      <DashboardHome
                        user={user}
                        accounts={accounts}
                        setAccounts={setAccounts}
                        beneficiaries={beneficiaries}
                      />
                    </div>
                  </div>
                </ScrollFloatContainer>
              }
            />
            <Route
              path="bills"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Bill Payments</h1>
                      <p style={styles.pageSubtitle}>Pay your utility bills and services</p>
                    </div>
                    <BillPayment user={user} />
                  </div>
                </ScrollFloatContainer>
              }
            />
            <Route
              path="reports"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Transaction History</h1>
                      <p style={styles.pageSubtitle}>View and download your transaction reports</p>
                    </div>
                    <Reports user={user} />
                  </div>
                </ScrollFloatContainer>
              }
            />
            <Route
              path="trade"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Trade Finance</h1>
                      <p style={styles.pageSubtitle}>Manage letters of credit and guarantees</p>
                    </div>
                    <TradeFinance user={user} />
                  </div>
                </ScrollFloatContainer>
              }
            />
            <Route
              path="beneficiaries"
              element={
                <ScrollFloatContainer scrollY={scrollY}>
                  <div>
                    <div style={styles.pageHeader}>
                      <h1 style={styles.pageTitle}>Beneficiaries</h1>
                      <p style={styles.pageSubtitle}>Manage your saved beneficiaries</p>
                    </div>
                    <BeneficiariesManagement user={user} />
                  </div>
                </ScrollFloatContainer>
              }
            />
          </Routes>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .float-on-scroll {
          animation-name: float;
          animation-duration: 6s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        .pulse-on-scroll {
          animation-name: gentlePulse;
          animation-duration: 4s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${sbiTheme.colors.gray100};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${sbiTheme.colors.primary}, ${sbiTheme.colors.secondary});
          border-radius: 4px;
          transition-property: background, transform;
          transition-duration: 0.3s;
          transitionTimingFunction: ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, ${sbiTheme.colors.primaryLight}, ${sbiTheme.colors.secondaryLight});
          transform: scale(1.1);
        }
        
        ::selection {
          background: ${sbiTheme.colors.primary}40;
          color: ${sbiTheme.colors.primaryDark};
        }
        
        *:focus {
          outline: 2px solid ${sbiTheme.colors.primary}60;
          outline-offset: 2px;
        }

        .animate-spin {
          animation-name: spin;
          animation-duration: 1s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;