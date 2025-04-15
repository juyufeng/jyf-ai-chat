import { FC } from 'react';
import { Flex } from "antd";
import { observer } from "mobx-react-lite";
import { userURL, getAvatar } from "@/configs/index";
import ChatStore from "@/stores/chat-store";
import { useTranslation } from 'react-i18next';
import LocalChat from '@/components/common/chat/local-chat';
import AIChat from '@/components/common/chat/ai-chat';
import MarkdownRender from '@/components/render/markdown-render/markdown-01-render';

const HistorySection: FC = () => {
  const { t } = useTranslation();

  if (!ChatStore.localMessages.length) {
    return null;
  }

  return (
    <Flex vertical={true} gap="small" style={{ marginTop: '10px', background: 'white' }}>
      {ChatStore.localMessages.map(({ id, message, status }) => (
        <div key={id}>
          {status === "local" ? (
            <LocalChat
              message={message}
              avatar={userURL}
              isLocal={true}
            />
          ) : (
            <AIChat
              message={message}
              avatar={getAvatar}
              renderMarkdown={(content: any, id: any) => (
                <MarkdownRender 
                  content={content} 
                  tipStr={t('chat.loadingTip')}
                  isLocal={true} 
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

export default observer(HistorySection);