import React, { useState } from 'react';

function Transfer({ user, accounts = [], beneficiaries = [], onSuccess }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [transactionType, setTransactionType] = useState('IMPS');
  const [description, setDescription] = useState('');

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
    },
    shadows: {
      sm: '0 4px 12px rgba(0, 0, 0, 0.05)',
      md: '0 8px 32px rgba(0, 0, 0, 0.1)',
      lg: '0 20px 50px rgba(0, 70, 135, 0.15)',
      xl: '0 25px 60px rgba(0, 70, 135, 0.2)',
      glow: '0 0 30px rgba(0, 70, 135, 0.15)',
    },
    borderRadius: {
      sm: '0.5rem',
      base: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  };

  // Safe fallback: Ensure arrays
  const safeAccounts = Array.isArray(accounts) ? accounts : [];
  const safeBeneficiaries = Array.isArray(beneficiaries) ? beneficiaries : [];

  const selectedFromAccount = safeAccounts.find(acc => acc.account_id === parseInt(from));
  const selectedBeneficiary = safeBeneficiaries.find(ben => ben.beneficiary_account_number === to);

  const handleTransfer = async () => {
    if (!from || !to || !amount || !user?.user_id) {
      alert('Please fill all fields');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (selectedFromAccount && parseFloat(selectedFromAccount.balance) < transferAmount) {
      alert('Insufficient balance in selected account');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          from_account_id: parseInt(from), 
          to_account_number: to,
          amount: transferAmount,
          transaction_type: transactionType,
          description: description || `Transfer to ${selectedBeneficiary?.beneficiary_name || 'beneficiary'}`,
          user_id: user.user_id
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      alert('Transfer successful!');
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Clear form on success
      setFrom('');
      setTo('');
      setAmount('');
      setDescription('');
      setTransactionType('IMPS');
      
    } catch (error) {
      alert('Transfer failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced transaction type options
  const transactionTypes = [
    { value: 'IMPS', label: 'IMPS (Instant)', fee: '₹5 + GST', limit: '₹2,00,000', color: sbiTheme.colors.success },
    { value: 'NEFT', label: 'NEFT', fee: 'Free', limit: 'No limit', color: sbiTheme.colors.primary },
    { value: 'RTGS', label: 'RTGS', fee: '₹25 + GST', limit: '₹2,00,000+', color: sbiTheme.colors.secondary },
  ];

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Inter', 'Poppins', 'Roboto', 'Arial', sans-serif",
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      minHeight: '100vh',
    },
    transferCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: sbiTheme.borderRadius['2xl'],
      padding: '3rem',
      boxShadow: sbiTheme.shadows.lg,
      border: '1px solid rgba(255, 255, 255, 0.6)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2.5rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    headerIcon: {
      width: '80px',
      height: '80px',
      borderRadius: sbiTheme.borderRadius.xl,
      background: sbiTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: sbiTheme.colors.white,
      boxShadow: sbiTheme.shadows.md,
      animation: 'iconFloat 3s ease-in-out infinite',
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: sbiTheme.gradients.primary,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      margin: '0 0 0.5rem 0',
      lineHeight: 1.2,
    },
    subtitle: {
      fontSize: '1.25rem',
      color: sbiTheme.colors.textSecondary,
      margin: 0,
      fontWeight: '500',
    },
    formGrid: {
      display: 'grid',
      gap: '2rem',
      marginBottom: '2rem',
    },
    formField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    fieldLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: sbiTheme.colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    fieldIcon: {
      width: '24px',
      height: '24px',
      color: sbiTheme.colors.primary,
    },
    selectContainer: {
      position: 'relative',
    },
    select: {
      width: '100%',
      padding: '1.25rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.8)',
      border: `2px solid ${sbiTheme.colors.gray200}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: '1rem',
      fontWeight: '500',
      color: sbiTheme.colors.textPrimary,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      appearance: 'none',
      backdropFilter: 'blur(10px)',
    },
    selectActive: {
      borderColor: sbiTheme.colors.primary,
      boxShadow: sbiTheme.shadows.glow,
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)',
    },
    selectArrow: {
      position: 'absolute',
      right: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      color: sbiTheme.colors.primary,
      pointerEvents: 'none',
      transition: 'transform 0.3s ease',
    },
    inputContainer: {
      position: 'relative',
    },
    amountInput: {
      width: '100%',
      padding: '1.25rem 1.5rem 1.25rem 3.5rem',
      background: 'rgba(255, 255, 255, 0.8)',
      border: `2px solid ${sbiTheme.colors.gray200}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: '1.5rem',
      fontWeight: '700',
      color: sbiTheme.colors.success,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
    },
    amountInputActive: {
      borderColor: sbiTheme.colors.success,
      boxShadow: sbiTheme.shadows.glow,
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)',
    },
    currencySymbol: {
      position: 'absolute',
      left: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: sbiTheme.colors.success,
    },
    transferButton: {
      width: '100%',
      padding: '1.5rem 2rem',
      background: sbiTheme.gradients.primary,
      border: 'none',
      borderRadius: sbiTheme.borderRadius.lg,
      color: sbiTheme.colors.white,
      fontSize: '1.25rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginTop: '2rem',
      position: 'relative',
      overflow: 'hidden',
    },
    transferButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: sbiTheme.shadows.xl,
      background: sbiTheme.gradients.secondary,
    },
    transferButtonDisabled: {
      background: sbiTheme.colors.gray400,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
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
    loadingSpinner: {
      width: '24px',
      height: '24px',
      border: `3px solid transparent`,
      borderTop: `3px solid ${sbiTheme.colors.white}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    transactionTypeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1rem',
    },
    transactionTypeOption: {
      padding: '1.5rem 1rem',
      border: `2px solid ${sbiTheme.colors.gray200}`,
      borderRadius: sbiTheme.borderRadius.lg,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
    },
    transactionTypeSelected: {
      borderColor: sbiTheme.colors.primary,
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: sbiTheme.shadows.md,
      transform: 'translateY(-3px)',
    },
    transactionTypeLabel: {
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
    },
    transactionTypeDetails: {
      fontSize: '0.875rem',
      color: sbiTheme.colors.textSecondary,
    },
    descriptionInput: {
      width: '100%',
      padding: '1.25rem 1.5rem',
      border: `2px solid ${sbiTheme.colors.gray200}`,
      borderRadius: sbiTheme.borderRadius.lg,
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
    },
    inputFocus: {
      outline: 'none',
      borderColor: sbiTheme.colors.primary,
      boxShadow: sbiTheme.shadows.glow,
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)',
    },
    transferSummary: {
      background: sbiTheme.gradients.light,
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: sbiTheme.borderRadius.xl,
      padding: '2rem',
      marginTop: '2rem',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(20px)',
      animation: 'slideInUp 0.5s ease-out',
    },
    summaryTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: sbiTheme.colors.textPrimary,
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    summaryLabel: {
      fontSize: '1rem',
      color: sbiTheme.colors.textSecondary,
    },
    summaryValue: {
      fontSize: '1rem',
      fontWeight: '600',
      color: sbiTheme.colors.textPrimary,
    },
    summaryAmount: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: sbiTheme.colors.success,
    },
    noBeneficiaries: {
      background: 'rgba(248, 250, 252, 0.8)',
      border: '1px solid rgba(229, 231, 235, 0.8)',
      borderRadius: sbiTheme.borderRadius.xl,
      padding: '2rem',
      textAlign: 'center',
      color: sbiTheme.colors.textSecondary,
      marginTop: '1.5rem',
      backdropFilter: 'blur(10px)',
    },
  };

  // Heroicons as SVG components
  const ArrowsRightLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );

  const BuildingLibraryIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21h15z" />
    </svg>
  );

  const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );

  const CurrencyDollarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );

  const DocumentTextIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );

  const ChatBubbleLeftRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.transferCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <ArrowsRightLeftIcon width={32} height={32} />
          </div>
          <div style={styles.headerText}>
            <h3 style={styles.title}>Fund Transfer</h3>
            <p style={styles.subtitle}>Transfer money securely to any bank account</p>
          </div>
        </div>

        {/* Form */}
        <div style={styles.formGrid}>
          {/* From Account */}
          <div style={styles.formField}>
            <label style={styles.fieldLabel}>
              <BuildingLibraryIcon style={styles.fieldIcon} />
              From Account
            </label>
            <div style={styles.selectContainer}>
              <select 
                value={from} 
                onChange={e => setFrom(e.target.value)}
                onFocus={() => setActiveField('from')}
                onBlur={() => setActiveField(null)}
                style={{
                  ...styles.select,
                  ...(activeField === 'from' && styles.selectActive)
                }}
              >
                <option value="">Select your account</option>
                {safeAccounts.map(account => (
                  <option key={account.account_id} value={account.account_id}>
                    {account.account_number} • ₹{account.balance?.toLocaleString() || '0'}
                  </option>
                ))}
              </select>
              <div style={{
                ...styles.selectArrow,
                transform: activeField === 'from' ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
              }}>▼</div>
            </div>
          </div>

          {/* To Beneficiary */}
          <div style={styles.formField}>
            <label style={styles.fieldLabel}>
              <UserIcon style={styles.fieldIcon} />
              To Beneficiary
            </label>
            <div style={styles.selectContainer}>
              <select 
                value={to} 
                onChange={e => setTo(e.target.value)}
                onFocus={() => setActiveField('to')}
                onBlur={() => setActiveField(null)}
                style={{
                  ...styles.select,
                  ...(activeField === 'to' && styles.selectActive)
                }}
              >
                <option value="">Select beneficiary</option>
                {safeBeneficiaries.length === 0 ? (
                  <option disabled>No beneficiaries available</option>
                ) : (
                  safeBeneficiaries.map(beneficiary => (
                    <option key={beneficiary.beneficiary_id} value={beneficiary.beneficiary_account_number}>
                      {beneficiary.beneficiary_name} • {beneficiary.bank_name}
                    </option>
                  ))
                )}
              </select>
              <div style={{
                ...styles.selectArrow,
                transform: activeField === 'to' ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
              }}>▼</div>
            </div>
          </div>

          {/* Transaction Type */}
          <div style={styles.formField}>
            <label style={styles.fieldLabel}>
              <DocumentTextIcon style={styles.fieldIcon} />
              Transfer Type
            </label>
            <div style={styles.transactionTypeGrid}>
              {transactionTypes.map(type => (
                <div
                  key={type.value}
                  style={{
                    ...styles.transactionTypeOption,
                    ...(transactionType === type.value && styles.transactionTypeSelected),
                    borderColor: transactionType === type.value ? type.color : styles.transactionTypeOption.borderColor
                  }}
                  onClick={() => setTransactionType(type.value)}
                  onMouseEnter={(e) => {
                    if (transactionType !== type.value) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = sbiTheme.shadows.sm;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (transactionType !== type.value) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={styles.transactionTypeLabel}>{type.label}</div>
                  <div style={styles.transactionTypeDetails}>
                    {type.fee} • {type.limit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div style={styles.formField}>
            <label style={styles.fieldLabel}>
              <CurrencyDollarIcon style={styles.fieldIcon} />
              Transfer Amount
            </label>
            <div style={styles.inputContainer}>
              <span style={styles.currencySymbol}>₹</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                onFocus={() => setActiveField('amount')}
                onBlur={() => setActiveField(null)}
                style={{
                  ...styles.amountInput,
                  ...(activeField === 'amount' && styles.amountInputActive)
                }}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Description */}
          <div style={styles.formField}>
            <label style={styles.fieldLabel}>
              <ChatBubbleLeftRightIcon style={styles.fieldIcon} />
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter transaction description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onFocus={() => setActiveField('description')}
              onBlur={() => setActiveField(null)}
              style={{
                ...styles.descriptionInput,
                ...(activeField === 'description' && styles.inputFocus)
              }}
            />
          </div>
        </div>

        {/* Transfer Summary */}
        {(from || to || amount) && (
          <div style={styles.transferSummary}>
            <div style={styles.summaryTitle}>
              <DocumentTextIcon width={20} height={20} />
              Transfer Summary
            </div>
            {from && (
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>From Account:</span>
                <span style={styles.summaryValue}>
                  {selectedFromAccount?.account_number}
                </span>
              </div>
            )}
            {to && (
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>To Beneficiary:</span>
                <span style={styles.summaryValue}>
                  {selectedBeneficiary?.beneficiary_name}
                </span>
              </div>
            )}
            {transactionType && (
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Transfer Type:</span>
                <span style={styles.summaryValue}>
                  {transactionType}
                </span>
              </div>
            )}
            {amount && (
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Amount:</span>
                <span style={styles.summaryAmount}>
                  ₹{parseFloat(amount).toLocaleString('en-IN')}
                </span>
              </div>
            )}
            {selectedFromAccount && amount && (
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Remaining Balance:</span>
                <span style={styles.summaryValue}>
                  ₹{(parseFloat(selectedFromAccount.balance) - parseFloat(amount)).toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Transfer Button */}
        <button 
          onClick={handleTransfer}
          disabled={isLoading || !from || !to || !amount || safeBeneficiaries.length === 0}
          style={{
            ...styles.transferButton,
            ...((isLoading || !from || !to || !amount || safeBeneficiaries.length === 0) && styles.transferButtonDisabled)
          }}
          onMouseEnter={(e) => {
            if (!isLoading && from && to && amount && safeBeneficiaries.length > 0) {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = sbiTheme.shadows.xl;
              e.target.style.background = sbiTheme.gradients.secondary;
              e.target.querySelector('.button-shine').style.left = '100%';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && from && to && amount && safeBeneficiaries.length > 0) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = sbiTheme.gradients.primary;
              e.target.querySelector('.button-shine').style.left = '-100%';
            }
          }}
        >
          <div className="button-shine" style={styles.buttonShine}></div>
          {isLoading ? (
            <>
              <div style={styles.loadingSpinner}></div>
              Processing Transfer...
            </>
          ) : (
            <>
              <ArrowRightIcon width={24} height={24} />
              Transfer Now
            </>
          )}
        </button>

        {/* No Beneficiaries Message */}
        {safeBeneficiaries.length === 0 && (
          <div style={styles.noBeneficiaries}>
            <UserIcon width={24} height={24} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>No beneficiaries added</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              Please add a beneficiary first to make transfers
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        select:focus, input:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default Transfer;