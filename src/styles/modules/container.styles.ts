import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';

export const useContainerStyles = (dimensions: Dimensions) => ({
  containerStyle: {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    position: 'relative',
    background: THEME.COLORS.BACKGROUND.DEFAULT,
  },
  getMinAppWidth: () => {
    if (dimensions.width < THEME.SIZES.BREAKPOINT) {
      return THEME.SIZES.MIN_WIDTH.MOBILE;
    }
    return THEME.SIZES.MIN_WIDTH.DESKTOP;
  },
  getAppNavHeight: () => THEME.LAYOUT.NAV.HEIGHT,
});