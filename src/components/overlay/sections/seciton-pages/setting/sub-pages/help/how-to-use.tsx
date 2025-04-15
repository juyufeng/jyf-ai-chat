import { FC } from 'react';
import { Typography } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const { Title, Paragraph } = Typography;

const HowToUse: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Typography>
            <Title level={4}>如何使用豆包AI？</Title>
            <Paragraph>
              1. 开始对话：点击"新建对话"按钮开始与豆包AI交谈
            </Paragraph>
            <Paragraph>
              2. 提问方式：直接输入文字，描述你的需求或问题
            </Paragraph>
            <Paragraph>
              3. 语音交互：点击语音按钮，可以使用语音进行对话
            </Paragraph>
            <Paragraph>
              4. 历史记录：左侧菜单可以查看历史对话记录
            </Paragraph>
          </Typography>
        </AppViewLayout>
      }
    />
  );
};

export default HowToUse;