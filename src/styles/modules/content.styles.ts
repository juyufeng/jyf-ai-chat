import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';
import type { StyleProps } from '@/types/style.definitions';

export const useContentStyles = (dimensions: Dimensions) => ({
  getContentStyle: (params: StyleProps = {}) => ({
    width: `${dimensions.width - (params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0)}px`,
    height: `${dimensions.height - THEME.LAYOUT.NAV.HEIGHT - THEME.LAYOUT.BOTTOM.HEIGHT}px`,
    position: 'absolute',
    top: `${THEME.LAYOUT.NAV.HEIGHT}px`,
    left: params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0,
    background: params.background || THEME.COLORS.BACKGROUND.DEFAULT,
    overflow: 'auto',
    transition: 'left 0.5s ease-in-out, width 0.5s ease-in-out', // 添加过渡效果
  }),
  getContentMenuStyle: (params: StyleProps = {}) => ({
    width: `${THEME.LAYOUT.MENU.WIDTH}px`,
    height: `${dimensions.height - THEME.LAYOUT.NAV.HEIGHT}px`,
    position: 'absolute',
    top: `${THEME.LAYOUT.NAV.HEIGHT}px`,
    left: !params.isShowMenu ? `-${THEME.LAYOUT.MENU.WIDTH}px` : '0', // 使用位移而不是display
    background: params.background || THEME.COLORS.BACKGROUND.DEFAULT,
    borderRight: `1px solid ${THEME.COLORS.BORDER}`,
    transition: 'left 0.5s ease-in-out', // 添加过渡效果
    opacity: !params.isShowMenu ? 0 : 1, // 添加透明度变化
    visibility: !params.isShowMenu ? 'hidden' : 'visible', // 使用visibility代替display
    transitionProperty: 'left, opacity, visibility', // 同时过渡多个属性
  }),
});