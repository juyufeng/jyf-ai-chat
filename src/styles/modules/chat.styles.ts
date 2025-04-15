import { THEME } from '@/configs/theme';

export const useChatStyles = () => ({
  endChatButtonStyle: {
    width: "97px",
    height: "34px",
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: '32px',
    borderRadius: '8px',
    border: `1px solid ${THEME.COLORS.PRIMARY}`,
    color: THEME.COLORS.PRIMARY,
    cursor: 'pointer',
    userSelect: 'none',
    marginLeft: '60px',
  },
  senderStyle: {
    width: "80%",
    height: '56px',
    borderRadius: '6px',
    backgroundColor: THEME.COLORS.BACKGROUND.LIGHT,
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
    backgroundColor: THEME.COLORS.SECONDARY,
    width: 32,
    opacity: 1
  },
  sendButtonStyle: {
    backgroundColor: THEME.COLORS.SECONDARY,
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
  avatarStyle: {
    width: THEME.SIZES.AVATAR.SIZE,
    height: THEME.SIZES.AVATAR.SIZE,
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: 10,
    marginLeft: 10
  },
});