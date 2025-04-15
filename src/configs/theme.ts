export const THEME = {
  LAYOUT: {
    NAV: {
      HEIGHT: 44,
      BG_COLOR: 'rgb(231,246,240)',
    },
    MENU: {
      WIDTH: 200,
    },
    BOTTOM: {
      HEIGHT: 88,
    },
  },
  COLORS: {
    PRIMARY: 'rgb(26,176,110)',
    SECONDARY: 'rgb(24,177,111)',
    TEXT: {
      PRIMARY: 'rgb(44,44,44)',
    },
    BACKGROUND: {
      DEFAULT: 'white',
      LIGHT: 'rgb(250,250,250)',
    },
    BORDER: '#e8e8e8',
  },
  SIZES: {
    BREAKPOINT: 1200,
    MIN_WIDTH: {
      MOBILE: 426,
      DESKTOP: 500,
    },
    AVATAR: {
      SIZE: 38,
    },
    BUTTON: {
      CHAT_END: {
        WIDTH: 97,
        HEIGHT: 34,
      },
      SEND: {
        WIDTH: 32,
      },
    },
  },
  ZINDEX: {
    OVERLAY: 200,
  },
} as const;