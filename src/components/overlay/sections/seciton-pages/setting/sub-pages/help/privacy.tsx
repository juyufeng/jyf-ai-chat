import { FC } from 'react';
import { Typography } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const { Title, Paragraph } = Typography;

const Privacy: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>隐私政策</Title>
            <Paragraph>
              我们重视您的隐私保护，承诺对您的个人信息进行严格保密：
            </Paragraph>
            <Title level={5}>1. 信息收集</Title>
            <Paragraph>
              我们只收集必要的用户信息，包括账号信息和使用记录。
            </Paragraph>
            <Title level={5}>2. 信息使用</Title>
            <Paragraph>
              收集的信息仅用于服务优化和用户体验改进。
            </Paragraph>
            <Title level={5}>3. 信息保护</Title>
            <Paragraph>
              我们采用严格的加密措施保护您的个人信息安全。
            </Paragraph>
          </Typography>
        </AppViewLayout>
      }
    />
  );
};

export default Privacy;