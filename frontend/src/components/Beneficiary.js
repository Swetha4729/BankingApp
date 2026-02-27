import React, { useState } from 'react';
import {
  UserPlusIcon,
  TrashIcon,
  UserIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  UserIcon as UserSolid,
  BuildingLibraryIcon as BuildingLibrarySolid,
  DocumentTextIcon as DocumentTextSolid,
  ShieldCheckIcon as ShieldCheckSolid,
} from '@heroicons/react/24/solid';

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
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: sbiTheme.spacing.sm }}>
          <ArrowPathIcon width={16} height={16} style={{ animation: 'spin 1s linear infinite' }} />
          Processing...
        </div>
      ) : (
        children
      )}
      {Icon && iconPosition === 'right' && <Icon width={20} height={20} />}
    </button>
  );
};

function Beneficiary({ user, beneficiaries = [], onAdd, onDelete }) {
  const [form, setForm] = useState({ 
    beneficiary_name: '', 
    beneficiary_account_number: '', 
    bank_name: '', 
    ifsc_code: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'

  const handleAdd = async () => {
    if (!form.beneficiary_name.trim() || !form.beneficiary_account_number.trim() || 
        !form.bank_name.trim() || !form.ifsc_code.trim()) {
      setMessage('Please fill all fields');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user_id: user.user_id })
      });
      
      if (!response.ok) throw new Error('Failed to add beneficiary');
      
      setForm({ 
        beneficiary_name: '', 
        beneficiary_account_number: '', 
        bank_name: '', 
        ifsc_code: '' 
      });
      
      setMessage('Beneficiary added successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
      
      if (onAdd) onAdd();
    } catch (error) {
      setMessage('Error adding beneficiary');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (beneficiaryId) => {
    if (!window.confirm('Are you sure you want to delete this beneficiary?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/beneficiaries/${beneficiaryId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete beneficiary');
      
      if (onDelete) onDelete();
      setMessage('Beneficiary deleted successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting beneficiary');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const safeBeneficiaries = Array.isArray(beneficiaries) ? beneficiaries : [];

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      background: sbiTheme.gradients.primary,
      color: sbiTheme.colors.white,
      padding: sbiTheme.spacing.xl,
      borderRadius: `${sbiTheme.borderRadius.xl} ${sbiTheme.borderRadius.xl} 0 0`,
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
        radial-gradient(circle at 10% 90%, rgba(0, 166, 81, 0.15) 0%, transparent 50%)
      `,
    },
    headerContent: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.lg,
    },
    headerText: {
      flex: 1,
    },
    headerTitle: {
      fontSize: sbiTheme.typography.fontSize['2xl'],
      fontWeight: sbiTheme.typography.fontWeight.bold,
      marginBottom: sbiTheme.spacing.xs,
      color: sbiTheme.colors.white,
    },
    headerSubtitle: {
      fontSize: sbiTheme.typography.fontSize.sm,
      opacity: 0.9,
      margin: 0,
      color: sbiTheme.colors.white,
    },
    headerBadge: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: sbiTheme.colors.white,
      padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.lg}`,
      borderRadius: sbiTheme.borderRadius.full,
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    content: {
      padding: sbiTheme.spacing.xl,
      background: sbiTheme.colors.background,
    },
    message: {
      padding: sbiTheme.spacing.lg,
      borderRadius: sbiTheme.borderRadius.lg,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.md,
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
    },
    successMessage: {
      background: sbiTheme.colors.success + '15',
      color: sbiTheme.colors.success,
      border: `1px solid ${sbiTheme.colors.success}30`,
    },
    errorMessage: {
      background: sbiTheme.colors.error + '15',
      color: sbiTheme.colors.error,
      border: `1px solid ${sbiTheme.colors.error}30`,
    },
    formCard: {
      marginBottom: sbiTheme.spacing.xl,
    },
    formTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.lg,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
      paddingBottom: sbiTheme.spacing.md,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: sbiTheme.spacing.lg,
      marginBottom: sbiTheme.spacing.lg,
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: sbiTheme.spacing.xs,
    },
    label: {
      fontSize: sbiTheme.typography.fontSize.sm,
      fontWeight: sbiTheme.typography.fontWeight.medium,
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
    },
    input: {
      padding: sbiTheme.spacing.md,
      border: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      transition: 'all 0.2s ease',
      background: sbiTheme.colors.white,
    },
    inputFocus: {
      outline: 'none',
      borderColor: sbiTheme.colors.primary,
      boxShadow: `0 0 0 3px ${sbiTheme.colors.primary}20`,
    },
    listCard: {
      marginBottom: sbiTheme.spacing.lg,
    },
    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sbiTheme.spacing.lg,
    },
    listTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.sm,
    },
    emptyState: {
      textAlign: 'center',
      padding: sbiTheme.spacing['3xl'],
      color: sbiTheme.colors.textSecondary,
    },
    emptyIcon: {
      width: '64px',
      height: '64px',
      background: sbiTheme.colors.gray100,
      borderRadius: sbiTheme.borderRadius.full,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      marginBottom: sbiTheme.spacing.lg,
      color: sbiTheme.colors.gray400,
    },
    emptyTitle: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      marginBottom: sbiTheme.spacing.xs,
      color: sbiTheme.colors.textPrimary,
    },
    emptyDescription: {
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    beneficiaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: sbiTheme.spacing.lg,
      borderBottom: `1px solid ${sbiTheme.colors.border}`,
      transition: 'background-color 0.2s ease',
    },
    beneficiaryInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.lg,
      flex: 1,
    },
    beneficiaryIcon: {
      width: '48px',
      height: '48px',
      background: sbiTheme.gradients.primary,
      borderRadius: sbiTheme.borderRadius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      flexShrink: 0,
    },
    beneficiaryDetails: {
      flex: 1,
      minWidth: 0,
    },
    beneficiaryName: {
      fontSize: sbiTheme.typography.fontSize.lg,
      fontWeight: sbiTheme.typography.fontWeight.semibold,
      color: sbiTheme.colors.textPrimary,
      marginBottom: sbiTheme.spacing.xs,
    },
    beneficiaryMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: sbiTheme.spacing.lg,
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
    },
    footer: {
      padding: sbiTheme.spacing.lg,
      background: sbiTheme.colors.gray50,
      borderTop: `1px solid ${sbiTheme.colors.border}`,
      borderRadius: `0 0 ${sbiTheme.borderRadius.xl} ${sbiTheme.borderRadius.xl}`,
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: sbiTheme.typography.fontSize.sm,
      color: sbiTheme.colors.textSecondary,
    },
    securityInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.lg,
    },
    securityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: sbiTheme.spacing.xs,
    },
  };

  return (
    <div style={styles.container}>
      <Card hoverable style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBackground}></div>
          <div style={styles.headerContent}>
            <div style={styles.headerText}>
              <h1 style={styles.headerTitle}>Manage Beneficiaries</h1>
              <p style={styles.headerSubtitle}>
                Add and manage your payment recipients securely
              </p>
            </div>
            <div style={styles.headerBadge}>
              <UserIcon width={16} height={16} />
              {safeBeneficiaries.length} Saved Beneficiaries
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Message */}
          {message && (
            <div style={{
              ...styles.message,
              ...(messageType === 'success' ? styles.successMessage : styles.errorMessage)
            }}>
              {messageType === 'success' ? (
                <CheckCircleIcon width={20} height={20} />
              ) : (
                <ExclamationTriangleIcon width={20} height={20} />
              )}
              {message}
            </div>
          )}

          {/* Add Beneficiary Form */}
          <Card hoverable style={styles.formCard}>
            <h3 style={styles.formTitle}>
              <UserPlusIcon width={24} height={24} />
              Add New Beneficiary
            </h3>
            
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="beneficiary_name">
                  <UserSolid width={16} height={16} />
                  Beneficiary Name
                </label>
                <input
                  id="beneficiary_name"
                  type="text"
                  value={form.beneficiary_name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter full name as per bank records"
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="beneficiary_account_number">
                  <DocumentTextSolid width={16} height={16} />
                  Account Number
                </label>
                <input
                  id="beneficiary_account_number"
                  type="text"
                  value={form.beneficiary_account_number}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter account number"
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="bank_name">
                  <BuildingLibrarySolid width={16} height={16} />
                  Bank Name
                </label>
                <input
                  id="bank_name"
                  type="text"
                  value={form.bank_name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter bank name"
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="ifsc_code">
                  <ShieldCheckSolid width={16} height={16} />
                  IFSC Code
                </label>
                <input
                  id="ifsc_code"
                  type="text"
                  value={form.ifsc_code}
                  onChange={handleChange}
                  style={{ ...styles.input, textTransform: 'uppercase' }}
                  placeholder="Enter IFSC code"
                  onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleAdd}
                disabled={isSubmitting}
                icon={PlusIcon}
                loading={isSubmitting}
              >
                Add Beneficiary
              </Button>
            </div>
          </Card>

          {/* Beneficiaries List */}
          <Card hoverable style={styles.listCard}>
            <div style={styles.listHeader}>
              <h3 style={styles.listTitle}>
                <UserIcon width={24} height={24} />
                Saved Beneficiaries
              </h3>
              <div style={{
                background: sbiTheme.colors.gray100,
                color: sbiTheme.colors.textSecondary,
                padding: `${sbiTheme.spacing.xs} ${sbiTheme.spacing.lg}`,
                borderRadius: sbiTheme.borderRadius.full,
                fontSize: sbiTheme.typography.fontSize.sm,
                fontWeight: sbiTheme.typography.fontWeight.medium,
              }}>
                {safeBeneficiaries.length} of 20
              </div>
            </div>
            
            {safeBeneficiaries.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <UserIcon width={32} height={32} />
                </div>
                <h4 style={styles.emptyTitle}>No Beneficiaries Added</h4>
                <p style={styles.emptyDescription}>
                  Add your first beneficiary to start making quick transfers
                </p>
              </div>
            ) : (
              <div style={{ borderRadius: sbiTheme.borderRadius.lg, overflow: 'hidden', border: `1px solid ${sbiTheme.colors.border}` }}>
                {safeBeneficiaries.map((b, index) => (
                  <div 
                    key={b?.beneficiary_id || index} 
                    style={styles.beneficiaryItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = sbiTheme.colors.gray50;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = sbiTheme.colors.white;
                    }}
                  >
                    <div style={styles.beneficiaryInfo}>
                      <div style={styles.beneficiaryIcon}>
                        <UserSolid width={24} height={24} />
                      </div>
                      <div style={styles.beneficiaryDetails}>
                        <h4 style={styles.beneficiaryName}>
                          {b?.beneficiary_name || 'N/A'}
                        </h4>
                        <div style={styles.beneficiaryMeta}>
                          <span style={styles.metaItem}>
                            <DocumentTextIcon width={16} height={16} />
                            ****{b?.beneficiary_account_number?.slice(-4) || 'N/A'}
                          </span>
                          <span style={styles.metaItem}>
                            <BuildingLibraryIcon width={16} height={16} />
                            {b?.bank_name || 'N/A'}
                          </span>
                          <span style={styles.metaItem}>
                            <ShieldCheckIcon width={16} height={16} />
                            {b?.ifsc_code || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      icon={TrashIcon}
                      onClick={() => handleDelete(b.beneficiary_id)}
                      style={{ flexShrink: 0 }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.securityInfo}>
              <div style={styles.securityItem}>
                <ShieldCheckIcon width={16} height={16} style={{ color: sbiTheme.colors.success }} />
                <span>Secure & Encrypted</span>
              </div>
              <div style={styles.securityItem}>
                <CheckCircleIcon width={16} height={16} style={{ color: sbiTheme.colors.success }} />
                <span>IFSC Verified</span>
              </div>
            </div>
            <div style={{ fontSize: sbiTheme.typography.fontSize.sm, color: sbiTheme.colors.textSecondary }}>
              Maximum 20 beneficiaries allowed
            </div>
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus {
          outline: none;
          border-color: ${sbiTheme.colors.primary};
          box-shadow: 0 0 0 3px ${sbiTheme.colors.primary}20;
        }
      `}</style>
    </div>
  );
}

export default Beneficiary;