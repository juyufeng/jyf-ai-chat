import { FC } from 'react';
import { Typography, Timeline } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";

const { Title, Paragraph } = Typography;

const Current: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>最新更新</Title>
            <Timeline
              items={[
                {
                  color: '#4e7bef',
                  children: (
                    <>
                      <Paragraph strong>2024年1月更新</Paragraph>
                      <Paragraph>- 优化对话体验</Paragraph>
                      <Paragraph>- 新增多种语音选择</Paragraph>
                      <Paragraph>- 界面交互优化</Paragraph>
                    </>
                  ),
                },
                {
                  color: '#4e7bef',
                  children: (
                    <>
                      <Paragraph strong>2023年12月更新</Paragraph>
                      <Paragraph>- 新增个性化设置</Paragraph>
                      <Paragraph>- 提升响应速度</Paragraph>
                      <Paragraph>- 修复已知问题</Paragraph>
                    </>
                  ),
                }
              ]}
            />
          </Typography>
        </AppViewLayout>
      }
    />
  );
};

export default Current;