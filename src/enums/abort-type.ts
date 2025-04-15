export enum AbortType {
  USER_MANUAL = 'USER_MANUAL',      // 用户手动点击中断
  END_SESSION = 'END_SESSION',      // 结束会话
  SWITCH_CHAT = 'SWITCH_CHAT',      // 切换会话
  CREATE_NEW = 'CREATE_NEW',        // 创建新会话
  DELETE_CHAT = 'DELETE_CHAT',      // 删除会话
}