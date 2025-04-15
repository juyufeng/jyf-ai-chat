import { FC } from 'react';
import { List, Switch } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Account: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <List
            dataSource={[
              { title: '消息通知', defaultChecked: true },
              { title: '声音提醒', defaultChecked: true },
              { title: '自动更新', defaultChecked: true },
              { title: '数据同步', defaultChecked: true }
            ]}
            renderItem={item => (
              <List.Item
                actions={[
                  <Switch size="small" defaultChecked={item.defaultChecked} />
                ]}
              >
                {item.title}
              </List.Item>
            )}
          />
        </AppViewLayout>
      }
    />
  );
};

export default Account;