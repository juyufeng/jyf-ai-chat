import { LazyExoticComponent } from 'react';

export interface OverlayPageBase {
  key: string;
  title: string;
  component?: LazyExoticComponent<any>;
  icon?: string;
  iconBg?: string;
  description?: string;
  extra?: string;
  hasSwitch?: boolean;
  onClick?: () => void;
  children?: OverlayPageBase[];
}

export interface OverlayState {
  visible: boolean;
  path: string[];
  currentPage: OverlayPageBase | null;
}
