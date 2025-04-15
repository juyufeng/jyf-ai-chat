import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';
import type { StyleProps } from '@/types/style.definitions';

export const useOverlayStyles = (dimensions: Dimensions) => ({
  overlayStyle: (params: StyleProps = {}) => ({
    left: params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0,
    top: THEME.LAYOUT.NAV.HEIGHT,
    width: dimensions.width - (params.isShowMenu ? THEME.LAYOUT.MENU.WIDTH : 0),
    height: dimensions.height - THEME.LAYOUT.NAV.HEIGHT,
    background: THEME.COLORS.BACKGROUND.DEFAULT,
    position: 'absolute',
    zIndex: THEME.ZINDEX.OVERLAY,
  }),
});