import React, { useState, useMemo, useEffect } from 'react';

// Heroicons imports
import {
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  DocumentChartBarIcon,
  BanknotesIcon,
  SparklesIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// Heroicons solid variants
import {
  ChartBarIcon as ChartBarSolid,
  DocumentTextIcon as DocumentTextSolid,
  CheckCircleIcon as CheckCircleSolid,
  ClockIcon as ClockSolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
  BanknotesIcon as BanknotesSolid,
  SparklesIcon as SparklesSolid,
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
    stats: 'linear-gradient(135deg, #004687 0%, #0066b3 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(0, 70, 135, 0.15)',
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
    ease: {
      out: 'cubic-bezier(0.4, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    transitions: {
      spring: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      elastic: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
};

// Enhanced Card Component with Glass Morphism
const Card = ({ children, className = '', hoverable = false, glass = false, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const styles = {
    card: {
      background: glass ? sbiTheme.gradients.glass : sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      boxShadow: isHovered && hoverable ? sbiTheme.shadows.lg : sbiTheme.shadows.base,
      border: glass ? '1px solid rgba(255, 255, 255, 0.2)' : `1px solid ${sbiTheme.colors.border}`,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.transitions.spring}`,
      backdropFilter: glass ? 'blur(20px)' : 'none',
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      opacity: isVisible ? 1 : 0,
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

// Enhanced Button Component with Micro-interactions
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
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.transitions.spring}`,
      opacity: disabled ? 0.6 : 1,
      transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.02)' : 'scale(1)',
      position: 'relative',
      overflow: 'hidden',
      ...getButtonStyles(variant, size),
    },
    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: `2px solid transparent`,
      borderTop: `2px solid currentColor`,
      borderRadius: '50%',
      animation: `spin 1s linear infinite`,
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
        boxShadow: isHovered ? sbiTheme.shadows.glow : sbiTheme.shadows.sm,
      },
      secondary: {
        background: sbiTheme.colors.white,
        color: sbiTheme.colors.primary,
        border: `1px solid ${sbiTheme.colors.primary}`,
        boxShadow: isHovered ? sbiTheme.shadows.md : sbiTheme.shadows.sm,
      },
      ghost: {
        background: 'transparent',
        color: sbiTheme.colors.textPrimary,
        border: `1px solid ${sbiTheme.colors.border}`,
      },
      success: {
        background: sbiTheme.gradients.success,
        color: sbiTheme.colors.white,
        boxShadow: isHovered ? sbiTheme.shadows.glow : sbiTheme.shadows.sm,
      },
      danger: {
        background: sbiTheme.colors.error,
        color: sbiTheme.colors.white,
        boxShadow: isHovered ? sbiTheme.shadows.md : sbiTheme.shadows.sm,
      },
      glass: {
        background: sbiTheme.gradients.glass,
        color: sbiTheme.colors.white,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
      },
    };

    return { ...sizeStyles[size], ...variantStyles[variant] };
  }

  const createRipple = (event) => {
    if (!animated) return;
    
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = `ripple ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`;
    
    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  return (
    <button
      style={styles.button}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={(e) => createRipple(e)}
      {...props}
    >
      {loading && <div style={styles.loadingSpinner} />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon 
          width={20} 
          height={20} 
          style={{
            transition: `transform ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
            transform: isHovered ? 'translateX(-2px)' : 'none'
          }} 
        />
      )}
      {!loading && children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon 
          width={20} 
          height={20} 
          style={{
            transition: `transform ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
            transform: isHovered ? 'translateX(2px)' : 'none'
          }} 
        />
      )}
    </button>
  );
};

// Enhanced Stat Card with Entrance Animations
const StatCard = ({ title, value, change, icon: Icon, trend = 'up', highlight = false, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const styles = {
    card: {
      background: highlight ? sbiTheme.gradients.primary : sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      border: `1px solid ${sbiTheme.colors.border}`,
      boxShadow: isHovered ? sbiTheme.shadows.lg : sbiTheme.shadows.sm,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.transitions.spring}`,
      position: 'relative',
      overflow: 'hidden',
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      opacity: isVisible ? 1 : 0,
      cursor: 'pointer',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: sbiTheme.spacing.sm,
      position: 'relative',
      zIndex: 2,
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
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
    },
    title: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      margin: '0 0 0.5rem 0',
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
    },
    value: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
      lineHeight: 1,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
    },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : (trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.error),
      fontWeight: sbiTheme.typography.fontWeight.medium,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100px',
      height: '100px',
      background: highlight ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,70,135,0.05) 0%, transparent 70%)',
      borderRadius: '50%',
      transform: isHovered ? 'scale(1.5)' : 'scale(1)',
      transition: `transform ${sbiTheme.animations.duration.slow} ${sbiTheme.animations.ease.out}`,
    },
  };

  return (
    <Card 
      hoverable 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={styles.backgroundPattern}></div>
      <div style={styles.header}>
        <div>
          <h4 style={styles.title}>{title}</h4>
          <h3 style={styles.value}>{value}</h3>
          {change && (
            <div style={styles.change}>
              {trend === 'up' ? '↗' : '↘'} {change}
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

// Animated Progress Bar Component
const ProgressBar = ({ value, max = 100, color = sbiTheme.colors.primary, height = 8, animated = true }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setProgress(value), 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(value);
    }
  }, [value, animated]);

  const styles = {
    container: {
      width: '100%',
      height: `${height}px`,
      backgroundColor: sbiTheme.colors.gray200,
      borderRadius: sbiTheme.borderRadius.full,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: color,
      borderRadius: sbiTheme.borderRadius.full,
      width: `${progress}%`,
      transition: `width ${sbiTheme.animations.duration.slow} ${sbiTheme.animations.ease.out}`,
      position: 'relative',
    },
    shimmer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'shimmer 2s infinite',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.progress}>
        {animated && <div style={styles.shimmer}></div>}
      </div>
    </div>
  );
};

const Reports = ({ user, filters = {} }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(filters.filter || 'all');
  const [dateRange, setDateRange] = useState(filters.dateRange || '30d');
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch transactions from the database
  const fetchTransactions = async () => {
    if (!user?.user_id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/reports/${user.user_id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTransactions(data);
        console.log(`Fetched ${data.length} transactions from database`);
      } else {
        console.warn('Unexpected response format:', data);
        setTransactions([]);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch transactions on component mount and when user changes
  useEffect(() => {
    fetchTransactions();
  }, [user?.user_id]);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTransactions();
  };

  // Memoized calculations for better performance
  const { filteredTransactions, totalAmount, transactionCount, statusCounts, analytics } = useMemo(() => {
    const allTransactions = Array.isArray(transactions) ? transactions : [];
    
    console.log('Processing transactions:', allTransactions.length);

    // Filter transactions based on current filter and search
    const filtered = allTransactions.filter(tx => {
      if (!tx) return false;
      
      // Status filter
      if (filter !== 'all') {
        const txStatus = (tx.status || '').toLowerCase();
        const filterStatus = filter.toLowerCase();
        
        // Handle status variations
        if (filterStatus === 'success' && !['success', 'completed'].includes(txStatus)) return false;
        if (filterStatus === 'pending' && txStatus !== 'pending') return false;
        if (filterStatus === 'failed' && !['failed', 'rejected'].includes(txStatus)) return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesDescription = (tx.to_beneficiary || tx.description || '').toLowerCase().includes(query);
        const matchesAmount = (tx.amount?.toString() || '').includes(query);
        const matchesId = (tx.transaction_id || tx.id || '').toString().toLowerCase().includes(query);
        const matchesAccount = (tx.from_account || tx.account_number || '').toString().includes(query);
        
        if (!matchesDescription && !matchesAmount && !matchesId && !matchesAccount) return false;
      }

      // Amount range filter
      const amount = parseFloat(tx.amount) || 0;
      if (amountRange.min && amount < parseFloat(amountRange.min)) return false;
      if (amountRange.max && amount > parseFloat(amountRange.max)) return false;
      
      return true;
    });

    // Calculate total amount from ALL transactions (not just filtered)
    const total = allTransactions.reduce((sum, tx) => {
      return sum + (parseFloat(tx?.amount) || 0);
    }, 0);

    // Calculate status counts from ALL transactions
    const statusCounts = {
      success: allTransactions.filter(tx => {
        const status = (tx.status || '').toLowerCase();
        return status === 'success' || status === 'completed';
      }).length,
      pending: allTransactions.filter(tx => {
        const status = (tx.status || '').toLowerCase();
        return status === 'pending';
      }).length,
      failed: allTransactions.filter(tx => {
        const status = (tx.status || '').toLowerCase();
        return status === 'failed' || status === 'rejected';
      }).length,
      total: allTransactions.length
    };

    // Analytics data with safe calculations
    const analytics = {
      averageAmount: allTransactions.length > 0 ? total / allTransactions.length : 0,
      largestTransaction: allTransactions.length > 0 ? 
        Math.max(...allTransactions.map(tx => parseFloat(tx.amount) || 0)) : 0,
      successRate: allTransactions.length > 0 ? 
        (statusCounts.success / allTransactions.length) * 100 : 0,
      monthlyTrend: calculateMonthlyTrend(allTransactions)
    };

    return {
      filteredTransactions: filtered,
      totalAmount: total,
      transactionCount: allTransactions.length,
      statusCounts,
      analytics
    };
  }, [transactions, filter, searchQuery, amountRange]);

  // Enhanced sort function
  const sortedTransactions = useMemo(() => {
    const sortableItems = [...filteredTransactions];
    
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle different data types
        if (sortConfig.key === 'created_at' || sortConfig.key === 'date') {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        } else if (sortConfig.key === 'amount') {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else {
          // String comparison
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableItems;
  }, [filteredTransactions, sortConfig]);

  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  // Helper function for monthly trend
  function calculateMonthlyTrend(transactions) {
    const monthlyData = {};
    transactions.forEach(tx => {
      let date;
      
      // Try different date fields
      if (tx.created_at) {
        date = new Date(tx.created_at);
      } else if (tx.transaction_date) {
        date = new Date(tx.transaction_date);
      } else if (tx.date) {
        date = new Date(tx.date);
      } else {
        return; // Skip if no date found
      }
      
      if (isNaN(date.getTime())) return; // Skip invalid dates
      
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += parseFloat(tx.amount) || 0;
    });
    return monthlyData;
  }

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleExport = async () => {
    if (filteredTransactions.length === 0) {
      alert('No transactions to export.');
      return;
    }

    setIsExporting(true);
    setTimeout(() => {
      const csvContent = generateCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sbi-transaction-report-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      setIsExporting(false);
    }, 1000);
  };

  const generateCSV = () => {
    const headers = ['Date', 'Time', 'Description', 'From Account', 'To Account', 'Amount', 'Status', 'Transaction ID', 'Reference'];
    
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => {
        const date = tx?.created_at ? new Date(tx.created_at) : new Date();
        return [
          `"${date.toLocaleDateString()}"`,
          `"${date.toLocaleTimeString()}"`,
          `"${tx?.to_beneficiary || 'Fund Transfer'}"`,
          `"${tx?.from_account ? `****${String(tx.from_account).slice(-4)}` : 'N/A'}"`,
          `"${tx?.to_account_id ? `****${String(tx.to_account_id).slice(-4)}` : 'N/A'}"`,
          `"${(parseFloat(tx?.amount) || 0).toLocaleString('en-IN')}"`,
          `"${tx?.status || 'Pending'}"`,
          `"${tx?.transaction_id || 'N/A'}"`,
          `"${tx?.reference_number || 'N/A'}"`
        ].join(',');
      })
    ].join('\n');

    return csvContent;
  };

  const clearAllFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setAmountRange({ min: '', max: '' });
    setSortConfig({ key: 'created_at', direction: 'desc' });
    setCurrentPage(1);
  };

  const hasActiveFilters = filter !== 'all' || searchQuery || amountRange.min || amountRange.max;

  // Enhanced Styles with Hero UI patterns and animations
  const styles = {
    container: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      boxShadow: sbiTheme.shadows.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      overflow: 'hidden',
      width: 1530,
      fontFamily: sbiTheme.typography.fontFamily,
      animation: `${sbiTheme.animations.duration.slow} slideInUp ${sbiTheme.animations.ease.out}`,
    },
    header: {
      background: sbiTheme.gradients.dark,
      color: sbiTheme.colors.white,
      padding: sbiTheme.spacing.xl,
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
        radial-gradient(circle at 90% 10%, rgba(255, 106, 0, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 10% 90%, rgba(0, 166, 81, 0.1) 0%, transparent 50%)
      `,
      animation: `pulse ${sbiTheme.animations.duration.slower} infinite alternate`,
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.lg,
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      marginBottom: sbiTheme.spacing.xs,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    subtitle: {
      fontSize: sbiTheme.typography.fontSize.base,
      opacity: 0.9,
      margin: 0,
      fontWeight: sbiTheme.typography.fontWeight.normal,
    },
    headerActions: {
      display: 'flex',
      gap: sbiTheme.spacing.sm,
      alignItems: 'center',
    },
    content: {
      padding: sbiTheme.spacing.xl,
    },
    controlsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.lg,
      alignItems: 'end',
    },
    searchBox: {
      position: 'relative',
      gridColumn: '1 / -1',
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1rem 0.875rem 3rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      outline: 'none',
      boxShadow: sbiTheme.shadows.sm,
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.xs,
    },
    filterLabel: {
      fontSize: sbiTheme.typography.fontSize.xs,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.xs,
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    select: {
      padding: '0.875rem 1rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      cursor: 'pointer',
      outline: 'none',
      boxShadow: sbiTheme.shadows.sm,
    },
    input: {
      padding: '0.875rem 1rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      outline: 'none',
      boxShadow: sbiTheme.shadows.sm,
    },
    advancedFilters: {
      gridColumn: '1 / -1',
      background: sbiTheme.colors.gray50,
      padding: sbiTheme.spacing.lg,
      borderRadius: sbiTheme.borderRadius.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      animation: `${sbiTheme.animations.duration.normal} slideInDown ${sbiTheme.animations.ease.out}`,
    },
    advancedHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sbiTheme.spacing.md,
    },
    amountRangeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: sbiTheme.spacing.md,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    analyticsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    analyticsCard: {
      background: sbiTheme.gradients.light,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      position: 'relative',
      overflow: 'hidden',
    },
    analyticsTitle: {
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.primary,
      marginBottom: sbiTheme.spacing.sm,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    analyticsValue: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: sbiTheme.colors.primary,
      marginBottom: sbiTheme.spacing.sm,
    },
    filterInfo: {
      background: 'rgba(255, 193, 7, 0.1)',
      border: `1px solid rgba(255, 193, 7, 0.3)`,
      borderRadius: sbiTheme.borderRadius.lg,
      padding: sbiTheme.spacing.md,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.sm,
      animation: `${sbiTheme.animations.duration.normal} bounceIn ${sbiTheme.animations.ease.out}`,
    },
    filterInfoText: {
      color: sbiTheme.colors.warning,
      fontSize: sbiTheme.typography.fontSize.sm,
      margin: 0,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    tableContainer: {
      borderRadius: sbiTheme.borderRadius.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
      overflow: 'hidden',
      marginBottom: sbiTheme.spacing.lg,
      boxShadow: sbiTheme.shadows.sm,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: sbiTheme.typography.fontSize.sm,
    },
    tableHeader: {
      background: sbiTheme.gradients.light,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
    },
    tableHeaderCell: {
      padding: '1rem 1.25rem',
      textAlign: 'left',
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.primary,
      fontSize: sbiTheme.typography.fontSize.xs,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      transition: `all ${sbiTheme.animations.duration.fast} ${sbiTheme.animations.ease.out}`,
      userSelect: 'none',
    },
    sortableHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: `all ${sbiTheme.animations.duration.fast} ${sbiTheme.animations.ease.out}`,
    },
    tableCell: {
      padding: '1rem 1.25rem',
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      color: sbiTheme.colors.textPrimary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      transition: `all ${sbiTheme.animations.duration.fast} ${sbiTheme.animations.ease.out}`,
    },
    tableRow: {
      transition: `all ${sbiTheme.animations.duration.fast} ${sbiTheme.animations.ease.out}`,
      animation: `${sbiTheme.animations.duration.normal} fadeInUp ${sbiTheme.animations.ease.out}`,
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
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
    },
    statusSuccess: {
      background: 'rgba(0, 166, 81, 0.1)',
      color: sbiTheme.colors.success,
      border: `1px solid rgba(0, 166, 81, 0.2)`,
    },
    statusPending: {
      background: 'rgba(240, 173, 78, 0.1)',
      color: sbiTheme.colors.warning,
      border: `1px solid rgba(240, 173, 78, 0.2)`,
    },
    statusFailed: {
      background: 'rgba(217, 83, 79, 0.1)',
      color: sbiTheme.colors.error,
      border: `1px solid rgba(217, 83, 79, 0.2)`,
    },
    amount: {
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      fontSize: sbiTheme.typography.fontSize.sm,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.md,
      marginBottom: sbiTheme.spacing.lg,
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    pageButton: {
      padding: '0.5rem 0.75rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.md,
      cursor: 'pointer',
      fontSize: sbiTheme.typography.fontSize.sm,
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      minWidth: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activePage: {
      background: sbiTheme.colors.primary,
      color: sbiTheme.colors.white,
      borderColor: sbiTheme.colors.primary,
      transform: 'scale(1.05)',
      boxShadow: sbiTheme.shadows.sm,
    },
    exportSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.md,
      paddingTop: sbiTheme.spacing.lg,
      borderTop: `1px solid ${sbiTheme.colors.border}`,
    },
    exportControls: {
      display: 'flex',
      gap: sbiTheme.spacing.md,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    resultsCount: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
    emptyState: {
      textAlign: 'center',
      padding: sbiTheme.spacing['3xl'],
      color: sbiTheme.colors.textSecondary,
      animation: `${sbiTheme.animations.duration.slow} fadeIn ${sbiTheme.animations.ease.out}`,
    },
    emptyIcon: {
      width: '80px',
      height: '80px',
      color: sbiTheme.colors.gray400,
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.lg,
      animation: `float 3s ease-in-out infinite`,
    },
    emptyTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      marginBottom: sbiTheme.spacing.sm,
      color: sbiTheme.colors.textPrimary,
    },
    emptyText: {
      fontSize: sbiTheme.typography.fontSize.base,
      marginBottom: sbiTheme.spacing.lg,
      lineHeight: '1.5',
      maxWidth: '400px',
      margin: '0 auto',
    },
    refreshButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: sbiTheme.colors.white,
      padding: '0.5rem',
      borderRadius: sbiTheme.borderRadius.lg,
      cursor: 'pointer',
      transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: isRefreshing ? 'rotate(180deg)' : 'rotate(0)',
    },
    loadingContainer: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing['3xl'],
      textAlign: 'center',
      boxShadow: sbiTheme.shadows.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
    },
    loadingSpinner: {
      width: '48px',
      height: '48px',
      border: `3px solid ${sbiTheme.colors.border}`,
      borderTop: `3px solid ${sbiTheme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px',
    },
    errorContainer: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing['3xl'],
      textAlign: 'center',
      boxShadow: sbiTheme.shadows.xl,
      border: `1px solid ${sbiTheme.colors.border}`,
    },
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return { ...styles.statusBadge, ...styles.statusSuccess };
      case 'pending':
        return { ...styles.statusBadge, ...styles.statusPending };
      case 'failed':
      case 'rejected':
        return { ...styles.statusBadge, ...styles.statusFailed };
      default:
        return { ...styles.statusBadge, ...styles.statusPending };
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return <CheckCircleIcon width={12} height={12} />;
      case 'pending':
        return <ClockIcon width={12} height={12} />;
      case 'failed':
      case 'rejected':
        return <ExclamationTriangleIcon width={12} height={12} />;
      default:
        return <ClockIcon width={12} height={12} />;
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronUpDownIcon width={12} height={12} />;
    return sortConfig.direction === 'asc' ? <ChevronUpIcon width={12} height={12} /> : <ChevronDownIcon width={12} height={12} />;
  };

  // Debug info component
  const DebugInfo = () => (
    process.env.NODE_ENV === 'development' && (
      <Card style={{ 
        background: '#e8f4fd', 
        border: '1px solid #b6d7f2',
        marginBottom: '1rem',
        fontSize: '0.75rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Data Status:</strong> 
            Total: {transactionCount} | 
            Filtered: {filteredTransactions.length} |
            Sorted: {sortedTransactions.length} |
            Page: {currentPage} of {totalPages}
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => {
              console.log('All transactions:', transactions);
              console.log('Filtered transactions:', filteredTransactions);
            }}
          >
            Log Data
          </Button>
        </div>
      </Card>
    )
  );

  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <h3 style={{ color: sbiTheme.colors.textPrimary, marginBottom: '10px' }}>
          Loading Transactions...
        </h3>
        <p style={{ color: sbiTheme.colors.textSecondary }}>
          Fetching your transaction history from the database
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <ExclamationTriangleIcon 
          width={48} 
          height={48} 
          style={{ color: sbiTheme.colors.error, margin: '0 auto 20px' }} 
        />
        <h3 style={{ color: sbiTheme.colors.textPrimary, marginBottom: '10px' }}>
          Unable to Load Transactions
        </h3>
        <p style={{ color: sbiTheme.colors.textSecondary, marginBottom: '20px' }}>
          {error}
        </p>
        <Button 
          variant="primary" 
          icon={ArrowPathIcon}
          onClick={handleRefresh}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerBackground}></div>
        <div style={styles.headerContent}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>
              <SparklesSolid width={32} height={32} />
              Advanced Transaction Reports
            </h2>
            <p style={styles.subtitle}>
              Comprehensive analysis with advanced filtering and export capabilities
            </p>
          </div>
          <div style={styles.headerActions}>
            <button 
              style={styles.refreshButton}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh data"
            >
              <ArrowPathIcon 
                width={20} 
                height={20} 
                style={{
                  transition: `transform ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
                  transform: isRefreshing ? 'rotate(180deg)' : 'rotate(0)'
                }} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <DebugInfo />
        
        {/* Controls Section */}
        <div style={styles.controlsSection}>
          <div style={styles.searchBox}>
            <MagnifyingGlassIcon 
              width={16} 
              height={16} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: sbiTheme.colors.gray400,
                transition: `all ${sbiTheme.animations.duration.normal} ${sbiTheme.animations.ease.out}`,
              }} 
            />
            <input
              type="text"
              placeholder="Search by description, amount, transaction ID, or account..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => {
                e.target.style.boxShadow = sbiTheme.shadows.glow;
                e.target.style.borderColor = sbiTheme.colors.primary;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = sbiTheme.shadows.sm;
                e.target.style.borderColor = sbiTheme.colors.border;
              }}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              <CheckCircleIcon width={12} height={12} />
              Status Filter
            </label>
            <select 
              style={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="success">Successful</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              <CalendarIcon width={12} height={12} />
              Time Period
            </label>
            <select 
              style={styles.select}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              <DocumentTextIcon width={12} height={12} />
              Items Per Page
            </label>
            <select 
              style={styles.select}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>

          <Button
            variant="secondary"
            icon={showAdvancedFilters ? ChevronUpIcon : ChevronDownIcon}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            animated={true}
          >
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <Card style={styles.advancedFilters}>
            <div style={styles.advancedHeader}>
              <h4 style={{ margin: 0, color: sbiTheme.colors.primary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FunnelIcon width={16} height={16} />
                Advanced Filters
              </h4>
            </div>
            <div style={styles.amountRangeGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <CurrencyDollarIcon width={12} height={12} />
                  Minimum Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  style={styles.input}
                  value={amountRange.min}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <CurrencyDollarIcon width={12} height={12} />
                  Maximum Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="1000000"
                  style={styles.input}
                  value={amountRange.max}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Statistics Cards */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Total Amount"
            value={`₹${totalAmount.toLocaleString('en-IN')}`}
            change="+12% this month"
            trend="up"
            icon={BanknotesSolid}
            highlight={true}
            delay={100}
          />
          
          <StatCard
            title="Total Transactions"
            value={transactionCount.toString()}
            change="+8% from last month"
            trend="up"
            icon={DocumentTextSolid}
            delay={200}
          />
          
          <StatCard
            title="Successful"
            value={statusCounts.success.toString()}
            change={`${Math.round((statusCounts.success / transactionCount) * 100)}% success rate`}
            trend="up"
            icon={CheckCircleSolid}
            delay={300}
          />
          
          <StatCard
            title="Pending"
            value={statusCounts.pending.toString()}
            change="Awaiting processing"
            trend="neutral"
            icon={ClockSolid}
            delay={400}
          />
        </div>

        {/* Analytics Cards */}
        <div style={styles.analyticsGrid}>
          <Card style={styles.analyticsCard} hoverable delay={500}>
            <div style={styles.analyticsTitle}>
              <ArrowTrendingUpIcon width={16} height={16} />
              Average Transaction
            </div>
            <div style={styles.analyticsValue}>₹{analytics.averageAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
            <ProgressBar value={(analytics.averageAmount / analytics.largestTransaction) * 100} color={sbiTheme.colors.success} />
          </Card>
          
          <Card style={styles.analyticsCard} hoverable delay={600}>
            <div style={styles.analyticsTitle}>
              <ChartBarIcon width={16} height={16} />
              Largest Transaction
            </div>
            <div style={styles.analyticsValue}>₹{analytics.largestTransaction.toLocaleString('en-IN')}</div>
            <ProgressBar value={100} color={sbiTheme.colors.primary} />
          </Card>
          
          <Card style={styles.analyticsCard} hoverable delay={700}>
            <div style={styles.analyticsTitle}>
              <ChartPieIcon width={16} height={16} />
              Success Rate
            </div>
            <div style={styles.analyticsValue}>{analytics.successRate.toFixed(1)}%</div>
            <ProgressBar value={analytics.successRate} color={sbiTheme.colors.success} />
          </Card>
        </div>

        {/* Filter Information */}
        {hasActiveFilters && (
          <div style={styles.filterInfo}>
            <p style={styles.filterInfoText}>
              <InformationCircleIcon width={16} height={16} />
              Showing {filteredTransactions.length} of {transactionCount} transactions
              {filter !== 'all' && ` (${filter} only)`}
              {searchQuery && ` matching "${searchQuery}"`}
              {(amountRange.min || amountRange.max) && ` within specified amount range`}
            </p>
            <Button 
              variant="secondary"
              icon={TrashIcon}
              onClick={clearAllFilters}
              size="sm"
              animated={true}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Pagination */}
        {sortedTransactions.length > 0 && (
          <div style={styles.pagination}>
            <div style={styles.resultsCount}>
              Page {currentPage} of {totalPages} • {sortedTransactions.length} transactions
            </div>
            <div style={styles.paginationControls}>
              <button
                style={styles.pageButton}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                ⟪
              </button>
              <button
                style={styles.pageButton}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ⟨
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    style={{
                      ...styles.pageButton,
                      ...(currentPage === pageNum ? styles.activePage : {})
                    }}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                style={styles.pageButton}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ⟩
              </button>
              <button
                style={styles.pageButton}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                ⟫
              </button>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        {paginatedTransactions.length > 0 ? (
          <>
            <Card style={styles.tableContainer} hoverable>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th 
                      style={styles.tableHeaderCell}
                      onClick={() => handleSort('created_at')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 70, 135, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={styles.sortableHeader}>
                        Date & Time {getSortIcon('created_at')}
                      </div>
                    </th>
                    <th 
                      style={styles.tableHeaderCell}
                      onClick={() => handleSort('to_beneficiary')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 70, 135, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={styles.sortableHeader}>
                        Description {getSortIcon('to_beneficiary')}
                      </div>
                    </th>
                    <th style={styles.tableHeaderCell}>From Account</th>
                    <th style={styles.tableHeaderCell}>To Account</th>
                    <th 
                      style={styles.tableHeaderCell}
                      onClick={() => handleSort('amount')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 70, 135, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={styles.sortableHeader}>
                        Amount {getSortIcon('amount')}
                      </div>
                    </th>
                    <th 
                      style={styles.tableHeaderCell}
                      onClick={() => handleSort('status')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 70, 135, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={styles.sortableHeader}>
                        Status {getSortIcon('status')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((tx, index) => (
                    <tr 
                      key={tx?.transaction_id || index} 
                      style={{
                        ...styles.tableRow,
                        ...(index % 2 === 0 ? { background: sbiTheme.colors.gray50 } : {}),
                        animationDelay: `${index * 50}ms`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 70, 135, 0.03)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = index % 2 === 0 ? sbiTheme.colors.gray50 : 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <td style={styles.tableCell}>
                        {tx?.created_at ? new Date(tx.created_at).toLocaleString() : 'N/A'}
                      </td>
                      <td style={styles.tableCell}>
                        {tx?.to_beneficiary || 'Fund Transfer'}
                        {tx?.reference_number && (
                          <div style={{ fontSize: sbiTheme.typography.fontSize.xs, color: sbiTheme.colors.textSecondary, marginTop: '0.25rem' }}>
                            Ref: {tx.reference_number}
                          </div>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        {tx?.from_account ? `****${String(tx.from_account).slice(-4)}` : 'N/A'}
                      </td>
                      <td style={styles.tableCell}>
                        {tx?.to_account_id ? `****${String(tx.to_account_id).slice(-4)}` : 'N/A'}
                      </td>
                      <td style={{...styles.tableCell, ...styles.amount}}>
                        ₹{(parseFloat(tx?.amount) || 0).toLocaleString('en-IN')}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={getStatusStyle(tx.status)}>
                          {getStatusIcon(tx.status)} {tx?.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            
            {/* Export Section */}
            <div style={styles.exportSection}>
              <div style={styles.exportControls}>
                <select 
                  style={styles.select}
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  disabled={isExporting}
                >
                  <option value="csv">CSV Format</option>
                  <option value="excel">Excel Format</option>
                  <option value="pdf">PDF Format</option>
                </select>
                <Button 
                  variant="primary"
                  icon={ArrowDownTrayIcon}
                  loading={isExporting}
                  onClick={handleExport}
                  disabled={isExporting || filteredTransactions.length === 0}
                  animated={true}
                >
                  Download Report ({filteredTransactions.length} records)
                </Button>
              </div>
              <div style={styles.resultsCount}>
                Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions • Sorted by {sortConfig.key} ({sortConfig.direction})
              </div>
            </div>
          </>
        ) : (
          <Card style={styles.emptyState} hoverable>
            <DocumentChartBarIcon style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No Transactions Found</h3>
            <p style={styles.emptyText}>
              {transactionCount === 0 
                ? "You haven't made any transactions yet. Your transaction history will appear here once you start using your account." 
                : "No transactions match your current search and filter criteria. Try adjusting your filters to see more results."}
            </p>
            {hasActiveFilters && (
              <Button 
                variant="secondary"
                icon={EyeIcon}
                onClick={clearAllFilters}
                animated={true}
              >
                Clear All Filters
              </Button>
            )}
          </Card>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        select:focus, input:focus {
          border-color: ${sbiTheme.colors.primary};
          box-shadow: 0 0 0 3px rgba(0, 70, 135, 0.1);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;