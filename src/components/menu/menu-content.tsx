import React, {useState} from 'react';
import { Button, List, Dropdown, Input } from 'antd';
import { 
  PlusOutlined,
  MoreOutlined
} from '@ant-design/icons';
import menuStore from '@/stores/view-store';
import { observer } from 'mobx-react-lite';
import { Chat } from '@/types/chat'; 
import { styles, getDynamicStyles } from '@/components/menu/menu-content.styles';
import ChatStore from '@/stores/chat-store';
import EditTitleModal from './edit-title-modal';
import { useTranslation } from 'react-i18next';

interface MenuContentProps {
  contentMenuStyle: React.CSSProperties;
  onLeftItemClick?: (chatId: string) => void;
  onCreateChatClick?: () => void;
  onDeleteChat?: (chatId: string) => void;  // 添加删除回调
}

const MenuContent: React.FC<MenuContentProps> = ({ 
  contentMenuStyle, 
  onLeftItemClick, 
  onCreateChatClick,
  onDeleteChat 
}) => {
  const { t } = useTranslation();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingChat, setEditingChat] = useState<Chat | null>(null);

  const handleCreateChat = async () => {
    onCreateChatClick?.();  // 通知父组件
  };

  return (
    <div style={contentMenuStyle}>
      <div style={styles.container}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          style={styles.newChatButton}
          onClick={handleCreateChat}
          loading={ChatStore.isCreating}
          block
        >
          {t('menu.newChat')}
        </Button>

        <List
          style={styles.chatList}
          dataSource={menuStore.filteredChatList}
          renderItem={(chat: Chat) => (
            <List.Item
              onClick={() => {
                onLeftItemClick?.(chat.id);  // 传递chat.id给回调
              }}
              style={getDynamicStyles.chatItem(chat.isSelected)}
              actions={[
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'edit',
                        label: t('menu.editTitle'),
                        onClick: (e) => {
                          e.domEvent.stopPropagation(); // 阻止事件冒泡
                          setEditingChat({...chat}); // 使用对象拷贝确保状态更新
                          setEditModalVisible(true);
                        }
                      },
                      {
                        key: 'delete',
                        label: t('menu.deleteChat'),
                        onClick: () => onDeleteChat?.(chat.id)
                      },
                      {
                        key: 'export',
                        label: t('menu.exportChat'),
                        onClick: () => menuStore.exportChat(chat.id)
                      },
                    ],
                  }}
                  trigger={['click']}
                  placement="bottomLeft"
                >
                  <div style={styles.moreButton}>
                    <MoreOutlined style={getDynamicStyles.moreIcon(chat.isSelected)} />
                  </div>
                </Dropdown>
              ]}
            >
              <List.Item.Meta
                style={styles.chatItemMeta}
                title={<div style={getDynamicStyles.chatTitle(chat.isSelected)}>{chat.title}</div>}
                description={<div style={getDynamicStyles.chatTime(chat.isSelected)}>{chat.time}</div>}
              />
            </List.Item>
          )}
        />
      </div>
      {editingChat && (
        <EditTitleModal
          key={editingChat.id} // 添加key确保组件重新渲染
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          chatId={editingChat.id}
          initialTitle={editingChat.title}
        />
      )}
    </div>
  );
};

export default observer(MenuContent);
