import { FC } from 'react';
import { observer } from "mobx-react-lite";
import { Space, Button } from 'antd';
import { ShareAltOutlined, EllipsisOutlined, ReloadOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { AITitle, AITip, getAvatar, welcomeComponentType } from "@/configs/index";
import WelcomeCustom from '@/components/common/chat/welcome-custom';
import ChatStore from "@/stores/chat-store";
import { Welcome } from '@ant-design/x';

const WelcomeSection: FC = () => {
  if (!ChatStore.showWelcome || ChatStore.localMessages.length > 0) {
    return null;
  }

  if (welcomeComponentType === 'antd') {
    return (
      <div style={{ padding: '10px', userSelect: 'none' }}>
        <Welcome
          icon={getAvatar}
          title={AITitle()}
          description={AITip()}
          extra={
            <Space>
              {/* <Button icon={<ShareAltOutlined />} title="分享" />
              <Button icon={<ReloadOutlined />} title="刷新" />
              <Button icon={<StarOutlined />} title="收藏" />
              <Button icon={<SettingOutlined />} title="设置" />
              <Button icon={<EllipsisOutlined />} title="更多" /> */}
            </Space>
          }
        />
      </div>
    );
  }

  return (
    <WelcomeCustom
      icon={getAvatar}
      title={AITitle()}
      description={AITip()}
    />
  );

}

export default observer(WelcomeSection);