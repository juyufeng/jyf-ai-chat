import { FC } from 'react';
import { List, Progress } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Task: FC = () => {
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
              { title: '完成首次对话', progress: 100 },
              { title: '设置个人资料', progress: 50 },
              { title: '分享给好友', progress: 0 }
            ]}
            renderItem={item => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.title}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress percent={item.progress} showInfo={false} />
                </div>
              </List.Item>
            )}
          />
        </AppViewLayout>
      }
    />
  );
};

export default Task;