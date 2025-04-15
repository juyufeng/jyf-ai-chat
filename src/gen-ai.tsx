import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Layout01 from "@/layouts/layout01";

import HeaderContent from '@/components/header/header-content';
import MenuContent from '@/components/menu/menu-content';
import { useAIChat } from '@/hooks/use-ai-chat';

import ChatStore from "@/stores/chat-store";
import ViewStore from "@/stores/view-store";
import RouterStore from '@/stores/router-store';

import { useAppStyle } from "@/styles/app.styles";
import { AbortType } from '@/enums/abort-type';
import MainContainer from '@/components/main/main-container';
import FooterContainer from '@/components/footer/footer-container';
import OverlayContent from '@/components/overlay/overlay-content';

function App() {

  const {
    parsedMessages,
    onRequest,
    setOnComplete,
    setOnError,
    setMessages,
  } = useAIChat();

  // 添加初始化调用
  useEffect(() => {
    ViewStore.init();
    ViewStore.messageRefscrollToBottom("smooth", 450);
  }, []);

  useEffect(() => {
    ChatStore.setNewMessages(parsedMessages);
    ViewStore.messageRefscrollToBottom("instant", 0);
    setOnComplete((chatId) => {
      if (parsedMessages.length > 0 ) {
        setMessages([]);
        ChatStore.saveMessages(parsedMessages, chatId, true);
      }
    });
    setOnError((chatId, type) => {
      if (parsedMessages.length > 0 ) {
        // 用户手动点击中断
        if (type === AbortType.USER_MANUAL) {
          console.log('用户手动点击中断-->', chatId);
          ChatStore.setShowWelcome(false);
          ViewStore.setShowForm(false);
          setMessages([]);
          ChatStore.saveMessages(parsedMessages, chatId, true);
        }
        // 会话结束
        if (type === AbortType.END_SESSION) {
          console.log('会话结束-->', chatId);
          ChatStore.setShowWelcome(false);
          ViewStore.setShowForm(false);
          setMessages([]);
          ChatStore.saveMessages(parsedMessages, chatId, true);
        }
        // 新建对话
        if (type === AbortType.CREATE_NEW) {
          console.log('新建对话-->', chatId);
          ChatStore.saveMessages(parsedMessages, chatId);
          setMessages([]);
        }
        // 切换会话
        if (type === AbortType.SWITCH_CHAT) {
          console.log('切换会话-->', chatId);
          ChatStore.saveMessages(parsedMessages, chatId);
          setMessages([]);
        }
      }
    });
  }, [parsedMessages]);

  const {
    containerStyle,
    getContentMenuStyle,
  } = useAppStyle();
 
  const headerContent = <HeaderContent />;

  const menuContent = (
    <MenuContent 
      contentMenuStyle={getContentMenuStyle({ isShowMenu: ViewStore.isMenuVisible() })}
      onLeftItemClick={(chatId) => {
        RouterStore.closeOverlay();
        ViewStore.messageRefscrollToBottom();
        if (ViewStore.isSelectedChat(chatId)) {
          return;
        }
        ChatStore.toStopHandler(AbortType.SWITCH_CHAT);
        ViewStore.setShowForm(false);
        ViewStore.selectChat(chatId);
      }}
      onCreateChatClick={() => {
        RouterStore.closeOverlay();
        if (ChatStore.isCreating) return;
        ChatStore.setIsCreating(true);
        ChatStore.setShowWelcome(true);
        ChatStore.toStopHandler(AbortType.CREATE_NEW);
        ViewStore.setShowForm(false);
        setTimeout(() => {
          ChatStore.setIsCreating(false);
        }, 666);
        ViewStore.createNewChat();
      }}
      onDeleteChat={async (chatId: string) => {
        ChatStore.toStopHandler(AbortType.DELETE_CHAT);
        ViewStore.setShowForm(false);
        setMessages([]);
        await ViewStore.deleteChat(chatId);
      }}
    />
  );

  const mainContent = <MainContainer onRequest={onRequest} />;

  const footerContent = (
    <FooterContainer 
      onSubmit={(nextContent) => {
        ChatStore.handleSubmit({
          nextContent,
          onRequest
        });
      }}
      loadingButtonStop={() => {
        ChatStore.setIsShowSkeleton(true);
        ChatStore.toStopHandler(AbortType.USER_MANUAL);
        setTimeout(() => {
          ChatStore.setIsShowSkeleton(false);
        }, 300);
      }}
    />
  );

  const overlayContent = <OverlayContent />;

  return (
    <Layout01
      containerStyle={containerStyle}
      header={headerContent}
      menu={menuContent}
      content={mainContent}
      footer={footerContent}
      overlay={overlayContent} 
    />
  );
}

export default observer(App);
