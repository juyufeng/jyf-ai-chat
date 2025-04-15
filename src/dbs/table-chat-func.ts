import { Chat, ChatMessage } from '@/types/chat';
import { db } from '@/dbs/table-chat-db';
import { getQueryParams } from '@/utils/common';

// 获取当前用户ID
export const getCurrentUserId = (): string => {
  return getQueryParams("Uid").toString() || '';
};

// 通过ID获取chat
export const getChatById = async (chatId: string): Promise<Chat | undefined> => {
  try {
    const userId = getCurrentUserId();
    const chat = await db.chats
      .where({
        id: chatId,
        userId: userId
      })
      .first();
    return chat;
  } catch (error) {
    console.error('获取会话失败:', error);
    return undefined;
  }
};

// 获取当前选中的chatId
export const getCurrentSelectedChatId = async (): Promise<string | undefined> => {
  try {
    const userId = getCurrentUserId();
    const selectedChat = await db.chats
      .where({
        userId: userId,
        isSelected: 1
      })
      .first();
    return selectedChat?.id;
  } catch (error) {
    console.error('获取当前选中会话ID失败:', error);
    return undefined;
  }
};

// 导出聊天记录为文本
export const exportChatToTxt = (chat: Chat) => {
  let txtContent = '';
  
  chat.messages.forEach(msg => {
    const sender = msg.status === 'local' ? '用户' : '薪宝';
    
    if (typeof msg.message === 'string') {
      txtContent += `${sender}：${msg.message}\n\n`;
    } else if (typeof msg.message === 'object' && msg.message) {
      if (msg.message.thoughts_result) {
        txtContent += `薪宝-思考：${msg.message.thoughts_result}\n\n`;
      }
      if (msg.message.result) {
        txtContent += `薪宝-回答：${msg.message.result}\n\n`;
      }
    }
  });
  
  const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${chat.title}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// 获取并排序聊天列表
export const getSortedChatList = async (): Promise<Chat[]> => {
  try {
    const userId = getCurrentUserId();
    const chats = await db.chats
      .where('userId')
      .equals(userId)
      .toArray();
    return chats.sort((a, b) => 
      new Date(b.time).getTime() - new Date(a.time).getTime()
    );
  } catch (error) {
    console.error('获取排序会话列表失败:', error);
    return [];
  }
};

// 创建新聊天
export const createNewChat = async (title: string): Promise<Chat | undefined> => {
  try {
    const userId = getCurrentUserId();
    const newChat: Chat = {
      id: Date.now().toString(),
      userId: userId,
      sessionId: '',
      title: title,
      time: new Date().toLocaleString(),
      isSelected: 1,
      isArchived: false,
      messages: []
    };

    await db.transaction('rw', db.chats, async () => {
      await db.chats
        .where({
          userId: userId,
          isSelected: 1
        })
        .modify({ isSelected: 0 });
      await db.chats.add(newChat);
    });

    return newChat;
  } catch (error) {
    console.error('创建新会话失败:', error);
    return undefined;
  }
};

// 选择聊天
export const selectChat = async (chatId: string): Promise<Chat | undefined> => {
  try {
    const userId = getCurrentUserId();
    
    await db.transaction('rw', db.chats, async () => {
      await db.chats
        .where({
          userId: userId,
          isSelected: 1
        })
        .modify({ isSelected: 0 });
      await db.chats
        .where({
          id: chatId,
          userId: userId
        })
        .modify({ isSelected: 1 });
    });

    return await getChatById(chatId);
  } catch (error) {
    console.error('选择会话失败:', error);
    return undefined;
  }
};

// 删除聊天
export const deleteChat = async (chatId: string): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    await db.chats
      .where({
        id: chatId,
        userId: userId
      })
      .delete();
  } catch (error) {
    console.error('删除会话失败:', error);
  }
};

// 更新聊天标题
export const updateChatTitle = async (chatId: string, newTitle: string): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    await db.chats
      .where({
        id: chatId,
        userId: userId
      })
      .modify({ title: newTitle });
  } catch (error) {
    console.error('更新会话标题失败:', error);
  }
};

// 保存消息到数据库
export const saveMessages = async (
  messages: ChatMessage[], 
  sessionId: string = '',
  chatId?: string
): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    let targetChatId = chatId;
    
    if (!targetChatId) {
      const selectedChatId = await getCurrentSelectedChatId();
      if (!selectedChatId) return;
      targetChatId = selectedChatId;
    }
    
    const chat = await getChatById(targetChatId);
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

    await db.chats
      .where({
        id: targetChatId,
        userId: userId
      })
      .modify({
        messages: serializableMessages,
        sessionId: sessionId || chat.sessionId
      });
  } catch (error) {
    console.error('保存消息失败:', error);
  }
};

// 清理过期聊天记录
export const cleanupOldChats = async (days: number = 30): Promise<void> => {
  try {
    const userId = getCurrentUserId();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    await db.transaction('rw', db.chats, async () => {
      await db.chats
        .where('userId')
        .equals(userId)
        .filter(chat => new Date(chat.time) < cutoffDate)
        .delete();
    });
  } catch (error) {
    console.error('清理旧会话失败:', error);
  }
};

// 获取当前选中的聊天
export const getSelectedChat = async (): Promise<Chat | undefined> => {
  try {
    const userId = getCurrentUserId();
    const selectedChat = await db.chats
      .where({
        userId: userId,
        isSelected: 1
      })
      .first();
    return selectedChat;
  } catch (error) {
    console.error('获取当前选中会话失败:', error);
    return undefined;
  }
};

// 根据ID获取聊天，带用户ID验证
export const getChatByIdWithUserId = async (chatId: string): Promise<Chat | undefined> => {
  try {
    const userId = getCurrentUserId();
    if (chatId) {
      console.log('获取指定会话-当前chatId-->', chatId);
      return await db.chats
        .where({
          id: chatId,
          userId: userId
        })
        .first();
    } else {
      console.log('获取选中会话-当前chatId-->', chatId);
      return await getSelectedChat();
    }
  } catch (error) {
    console.error('获取会话失败:', error);
    return undefined;
  }
};