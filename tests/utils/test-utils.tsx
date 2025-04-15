import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/i18n';

// 测试提供者组件
interface TestProvidersProps {
  children: React.ReactNode;
}

const TestProviders: React.FC<TestProvidersProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

// 自定义渲染函数
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestProviders, ...options });

// 导出所有测试库函数
export * from '@testing-library/react';
export { customRender as render };