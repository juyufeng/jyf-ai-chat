import { FC } from 'react';
import { List, Button } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import RouterStore from '@/stores/router-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import { observer } from 'mobx-react-lite';

const Help: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  const helpItems = [
    { title: '如何使用豆包AI？', key: 'how-to-use' },
    { title: '常见问题解答', key: 'faq' },
    { title: '使用条款', key: 'terms' },
    { title: '隐私政策', key: 'privacy' }
  ];

  const handleItemClick = (key: string) => {
    RouterStore.openOverlayPage(['settings', 'help', key]);
  };

  // 获取当前路径
  const currentPath = RouterStore.overlayState.path;
  const isInSubPage = currentPath.length === 3 && currentPath[1] === 'help';
  
  // 获取当前显示的子页面组件
  const CurrentComponent = isInSubPage ? RouterStore.getCurrentComponent() : null;

  return (
    <>
      {!isInSubPage ? (
        <ThreeColumnLayout
          width={Number(overlay.width)}
          height={Number(overlay.height)}
          centerContent={
            <AppViewLayout>
              <List
                dataSource={helpItems}
                renderItem={item => (
                  <List.Item
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleItemClick(item.key)}
                  >
                    {item.title}
                  </List.Item>
                )}
              />
              <Button type="primary" block style={{ marginTop: 16 }}>联系客服</Button>
            </AppViewLayout>
          }
        />
      ) : (
        CurrentComponent && <CurrentComponent />
      )}
    </>
  );
};

export default observer(Help);