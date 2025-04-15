import { describe, it, expect, beforeEach, vi } from 'vitest';
import ReqStore from '../../../src/stores/req-store';
import { AbortType } from '../../../src/enums/abort-type';

describe('ReqStore 单元测试', () => {
  beforeEach(() => {
    // 重置状态
    ReqStore.setChatting(false);
  });

  it('应正确设置和获取聊天状态', () => {
    expect(ReqStore.chatting).toBe(false);
    ReqStore.setChatting(true);
    expect(ReqStore.chatting).toBe(true);
  });

  it('应正确创建中止控制器', () => {
    const controller = ReqStore.createAbortController();
    expect(controller).toBeInstanceOf(AbortController);
  });

  it('应正确中止当前请求', async () => {
    // 创建模拟的 AbortController
    const mockAbort = vi.fn();
    global.AbortController = vi.fn().mockImplementation(() => ({
      signal: {},
      abort: mockAbort
    }));

    // 创建控制器
    ReqStore.createAbortController();
    
    // 中止请求，提供必要的参数
    await ReqStore.abortCurrentRequest('test-chat-id', AbortType.END_SESSION);
    
    // 验证中止方法被调用
    expect(mockAbort).toHaveBeenCalled();
  });
});