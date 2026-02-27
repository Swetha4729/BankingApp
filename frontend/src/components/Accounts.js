import React, { useState, useEffect } from 'react';

// Heroicons imports
import {
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  InformationCircleIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Heroicons solid variants
import {
  BuildingLibraryIcon as BuildingLibrarySolid,
  CurrencyDollarIcon as CurrencyDollarSolid,
  CheckCircleIcon as CheckCircleSolid,
} from '@heroicons/react/24/solid';

// Theme constants for React styling
const theme = {
  colors: {
    primary: '#004687',
    primaryLight: '#0066b3',
    primaryDark: '#003366',
    secondary: '#ff6a00',
    success: '#00a651',
    warning: '#f0ad4e',
    error: '#d9534f',
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
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
};

// Enhanced Card Component with React styling
const Card = ({ children, hoverable = false, style = {}, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    background: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    boxShadow: isHovered && hoverable ? theme.shadows.lg : theme.shadows.base,
    border: `1px solid ${theme.colors.border}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered && hoverable ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
    ...style,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

// Enhanced Button Component with React styling
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style = {},
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getButtonStyles = () => {
    const sizeStyles = {
      sm: {
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        fontSize: theme.typography.fontSize.base,
      },
      lg: {
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        fontSize: theme.typography.fontSize.lg,
      },
    };

    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #004687 0%, #0066b3 100%)',
        color: theme.colors.white,
        boxShadow: theme.shadows.sm,
        border: 'none',
      },
      secondary: {
        background: theme.colors.white,
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      },
      ghost: {
        background: 'transparent',
        color: theme.colors.textPrimary,
        border: `1px solid ${theme.colors.border}`,
      },
      success: {
        background: 'linear-gradient(135deg, #00a651 0%, #00c569 100%)',
        color: theme.colors.white,
        boxShadow: theme.shadows.sm,
        border: 'none',
      },
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.6 : 1,
    transform: isHovered && !disabled && !loading ? 'translateY(-2px)' : 'translateY(0)',
    ...getButtonStyles(),
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon width={20} height={20} />}
      {loading ? 'Loading...' : children}
      {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
    </button>
  );
};

// Loading Spinner Component with React styling
const LoadingSpinner = ({ size = 16, color = 'currentColor' }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `2px solid transparent`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return <div style={spinnerStyle} />;
};

// Enhanced Account Card Component with React styling
const AccountCard = ({ account, index, showBalance, onToggleBalance }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const cardStyle = {
    background: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: isHovered ? theme.shadows.lg : theme.shadows.sm,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 
      (isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)') : 
      'translateY(20px) scale(0.95)',
  };

  const accountNumber = account?.account_number || 'N/A';
  const balance = Number(account?.balance || 0);
  const status = account?.status || 'active';

  return (
    <Card
      hoverable
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.textPrimary,
            marginBottom: theme.spacing.xs,
          }}>
            {accountNumber}
          </div>
          <div style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
            fontWeight: theme.typography.fontWeight.medium,
          }}>
            Savings Account
          </div>
        </div>
        <span style={{
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          borderRadius: theme.borderRadius.full,
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.semibold,
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: status === 'active' ? 'rgba(0, 166, 81, 0.1)' : 'rgba(217, 83, 79, 0.1)',
          color: status === 'active' ? theme.colors.success : theme.colors.error,
          border: `1px solid ${status === 'active' ? 'rgba(0, 166, 81, 0.2)' : 'rgba(217, 83, 79, 0.2)'}`,
          transition: 'all 0.2s ease',
        }}>
          {status === 'active' ? (
            <CheckCircleIcon width={12} height={12} />
          ) : (
            <ExclamationCircleIcon width={12} height={12} />
          )}
          {status}
        </span>
      </div>

      {/* Balance Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
      }}>
        <div>
          <div style={{ 
            fontSize: theme.typography.fontSize.sm, 
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.xs 
          }}>
            Available Balance
          </div>
          <div style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: showBalance ? theme.colors.textPrimary : theme.colors.textSecondary,
            letterSpacing: showBalance ? 'normal' : '0.2em',
          }}>
            {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '••••••'}
          </div>
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.colors.textSecondary,
            cursor: 'pointer',
            padding: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
            transition: 'all 0.2s ease',
          }}
          onClick={onToggleBalance}
          title={showBalance ? 'Hide balance' : 'Show balance'}
          onMouseEnter={(e) => {
            e.target.style.background = theme.colors.gray100;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          {showBalance ? (
            <EyeSlashIcon width={20} height={20} />
          ) : (
            <EyeIcon width={20} height={20} />
          )}
        </button>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.textSecondary,
        }}>
          Last updated: Just now
        </div>
        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.colors.primary,
              cursor: 'pointer',
              padding: theme.spacing.xs,
              borderRadius: theme.borderRadius.sm,
              transition: 'all 0.2s ease',
            }}
            title="View transactions"
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.gray100;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <CurrencyDollarIcon width={16} height={16} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.colors.primary,
              cursor: 'pointer',
              padding: theme.spacing.xs,
              borderRadius: theme.borderRadius.sm,
              transition: 'all 0.2s ease',
            }}
            title="Account details"
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.gray100;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <InformationCircleIcon width={16} height={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

// Main Accounts Component with React styling
function Accounts({ accounts = [], isPreview = false }) {
  const [showBalance, setShowBalance] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Safe fallback: Ensure accounts is always an array
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = safeAccounts;
    
    if (searchTerm) {
      filtered = filtered.filter(account => 
        account?.account_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account?.account_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAccounts(filtered);
  }, [safeAccounts, searchTerm]);

  const totalBalance = safeAccounts.reduce((sum, acc) => sum + Number(acc?.balance || 0), 0);
  const activeAccounts = safeAccounts.filter(acc => acc?.status === 'active').length;

  // Container Styles
  const containerStyle = {
    background: theme.colors.white,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.xl,
    boxShadow: theme.shadows.base,
    border: `1px solid ${theme.colors.border}`,
    fontFamily: theme.typography.fontFamily,
    margin: isPreview ? 0 : theme.spacing.lg,
  };

  // Header Styles
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  };

  const titleSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const titleStyle = {
    fontSize: isPreview ? theme.typography.fontSize.xl : theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    margin: 0,
  };

  const statsStyle = {
    display: 'flex',
    gap: theme.spacing.lg,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: theme.colors.gray50,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    transition: 'all 0.2s ease',
  };

  const controlsStyle = {
    display: 'flex',
    gap: theme.spacing.sm,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const searchBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    gap: theme.spacing.sm,
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: theme.typography.fontSize.sm,
    minWidth: '200px',
    fontFamily: 'inherit',
  };

  const viewToggleStyle = {
    display: 'flex',
    background: theme.colors.gray100,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
  };

  const viewButtonStyle = (isActive) => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    border: 'none',
    background: isActive ? theme.colors.white : 'transparent',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    transition: 'all 0.2s ease',
    boxShadow: isActive ? theme.shadows.sm : 'none',
  });

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isPreview ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: theme.spacing.lg,
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: theme.spacing['3xl'],
    color: theme.colors.textSecondary,
  };

  const emptyIconStyle = {
    width: '80px',
    height: '80px',
    color: theme.colors.gray400,
    margin: '0 auto',
    marginBottom: theme.spacing.lg,
  };

  const emptyTitleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  };

  const emptyTextStyle = {
    fontSize: theme.typography.fontSize.base,
    marginBottom: theme.spacing.lg,
    lineHeight: '1.5',
  };

  const previewFooterStyle = {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTop: `1px solid ${theme.colors.border}`,
    textAlign: 'center',
  };

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing['3xl'],
    color: theme.colors.textSecondary,
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingContainerStyle}>
          <LoadingSpinner size={24} color={theme.colors.primary} />
          <span style={{ marginLeft: theme.spacing.md }}>Loading accounts...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleSectionStyle}>
          <BuildingLibrarySolid 
            width={32} 
            height={32} 
            style={{ color: theme.colors.primary }} 
          />
          <h2 style={titleStyle}>
            {isPreview ? 'Recent Accounts' : 'Accounts Overview'}
          </h2>
        </div>
        
        <div style={statsStyle}>
          <div style={statStyle}>
            <BuildingLibraryIcon width={16} height={16} />
            {safeAccounts.length} Account{safeAccounts.length !== 1 ? 's' : ''}
          </div>
          <div style={statStyle}>
            <CurrencyDollarIcon width={16} height={16} />
            Total: ₹{totalBalance.toLocaleString('en-IN')}
          </div>
          <div style={statStyle}>
            <CheckCircleIcon width={16} height={16} />
            {activeAccounts} Active
          </div>
        </div>

        {!isPreview && (
          <div style={controlsStyle}>
            <div style={searchBoxStyle}>
              <MagnifyingGlassIcon 
                width={16} 
                height={16} 
                style={{ color: theme.colors.textSecondary }} 
              />
              <input
                type="text"
                placeholder="Search accounts..."
                style={searchInputStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={viewToggleStyle}>
              <button
                style={viewButtonStyle(viewMode === 'grid')}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                style={viewButtonStyle(viewMode === 'list')}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
            
            <Button
              variant="ghost"
              icon={showBalance ? EyeSlashIcon : EyeIcon}
              onClick={() => setShowBalance(!showBalance)}
              size="sm"
            >
              {showBalance ? 'Hide' : 'Show'} Balance
            </Button>

            <Button
              variant="primary"
              icon={PlusIcon}
              size="sm"
            >
              Add Account
            </Button>
          </div>
        )}
      </div>

      {/* Accounts Content */}
      {safeAccounts.length === 0 ? (
        <div style={emptyStateStyle}>
          <BuildingLibraryIcon style={emptyIconStyle} />
          <h3 style={emptyTitleStyle}>No Accounts Found</h3>
          <p style={emptyTextStyle}>
            {isPreview 
              ? "You don't have any accounts linked yet."
              : "You don't have any accounts linked yet. Please add an account or check with your relationship manager."
            }
          </p>
          {!isPreview && (
            <Button
              variant="primary"
              icon={PlusIcon}
            >
              Add New Account
            </Button>
          )}
        </div>
      ) : (
        <div style={gridContainerStyle}>
          {filteredAccounts.slice(0, isPreview ? 3 : undefined).map((account, index) => (
            <AccountCard
              key={account?.account_id || index}
              account={account}
              index={index}
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
          ))}
        </div>
      )}

      {isPreview && safeAccounts.length > 0 && (
        <div style={previewFooterStyle}>
          <Button
            variant="secondary"
            icon={ChevronRightIcon}
            iconPosition="right"
            onClick={() => window.location.href = '/accounts'}
          >
            View All Accounts
          </Button>
        </div>
      )}
    </div>
  );
}

export default Accounts;