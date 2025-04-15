import { FC } from 'react';
import { Typography } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const { Title, Paragraph } = Typography;

const Terms: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>使用条款</Title>
            <Paragraph>
              欢迎使用豆包AI服务。使用本服务即表示您同意以下条款：
            </Paragraph>
            <Title level={5}>1. 服务使用规则</Title>
            <Paragraph>
              用户需要遵守相关法律法规，不得使用本服务从事违法活动。
            </Paragraph>
            <Title level={5}>2. 知识产权</Title>
            <Paragraph>
              豆包AI的所有权利均归公司所有，用户不得擅自复制或传播。
            </Paragraph>
            <Title level={5}>3. 免责声明</Title>
            <Paragraph>
              对于使用本服务产生的任何直接或间接损失，本公司不承担责任。
            </Paragraph>
          </Typography>
        </AppViewLayout>
      }
    />
  );
};

export default Terms;