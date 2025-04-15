/**
 * 聊天消息接口
 */
export interface ChatMessage {
  /** 消息唯一标识 */
  id: string;
  /** 消息来源 */
  user: 'local' | 'loading';
  /** 消息文本内容 */
  text: string;
  /** 消息状态 */
  status?: 'local' | 'loading';
  /** AI回复的详细内容 */
  message?: {
    /** 最终结果 */
    result: string;
    /** 会话ID */
    sessionId: string;
    /** AI思考过程 */
    thoughts_result: string;
    /** 思考状态 0:未思考 1:思考中 2:思考结束 */
    thoughts_status: number;
    /** 是否返回 */
    isBack: boolean;
    /** 思维链数组 */
    cot: string[];
    /** 消息状态 */
    status: string;
  } | string;
}

export interface Chat {
  id: string;
  userId: string;
  sessionId: string;    
  title: string;
  time: string;
  isSelected: number;   
  isArchived: boolean;
  messages: ChatMessage[];
}