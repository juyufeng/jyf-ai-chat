import { CSSProperties } from 'react';

export interface StyleProps {
  isShowMenu?: boolean;
  background?: string;
}

export interface StylesReturn {
  containerStyle: CSSProperties;
  navIconStyle: CSSProperties;
  navStyle: CSSProperties;
  endChatButtonStyle: CSSProperties;
  senderStyle: CSSProperties;
  footerContainerStyle: CSSProperties;
  loadingButtonStyle: CSSProperties;
  sendButtonStyle: CSSProperties;
  endChatContainerStyle: CSSProperties;
  avatarStyle: CSSProperties;
  overlayStyle: (params?: StyleProps) => CSSProperties;
  getMinAppWidth: () => number;
  getAppNavHeight: () => number;
  getBottomStyle: (params?: StyleProps) => CSSProperties;
  getContentMenuStyle: (params?: StyleProps) => CSSProperties;
  getContentStyle: (params?: StyleProps) => CSSProperties;
}