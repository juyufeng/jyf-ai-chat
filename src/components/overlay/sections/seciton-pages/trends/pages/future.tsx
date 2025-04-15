import { FC } from 'react';
import { Typography, Timeline } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";

const { Title, Paragraph } = Typography;

const Future: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>未来发展规划</Title>
            <Timeline
              items={[
                {
                  color: '#4e7bef',
                  children: (
                    <>
                      <Paragraph strong>多模态交互升级</Paragraph>
                      <Paragraph>支持更丰富的图片、语音等多模态输入方式</Paragraph>
                    </>
                  ),
                },
                {
                  color: '#4e7bef',
                  children: (
                    <>
                      <Paragraph strong>知识库扩展</Paragraph>
                      <Paragraph>持续扩充专业领域知识，提供更精准的回答</Paragraph>
                    </>
                  ),
                },
                {
                  color: '#4e7bef',
                  children: (
                    <>
                      <Paragraph strong>场景化应用</Paragraph>
                      <Paragraph>开发更多垂直场景的专业解决方案</Paragraph>
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

export default Future;