import React from 'react';
import { theme } from '../theme';

const Card = ({ children, className = '', style = {} }) => (
  <div 
    style={{
      background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(0, 31, 63, 0.1))',
      borderRadius: theme.borderRadius,
      padding: theme.padding,
      margin: '1rem',
      boxShadow: theme.shadows.card,
      borderLeft: `4px solid ${theme.colors.gradientPinkBlue}`,
      transition: theme.transition,
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
);

export default Card;