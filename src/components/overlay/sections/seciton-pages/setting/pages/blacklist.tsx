import { FC } from 'react';
import { List, Avatar, Button } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Blacklist: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <List
            dataSource={[]}
            renderItem={item => (
              <List.Item
                actions={[<Button type="link" danger>移出黑名单</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={'demo-title'}
                  description={'demo-description'}
                />
              </List.Item>
            )}
            locale={{ emptyText: '暂无黑名单用户' }}
          />
        </AppViewLayout>
      }
    />
  );
};

export default Blacklist;