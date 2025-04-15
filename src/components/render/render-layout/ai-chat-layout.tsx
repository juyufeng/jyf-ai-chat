import React from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginTop: '10px',
  marginBottom: '10px',
} as const;

const avatarStyle = {
  marginLeft: '10px',
} as const;

const formStyle = {
  fontSize: '14px',
  marginLeft: '10px',
  background: 'rgb(247,247,247)',
  padding: '10px',
  borderRadius: '5px',
  border: "1px solid rgb(232,232,232)",
} as const;

interface FormRenderProps {
  avatar: string;
  children: React.ReactNode;
}

const AiChatLayout: React.FC<FormRenderProps> = ({ avatar, children }) => {
  return (
    <div style={containerStyle}>
      <img 
        style={avatarStyle} 
        draggable="false" 
        width={38} 
        height={38} 
        src={avatar} 
      />
      <div style={formStyle}>
        {children}
      </div>
    </div>
  );
};

export default AiChatLayout;