import { useState, useEffect, CSSProperties } from 'react';
import { THEME } from '@/configs/theme';

interface Dimensions {
  width: number;
  height: number;
}

const avatarStyle = {
  width: 38,
  height: 38,
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: 10,
  marginLeft: 10
} as const;

// 在 StylesReturn 接口中添加
interface StylesReturn {
  containerStyle: CSSProperties;
  navIconStyle: CSSProperties;
  navStyle: CSSProperties;
  getBottomStyle: (params?: { background?: string, isShowMenu?: boolean }) => CSSProperties;
  getContentMenuStyle: (params?: { background?: string, isShowMenu?: boolean }) => CSSProperties;
  getContentStyle: (params?: { background?: string, isShowMenu?: boolean }) => CSSProperties;
  endChatButtonStyle: CSSProperties;
  senderStyle: CSSProperties;
  footerContainerStyle: CSSProperties;
  loadingButtonStyle: CSSProperties;
  sendButtonStyle: CSSProperties;
  endChatContainerStyle: CSSProperties; // 新增
  avatarStyle: CSSProperties;
  overlayStyle: (params?: { isShowMenu?: boolean }) => CSSProperties;
  getMinAppWidth: () => number;
  getAppNavHeight: () => number;
}

interface StyleProps {
  isShowMenu?: boolean;
  background?: string;
}

export const useAppStyle = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const NavHeight = 44;
  const NavBgColor = 'rgb(231,246,240)';
  const MenuWidth = 200;
  const BottomHeight = 88;

  return {
    containerStyle: {
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      position: 'relative',
      background: 'white',
    },
    navStyle: {
      width: `${dimensions.width}px`,
      height: `${NavHeight}px`,
      position: 'absolute',
      top: 0,
      left: 0,
      background: NavBgColor,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 600,
      color: 'rgb(44,44,44)',
      userSelect: 'none',
    },
    navIconStyle: {
      display: 'flex',
      lineHeight: '44px',
      userSelect: 'none',
    },
    getContentMenuStyle: (params: StyleProps = {}) => ({
      width: `${MenuWidth}px`,
      height: `${dimensions.height - NavHeight}px`,
      position: 'absolute',
      top: `${NavHeight}px`,
      left: 0,
      display: !params.isShowMenu ? 'none' : '',
      background: params.background || 'white',
      borderRight: '1px solid #e8e8e8',
    }),
    getBottomStyle: (params: StyleProps = {}) => ({
      width: `${dimensions.width - (params.isShowMenu ? MenuWidth : 0)}px`,
      height: `${BottomHeight}px`,
      position: 'absolute',
      bottom: `0px`,
      left: params.isShowMenu ? MenuWidth : 0,
      background: params.background || 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // borderTop: '1px solid #e8e8e8',
    }),
    getContentStyle: (params: StyleProps = {}) => ({
      width: `${dimensions.width - (params.isShowMenu ? MenuWidth : 0)}px`,
      height: `${dimensions.height - NavHeight - BottomHeight}px`,
      position: 'absolute',
      top: `${NavHeight}px`,
      left: params.isShowMenu ? MenuWidth : 0,
      background: params.background || 'white',
      overflow: 'auto',
    }),
    endChatButtonStyle: {
      width: "97px",
      height: "34px",
      fontSize: '14px',
      fontWeight: 600,
      textAlign: 'center',
      lineHeight: '32px',
      borderRadius: '8px',
      border: '1px solid rgb(26,176,110)',
      color: 'rgb(26,176,110)',
      cursor: 'pointer',
      userSelect: 'none',
      marginLeft: '60px',
    },
    senderStyle: {
      width: "80%",
      height: '56px',
      borderRadius: '6px',
      backgroundColor: "rgb(250,250,250)",
      display: 'flex',
      alignContent: 'center'
    },
    footerContainerStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    loadingButtonStyle: {
      backgroundColor: "rgb(24,177,111)",
      width: 32,
      opacity: 1
    },
    sendButtonStyle: {
      backgroundColor: "rgb(24,177,111)",
      width: 32,
      opacity: 1
    },
    endChatContainerStyle: {
      marginLeft: '10px',
      textAlign: "left",
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    avatarStyle,
    overlayStyle: (params: StyleProps = {}) => ({
      left: params.isShowMenu? MenuWidth : 0,
      top: NavHeight,
      width: dimensions.width - (params.isShowMenu ? MenuWidth : 0),
      height: dimensions.height - NavHeight,
      background: 'white',
      position: 'absolute',
      zIndex: 200,
    }),
    getMinAppWidth: () => {
      if (dimensions.width < 1200) {
        return THEME.SIZES.MIN_WIDTH.MOBILE;
      }
      return 500;
    },
    getAppNavHeight: () => {
      return 44;
    }
  } as StylesReturn;
};