import { FC } from 'react';
import { Flex } from "antd";
import { observer } from "mobx-react-lite";
import { userURL, getAvatar } from "@/configs/index";
import ChatStore from "@/stores/chat-store";
import { useTranslation } from 'react-i18next';
import LocalChat from '@/components/common/chat/local-chat';
import AIChat from '@/components/common/chat/ai-chat';
import MarkdownRender from '@/components/render/markdown-render/markdown-01-render';

const CurrentChatSection: FC = () => {
  const { t } = useTranslation();
  
  if (ChatStore.showWelcome) {
    return null;
  }

  return (
    <Flex vertical={true} gap="small" style={{ marginTop: '10px', background: 'white' }}>
      {ChatStore.newMessages.map(({ id, message, status }) => (
        <div key={id}>
          {status === "local" ? (
            <LocalChat
              message={message}
              avatar={userURL}
            />
          ) : (
            <AIChat
              message={message}
              avatar={getAvatar}
              renderMarkdown={(content: any, id: any) => (
                <MarkdownRender 
                  content={content} 
                  tipStr={t('chat.loadingTip')}
                />
              )}
              id={id}
            />
          )}
        </div>
      ))}
    </Flex>
  );
};

export default observer(CurrentChatSection);