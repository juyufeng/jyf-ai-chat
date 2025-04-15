import { FC } from 'react';
import { Radio, Space } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Voice: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Radio.Group defaultValue="温柔桃子">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio value="温柔桃子">温柔桃子</Radio>
              <Radio value="知性成熟">知性成熟</Radio>
              <Radio value="活力阳光">活力阳光</Radio>
              <Radio value="可爱萝莉">可爱萝莉</Radio>
            </Space>
          </Radio.Group>
        </AppViewLayout>
      }
    />
  );
};

export default Voice;