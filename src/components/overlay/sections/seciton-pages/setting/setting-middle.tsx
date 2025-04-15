import { FC } from 'react';
import { Avatar, List, Switch } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';
import { PageListItemProps } from '@/types/page.definitions';
import RouterStore from '@/stores/router-store';

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

const settingItems: PageListItemProps[] = [
  {
    key: 'profile',
    icon: <Avatar style={{ backgroundColor: '#f0f0f0' }} />,
    title: '鞠宇峰',
    description: '豆包号:juyufeng',
    hasArrow: true
  },
  {
    key: 'voice',
    icon: <div style={{ ...styles.circleIcon, background: '#8a56e2' }}>声</div>,
    title: '声音选择',
    extra: '温柔桃子',
    hasArrow: true
  },
  {
    key: 'help',
    icon: <div style={{ ...styles.circleIcon, background: '#4e7bef' }}>帮</div>,
    title: '帮助与反馈'
  },
  {
    key: 'task',
    icon: <div style={{ ...styles.circleIcon, background: '#3b7aff' }}>新</div>,
    title: '开启新手任务',
    hasSwitch: true
  },
  {
    key: 'share',
    icon: <div style={{ ...styles.circleIcon, background: '#ff5a5a' }}>分</div>,
    title: '分享豆包给好友'
  },
  {
    key: 'blacklist',
    icon: <div style={{ ...styles.circleIcon, background: '#999' }}>黑</div>,
    title: '黑名单',
    hasArrow: true
  },
  {
    key: 'about',
    icon: <div style={{ ...styles.circleIcon, background: '#3b7aff' }}>关</div>,
    title: '关于豆包',
    hasArrow: true
  },
  {
    key: 'model',
    icon: <div style={{ ...styles.circleIcon, background: '#3b7aff' }}>模</div>,
    title: '关于豆包大模型',
    hasArrow: true
  },
  {
    key: 'account',
    icon: <div style={{ ...styles.circleIcon, background: '#8a56e2' }}>账</div>,
    title: '账号设置',
    hasArrow: true
  },
  {
    key: 'logout',
    icon: <div style={{ ...styles.circleIcon, background: '#ff9500' }}>退</div>,
    title: '退出登录'
  }
];

const SettingMiddle: FC = () => {
  const getExtraContent = (item: PageListItemProps) => {
    if (item?.hasSwitch) return <Switch defaultChecked size="small" />;
    if (item?.extra) return <div>{item.extra} <RightOutlined style={styles.extraIcon} /></div>;
    if (item?.hasArrow) return <RightOutlined style={styles.extraIcon} />;
    return null;
  };

  const handleItemClick = (item: PageListItemProps) => {
    if (item.key === 'logout') {
      // 处理退出登录逻辑
      return;
    }
    RouterStore.openOverlayPage(['settings', item.key]);  // 使用路径数组方式打开页面
  };

  return (
    <AppViewLayout>
      <List
        itemLayout="horizontal"
        dataSource={settingItems}
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

export default SettingMiddle;