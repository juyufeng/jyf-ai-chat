import { FC } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface BackButtonProps {
  onBackClick?: () => void;
}

const BackButton: FC<BackButtonProps> = ({ onBackClick }) => {
  return (
    <Button
      icon={<ArrowLeftOutlined />}
      type="text"
      onClick={onBackClick}
      style={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
};

export default BackButton;