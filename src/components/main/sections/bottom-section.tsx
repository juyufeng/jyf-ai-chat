import { FC } from 'react';
import { observer } from "mobx-react-lite";
import { Prompts } from "@ant-design/x";
import { getPromptItems, promptStyles } from "@/components/common/probtn";
import { useAppStyle } from "@/styles/app.styles";
import ChatStore from "@/stores/chat-store";
import ViewStore from "@/stores/view-store";
import ReqStore from "@/stores/req-store";
import { AbortType } from '@/enums/abort-type';
import { useTranslation } from 'react-i18next';

interface BottomSectionProps {
  onRequest: (message: string) => void;
}

const BottomSection: FC<BottomSectionProps> = ({ onRequest }) => {
  const { t } = useTranslation();
  const { endChatButtonStyle, endChatContainerStyle } = useAppStyle();

  return (
    <div ref={ViewStore.messagesEndRef} style={{ display: 'flex' }}>
      {!ChatStore.showWelcome && [...ChatStore.localMessages,...ChatStore.newMessages].length > 0 && (
        <div style={endChatContainerStyle}>
          <div
            onClick={() => {
              ChatStore.setIsShowSkeleton(true);
              ChatStore.toStopHandler(AbortType.END_SESSION)
              setTimeout(() => {
                ChatStore.setIsShowSkeleton(false);
              }, 300);
            }}
            style={endChatButtonStyle}
          >
            {t('chat.endDialog')}
          </div>
        </div>
      )}
      {/* <div style={{ marginLeft: '10px' }}>
        <Prompts
          title={''}
          items={getPromptItems().map((item, index) => ({
            key: String(index),
            icon: "",
            label: <span style={promptStyles.itemLabel}>{item}</span>,
            description: "",
          }))}
          onItemClick={(item: any) => {
            let content = item.data.label.props.children;
            if (content === t('prompts.items.memberNeeds')) {
              ViewStore.setShowForm(true);
              ViewStore.messageRefscrollToBottom();
            } else {
              ChatStore.setShowWelcome(false);
              ReqStore.setChatting(true);
              onRequest(ChatStore.senderContent);
              ChatStore.setSenderContent("");
            }
          }}
          styles={promptStyles as any}
        />
      </div> */}
    </div>
  );
};

export default observer(BottomSection);