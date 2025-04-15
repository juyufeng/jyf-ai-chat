import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '../../utils/test-utils';
import BottomSection from '../../../src/components/main/sections/bottom-section';
import ChatStore from '../../../src/stores/chat-store';
import { AbortType } from '../../../src/enums/abort-type';

// 模拟存储
vi.mock('../../../src/stores/chat-store', () => ({
  default: {
    showWelcome: false,
    localMessages: [],
    newMessages: [],
    senderContent: '测试内容',
    setShowWelcome: vi.fn(),
    setIsShowSkeleton: vi.fn(),
    toStopHandler: vi.fn(),
    setSenderContent: vi.fn(),
  }
}));

vi.mock('../../../src/stores/req-store', () => ({
  default: {
    setChatting: vi.fn(),
  }
}));

vi.mock('../../../src/stores/section-store', () => ({
  default: {
    messagesEndRef: { current: null },
    setShowForm: vi.fn(),
    messageRefscrollToBottom: vi.fn(),
  }
}));

describe('BottomSection 组件测试', () => {
  const mockOnRequest = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('应正确渲染结束对话按钮', () => {
    // 设置消息存在
    vi.mocked(ChatStore).showWelcome = false;
    vi.mocked(ChatStore).localMessages = [{ id: '1', content: '测试' }];
    
    const { getByText } = render(<BottomSection onRequest={mockOnRequest} />);
    expect(getByText('结束对话')).toBeInTheDocument();
  });
  
  it('点击结束对话按钮应调用正确的方法', () => {
    // 设置消息存在
    vi.mocked(ChatStore).showWelcome = false;
    vi.mocked(ChatStore).localMessages = [{ id: '1', content: '测试' }];
    
    const { getByText } = render(<BottomSection onRequest={mockOnRequest} />);
    fireEvent.click(getByText('结束对话'));
    
    expect(ChatStore.setIsShowSkeleton).toHaveBeenCalledWith(true);
    expect(ChatStore.toStopHandler).toHaveBeenCalledWith(AbortType.END_SESSION);
  });
});