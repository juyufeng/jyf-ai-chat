import Dexie, { Table } from 'dexie';
import { Chat } from '@/types/chat';

export class ChatDatabase extends Dexie {
  chats!: Table<Chat>;

  constructor() {
    super('ChatDatabase');
    this.version(1).stores({
      chats: 'id, sessionId, title, time, isSelected, isArchived, *messages' // 添加 messages 数组索引
    });

    // 升级到版本2，新增加 userId 字段
    this.version(2).stores({
      chats: 'id, userId, sessionId, title, time, isSelected, isArchived, *messages'
    }).upgrade(async (tx) => {
      db.transaction('rw', db.chats, async () => {
        await db.chats.clear();
      });
    });

    
  }
}

export const db = new ChatDatabase();