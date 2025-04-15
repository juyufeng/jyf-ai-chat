import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';
import type { StyleProps } from '@/types/style.definitions';

export const useBottomStyles = (dimensions: Dimensions) => ({
  getBottomStyle: (params: StyleProps = {}) => ({
    width: `${dimensions.width - (params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0)}px`,
    height: `${THEME.LAYOUT.BOTTOM.HEIGHT}px`,
    position: 'absolute',
    bottom: '0px',
    left: params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0,
    background: params.background || THEME.COLORS.BACKGROUND.DEFAULT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});