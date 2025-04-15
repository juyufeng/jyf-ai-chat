import { FC } from 'react';
import { Collapse } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const FAQ: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  const items = [
    {
      key: '1',
      label: '豆包AI支持哪些语言？',
      children: '豆包AI目前支持中文和英文两种语言的对话。'
    },
    {
      key: '2',
      label: '如何保存对话记录？',
      children: '所有对话会自动保存，您可以在左侧菜单中查看历史记录。'
    },
    {
      key: '3',
      label: '如何删除对话记录？',
      children: '在对话列表中，点击右键选择删除，或使用删除按钮即可删除对话。'
    }
  ];

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Collapse items={items} defaultActiveKey={['1']} />
        </AppViewLayout>
      }
    />
  );
};

export default FAQ;