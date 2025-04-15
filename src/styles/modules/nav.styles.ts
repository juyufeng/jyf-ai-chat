import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';

export const useNavStyles = (dimensions: Dimensions) => ({
  navStyle: {
    width: `${dimensions.width}px`,
    height: `${THEME.LAYOUT.NAV.HEIGHT}px`,
    position: 'absolute',
    top: 0,
    left: 0,
    background: THEME.LAYOUT.NAV.BG_COLOR,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    color: THEME.COLORS.TEXT.PRIMARY,
    userSelect: 'none',
  },
  navIconStyle: {
    display: 'flex',
    lineHeight: '44px',
  },
});