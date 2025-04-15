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

const messageStyle = {
  fontSize: '14px',
  marginLeft: '10px',
  background: 'rgb(247,247,247)',
  padding: '10px',
  borderRadius: '5px',
  border: "1px solid rgb(232,232,232)",
} as const;

interface WelcomeCustomProps {
  icon: string;
  title: string;
  description: string;
}

const WelcomeCustom: React.FC<WelcomeCustomProps> = ({ icon, title, description }) => {
  return (
    <section 
      role="region"
      aria-label="欢迎信息"
      style={containerStyle}
    >
      <img 
        style={avatarStyle} 
        draggable="false" 
        width={38} 
        height={38} 
        src={icon} 
        alt="AI助手头像"
        aria-hidden="false"
      />
      <div 
        style={messageStyle}
        role="article"
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ margin: '8px 0 0 0' }}>{description}</p>
      </div>
    </section>
  );
};

export default WelcomeCustom;