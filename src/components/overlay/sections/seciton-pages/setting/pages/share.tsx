import { FC } from 'react';
import { QRCode, Space, Button } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Share: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <div style={{ textAlign: 'center' }}>
            <QRCode value="https://example.com/share" size={200} />
            <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
              <Button type="primary" block>复制链接</Button>
              <Button block>生成邀请码</Button>
            </Space>
          </div>
        </AppViewLayout>
      }
    />
  );
};

export default Share;