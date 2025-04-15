import React, { memo, use } from 'react';
import { Bubble } from "@ant-design/x";

interface AIChatProps {
  message: string;
  avatar: string;
  renderMarkdown: (message: string, id: string | number) => React.ReactNode;
  id: string | number;
}

const bubbleStyle = {
  textAlign: "left",
  padding: "10px 10px 10px 10px",
} as const;

const bubbleContentStyle = {
  marginRight: '50px',
  padding: "10px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgb(248,248,248)",
  border: "1px solid rgb(232,232,232)",
} as const;

const avatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "19px",
  cursor: 'pointer',
  userSelect: 'none',
} as const;

const AIChat: React.FC<AIChatProps> = memo(({ message, avatar, renderMarkdown, id }) => {
  return (
    <Bubble
      typing={{ step: 2, interval: 50 }}
      role="ai"
      content={message}
      avatar={
        <img
          draggable="false"
          width={38}
          height={38}
          src={avatar}
          style={avatarStyle}
        />
      }
      placement="start"
      style={bubbleStyle}
      styles={{
        content: bubbleContentStyle
      }}
      messageRender={(message) => renderMarkdown(message, id)}
    />
  );
});

AIChat.displayName = 'AIChat';

export default AIChat;