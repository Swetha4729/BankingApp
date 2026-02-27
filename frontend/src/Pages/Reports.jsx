import React, { useState, useEffect } from 'react';
import Reports from '../components/Reports';

// Heroicons imports
import {
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TrashIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

// Heroicons solid variants
import {
  ChartBarIcon as ChartBarSolid,
  DocumentTextIcon as DocumentTextSolid,
  CheckCircleIcon as CheckCircleSolid,
  ClockIcon as ClockSolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
} from '@heroicons/react/24/solid';

// Enhanced SBI YONO Business Theme with React Bits principles
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

// Enhanced Card Component
const Card = ({ children, className = '', hoverable = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      boxShadow: isHovered && hoverable ? sbiTheme.shadows.lg : sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

// Enhanced Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props 
}) => {
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
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: disabled ? 0.6 : 1,
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
      danger: {
        background: sbiTheme.colors.error,
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
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon width={20} height={20} />}
      {loading ? 'Loading...' : children}
      {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
    </button>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, icon: Icon, trend = 'up', highlight = false, ...props }) => {
  const styles = {
    card: {
      background: highlight ? sbiTheme.gradients.primary : sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius.xl,
      padding: sbiTheme.spacing.lg,
      border: `1px solid ${sbiTheme.colors.border}`,
      boxShadow: sbiTheme.shadows.sm,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
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
    },
    title: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      margin: '0 0 0.5rem 0',
    },
    value: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      color: highlight ? sbiTheme.colors.white : sbiTheme.colors.textPrimary,
      margin: '0 0 0.25rem 0',
      lineHeight: 1,
    },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: sbiTheme.typography.fontSize.sm,
      color: highlight ? 'rgba(255, 255, 255, 0.9)' : (trend === 'up' ? sbiTheme.colors.success : sbiTheme.colors.error),
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
  };

  return (
    <Card hoverable {...props}>
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

const ReportsPage = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user && user.user_id) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/reports/${user.user_id}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status} - ${r.statusText}`);
        return r.json();
      })
      .then(data => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Reports fetch error:', err);
        setError('We encountered an issue while loading your transaction history. Please check your connection and try again.');
        setTransactions([]);
        setLoading(false);
      });
  };

  // Enhanced Styles with Hero UI patterns
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: sbiTheme.colors.background,
      fontFamily: sbiTheme.typography.fontFamily,
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.xl,
    },
    filtersCard: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing.xl,
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
      marginBottom: sbiTheme.spacing.xl,
    },
    filtersHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sbiTheme.spacing.lg,
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.md,
    },
    filtersTitle: {
      fontSize: sbiTheme.typography.fontSize.xl,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      margin: 0,
    },
    resultsCount: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      background: sbiTheme.colors.gray100,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.md}`,
      borderRadius: sbiTheme.borderRadius.full,
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: sbiTheme.spacing.lg,
      alignItems: 'end',
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
    },
    select: {
      padding: '0.875rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      transition: 'all 0.3s ease',
      fontWeight: sbiTheme.typography.fontWeight.medium,
      outline: 'none',
    },
    input: {
      padding: '0.875rem',
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      background: sbiTheme.colors.white,
      color: sbiTheme.colors.textPrimary,
      transition: 'all 0.3s ease',
      fontWeight: sbiTheme.typography.fontWeight.medium,
      outline: 'none',
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
      width: '60px',
      height: '60px',
      border: `4px solid ${sbiTheme.colors.border}`,
      borderTop: `4px solid ${sbiTheme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: sbiTheme.spacing.lg,
    },
    loadingText: {
      fontSize: sbiTheme.typography.fontSize.lg,
      color: sbiTheme.colors.textSecondary,
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
    errorContainer: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing['3xl'],
      textAlign: 'center',
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
    },
    errorIcon: {
      width: '80px',
      height: '80px',
      color: sbiTheme.colors.error,
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.lg,
    },
    errorTitle: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.error,
      marginBottom: sbiTheme.spacing.md,
    },
    errorText: {
      fontSize: sbiTheme.typography.fontSize.base,
      color: sbiTheme.colors.textSecondary,
      marginBottom: sbiTheme.spacing.xl,
      lineHeight: '1.6',
      maxWidth: '400px',
      margin: '0 auto',
    },
    emptyState: {
      background: sbiTheme.colors.white,
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: sbiTheme.spacing['3xl'],
      textAlign: 'center',
      boxShadow: sbiTheme.shadows.base,
      border: `1px solid ${sbiTheme.colors.border}`,
    },
    emptyIcon: {
      width: '100px',
      height: '100px',
      color: sbiTheme.colors.gray400,
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.lg,
    },
    emptyTitle: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.md,
    },
    emptyText: {
      fontSize: sbiTheme.typography.fontSize.base,
      color: sbiTheme.colors.textSecondary,
      marginBottom: sbiTheme.spacing.xl,
      lineHeight: '1.6',
      maxWidth: '400px',
      margin: '0 auto',
    },
    filterToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      background: 'transparent',
      border: 'none',
      color: sbiTheme.colors.primary,
      cursor: 'pointer',
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
  };

  // Calculate statistics
  const statsData = {
    total: transactions.length,
    completed: transactions.filter(tx => tx.status === 'success' || tx.status === 'completed').length,
    pending: transactions.filter(tx => tx.status === 'pending').length,
    totalAmount: transactions.reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0),
  };

  const filteredTransactions = transactions.filter(tx => {
    // Status filter
    if (filter !== 'all' && tx.status !== filter) return false;
    
    // Date range filter
    if (dateRange.start && tx.created_at) {
      const txDate = new Date(tx.created_at);
      const startDate = new Date(dateRange.start);
      if (txDate < startDate) return false;
    }
    
    if (dateRange.end && tx.created_at) {
      const txDate = new Date(tx.created_at);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      if (txDate > endDate) return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesDescription = tx.description?.toLowerCase().includes(searchLower);
      const matchesBeneficiary = tx.to_beneficiary?.toLowerCase().includes(searchLower);
      const matchesAmount = tx.amount?.toString().includes(searchTerm);
      const matchesId = tx.transaction_id?.toLowerCase().includes(searchLower);
      
      if (!matchesDescription && !matchesBeneficiary && !matchesAmount && !matchesId) {
        return false;
      }
    }
    
    return true;
  });

  const handleRetry = () => {
    fetchTransactions();
  };

  const clearFilters = () => {
    setFilter('all');
    setDateRange({ start: '', end: '' });
    setSearchTerm('');
  };

  const hasActiveFilters = filter !== 'all' || dateRange.start || dateRange.end || searchTerm;

  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.headerBackground}></div>
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>
            <ChartBarSolid width={48} height={48} />
            Transaction Reports
          </h1>
          <p style={styles.pageSubtitle}>
            Comprehensive overview of all your banking transactions with advanced filtering and analytics
          </p>
        </div>
      </div>

      <div style={styles.contentSection}>
        {/* Statistics Cards */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Total Transactions"
            value={statsData.total.toString()}
            change="+12% this month"
            trend="up"
            icon={DocumentTextSolid}
            highlight={true}
          />
          
          <StatCard
            title="Completed"
            value={statsData.completed.toString()}
            change={`${Math.round((statsData.completed / statsData.total) * 100)}% success rate`}
            trend="up"
            icon={CheckCircleSolid}
          />
          
          <StatCard
            title="Pending"
            value={statsData.pending.toString()}
            change="Awaiting processing"
            trend="neutral"
            icon={ClockSolid}
          />
          
          <StatCard
            title="Total Amount"
            value={`₹${statsData.totalAmount.toLocaleString('en-IN')}`}
            change="+8.5% from last month"
            trend="up"
            icon={CurrencyDollarSolid}
          />
        </div>

        {/* Filters Card */}
        <Card hoverable style={styles.filtersCard}>
          <div style={styles.filtersHeader}>
            <h3 style={styles.filtersTitle}>
              <MagnifyingGlassIcon width={24} height={24} style={{ color: sbiTheme.colors.primary }} />
              Filter & Search Transactions
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.lg }}>
              <div style={styles.resultsCount}>
                Showing {filteredTransactions.length} of {transactions.length} transactions
                {hasActiveFilters && ' (filtered)'}
              </div>
              <button 
                style={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FunnelIcon width={16} height={16} />
                {showFilters ? <ChevronUpIcon width={16} height={16} /> : <ChevronDownIcon width={16} height={16} />}
                Filters
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div style={styles.filtersGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <MagnifyingGlassIcon width={12} height={12} style={{ marginRight: '0.25rem' }} />
                  Search
                </label>
                <div style={{ position: 'relative' }}>
                  <MagnifyingGlassIcon 
                    width={16} 
                    height={16} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: sbiTheme.colors.gray400 
                    }} 
                  />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    style={{
                      ...styles.input,
                      paddingLeft: '2.5rem',
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <CheckCircleIcon width={12} height={12} style={{ marginRight: '0.25rem' }} />
                  Status
                </label>
                <select 
                  style={styles.select}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Transactions</option>
                  <option value="success">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <CalendarIcon width={12} height={12} style={{ marginRight: '0.25rem' }} />
                  From Date
                </label>
                <input
                  type="date"
                  style={styles.input}
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <CalendarIcon width={12} height={12} style={{ marginRight: '0.25rem' }} />
                  To Date
                </label>
                <input
                  type="date"
                  style={styles.input}
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>&nbsp;</label>
                <Button
                  variant="secondary"
                  icon={TrashIcon}
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  style={{ opacity: hasActiveFilters ? 1 : 0.6 }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Loading State */}
        {loading && (
          <Card style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading your transaction history...</p>
            <p style={{ ...styles.loadingText, fontSize: sbiTheme.typography.fontSize.sm, opacity: 0.7 }}>
              Please wait while we fetch your latest transactions
            </p>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card style={styles.errorContainer}>
            <ExclamationTriangleIcon style={styles.errorIcon} />
            <h3 style={styles.errorTitle}>Unable to Load Transactions</h3>
            <p style={styles.errorText}>{error}</p>
            <Button 
              variant="primary"
              icon={ArrowPathIcon}
              onClick={handleRetry}
            >
              Try Again
            </Button>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && filteredTransactions.length === 0 && (
          <Card style={styles.emptyState}>
            <DocumentTextIcon style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>
              {transactions.length === 0 ? "No Transactions Found" : "No Matching Transactions"}
            </h3>
            <p style={styles.emptyText}>
              {transactions.length === 0 
                ? "You haven't made any transactions yet. Your transaction history will appear here once you start using your account." 
                : "No transactions match your current search and filter criteria. Try adjusting your filters to see more results."}
            </p>
            {hasActiveFilters && (
              <Button 
                variant="primary"
                icon={EyeIcon}
                onClick={clearFilters}
              >
                Show All Transactions
              </Button>
            )}
          </Card>
        )}

        {/* Reports Component */}
        {!loading && !error && filteredTransactions.length > 0 && (
          <Reports 
            transactions={filteredTransactions} 
            user={user}
            filters={{ filter, dateRange, searchTerm }}
          />
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
      `}</style>
    </div>
  );
};

export default ReportsPage;