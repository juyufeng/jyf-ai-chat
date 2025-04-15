import { FC } from 'react';
import { Sender } from "@ant-design/x";
import { useAppStyle } from "@/styles/app.styles";
import ChatStore from "@/stores/chat-store";
import ReqStore from "@/stores/req-store";
import { observer } from "mobx-react-lite";
import { AISenderPlaceholder } from "@/configs/index";
import { useTranslation } from 'react-i18next';
import ViewStore from "@/stores/view-store";


interface FooterContainerProps {
  onSubmit: (message: string) => void;
  loadingButtonStop: () => void;
}

const FooterContainer: FC<FooterContainerProps> = ({
  onSubmit,
  loadingButtonStop
}) => {
  const { t } = useTranslation();
  const {
    getBottomStyle,
    senderStyle,
    footerContainerStyle,
    loadingButtonStyle,
    sendButtonStyle,
  } = useAppStyle();

  return (
    <footer 
      role="contentinfo"
      aria-label={t('footer.messageInput.area')}
      style={getBottomStyle({ isShowMenu: ViewStore.isMenuVisible() })}
    >
      <div style={footerContainerStyle}>
        <Sender
          value={ChatStore.senderContent}
          placeholder={AISenderPlaceholder()}
          onChange={(e) => {
            ChatStore.setSenderContent(e);
          }}
          onSubmit={(nextContent) => {
            onSubmit(nextContent);
          }}
          loading={ReqStore.chatting}
          style={senderStyle}
          aria-label={t('footer.messageInput.placeholder')}
          actions={(_, info) => {
            const { SendButton, LoadingButton } = info.components;
            return ReqStore.chatting ? (
              <LoadingButton
                onClick={loadingButtonStop}
                style={loadingButtonStyle}
                aria-label={t('footer.messageInput.stop')}
              />
            ) : (
              <SendButton
                style={sendButtonStyle}
                aria-label={t('footer.messageInput.send')}
              />
            );
          }}
        />
      </div>
    </footer>
  );
};

export default observer(FooterContainer);