import { FC } from 'react';
import { List, Switch } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import { PageListItemProps } from '@/types/page.definitions';
import RouterStore from '@/stores/router-store';

// 样式常量
const styles = {
  circleIcon: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    userSelect: 'none',
    cursor: 'pointer',
  } as const,
  listItem: {
    background: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    padding: '12px 16px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  listItemMeta: {
    alignItems: 'center',
    userSelect: 'none'
  },
  extraIcon: {
    color: '#ccc'
  }
} as const;

const trendItems: PageListItemProps[] = [
  {
    key: 'future',
    icon: <div style={{ ...styles.circleIcon, background: '#4e7bef' }}>趋</div>,
    title: '未来趋势',
    description: '了解豆包AI的发展方向',
    hasArrow: true
  },
  {
    key: 'current',
    icon: <div style={{ ...styles.circleIcon, background: '#4e7bef' }}>新</div>,
    title: '当前更新',
    description: '查看最新功能更新',
    hasArrow: true
  }
];

const TrendsMiddle: FC = () => {
  const getExtraContent = (item: PageListItemProps) => {
    if (item?.hasSwitch) return <Switch defaultChecked size="small" />;
    if (item?.extra) return <div>{item.extra} <RightOutlined style={styles.extraIcon} /></div>;
    if (item?.hasArrow) return <RightOutlined style={styles.extraIcon} />;
    return null;
  };

  const handleItemClick = (item: PageListItemProps) => {
    RouterStore.openOverlayPage(['trends', item.key]);
  };

  return (
    <AppViewLayout>
      <List
        itemLayout="horizontal"
        dataSource={trendItems}
        renderItem={(item: PageListItemProps) => (
          <List.Item
            style={styles.listItem}
            extra={getExtraContent(item)}
            onClick={() => handleItemClick(item)}
          >
            <List.Item.Meta
              avatar={item.icon}
              title={item.title}
              description={item.description}
              style={styles.listItemMeta}
            />
          </List.Item>
        )}
      />
    </AppViewLayout>
  );
};

export default TrendsMiddle;