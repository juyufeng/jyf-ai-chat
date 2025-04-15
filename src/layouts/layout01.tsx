import React, { CSSProperties, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface Layout01Props {
  containerStyle?: CSSProperties;
  header?: ReactNode;
  menu?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  overlay?: ReactNode;  // 改名为 overlay
}

const Layout: React.FC<Layout01Props> = ({
  containerStyle,
  header,
  menu,
  content,
  footer,
  overlay,
}) => {
  const { t } = useTranslation();

  return (
    <div role="application" aria-label={t('layout.appLabel')}>
      <ToastContainer role="alert" aria-live="polite" />
      <div style={containerStyle}>
        {header}
        <nav role="navigation" aria-label={t('layout.menuLabel')}>
          {menu}
        </nav>
        <main role="main" aria-label={t('layout.mainContentLabel')}>
          {content}
        </main>
        {footer}
        {overlay}
      </div>
    </div>
  );
};

export default Layout;