import { observable } from "mobx";
import ReqStore from "@/stores/req-store";
import { AbortType } from '@/enums/abort-type';
import { db } from '@/dbs/table-chat-db';
import { 
  getCurrentSelectedChatId, 
  getSelectedChat,
  getChatByIdWithUserId
} from '@/dbs/table-chat-func';

const $store = observable({
  activeChatSessionId: "",
  showWelcome: true,
  showSkeleton: false,
  senderContent: "",
  localMessages: [] as any[],
  newMessages: [] as any[],
  isCreating: false,
  
  clearLoaclAndNewMessages: () => {
    $store.localMessages = [];
    $store.newMessages = [];
  },

  // 新增方法
  setIsCreating(val: boolean) {
    this.isCreating = val;
  },
  
  // Setter 方法
  setActiveChatSessionId: (val: string) => {
    $store.activeChatSessionId = val;
  },
  setShowWelcome: (val: boolean) => {
    $store.showWelcome = val;
  },
  setSenderContent: (val: string) => {
    $store.senderContent = val;
  },

  // 获取当前选中页面, 所有的历史会话
  refreshLocalChat: async () => {
    try {
      const selectedChat = await getSelectedChat();
      if (selectedChat) {
        $store.setLocalMessages(selectedChat.messages);
      }
      $store.setIsShowSkeleton(false);
    } catch (error) {
      $store.setIsShowSkeleton(false);
    }
  },

  handleSubmit: async (params: {
    nextContent: string,
    onRequest: (content: string) => void
  }) => {
    const { nextContent, onRequest } = params;
    $store.setShowWelcome(false);
    ReqStore.setChatting(true)
    onRequest(nextContent);
    $store.setSenderContent("");
  },
  // 保存消息到数据库
  async saveMessages(messages: any[], chatId: string = "", refreshLocal: boolean = false) {
    try {
      const chat = await getChatByIdWithUserId(chatId);
  
      if (!chat) return;
      
      // 获取现有消息
      const existingMessages = chat.messages || [];
      
      // 创建增量消息数组
      const combinedMessages = [...existingMessages, ...messages];
      
      // 确保序列化
      const serializableMessages = combinedMessages.map(message => ({
        ...message,
        message: message.message ? JSON.parse(JSON.stringify(message.message)) : null
      }));
  
      await db.chats.update(chat.id, {
        messages: serializableMessages,
        sessionId: this.activeChatSessionId || ''
      });

      if (refreshLocal) {
        this.refreshLocalChat();
      }
    } catch (error) {
      console.error('保存消息失败:', error);
    }
  },
 
  // 添加消息状态管理方法
  setLocalMessages(messages: any[]) {
    this.localMessages = messages;
  },
  setNewMessages(messages: any[]) {
    this.newMessages = messages;
  },
  
  // 新增方法
  setIsShowSkeleton(val: boolean) {
    this.showSkeleton = val;
  },
  toStopHandler(type: AbortType) {
    // 获取最后一条消息
    let lastMessage: any;
    if (this.newMessages && this.newMessages.length) {
      lastMessage = this.newMessages[this.newMessages.length - 1]?.message;
    }
    if (ReqStore.chatting) {
      // 暂停会话
      getCurrentSelectedChatId().then((chatId) => {
        ReqStore.abortCurrentRequest(chatId || '', type);
      });
      if (lastMessage?.thoughts_status) {
        lastMessage.thoughts_status = 2; // 停止思考计时
      }
      ReqStore.setChatting(false);
    }
  }
});

export default $store;
