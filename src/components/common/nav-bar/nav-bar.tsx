import { FC } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import BackButton from '../back-button/back-button';
import { useAppStyle } from "@/styles/app.styles";
import RouterStore from '@/stores/router-store';
import { observer } from 'mobx-react-lite';

const NavBar: FC = () => {
  const { getAppNavHeight } = useAppStyle();
  
  const handleBack = () => {
    RouterStore.goBack();  // 修改为新的 goBack 方法
  };

  const handleClose = () => {
    RouterStore.closeOverlay();
  };

  const displayTitle = RouterStore.getTitle();  // 修改为新的 getTitle 方法

  return (
    <div style={{
      height: getAppNavHeight(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 15px',
      position: 'relative'
    }}>
      <BackButton onBackClick={handleBack} />
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 16,
        fontWeight: 500
      }}>
        {displayTitle}
      </div>
      <Button
        type="text"
        icon={<CloseOutlined />}
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}
        onClick={handleClose}
      />
    </div>
  );
};

export default observer(NavBar);