import { describe, it, expect, beforeEach, vi } from 'vitest';
import ChatStore from '../../../src/stores/chat-store';
import { AbortType } from '../../../src/enums/abort-type';

describe('ChatStore 单元测试', () => {
  beforeEach(() => {
    // 重置状态
    ChatStore.clearLoaclAndNewMessages();
    ChatStore.setShowWelcome(true);
    ChatStore.setIsShowSkeleton(false);
  });

  it('应正确设置和获取欢迎状态', () => {
    expect(ChatStore.showWelcome).toBe(true);
    ChatStore.setShowWelcome(false);
    expect(ChatStore.showWelcome).toBe(false);
  });

  it('应正确设置和获取骨架屏状态', () => {
    expect(ChatStore.showSkeleton).toBe(false);
    ChatStore.setIsShowSkeleton(true);
    expect(ChatStore.showSkeleton).toBe(true);
  });

  it('应正确设置和获取发送内容', () => {
    const testContent = '测试内容';
    ChatStore.setSenderContent(testContent);
    expect(ChatStore.senderContent).toBe(testContent);
  });

  it('应正确处理停止请求', () => {
    // 模拟 toStopHandler 方法
    ChatStore.toStopHandler = vi.fn();
    
    // 调用方法
    ChatStore.toStopHandler(AbortType.END_SESSION);
    
    // 验证调用
    expect(ChatStore.toStopHandler).toHaveBeenCalledWith(AbortType.END_SESSION);
  });
});