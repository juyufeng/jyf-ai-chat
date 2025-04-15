import { FC } from 'react';
import { Typography, Divider } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";

const { Title, Paragraph } = Typography;

const About: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });
  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>豆包 AI</Title>
            <Paragraph>版本：1.0.0</Paragraph>
            <Divider />
            <Paragraph>
              豆包是一款智能AI助手，致力于为用户提供高效、智能的对话服务。
            </Paragraph>
          </Typography>
        </AppViewLayout>
      }
    />
  );
};

export default About;