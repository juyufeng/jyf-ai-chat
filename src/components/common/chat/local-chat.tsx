import React, { use } from 'react';
import { Bubble } from "@ant-design/x";

interface LocalChatProps {
  message: string;
  avatar: string;
  isLocal?: boolean;
}

const bubbleStyle = {
  textAlign: "left",
  padding: "10px 10px 10px 10px",
} as const;

const bubbleContentStyle = {
  marginLeft: '50px',
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgb(231,246,241)",
  border: "1px solid rgb(232,232,232)",
} as const;

const avatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "19px",
  cursor: 'pointer',
  userSelect: 'none',
} as const;

const LocalChat: React.FC<LocalChatProps> = ({ message, avatar, isLocal=false }) => {
  return (
    <Bubble
      typing={isLocal ? false :true}
      role="local"
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
      placement="end"
      style={bubbleStyle}
      styles={{
        content: bubbleContentStyle
      }}
    />
  );
};

export default LocalChat;