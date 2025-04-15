import React from 'react';
import { useTranslation } from 'react-i18next';

const loadingContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  gap: '10px'
} as const;

const spinnerStyle = {
  width: '20px',
  height: '20px',
  border: '3px solid #f3f3f3',
  borderTop: '3px solid #18B16F',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
} as const;

const LoadingComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div style={loadingContainerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
      <span>{t('common.loading')}</span>
    </div>
  );
};

export default LoadingComponent;