import { ReactNode } from 'react';

export interface PageListItemProps {
  key: string;
  icon: ReactNode;
  title: string;
  description?: string;
  extra?: string;
  hasArrow?: boolean;
  hasSwitch?: boolean;
}